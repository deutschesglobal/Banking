"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Building2, Fingerprint, Eye, Scan, Shield, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showBiometric, setShowBiometric] = useState(false)
  const [biometricStep, setBiometricStep] = useState(0)
  const router = useRouter()

  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!isSupabaseConfigured) {
      setError("Database connection not configured. Please contact administrator.")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
        },
      })
      if (error) throw error

      // Show biometric simulation
      setShowBiometric(true)
      simulateBiometricAuth()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
      setIsLoading(false)
    }
  }

  const handleDemoLogin = () => {
    setIsLoading(true)
    setShowBiometric(true)
    simulateBiometricAuth()
  }

  const simulateBiometricAuth = () => {
    const steps = [
      { icon: <Fingerprint className="h-12 w-12" />, text: "Place your finger on the sensor" },
      { icon: <Eye className="h-12 w-12" />, text: "Look into the camera for facial recognition" },
      { icon: <Scan className="h-12 w-12" />, text: "Scanning biometric data..." },
      { icon: <Shield className="h-12 w-12 text-green-500" />, text: "Authentication successful!" },
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      setBiometricStep(currentStep)
      currentStep++

      if (currentStep >= steps.length) {
        clearInterval(interval)
        setTimeout(() => {
          setShowBiometric(false)
          setIsLoading(false)
          router.push("/dashboard")
        }, 1000)
      }
    }, 1500)
  }

  const biometricSteps = [
    { icon: <Fingerprint className="h-12 w-12" />, text: "Place your finger on the sensor" },
    { icon: <Eye className="h-12 w-12" />, text: "Look into the camera for facial recognition" },
    { icon: <Scan className="h-12 w-12" />, text: "Scanning biometric data..." },
    { icon: <Shield className="h-12 w-12 text-green-500" />, text: "Authentication successful!" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-serif font-bold">Deutsche Global Bank</span>
          </div>
          <p className="text-muted-foreground">Secure Banking Access</p>
        </div>

        {!isSupabaseConfigured && (
          <Card className="mb-4 border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-amber-800">
                <AlertTriangle className="h-5 w-5" />
                <p className="text-sm">Demo Mode: Database not configured. Use demo login below.</p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="glass border-0 text-card-foreground">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif">Welcome Back</CardTitle>
            <CardDescription className="text-card-foreground/80">
              Sign in to access your banking dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-card-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/20 border-card-foreground/20 text-card-foreground placeholder:text-card-foreground/60"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-card-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background/20 border-card-foreground/20 text-card-foreground placeholder:text-card-foreground/60"
                />
              </div>

              {error && (
                <div className="p-3 bg-destructive/20 border border-destructive/30 rounded-md">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading || !isSupabaseConfigured}
              >
                {isLoading ? "Authenticating..." : "Sign In Securely"}
              </Button>

              {!isSupabaseConfigured && (
                <Button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Authenticating..." : "Demo Login"}
                </Button>
              )}

              <div className="text-center pt-4">
                <p className="text-sm text-card-foreground/80">
                  Don't have an account?{" "}
                  <Link href="/auth/sign-up" className="text-primary hover:underline font-medium">
                    Open Account
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to Home
          </Link>
        </div>
      </div>

      <Dialog open={showBiometric} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center font-serif">Biometric Authentication</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-6 py-6">
            <div className="animate-pulse">{biometricSteps[biometricStep]?.icon}</div>
            <p className="text-center text-muted-foreground">{biometricSteps[biometricStep]?.text}</p>
            <div className="flex space-x-2">
              {biometricSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index <= biometricStep ? "bg-primary" : "bg-muted"
                  } transition-colors`}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
