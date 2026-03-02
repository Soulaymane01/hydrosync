# HydroSync Database Design

## Overview

This document provides the complete database design for HydroSync, including Entity Relationship Diagram (ERD), schema definitions, and relationships.

## Entity Relationship Diagram (ERD)

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│     Users       │         │     Roles        │         │   Permissions   │
├─────────────────┤         ├──────────────────┤         ├─────────────────┤
│ id (PK)         │         │ id (PK)          │         │ id (PK)         │
│ email           │◄───────►│ name             │◄───────►│ resource        │
│ password        │         │ description      │         │ action          │
│ firstName       │         └──────────────────┘         │ description     │
│ lastName        │                                      └─────────────────┘
│ role_id (FK)    │
│ department      │
│ phone           │
│ status          │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│     Clients     │         │      Meters      │         │     Readings    │
├─────────────────┤         ├──────────────────┤         ├─────────────────┤
│ id (PK)         │         │ id (PK)          │         │ id (PK)         │
│ client_id       │         │ meter_id         │         │ reading_id      │
│ name            │1────────N│ client_id (FK)  │1────────N│ meter_id (FK)   │
│ address         │         │ type             │         │ value           │
│ city            │         │ status           │         │ unit            │
│ region          │         │ install_date     │         │ timestamp       │
│ phone           │         │ last_reading     │         │ quality_status  │
│ email           │         │ error_status     │         └─────────────────┘
│ contact_person  │         │ model            │
│ billing_cycle   │         │ created_at       │
│ account_type    │         │ updated_at       │
│ status          │         └──────────────────┘
│ created_at      │
│ updated_at      │
└─────────────────┘

┌──────────────────┐        ┌──────────────────┐        ┌─────────────────┐
│     Invoices     │        │     Payments     │        │ Payment Methods │
├──────────────────┤        ├──────────────────┤        ├─────────────────┤
│ id (PK)          │        │ id (PK)          │        │ id (PK)         │
│ invoice_id       │        │ payment_id       │        │ method_id       │
│ client_id (FK)   │1───────N│ invoice_id (FK) │        │ name            │
│ billing_period   │        │ amount           │        │ description     │
│ due_date         │        │ paid_amount      │        │ is_active       │
│ amount_due       │        │ status           │        └─────────────────┘
│ amount_paid      │        │ method_id (FK)   │
│ status           │        │ reference        │
│ late_fees        │        │ notes            │
│ created_at       │        │ created_at       │
│ updated_at       │        │ updated_at       │
└──────────────────┘        └──────────────────┘

┌──────────────────┐        ┌──────────────────┐        ┌─────────────────┐
│   Work Orders    │        │     Assets       │        │   Maintenance   │
├──────────────────┤        ├──────────────────┤        ├─────────────────┤
│ id (PK)          │        │ id (PK)          │        │ id (PK)         │
│ work_order_id    │        │ asset_id         │        │ maintenance_id  │
│ client_id (FK)   │1───────N│ type            │        │ asset_id (FK)   │
│ assigned_to (FK) │        │ location         │        │ type            │
│ description      │        │ status           │        │ scheduled_date  │
│ priority         │        │ purchase_date    │        │ completed_date  │
│ status           │        │ warranty_end     │        │ cost            │
│ scheduled_date   │        │ created_at       │        │ notes           │
│ completed_date   │        │ updated_at       │        │ created_at      │
│ notes            │        └──────────────────┘        │ updated_at      │
│ created_at       │                                    └─────────────────┘
│ updated_at       │
└──────────────────┘

┌──────────────────┐        ┌──────────────────┐        ┌─────────────────┐
│ Notifications    │        │  Quality Data    │        │  Environmental  │
├──────────────────┤        ├──────────────────┤        ├─────────────────┤
│ id (PK)          │        │ id (PK)          │        │ id (PK)         │
│ notification_id  │        │ quality_id       │        │ env_id          │
│ title            │        │ meter_id (FK)    │        │ type            │
│ message          │        │ ph_level         │        │ value           │
│ type             │        │ turbidity        │        │ unit            │
│ recipient_type   │        │ chlorine         │        │ timestamp       │
│ recipient_id (FK)│        │ hardness         │        │ target_value    │
│ delivery_method  │        │ timestamp        │        │ status          │
│ status           │        │ created_at       │        │ created_at      │
│ sent_at          │        └──────────────────┘        │ updated_at      │
│ created_at       │                                    └─────────────────┘
│ updated_at       │
└──────────────────┘

