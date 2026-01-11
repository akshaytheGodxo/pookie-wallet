import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="p-6">
      <Card>
        <CardContent className="py-12 text-center">
          <h2 className="text-2xl font-bold mb-2">Stock Not Found</h2>
          <CardDescription className="mb-6">
            The stock symbol you're looking for doesn't exist or isn't available.
          </CardDescription>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="/dashboard/search">
                <Search className="w-4 h-4 mr-2" />
                Search Stocks
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
