# API Reference

## Authentication Functions

### getCurrentUser()

\`\`\`typescript
import { getCurrentUser } from '@/lib/auth'
const user = getCurrentUser() // Returns: User | null
\`\`\`

### hasPermission()

\`\`\`typescript
import { hasPermission } from '@/lib/auth'
const canRead = hasPermission(user, 'meters', 'read') // boolean
\`\`\`

### canAccessRoute()

\`\`\`typescript
import { canAccessRoute } from '@/lib/auth'
const hasAccess = canAccessRoute(user, '/dashboard/meters') // boolean
\`\`\`

## Data Types

\`\`\`typescript
interface User {
  id: string
  name: string
  email: string
  role: UserRole
  permissions: Permission[]
  status: 'active' | 'inactive' | 'suspended'
}

interface UserRole {
  id: string
  name: string
  level: number
  permissions: Permission[]
}

interface Permission {
  id: string
  resource: string
  action: string
}
\`\`\`

## RoleGuard Component

\`\`\`tsx
import { RoleGuard } from '@/components/role-guard'

<RoleGuard requiredResource="meters" requiredAction="write">
  <ProtectedContent />
</RoleGuard>