┌──────────────────┐        ┌──────────────────┐
│  Billing Cycles  │        │ Regional Zones   │
├──────────────────┤        ├──────────────────┤
│ id (PK)          │        │ id (PK)          │
│ cycle_id         │        │ zone_id          │
│ name             │        │ name             │
│ frequency        │        │ description      │
│ day_of_month     │        │ total_meters     │
│ is_active        │        │ total_clients    │
│ created_at       │        │ created_at       │
│ updated_at       │        │ updated_at       │
└──────────────────┘        └──────────────────┘
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  role_id UUID NOT NULL REFERENCES roles(id),
  department VARCHAR(100),
  phone VARCHAR(20),
  status VARCHAR(50) DEFAULT 'active', -- active, inactive, suspended
  avatar_url TEXT,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_users_status ON users(status);
```

### Roles Table
```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL, -- admin, operator, technician, etc.
  description TEXT,
  permissions JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (name, description) VALUES
  ('admin', 'Full system access'),
  ('operator', 'System monitoring and operations'),
  ('technician', 'Field operations and maintenance'),
  ('customer_service', 'Customer support and billing'),
  ('viewer', 'Read-only access'),
  ('manager', 'Operations management');
```

### Permissions Table
```sql
CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  resource VARCHAR(100) NOT NULL, -- dashboard, clients, meters, etc.
  action VARCHAR(50) NOT NULL, -- read, create, update, delete
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_permissions_role_resource_action 
ON permissions(role_id, resource, action);
```

### Clients Table
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  city VARCHAR(100),
  region_id UUID REFERENCES regional_zones(id),
  phone VARCHAR(20),
  email VARCHAR(255),
  contact_person VARCHAR(255),
  account_type VARCHAR(50), -- residential, commercial, industrial
  billing_cycle_id UUID REFERENCES billing_cycles(id),
  status VARCHAR(50) DEFAULT 'active', -- active, inactive, suspended
  balance DECIMAL(12, 2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_clients_client_id ON clients(client_id);
CREATE INDEX idx_clients_region_id ON clients(region_id);
CREATE INDEX idx_clients_status ON clients(status);
```

### Meters Table
```sql
CREATE TABLE meters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meter_id VARCHAR(100) UNIQUE NOT NULL,
  client_id UUID NOT NULL REFERENCES clients(id),
  type VARCHAR(50) NOT NULL, -- smart, analog, hybrid
  model VARCHAR(100),
  manufacturer VARCHAR(100),
  install_date DATE NOT NULL,
  last_reading DECIMAL(12, 3),
  last_reading_date TIMESTAMP,
  error_status VARCHAR(50), -- none, low_battery, comm_failure, error
  status VARCHAR(50) DEFAULT 'active', -- active, inactive, error
  firmware_version VARCHAR(50),
  serial_number VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_meters_meter_id ON meters(meter_id);
CREATE INDEX idx_meters_client_id ON meters(client_id);
CREATE INDEX idx_meters_status ON meters(status);
```

### Readings Table
```sql
CREATE TABLE readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meter_id UUID NOT NULL REFERENCES meters(id),
  value DECIMAL(12, 3) NOT NULL,
  unit VARCHAR(20) DEFAULT 'm3', -- cubic meters or liters
  timestamp TIMESTAMP NOT NULL,
  quality_status VARCHAR(50) DEFAULT 'good', -- good, warning, error
  data_type VARCHAR(50), -- actual, estimated, manual
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_readings_meter_id ON readings(meter_id);
CREATE INDEX idx_readings_timestamp ON readings(timestamp);
CREATE INDEX idx_readings_meter_timestamp ON readings(meter_id, timestamp DESC);
```

