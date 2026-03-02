"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, type User } from "@/lib/auth"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ShieldX } from "lucide-react"

interface RoleGuardProps {
  children: React.ReactNode
  requiredResource?: string
  requiredAction?: string
  fallback?: React.ReactNode
}

export function RoleGuard({ children, requiredResource, requiredAction, fallback }: RoleGuardProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)

    if (!currentUser) {
      router.push("/")
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // If specific permissions are required, check them
  if (requiredResource && requiredAction) {
    const hasPermission = user.permissions.some(
      (permission) =>
        (permission.resource === requiredResource || permission.resource === "*") &&
        (permission.action === requiredAction || permission.action === "*"),
    )

    if (!hasPermission && user.role.id !== "admin") {
      return (
        fallback || (
          <div className="flex items-center justify-center min-h-[400px]">
            <Alert className="max-w-md">
              <ShieldX className="h-4 w-4" />
              <AlertDescription className="mt-2">
                You don't have permission to access this resource.
                <div className="mt-4">
                  <Button variant="outline" onClick={() => router.back()}>
                    Go Back
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )
      )
    }
  }

  return <>{children}</>
}
