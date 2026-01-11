"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Plus, Wallet } from "lucide-react"
import { MOCK_STOCKS } from "@/lib/mock-data"
import Link from "next/link"

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value)
}

// Mock portfolio positions - replace with real data from server actions
const mockPositions = [
  {
    id: "1",
    symbol: "AAPL",
    shares: 10,
    averagePrice: 170.0,
    currentPrice: MOCK_STOCKS.find((s) => s.symbol === "AAPL")?.price || 175.43,
  },
  {
    id: "2",
    symbol: "MSFT",
    shares: 5,
    averagePrice: 350.0,
    currentPrice: MOCK_STOCKS.find((s) => s.symbol === "MSFT")?.price || 378.91,
  },
  {
    id: "3",
    symbol: "GOOGL",
    shares: 8,
    averagePrice: 140.0,
    currentPrice: MOCK_STOCKS.find((s) => s.symbol === "GOOGL")?.price || 142.56,
  },
].map((pos) => {
  const totalValue = pos.shares * pos.currentPrice
  const totalCost = pos.shares * pos.averagePrice
  const gainLoss = totalValue - totalCost
  const gainLossPercent = (gainLoss / totalCost) * 100

  return {
    ...pos,
    totalValue,
    gainLoss,
    gainLossPercent,
  }
})

const totalPortfolioValue = mockPositions.reduce(
  (sum, pos) => sum + pos.totalValue,
  0
)
const totalGainLoss = mockPositions.reduce((sum, pos) => sum + pos.gainLoss, 0)
const totalGainLossPercent =
  mockPositions.reduce((sum, pos) => sum + pos.shares * pos.averagePrice, 0) > 0
    ? (totalGainLoss /
        mockPositions.reduce(
          (sum, pos) => sum + pos.shares * pos.averagePrice,
          0
        )) *
      100
    : 0

export default function PortfolioPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Portfolio</h2>
          <p className="text-muted-foreground">
            Track your paper trading positions and performance
          </p>
        </div>
        <Button onClick={() => (window.location.href = "/dashboard/search")}>
          <Plus className="w-4 h-4 mr-2" />
          Add Position
        </Button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(totalPortfolioValue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Gain/Loss</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`text-3xl font-bold flex items-center gap-2 ${
                totalGainLoss >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {totalGainLoss >= 0 ? (
                <TrendingUp className="w-6 h-6" />
              ) : (
                <TrendingDown className="w-6 h-6" />
              )}
              {formatCurrency(Math.abs(totalGainLoss))}
            </div>
            <div
              className={`text-sm mt-1 ${
                totalGainLoss >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {totalGainLoss >= 0 ? "+" : ""}
              {totalGainLossPercent.toFixed(2)}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockPositions.length}</div>
            <div className="text-sm text-muted-foreground mt-1">Active holdings</div>
          </CardContent>
        </Card>
      </div>

      {/* Positions List */}
      {mockPositions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No positions yet</h3>
            <p className="text-muted-foreground mb-4">
              Start paper trading by adding your first position
            </p>
            <Button onClick={() => (window.location.href = "/dashboard/search")}>
              Add Position
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your Positions</CardTitle>
            <CardDescription>Manage your paper trading portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPositions.map((position) => {
                const stock = MOCK_STOCKS.find((s) => s.symbol === position.symbol)
                const isPositive = position.gainLoss >= 0

                return (
                  <div
                    key={position.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Link
                          href={`/dashboard/stocks/${position.symbol}`}
                          className="text-xl font-bold hover:text-primary transition-colors"
                        >
                          {position.symbol}
                        </Link>
                        {stock?.sector && (
                          <Badge variant="outline">{stock.sector}</Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Shares</div>
                          <div className="font-semibold">{position.shares}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Avg Price</div>
                          <div className="font-semibold">
                            {formatCurrency(position.averagePrice)}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Current</div>
                          <div className="font-semibold">
                            {formatCurrency(position.currentPrice)}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Value</div>
                          <div className="font-semibold">
                            {formatCurrency(position.totalValue)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-6">
                      <div
                        className={`text-xl font-bold flex items-center gap-1 justify-end ${
                          isPositive ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {isPositive ? (
                          <TrendingUp className="w-5 h-5" />
                        ) : (
                          <TrendingDown className="w-5 h-5" />
                        )}
                        {formatCurrency(Math.abs(position.gainLoss))}
                      </div>
                      <div
                        className={`text-sm ${
                          isPositive ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {isPositive ? "+" : ""}
                        {position.gainLossPercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
