"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    country: "Germany",
    postalCode: "",
    accountType: "checking",
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            date_of_birth: formData.dateOfBirth,
            address: formData.address,
            city: formData.city,
            country: formData.country,
            postal_code: formData.postalCode,
            account_type: formData.accountType,
          },
        },
      })

      if (error) throw error

      // Create user profile and bank account will be handled by database triggers
      router.push("/auth/sign-up-success")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-serif font-bold">Deutsche Global Bank</span>
          </div>
          <p className="text-muted-foreground">Open Your Free Banking Account</p>
        </div>

        <Card className="glass border-0 text-card-foreground">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif">Create Your Account</CardTitle>
            <CardDescription className="text-card-foreground/80">
              Join millions of customers who trust Deutsche Global Bank
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-serif font-semibold text-card-foreground">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-card-foreground">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                      className="bg-background/20 border-card-foreground/20 text-card-foreground placeholder:text-card-foreground/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-card-foreground">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                      className="bg-background/20 border-card-foreground/20 text-card-foreground placeholder:text-card-foreground/60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-card-foreground">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="bg-background/20 border-card-foreground/20 text-card-foreground placeholder:text-card-foreground/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-card-foreground">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+49 123 456 7890"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                      className="bg-background/20 border-card-foreground/20 text-card-foreground placeholder:text-card-foreground/60"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-card-foreground">
                    Date of Birth
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    required
                    className="bg-background/20 border-card-foreground/20 text-card-foreground"
                  />
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-serif font-semibold text-card-foreground">Address Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-card-foreground">
                    Street Address
                  </Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                    className="bg-background/20 border-card-foreground/20 text-card-foreground placeholder:text-card-foreground/60"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-card-foreground">
                      City
                    </Label>
                    <Input
                      id="city"
                      placeholder="Frankfurt"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                      className="bg-background/20 border-card-foreground/20 text-card-foreground placeholder:text-card-foreground/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode" className="text-card-foreground">
                      Postal Code
                    </Label>
                    <Input
                      id="postalCode"
                      placeholder="60311"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      required
                      className="bg-background/20 border-card-foreground/20 text-card-foreground placeholder:text-card-foreground/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-card-foreground">
                      Country
                    </Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger className="bg-background/20 border-card-foreground/20 text-card-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="Austria">Austria</SelectItem>
                        <SelectItem value="Switzerland">Switzerland</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-serif font-semibold text-card-foreground">Account Setup</h3>
                <div className="space-y-2">
                  <Label htmlFor="accountType" className="text-card-foreground">
                    Account Type
                  </Label>
                  <Select
                    value={formData.accountType}
                    onValueChange={(value) => handleInputChange("accountType", value)}
                  >
                    <SelectTrigger className="bg-background/20 border-card-foreground/20 text-card-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Checking Account</SelectItem>
                      <SelectItem value="savings">Savings Account</SelectItem>
                      <SelectItem value="business">Business Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-card-foreground">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a secure password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                      className="bg-background/20 border-card-foreground/20 text-card-foreground placeholder:text-card-foreground/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-card-foreground">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      required
                      className="bg-background/20 border-card-foreground/20 text-card-foreground placeholder:text-card-foreground/60"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-destructive/20 border border-destructive/30 rounded-md">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="bg-primary/10 p-4 rounded-md">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">Account Benefits</p>
                    <ul className="text-xs text-card-foreground/80 mt-1 space-y-1">
                      <li>• Starting balance: €0.00</li>
                      <li>• No monthly fees</li>
                      <li>• Free debit card</li>
                      <li>• 24/7 online banking</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Open Account"}
              </Button>

              <div className="text-center pt-4">
                <p className="text-sm text-card-foreground/80">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-primary hover:underline font-medium">
                    Sign In
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
    </div>
  )
}
