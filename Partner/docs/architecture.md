# HydroSync Architecture

## Technology Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 | React framework with App Router |
| TypeScript | Type-safe JavaScript |
| Tailwind CSS | Utility-first CSS |
| shadcn/ui | UI component library |
| Recharts | Data visualization |

## Application Structure

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                       │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                      Layouts                             ││
│  │    Root Layout  →  Dashboard Layout  →  Page            ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    Components                            ││
│  │   UI Components  │  Feature Components  │  Guards       ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    Libraries                             ││
│  │        auth.ts (RBAC)    │    utils.ts (Helpers)        ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
\`\`\`

## Authentication Flow

1. **Login** - User enters credentials and selects role
2. **Storage** - User data stored in localStorage
3. **Protection** - Routes check permissions via `canAccessRoute()`
4. **Guards** - Components wrapped with `RoleGuard` for access control

## Permission System

\`\`\`typescript
hasPermission(user, 'meters', 'read')     // Check permission
canAccessRoute(user, '/dashboard/meters') // Check route access
