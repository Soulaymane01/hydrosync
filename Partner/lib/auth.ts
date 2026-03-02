export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department?: string
  avatar?: string
  permissions: Permission[]
  lastLogin?: string
  status: "active" | "inactive" | "suspended"
  token?: string
  refresh?: string
}

export interface UserRole {
  id: string
  name: string
  level: number
  description: string
  permissions: Permission[]
}

export interface Permission {
  id: string
  name: string
  resource: string
  action: string
  description: string
}

export const ROLES: UserRole[] = [
  {
    id: "admin",
    name: "System Administrator",
    level: 5,
    description: "Full system access and user management",
    permissions: [
      { id: "all", name: "All Permissions", resource: "*", action: "*", description: "Complete system access" },
    ],
  },
  {
    id: "manager",
    name: "Operations Manager",
    level: 4,
    description: "Manage operations, reports, and team oversight",
    permissions: [
      {
        id: "view_dashboard",
        name: "View Dashboard",
        resource: "dashboard",
        action: "read",
        description: "Access main dashboard",
      },
      {
        id: "manage_work_orders",
        name: "Manage Work Orders",
        resource: "work_orders",
        action: "write",
        description: "Create and manage work orders",
      },
      {
        id: "view_reports",
        name: "View Reports",
        resource: "reports",
        action: "read",
        description: "Access all reports",
      },
      {
        id: "manage_billing",
        name: "Manage Billing",
        resource: "billing",
        action: "write",
        description: "Handle billing operations",
      },
      {
        id: "view_analytics",
        name: "View Analytics",
        resource: "analytics",
        action: "read",
        description: "Access analytics dashboard",
      },
    ],
  },
  {
    id: "technician",
    name: "Field Technician",
    level: 3,
    description: "Field operations and maintenance tasks",
    permissions: [
      {
        id: "view_dashboard",
        name: "View Dashboard",
        resource: "dashboard",
        action: "read",
        description: "Access main dashboard",
      },
      {
        id: "view_work_orders",
        name: "View Work Orders",
        resource: "work_orders",
        action: "read",
        description: "View assigned work orders",
      },
      {
        id: "update_work_orders",
        name: "Update Work Orders",
        resource: "work_orders",
        action: "update",
        description: "Update work order status",
      },
      {
        id: "view_meters",
        name: "View Meters",
        resource: "meters",
        action: "read",
        description: "Access meter information",
      },
      {
        id: "field_operations",
        name: "Field Operations",
        resource: "field",
        action: "write",
        description: "Access field operations tools",
      },
      {
        id: "view_assets",
        name: "View Assets",
        resource: "assets",
        action: "read",
        description: "View asset information",
      },
    ],
  },
  {
    id: "operator",
    name: "System Operator",
    level: 3,
    description: "Monitor and control water systems",
    permissions: [
      {
        id: "view_dashboard",
        name: "View Dashboard",
        resource: "dashboard",
        action: "read",
        description: "Access main dashboard",
      },
      {
        id: "view_meters",
        name: "View Meters",
        resource: "meters",
        action: "read",
        description: "Monitor meter readings",
      },
      {
        id: "view_quality",
        name: "View Quality",
        resource: "quality",
        action: "read",
        description: "Monitor water quality",
      },
      {
        id: "emergency_response",
        name: "Emergency Response",
        resource: "emergency",
        action: "write",
        description: "Handle emergency situations",
      },
      { id: "view_map", name: "View Network Map", resource: "map", action: "read", description: "Access network map" },
    ],
  },
  {
    id: "customer_service",
    name: "Customer Service",
    level: 2,
    description: "Handle customer inquiries and support",
    permissions: [
      {
        id: "view_clients",
        name: "View Clients",
        resource: "clients",
        action: "read",
        description: "Access customer information",
      },
      {
        id: "manage_billing",
        name: "Manage Billing",
        resource: "billing",
        action: "write",
        description: "Handle customer billing",
      },
      {
        id: "customer_portal",
        name: "Customer Portal",
        resource: "customer_portal",
        action: "write",
        description: "Manage customer portal",
      },
      {
        id: "view_revenue",
        name: "View Revenue",
        resource: "revenue",
        action: "read",
        description: "View payment information",
      },
    ],
  },
  {
    id: "viewer",
    name: "Read-Only User",
    level: 1,
    description: "View-only access to basic information",
    permissions: [
      {
        id: "view_dashboard",
        name: "View Dashboard",
        resource: "dashboard",
        action: "read",
        description: "Access main dashboard",
      },
      {
        id: "view_reports",
        name: "View Reports",
        resource: "reports",
        action: "read",
        description: "View basic reports",
      },
    ],
  },
]

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null

  const userData = localStorage.getItem("hydrosync-user")
  if (!userData) return null

  try {
    const user = JSON.parse(userData)
    return user
  } catch {
    return null
  }
}

export const hasPermission = (user: User | null, resource: string, action: string): boolean => {
  if (!user) return false

  // Admin has all permissions
  if (user.role.id === "admin") return true

  return user.permissions.some(
    (permission) =>
      (permission.resource === resource || permission.resource === "*") &&
      (permission.action === action || permission.action === "*"),
  )
}

export const canAccessRoute = (user: User | null, route: string): boolean => {
  if (!user) return false

  const routePermissions: Record<string, { resource: string; action: string }> = {
    "/dashboard": { resource: "dashboard", action: "read" },
    "/dashboard/clients": { resource: "clients", action: "read" },
    "/dashboard/meters": { resource: "meters", action: "read" },
    "/dashboard/work-orders": { resource: "work_orders", action: "read" },
    "/dashboard/revenue": { resource: "revenue", action: "read" },
    "/dashboard/billing": { resource: "billing", action: "read" },
    "/dashboard/analytics": { resource: "analytics", action: "read" },
    "/dashboard/field": { resource: "field", action: "read" },
    "/dashboard/quality": { resource: "quality", action: "read" },
    "/dashboard/emergency": { resource: "emergency", action: "read" },
    "/dashboard/assets": { resource: "assets", action: "read" },
    "/dashboard/inventory": { resource: "inventory", action: "read" },
    "/dashboard/compliance": { resource: "compliance", action: "read" },
    "/dashboard/environmental": { resource: "environmental", action: "read" },
    "/dashboard/customer-portal": { resource: "customer_portal", action: "read" },
    "/dashboard/users": { resource: "users", action: "read" },
  }

  const permission = routePermissions[route]
  if (!permission) return true // Allow access to routes not in the list

  return hasPermission(user, permission.resource, permission.action)
}
