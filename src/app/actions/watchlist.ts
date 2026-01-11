"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

// Mock database - replace with Prisma later
const mockWatchlist: Record<string, string[]> = {}

/**
 * Get user's watchlist
 */
export async function getWatchlist() {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  return mockWatchlist[userId] || []
}

/**
 * Add stock to watchlist
 */
export async function addToWatchlist(symbol: string) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const current = mockWatchlist[userId] || []
  if (!current.includes(symbol)) {
    mockWatchlist[userId] = [...current, symbol]
  }

  revalidatePath("/dashboard/watchlist")
  return { success: true }
}

/**
 * Remove stock from watchlist
 */
export async function removeFromWatchlist(symbol: string) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const current = mockWatchlist[userId] || []
  mockWatchlist[userId] = current.filter((s) => s !== symbol)

  revalidatePath("/dashboard/watchlist")
  return { success: true }
}
