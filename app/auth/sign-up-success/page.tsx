"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Mail, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SignUpSuccessPage() {
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
            <div className="mx-auto mb-4 p-3 bg-green-500/20 rounded-full w-fit">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-serif">Account Created Successfully!</CardTitle>
            <CardDescription className="text-card-foreground/80">Welcome to Deutsche Global Bank</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-md">
                <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-card-foreground font-medium">Check Your Email</p>
                <p className="text-xs text-card-foreground/80 mt-1">
                  We've sent a confirmation email to verify your account. Please click the link in the email to activate
                  your banking account.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif font-semibold text-card-foreground">What's Next?</h3>
                <ul className="text-sm text-card-foreground/80 space-y-1">
                  <li>✓ Confirm your email address</li>
                  <li>✓ Complete identity verification</li>
                  <li>✓ Access your dashboard</li>
                  <li>✓ Start banking with €0.00 balance</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href="/auth/login">Sign In to Your Account</Link>
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
