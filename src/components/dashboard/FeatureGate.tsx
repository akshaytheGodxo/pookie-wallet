"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Crown, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { SubscriptionTier } from "@/types"

interface FeatureGateProps {
  requiredTier: SubscriptionTier
  currentTier: SubscriptionTier
  featureName: string
  description?: string
  children: React.ReactNode
}

const tierOrder: SubscriptionTier[] = ["free", "pro", "premium"]
const tierNames: Record<SubscriptionTier, string> = {
  free: "Free",
  pro: "Pro",
  premium: "Premium",
}

export function FeatureGate({
  requiredTier,
  currentTier,
  featureName,
  description,
  children,
}: FeatureGateProps) {
  const router = useRouter()

  const currentTierIndex = tierOrder.indexOf(currentTier)
  const requiredTierIndex = tierOrder.indexOf(requiredTier)

  const hasAccess = currentTierIndex >= requiredTierIndex

  if (hasAccess) {
    return <>{children}</>
  }

  return (
    <Card className="border-dashed">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Lock className="w-6 h-6 text-muted-foreground" />
          <div>
            <CardTitle>{featureName}</CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This feature is available for {tierNames[requiredTier]} plan and above.
          Your current plan is {tierNames[currentTier]}.
        </p>
        <Button
          onClick={() => router.push("/dashboard/settings?tab=subscription")}
          className="w-full"
        >
          {requiredTier === "premium" ? (
            <Crown className="w-4 h-4 mr-2" />
          ) : (
            <Sparkles className="w-4 h-4 mr-2" />
          )}
          Upgrade to {tierNames[requiredTier]}
        </Button>
      </CardContent>
    </Card>
  )
}