### Invoices Table
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id VARCHAR(50) UNIQUE NOT NULL,
  client_id UUID NOT NULL REFERENCES clients(id),
  billing_period_start DATE NOT NULL,
  billing_period_end DATE NOT NULL,
  due_date DATE NOT NULL,
  amount_due DECIMAL(12, 2) NOT NULL,
  amount_paid DECIMAL(12, 2) DEFAULT 0.00,
  late_fees DECIMAL(12, 2) DEFAULT 0.00,
  status VARCHAR(50) DEFAULT 'unpaid', -- unpaid, partial, paid, overdue
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_invoices_invoice_id ON invoices(invoice_id);
CREATE INDEX idx_invoices_client_id ON invoices(client_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);
```

### Payments Table
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id VARCHAR(50) UNIQUE NOT NULL,
  invoice_id UUID NOT NULL REFERENCES invoices(id),
  amount DECIMAL(12, 2) NOT NULL,
  payment_method_id UUID NOT NULL REFERENCES payment_methods(id),
  reference VARCHAR(255),
  notes TEXT,
  status VARCHAR(50) DEFAULT 'completed', -- pending, completed, failed, cancelled
  processed_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_payment_id ON payments(payment_id);
CREATE INDEX idx_payments_invoice_id ON payments(invoice_id);
CREATE INDEX idx_payments_status ON payments(status);
```

### Payment Methods Table
```sql
CREATE TABLE payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL, -- cash, card, bank_transfer, check
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO payment_methods (name, description) VALUES
  ('cash', 'Cash payment'),
  ('card', 'Credit/Debit card'),
  ('bank_transfer', 'Bank transfer'),
  ('check', 'Check payment'),
  ('online', 'Online payment');
```

### Work Orders Table
```sql
CREATE TABLE work_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_order_id VARCHAR(50) UNIQUE NOT NULL,
  client_id UUID NOT NULL REFERENCES clients(id),
  assigned_to UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(50) DEFAULT 'medium', -- low, medium, high, critical
  status VARCHAR(50) DEFAULT 'open', -- open, in_progress, completed, cancelled
  scheduled_date TIMESTAMP,
  completed_date TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_work_orders_work_order_id ON work_orders(work_order_id);
CREATE INDEX idx_work_orders_client_id ON work_orders(client_id);
CREATE INDEX idx_work_orders_assigned_to ON work_orders(assigned_to);
CREATE INDEX idx_work_orders_status ON work_orders(status);
```

### Assets Table
```sql
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id VARCHAR(100) UNIQUE NOT NULL,
  type VARCHAR(100) NOT NULL, -- pump, tank, pipe, valve, etc.
  location VARCHAR(255),
  region_id UUID REFERENCES regional_zones(id),
  status VARCHAR(50) DEFAULT 'active', -- active, inactive, maintenance, decommissioned
  purchase_date DATE,
  warranty_end DATE,
  model VARCHAR(100),
  manufacturer VARCHAR(100),
  serial_number VARCHAR(100),
  cost DECIMAL(12, 2),
  next_maintenance_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_assets_asset_id ON assets(asset_id);
CREATE INDEX idx_assets_type ON assets(type);
CREATE INDEX idx_assets_status ON assets(status);
```

### Maintenance Table
```sql
CREATE TABLE maintenance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  maintenance_id VARCHAR(50) UNIQUE NOT NULL,
  asset_id UUID NOT NULL REFERENCES assets(id),
  type VARCHAR(50) NOT NULL, -- preventive, corrective, emergency
  scheduled_date TIMESTAMP,
  completed_date TIMESTAMP,
  cost DECIMAL(12, 2),
  performed_by UUID REFERENCES users(id),
  notes TEXT,
  status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, in_progress, completed, cancelled
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_maintenance_maintenance_id ON maintenance(maintenance_id);
CREATE INDEX idx_maintenance_asset_id ON maintenance(asset_id);
```

### Notifications Table
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50), -- alert, info, warning, error
  recipient_type VARCHAR(50), -- user, role, region, all
  recipient_id UUID,
  delivery_method VARCHAR(50), -- email, sms, in_app
  status VARCHAR(50) DEFAULT 'pending', -- pending, sent, delivered, failed
  sent_at TIMESTAMP,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_notification_id ON notifications(notification_id);
