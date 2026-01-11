import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react"
import { MOCK_STOCKS } from "@/lib/mock-data"
import Link from "next/link"

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value)
}

// Format large numbers
const formatNumber = (value: number) => {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
  return formatCurrency(value)
}

export default function DashboardPage() {
  const topGainers = [...MOCK_STOCKS]
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 5)

  const topLosers = [...MOCK_STOCKS]
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 5)

  const mostActive = [...MOCK_STOCKS]
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 5)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Market Overview</h2>
        <p className="text-muted-foreground">
          Track the latest market movements and trends
        </p>
      </div>

      {/* Market Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Market Cap</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(MOCK_STOCKS.reduce((sum, stock) => sum + (stock.marketCap || 0), 0))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {MOCK_STOCKS.length} tracked stocks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Change</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              +{(
                MOCK_STOCKS.reduce((sum, stock) => sum + stock.changePercent, 0) /
                MOCK_STOCKS.length
              ).toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Average daily change
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Stocks</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MOCK_STOCKS.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently tracking
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Gainers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Gainers</CardTitle>
          <CardDescription>Stocks with the highest gains today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topGainers.map((stock) => (
              <Link
                key={stock.symbol}
                href={`/dashboard/stocks/${stock.symbol}`}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{stock.symbol}</span>
                    <span className="text-sm text-muted-foreground">
                      {stock.name}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(stock.price)}</div>
                    <div className="text-sm text-green-500 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +{stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Losers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Losers</CardTitle>
          <CardDescription>Stocks with the largest declines today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topLosers.map((stock) => (
              <Link
                key={stock.symbol}
                href={`/dashboard/stocks/${stock.symbol}`}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{stock.symbol}</span>
                    <span className="text-sm text-muted-foreground">
                      {stock.name}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(stock.price)}</div>
                    <div className="text-sm text-red-500 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      {stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Most Active */}
      <Card>
        <CardHeader>
          <CardTitle>Most Active</CardTitle>
          <CardDescription>Stocks with highest trading volume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mostActive.map((stock) => (
              <Link
                key={stock.symbol}
                href={`/dashboard/stocks/${stock.symbol}`}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{stock.symbol}</span>
                    <span className="text-sm text-muted-foreground">
                      {stock.name}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(stock.price)}</div>
                    <div className="text-sm text-muted-foreground">
                      Vol: {formatNumber(stock.volume)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
