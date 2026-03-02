"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { getCurrentUser, canAccessRoute, type User, ROLES } from "@/lib/auth"
import { Badge } from "@/components/ui/badge"
import { RoleGuard } from "@/components/role-guard"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser && currentUser.token) {
      // Validate token presence
      setUser(currentUser)

      // Check if user can access current route
      if (!canAccessRoute(currentUser, pathname)) {
        router.push("/dashboard")
        return
      }

      setIsAuthenticated(true)
    } else {
      localStorage.removeItem("hydrosync-user") // Clean up if invalid
      router.push("/")
    }
  }, [router, pathname])

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <RoleGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="ml-auto flex items-center space-x-4">
              <Badge variant="outline" className="hidden sm:flex">
                {user.role.name}
              </Badge>
              <span className="text-sm text-muted-foreground">Welcome back, {user.name}</span>
            </div>
          </header>
          <main className="flex-1 space-y-4 p-4 md:p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </RoleGuard>
  )
}
