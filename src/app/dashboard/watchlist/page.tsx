"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, TrendingDown, X } from "lucide-react"
import { MOCK_STOCKS } from "@/lib/mock-data"
import Link from "next/link"

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value)
}

// Mock watchlist - replace with real data from server actions
const mockWatchlist = MOCK_STOCKS.slice(0, 3).map((stock) => ({
  id: stock.symbol,
  symbol: stock.symbol,
}))

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState(mockWatchlist)
  const watchlistStocks = MOCK_STOCKS.filter((stock) =>
    watchlist.some((item) => item.symbol === stock.symbol)
  )

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter((item) => item.symbol !== symbol))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Watchlist</h2>
          <p className="text-muted-foreground">
            Track your favorite stocks in one place
          </p>
        </div>
        <Button onClick={() => (window.location.href = "/dashboard/search")}>
          Add Stocks
        </Button>
      </div>

      {watchlistStocks.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your watchlist is empty</h3>
            <p className="text-muted-foreground mb-4">
              Start adding stocks to track their performance
            </p>
            <Button onClick={() => (window.location.href = "/dashboard/search")}>
              Browse Stocks
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {watchlistStocks.map((stock) => {
            const isPositive = stock.changePercent >= 0
            return (
              <Card key={stock.symbol} className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Link
                          href={`/dashboard/stocks/${stock.symbol}`}
                          className="text-xl font-bold hover:text-primary transition-colors"
                        >
                          {stock.symbol}
                        </Link>
                        {stock.sector && (
                          <Badge variant="outline">{stock.sector}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {stock.name}
                      </p>
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="text-2xl font-bold">
                            {formatCurrency(stock.price)}
                          </div>
                          <div
                            className={`flex items-center gap-1 text-sm ${
                              isPositive ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {isPositive ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            <span>
                              {isPositive ? "+" : ""}
                              {stock.changePercent.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                        {stock.marketCap && (
                          <div>
                            <div className="text-xs text-muted-foreground">
                              Market Cap
                            </div>
                            <div className="text-sm font-semibold">
                              {stock.marketCap >= 1e9
                                ? `$${(stock.marketCap / 1e9).toFixed(2)}B`
                                : `$${(stock.marketCap / 1e6).toFixed(2)}M`}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromWatchlist(stock.symbol)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
