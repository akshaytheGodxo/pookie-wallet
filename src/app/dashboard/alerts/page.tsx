"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Plus, X, CheckCircle2 } from "lucide-react"
import { MOCK_STOCKS } from "@/lib/mock-data"

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value)
}

// Mock alerts - replace with real data from server actions
const mockAlerts = [
  {
    id: "1",
    symbol: "AAPL",
    type: "price_above" as const,
    targetValue: 180.0,
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "2",
    symbol: "MSFT",
    type: "price_below" as const,
    targetValue: 350.0,
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "3",
    symbol: "TSLA",
    type: "percent_change" as const,
    targetValue: 5.0,
    isActive: false,
    createdAt: new Date(),
    triggeredAt: new Date(),
  },
]

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts)

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const toggleAlert = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
      )
    )
  }

  const getAlertDescription = (alert: typeof mockAlerts[0]) => {
    const stock = MOCK_STOCKS.find((s) => s.symbol === alert.symbol)
    const currentPrice = stock?.price || 0

    switch (alert.type) {
      case "price_above":
        return `Alert when ${alert.symbol} goes above ${formatCurrency(alert.targetValue)} (Current: ${formatCurrency(currentPrice)})`
      case "price_below":
        return `Alert when ${alert.symbol} goes below ${formatCurrency(alert.targetValue)} (Current: ${formatCurrency(currentPrice)})`
      case "percent_change":
        return `Alert when ${alert.symbol} changes by ${Math.abs(alert.targetValue)}%`
      default:
        return ""
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Price Alerts</h2>
          <p className="text-muted-foreground">
            Get notified when stocks hit your target prices
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Alert
        </Button>
      </div>

      {alerts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No alerts set</h3>
            <p className="text-muted-foreground mb-4">
              Create price alerts to never miss important market movements
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Alert
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => {
            const stock = MOCK_STOCKS.find((s) => s.symbol === alert.symbol)
            const isTriggered = !!alert.triggeredAt

            return (
              <Card
                key={alert.id}
                className={isTriggered ? "border-primary" : ""}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl font-bold">{alert.symbol}</span>
                        {stock && (
                          <Badge variant="outline">
                            {formatCurrency(stock.price)}
                          </Badge>
                        )}
                        {alert.isActive ? (
                          <Badge variant="default">Active</Badge>
                        ) : (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                        {isTriggered && (
                          <Badge variant="outline" className="gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Triggered
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {getAlertDescription(alert)}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        Created {alert.createdAt.toLocaleDateString()}
                        {alert.triggeredAt &&
                          ` • Triggered ${alert.triggeredAt.toLocaleDateString()}`}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleAlert(alert.id)}
                      >
                        {alert.isActive ? "Disable" : "Enable"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAlert(alert.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
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
