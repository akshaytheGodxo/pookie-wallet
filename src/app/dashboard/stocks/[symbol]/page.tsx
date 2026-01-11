import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Star, Bell, ExternalLink } from "lucide-react"
import { getMockStockDetail } from "@/lib/mock-data"

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value)
}

const formatNumber = (value: number) => {
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`
  return value.toLocaleString()
}

export default async function StockDetailPage({
  params,
}: {
  params: Promise<{ symbol: string }>
}) {
  const { symbol } = await params
  const stock = getMockStockDetail(symbol.toUpperCase())

  if (!stock) {
    notFound()
  }

  const isPositive = stock.changePercent >= 0

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold">{stock.symbol}</h1>
            {stock.sector && <Badge variant="outline">{stock.sector}</Badge>}
          </div>
          <p className="text-lg text-muted-foreground">{stock.name}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Star className="w-4 h-4 mr-2" />
            Add to Watchlist
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Set Alert
          </Button>
        </div>
      </div>

      {/* Price Card */}
      <Card>
        <CardHeader>
          <CardTitle>Current Price</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold">{formatCurrency(stock.price)}</span>
              <div
                className={`flex items-center gap-1 text-lg ${
                  isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )}
                <span className="font-semibold">
                  {isPositive ? "+" : ""}
                  {stock.change.toFixed(2)} ({isPositive ? "+" : ""}
                  {stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Market Cap</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stock.marketCap
                ? `$${formatNumber(stock.marketCap)}`
                : "N/A"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(stock.volume)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>52W High</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stock.high52w ? formatCurrency(stock.high52w) : "N/A"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>52W Low</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stock.low52w ? formatCurrency(stock.low52w) : "N/A"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stock.pe && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">P/E Ratio</span>
                <span className="font-semibold">{stock.pe.toFixed(2)}</span>
              </div>
            )}
            {stock.dividendYield !== undefined && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dividend Yield</span>
                <span className="font-semibold">
                  {stock.dividendYield.toFixed(2)}%
                </span>
              </div>
            )}
            {stock.earningsPerShare && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">EPS</span>
                <span className="font-semibold">
                  {formatCurrency(stock.earningsPerShare)}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stock.headquarters && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Headquarters</span>
                <span className="font-semibold">{stock.headquarters}</span>
              </div>
            )}
            {stock.employees && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Employees</span>
                <span className="font-semibold">
                  {stock.employees.toLocaleString()}
                </span>
              </div>
            )}
            {stock.website && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Website</span>
                <a
                  href={stock.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold flex items-center gap-1 hover:text-primary transition-colors"
                >
                  Visit <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      {stock.description && (
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{stock.description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
