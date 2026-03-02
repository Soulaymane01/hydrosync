# Role Management & Permissions

## Available Roles

| Role | Level | Description |
|------|-------|-------------|
| System Administrator | 5 | Full system access |
| Operations Manager | 4 | Operations oversight |
| Field Technician | 3 | Field operations |
| System Operator | 3 | System monitoring |
| Customer Service | 2 | Customer support |
| Read-Only User | 1 | View-only access |

## Permission Matrix

| Feature | Admin | Manager | Technician | Operator | CS | Viewer |
|---------|-------|---------|------------|----------|----|----- --|
| Dashboard | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Clients | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| Meters | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Work Orders | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Billing | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| Analytics | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Users | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

## Managing Users (Admin)

1. Navigate to **System > User Management**
2. Click **Add User**
3. Fill in details and assign role
4. Click **Save**

## Security Best Practices

1. Assign minimum necessary permissions
2. Review user access quarterly
3. Remove access immediately when employees leave
