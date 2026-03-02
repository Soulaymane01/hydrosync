"use client"

import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Bell,
  CreditCard,
  Home,
  LogOut,
  Settings,
  Users,
  Activity,
  FileText,
  User,
  MapPin,
  Wrench,
  TestTube,
  BarChart3,
  Smartphone,
  HelpCircle,
  ChevronRight,
  Globe,
  Calculator,
  Package,
  Leaf,
  Shield,
  AlertTriangle,
  UserCog,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { getCurrentUser, hasPermission, type User as AuthUser } from "@/lib/auth"
import Image from "next/image"

const dashboardItems = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: Home,
    resource: "dashboard",
    action: "read",
  },
  {
    title: "Clients",
    url: "/dashboard/clients",
    icon: Users,
    resource: "clients",
    action: "read",
  },
  {
    title: "Smart Meters",
    url: "/dashboard/meters",
    icon: Activity,
    resource: "meters",
    action: "read",
  },
  {
    title: "Work Orders",
    url: "/dashboard/work-orders",
    icon: Wrench,
    resource: "work_orders",
    action: "read",
  },
  {
    title: "Network Map",
    url: "/dashboard/map",
    icon: MapPin,
    resource: "map",
    action: "read",
  },
  {
    title: "Water Quality",
    url: "/dashboard/quality",
    icon: TestTube,
    resource: "quality",
    action: "read",
  },
  {
    title: "Revenue",
    url: "/dashboard/revenue",
    icon: CreditCard,
    resource: "revenue",
    action: "read",
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: FileText,
    resource: "reports",
    action: "read",
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
    resource: "analytics",
    action: "read",
  },
  {
    title: "Field Operations",
    url: "/dashboard/field",
    icon: Smartphone,
    resource: "field",
    action: "read",
  },
]

const businessItems = [
  {
    title: "Customer Portal",
    url: "/dashboard/customer-portal",
    icon: Globe,
    resource: "customer_portal",
    action: "read",
  },
  {
    title: "Advanced Billing",
    url: "/dashboard/billing",
    icon: Calculator,
    resource: "billing",
    action: "read",
  },
  {
    title: "Asset Management",
    url: "/dashboard/assets",
    icon: Package,
    resource: "assets",
    action: "read",
  },
  {
    title: "Environmental",
    url: "/dashboard/environmental",
    icon: Leaf,
    resource: "environmental",
    action: "read",
  },
  {
    title: "Inventory",
    url: "/dashboard/inventory",
    icon: Package,
    resource: "inventory",
    action: "read",
  },
  {
    title: "Compliance",
    url: "/dashboard/compliance",
    icon: Shield,
    resource: "compliance",
    action: "read",
  },
  {
    title: "Emergency Response",
    url: "/dashboard/emergency",
    icon: AlertTriangle,
    resource: "emergency",
    action: "read",
  },
]

const systemItems = [
  {
    title: "User Management",
    url: "/dashboard/users",
    icon: UserCog,
    resource: "users",
    action: "read",
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: Bell,
    resource: "notifications",
    action: "read",
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    resource: "settings",
    action: "read",
  },
  {
    title: "Help & Support",
    url: "/dashboard/help",
    icon: HelpCircle,
    resource: "help",
    action: "read",
  },
  {
    title: "Account",
    url: "/dashboard/account",
    icon: User,
    resource: "account",
    action: "read",
  },
]

export function AppSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }, [])

  const handleLogout = async () => {
    try {
      const api = (await import("@/lib/api")).default
      await api.post("/auth/logout")
    } catch (e) {
      console.error("Logout failed", e)
    } finally {
      localStorage.removeItem("hydrosync-user")
      router.push("/")
    }
  }

  const filterItemsByPermission = (items: any[]) => {
    if (!user) return []
    return items.filter((item) => hasPermission(user, item.resource, item.action))
  }

  const visibleDashboardItems = filterItemsByPermission(dashboardItems)
  const visibleBusinessItems = filterItemsByPermission(businessItems)
  const visibleSystemItems = filterItemsByPermission(systemItems)

  const isDashboardActive = visibleDashboardItems.some((item) => pathname === item.url)
  const isBusinessActive = visibleBusinessItems.some((item) => pathname === item.url)

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-3 px-4 py-3">
          <div className="relative w-8 h-8">
            <Image
              src="/images/hydrosync-logo.png"
              alt="HydroSync Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold">HydroSync</h2>
            <p className="text-xs text-muted-foreground">Water Management</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleDashboardItems.length > 0 && (
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="w-full" isActive={isDashboardActive}>
                        <Home />
                        <span>Operations Dashboard</span>
                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {visibleDashboardItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild isActive={pathname === item.url}>
                              <a href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )}

              {visibleBusinessItems.length > 0 && (
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="w-full" isActive={isBusinessActive}>
                        <BarChart3 />
                        <span>Business Management</span>
                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {visibleBusinessItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild isActive={pathname === item.url}>
                              <a href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {visibleSystemItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>System</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {visibleSystemItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          {user && (
            <div className="mb-3 p-2 bg-muted rounded-lg">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.role.name}</p>
            </div>
          )}
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
