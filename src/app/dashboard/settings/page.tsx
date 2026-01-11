"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { User, CreditCard, Bell, Shield, Crown, Sparkles } from "lucide-react"
import { useUser } from "@clerk/nextjs"

// Mock subscription - replace with real data
const mockSubscription = {
  tier: "free" as const,
  expiresAt: null,
}

const subscriptionTiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "5 watchlist items",
      "3 portfolio positions",
      "2 price alerts",
      "Basic charts",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    features: [
      "50 watchlist items",
      "100 portfolio positions",
      "20 price alerts",
      "Real-time data",
      "Advanced charts",
    ],
  },
  {
    name: "Premium",
    price: "$49",
    period: "per month",
    features: [
      "Unlimited watchlist",
      "Unlimited positions",
      "Unlimited alerts",
      "Real-time data",
      "Advanced charts",
      "API access",
      "Priority support",
    ],
  },
]

export default function SettingsPage() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState<"profile" | "subscription" | "notifications" | "security">("profile")

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "subscription" as const, label: "Subscription", icon: CreditCard },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "security" as const, label: "Security", icon: Shield },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1 p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    First Name
                  </label>
                  <Input
                    defaultValue={user?.firstName || ""}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Last Name
                  </label>
                  <Input
                    defaultValue={user?.lastName || ""}
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input
                    defaultValue={user?.emailAddresses[0]?.emailAddress || ""}
                    type="email"
                    disabled
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Email cannot be changed here
                  </p>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          )}

          {activeTab === "subscription" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>
                    Manage your subscription and billing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      {mockSubscription.tier === "premium" ? (
                        <Crown className="w-6 h-6 text-primary" />
                      ) : mockSubscription.tier === "pro" ? (
                        <Sparkles className="w-6 h-6 text-primary" />
                      ) : null}
                      <div>
                        <div className="font-semibold">
                          {mockSubscription.tier.charAt(0).toUpperCase() +
                            mockSubscription.tier.slice(1)}{" "}
                          Plan
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {mockSubscription.tier === "free"
                            ? "Free forever"
                            : mockSubscription.expiresAt
                            ? `Expires ${mockSubscription.expiresAt.toLocaleDateString()}`
                            : "Active"}
                        </div>
                      </div>
                    </div>
                    {mockSubscription.tier !== "premium" && (
                      <Button variant="outline">Upgrade</Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Plans</CardTitle>
                  <CardDescription>
                    Choose the plan that fits your needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subscriptionTiers.map((tier) => {
                      const isCurrentTier =
                        tier.name.toLowerCase() === mockSubscription.tier
                      return (
                        <div
                          key={tier.name}
                          className={`p-4 rounded-lg border ${
                            isCurrentTier
                              ? "border-primary bg-primary/5"
                              : "border-border"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{tier.name}</h3>
                                {isCurrentTier && (
                                  <Badge variant="secondary">Current</Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                <span className="text-lg font-bold">{tier.price}</span>
                                {" / "}
                                {tier.period}
                              </div>
                            </div>
                            {!isCurrentTier && (
                              <Button size="sm" variant="outline">
                                {mockSubscription.tier === "free" &&
                                tier.name !== "Free"
                                  ? "Upgrade"
                                  : "Switch"}
                              </Button>
                            )}
                          </div>
                          <ul className="space-y-1 text-sm">
                            {tier.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control how you receive alerts and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <div className="font-semibold">Price Alerts</div>
                    <div className="text-sm text-muted-foreground">
                      Get notified when your price alerts trigger
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <div className="font-semibold">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive updates via email
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <div className="font-semibold">Weekly Summary</div>
                    <div className="text-sm text-muted-foreground">
                      Get a weekly portfolio summary
                    </div>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
                <Button>Save Preferences</Button>
              </CardContent>
            </Card>
          )}

          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and privacy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Change Password</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Update your password to keep your account secure
                  </p>
                  <Button variant="outline">Change Password</Button>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2 text-destructive">
                    Delete Account
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Permanently delete your account and all associated data
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
