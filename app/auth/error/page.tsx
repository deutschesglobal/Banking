import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-serif font-bold">Deutsche Global Bank</span>
          </div>
        </div>

        <Card className="glass border-0 text-card-foreground">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-destructive/20 rounded-full w-fit">
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>
            <CardTitle className="text-2xl font-serif">Authentication Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              {params?.error ? (
                <div className="p-3 bg-destructive/20 border border-destructive/30 rounded-md">
                  <p className="text-sm text-destructive font-medium">Error Code: {params.error}</p>
                </div>
              ) : (
                <p className="text-card-foreground/80">An unexpected error occurred during authentication.</p>
              )}
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href="/auth/login">Try Again</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent border-card-foreground/20">
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
