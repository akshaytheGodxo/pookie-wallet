"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { PortfolioPosition } from "@/types"

// Mock database - replace with Prisma later
const mockPortfolio: Record<string, PortfolioPosition[]> = {}

/**
 * Get user's portfolio positions
 */
export async function getPortfolioPositions(): Promise<PortfolioPosition[]> {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  return mockPortfolio[userId] || []
}

/**
 * Add a new position to portfolio
 */
export async function addPosition(
  symbol: string,
  shares: number,
  averagePrice: number
) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  // In real app, fetch current price from API
  const currentPrice = averagePrice // Mock: use average price as current

  const position: PortfolioPosition = {
    id: `${Date.now()}`,
    userId,
    symbol,
    shares,
    averagePrice,
    currentPrice,
    totalValue: shares * currentPrice,
    gainLoss: 0,
    gainLossPercent: 0,
  }

  const current = mockPortfolio[userId] || []
  mockPortfolio[userId] = [...current, position]

  revalidatePath("/dashboard/portfolio")
  return { success: true, position }
}

/**
 * Update a position
 */
export async function updatePosition(
  id: string,
  shares?: number,
  averagePrice?: number
) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const positions = mockPortfolio[userId] || []
  const position = positions.find((p) => p.id === id)

  if (!position) throw new Error("Position not found")

  const updated: PortfolioPosition = {
    ...position,
    shares: shares ?? position.shares,
    averagePrice: averagePrice ?? position.averagePrice,
    totalValue: (shares ?? position.shares) * position.currentPrice,
    gainLoss:
      (shares ?? position.shares) * position.currentPrice -
      (shares ?? position.shares) * (averagePrice ?? position.averagePrice),
    gainLossPercent:
      ((position.currentPrice - (averagePrice ?? position.averagePrice)) /
        (averagePrice ?? position.averagePrice)) *
      100,
  }

  mockPortfolio[userId] = positions.map((p) => (p.id === id ? updated : p))

  revalidatePath("/dashboard/portfolio")
  return { success: true, position: updated }
}

/**
 * Remove a position
 */
export async function removePosition(id: string) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const positions = mockPortfolio[userId] || []
  mockPortfolio[userId] = positions.filter((p) => p.id !== id)

  revalidatePath("/dashboard/portfolio")
  return { success: true }
}
