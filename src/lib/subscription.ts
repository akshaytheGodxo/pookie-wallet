import { SubscriptionTier, SUBSCRIPTION_FEATURES } from "@/types"

/**
 * Get subscription features for a given tier
 */
export function getSubscriptionFeatures(tier: SubscriptionTier) {
  return SUBSCRIPTION_FEATURES[tier]
}

/**
 * Check if user can perform an action based on their subscription tier
 */
export function canPerformAction(
  tier: SubscriptionTier,
  action: keyof typeof SUBSCRIPTION_FEATURES.free
): boolean {
  const features = getSubscriptionFeatures(tier)
  return features[action] === true || features[action] === -1
}

/**
 * Check if user can add more items (watchlist, positions, alerts)
 */
export function canAddMore(
  tier: SubscriptionTier,
  action: "maxWatchlistItems" | "maxPortfolioPositions" | "maxAlerts",
  currentCount: number
): boolean {
  const features = getSubscriptionFeatures(tier)
  const max = features[action]

  // -1 means unlimited
  if (max === -1) return true

  return currentCount < max
}

/**
 * Get the maximum allowed items for a subscription tier
 */
export function getMaxItems(
  tier: SubscriptionTier,
  action: "maxWatchlistItems" | "maxPortfolioPositions" | "maxAlerts"
): number {
  const features = getSubscriptionFeatures(tier)
  return features[action]
}

/**
 * Format max items for display
 */
export function formatMaxItems(max: number): string {
  if (max === -1) return "Unlimited"
  return max.toString()
}