CREATE INDEX idx_notifications_recipient_id ON notifications(recipient_id);
CREATE INDEX idx_notifications_status ON notifications(status);
```

### Quality Data Table
```sql
CREATE TABLE quality_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meter_id UUID NOT NULL REFERENCES meters(id),
  ph_level DECIMAL(4, 2),
  turbidity DECIMAL(8, 2),
  chlorine DECIMAL(8, 2),
  hardness DECIMAL(8, 2),
  temperature DECIMAL(5, 2),
  timestamp TIMESTAMP NOT NULL,
  status VARCHAR(50) DEFAULT 'good', -- good, warning, critical
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_quality_data_meter_id ON quality_data(meter_id);
CREATE INDEX idx_quality_data_timestamp ON quality_data(timestamp);
```

### Environmental Data Table
```sql
CREATE TABLE environmental_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(100) NOT NULL, -- water_loss, carbon_emissions, sustainability_goal
  value DECIMAL(12, 2) NOT NULL,
  unit VARCHAR(50),
  target_value DECIMAL(12, 2),
  status VARCHAR(50) DEFAULT 'normal', -- normal, warning, critical
  region_id UUID REFERENCES regional_zones(id),
  timestamp TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_environmental_data_type ON environmental_data(type);
CREATE INDEX idx_environmental_data_timestamp ON environmental_data(timestamp);
```

### Billing Cycles Table
```sql
CREATE TABLE billing_cycles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  frequency VARCHAR(50) NOT NULL, -- monthly, quarterly, annually
  day_of_month INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO billing_cycles (name, frequency, day_of_month) VALUES
  ('Monthly - 1st', 'monthly', 1),
  ('Monthly - 15th', 'monthly', 15),
  ('Quarterly', 'quarterly', 1);
```

### Regional Zones Table
```sql
CREATE TABLE regional_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  total_clients INTEGER DEFAULT 0,
  total_meters INTEGER DEFAULT 0,
  average_usage DECIMAL(12, 3),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Relationships Summary

| Table | Foreign Keys | Relationships |
|-------|--------------|---------------|
| users | role_id → roles | Many Users per Role |
| permissions | role_id → roles | Many Permissions per Role |
| clients | region_id → regional_zones, billing_cycle_id → billing_cycles | Many Clients per Region/Cycle |
| meters | client_id → clients | Many Meters per Client |
| readings | meter_id → meters | Many Readings per Meter |
| invoices | client_id → clients | Many Invoices per Client |
| payments | invoice_id → invoices, payment_method_id → payment_methods, processed_by → users | Many Payments per Invoice |
| work_orders | client_id → clients, assigned_to → users | Many Work Orders per Client/User |
| assets | region_id → regional_zones | Many Assets per Region |
| maintenance | asset_id → assets, performed_by → users | Many Maintenance Records per Asset |
| quality_data | meter_id → meters | Many Quality Records per Meter |
| environmental_data | region_id → regional_zones | Many Environmental Records per Region |

## Constraints and Business Rules

1. **User Validation**: Email must be unique and properly formatted
2. **Meter Association**: Each meter must be associated with exactly one client
3. **Invoice Management**: Amount_paid ≤ amount_due + late_fees
4. **Payment Processing**: Payments can only be made for invoices
5. **Work Order Assignment**: Work orders can be assigned to users with technician or higher role
6. **Asset Tracking**: Assets must belong to at least one region
7. **Reading Quality**: All readings must have timestamps
8. **Billing Cycles**: Each client must have an active billing cycle
9. **Role Permissions**: Roles define what actions users can perform on resources

## Indexes for Performance

- All foreign keys have indexes
- Status fields are indexed for quick filtering
- Timestamps are indexed for date range queries
- Composite indexes on frequently queried combinations
- Partial indexes on active records for better performance

## Data Integrity

- All deletion operations use soft deletes (deleted_at field) where appropriate
- CASCADE delete for dependent records
- Triggers to update updated_at timestamps
- Referential integrity constraints enforced at database level
