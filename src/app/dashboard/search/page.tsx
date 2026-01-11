"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, TrendingDown } from "lucide-react"
import { searchStocks } from "@/lib/mock-data"
import Link from "next/link"

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value)
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const results = searchStocks(query)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Search Stocks</h2>
        <p className="text-muted-foreground">
          Find stocks by symbol or company name
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for stocks (e.g., AAPL, Apple, Microsoft)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {query && (
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Found {results.length} result{results.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((stock) => (
          <Link key={stock.symbol} href={`/dashboard/stocks/${stock.symbol}`}>
            <Card className="hover:border-primary transition-colors cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{stock.symbol}</CardTitle>
                    <CardDescription className="mt-1">
                      {stock.name}
                    </CardDescription>
                  </div>
                  {stock.sector && (
                    <Badge variant="outline">{stock.sector}</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="text-lg font-semibold">
                      {formatCurrency(stock.price)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Change</span>
                    <div
                      className={`flex items-center gap-1 ${
                        stock.changePercent >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {stock.changePercent >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="font-semibold">
                        {stock.changePercent >= 0 ? "+" : ""}
                        {stock.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  {stock.marketCap && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Market Cap
                      </span>
                      <span className="text-sm">
                        {stock.marketCap >= 1e9
                          ? `$${(stock.marketCap / 1e9).toFixed(2)}B`
                          : `$${(stock.marketCap / 1e6).toFixed(2)}M`}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {query && results.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No stocks found matching "{query}"
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
