"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Import api locally or at top level. Importing at top level for this file.
      // Dynamic import to avoid issues if api.ts has issues, but top level is standard.
      const api = (await import("@/lib/api")).default

      const response = await api.post("/auth/login", { email, password })

      if (response.data.success) {
        const { token, refresh, user } = response.data

        // Transform backend user to frontend expected format
        const frontendUser = {
          ...user,
          token, // Store token with user for simple retrieval in this app
          refresh,
          loggedIn: true,
          status: "active"
        }

        localStorage.setItem("hydrosync-user", JSON.stringify(frontendUser))
        router.push("/dashboard")
      }
    } catch (err: any) {
      console.error("Login failed", err)
      setError(err.response?.data?.message || "Invalid credentials. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-16">
              <Image
                src="/images/hydrosync-logo.png"
                alt="HydroSync Logo"
                width={96}
                height={64}
                className="object-contain"
                priority
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Welcome to HydroSync</CardTitle>
          <CardDescription>Water Provider Management System</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                {typeof error === 'object' ? JSON.stringify(error) : error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@hydrosync.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                disabled={isLoading}
              />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
            <div className="text-center">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot your password?
              </a>
            </div>
          </form>

          {/* Demo Credentials Hint */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Login:</h4>
            <div className="text-xs text-gray-600">
              Use your registered credentials.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
