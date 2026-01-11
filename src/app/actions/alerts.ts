"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { Alert } from "@/types"

// Mock database - replace with Prisma later
const mockAlerts: Record<string, Alert[]> = {}

/**
 * Get user's alerts
 */
export async function getAlerts(): Promise<Alert[]> {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  return mockAlerts[userId] || []
}

/**
 * Create a new alert
 */
export async function createAlert(
  symbol: string,
  type: Alert["type"],
  targetValue: number
) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const alert: Alert = {
    id: `${Date.now()}`,
    userId,
    symbol,
    type,
    targetValue,
    isActive: true,
    createdAt: new Date(),
  }

  const current = mockAlerts[userId] || []
  mockAlerts[userId] = [...current, alert]

  revalidatePath("/dashboard/alerts")
  return { success: true, alert }
}

/**
 * Update an alert
 */
export async function updateAlert(
  id: string,
  updates: Partial<Pick<Alert, "isActive" | "targetValue">>
) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const alerts = mockAlerts[userId] || []
  const alert = alerts.find((a) => a.id === id)

  if (!alert) throw new Error("Alert not found")

  const updated: Alert = {
    ...alert,
    ...updates,
  }

  mockAlerts[userId] = alerts.map((a) => (a.id === id ? updated : a))

  revalidatePath("/dashboard/alerts")
  return { success: true, alert: updated }
}

/**
 * Delete an alert
 */
export async function deleteAlert(id: string) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const alerts = mockAlerts[userId] || []
  mockAlerts[userId] = alerts.filter((a) => a.id !== id)

  revalidatePath("/dashboard/alerts")
  return { success: true }
}
