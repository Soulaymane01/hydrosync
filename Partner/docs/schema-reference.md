# HydroSync Database Schema Reference

## Quick Table List

| Table | Purpose | Records | Key Fields |
|-------|---------|---------|-----------|
| users | System users and staff | Variable | id, email, role_id |
| roles | User roles and permissions | ~6 | id, name |
| permissions | Fine-grained access control | ~30-50 | id, role_id, resource, action |
| clients | Water utility customers | Thousands | id, client_id, name, region_id |
| meters | Water measurement devices | Tens of thousands | id, meter_id, client_id, status |
| readings | Individual meter readings | Millions | id, meter_id, value, timestamp |
| invoices | Billing documents | Hundreds of thousands | id, invoice_id, client_id, status |
| payments | Payment transactions | Hundreds of thousands | id, payment_id, invoice_id |
| payment_methods | Payment options | ~5-10 | id, name |
| work_orders | Field service requests | Tens of thousands | id, work_order_id, client_id, status |
| assets | Infrastructure assets | Hundreds | id, asset_id, type, status |
| maintenance | Maintenance records | Thousands | id, maintenance_id, asset_id |
| notifications | System notifications | Millions | id, notification_id, recipient_id |
| quality_data | Water quality measurements | Millions | id, meter_id, timestamp |
| environmental_data | Environmental metrics | Thousands | id, type, timestamp |
| billing_cycles | Billing schedules | ~5-10 | id, name, frequency |
| regional_zones | Geographic regions | Tens | id, name |

## Table Details

### users
**Purpose**: Store user accounts and authentication data

| Column | Type | Constraints | Notes |
|--------|------|-----------|-------|
| id | UUID | PRIMARY KEY | Generated UUID |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Login identifier |
| password | VARCHAR(255) | NOT NULL | Bcrypt hashed |
| firstName | VARCHAR(100) | NOT NULL | User first name |
| lastName | VARCHAR(100) | NOT NULL | User last name |
| role_id | UUID | FOREIGN KEY → roles | User role assignment |
| department | VARCHAR(100) | | Department/team |
| phone | VARCHAR(20) | | Contact number |
| status | VARCHAR(50) | DEFAULT 'active' | active, inactive, suspended |
| avatar_url | TEXT | | Profile picture URL |
| last_login | TIMESTAMP | | Last login time |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Created time |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last updated |
| deleted_at | TIMESTAMP | | Soft delete |

**Indexes**: email, role_id, status

**Sample Data**:
```sql
INSERT INTO users (id, email, firstName, lastName, role_id, status)
VALUES ('123e4567-e89b-12d3-a456-426614174000', 'admin@hydrosync.com', 'Admin', 'User', 'role-id-admin', 'active');
```

---

### clients
**Purpose**: Store customer information and account details

| Column | Type | Constraints | Notes |
|--------|------|-----------|-------|
| id | UUID | PRIMARY KEY | Generated UUID |
| client_id | VARCHAR(50) | UNIQUE, NOT NULL | Customer ID (e.g., C-001) |
| name | VARCHAR(255) | NOT NULL | Customer name |
| address | VARCHAR(500) | NOT NULL | Street address |
| city | VARCHAR(100) | | City |
| region_id | UUID | FOREIGN KEY → regional_zones | Service region |
| phone | VARCHAR(20) | | Contact phone |
| email | VARCHAR(255) | | Contact email |
| contact_person | VARCHAR(255) | | Primary contact name |
| account_type | VARCHAR(50) | | residential, commercial, industrial |
| billing_cycle_id | UUID | FOREIGN KEY → billing_cycles | Billing schedule |
| status | VARCHAR(50) | DEFAULT 'active' | active, inactive, suspended |
| balance | DECIMAL(12,2) | DEFAULT 0.00 | Account balance |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| deleted_at | TIMESTAMP | | Soft delete |

**Indexes**: client_id, region_id, status

**Sample Data**:
```sql
INSERT INTO clients (client_id, name, address, city, account_type, status, balance)
VALUES ('C-001', 'Smith Residence', '123 Oak Street', 'Springfield', 'residential', 'active', 0.00);
```

---

### meters
**Purpose**: Track water meter devices and their status

| Column | Type | Constraints | Notes |
|--------|------|-----------|-------|
| id | UUID | PRIMARY KEY | Generated UUID |
| meter_id | VARCHAR(100) | UNIQUE, NOT NULL | Device ID (e.g., M-001) |
| client_id | UUID | FOREIGN KEY → clients | Associated customer |
| type | VARCHAR(50) | NOT NULL | smart, analog, hybrid |
| model | VARCHAR(100) | | Meter model |
| manufacturer | VARCHAR(100) | | Manufacturer name |
| install_date | DATE | NOT NULL | Installation date |
| last_reading | DECIMAL(12,3) | | Last recorded value |
| last_reading_date | TIMESTAMP | | Time of last reading |
| error_status | VARCHAR(50) | | Error description |
| status | VARCHAR(50) | DEFAULT 'active' | active, inactive, error |
| firmware_version | VARCHAR(50) | | Device firmware |
| serial_number | VARCHAR(100) | | Device serial |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |

**Indexes**: meter_id, client_id, status

**Sample Data**:
```sql
INSERT INTO meters (meter_id, client_id, type, install_date, status)
VALUES ('M-001', 'client-uuid', 'smart', '2023-01-15', 'active');
```

---

### readings
**Purpose**: Store water usage readings from meters

| Column | Type | Constraints | Notes |
|--------|------|-----------|-------|
| id | UUID | PRIMARY KEY | Generated UUID |
| meter_id | UUID | FOREIGN KEY → meters | Source meter |
| value | DECIMAL(12,3) | NOT NULL | Reading value (m³) |
| unit | VARCHAR(20) | DEFAULT 'm3' | Measurement unit |
| timestamp | TIMESTAMP | NOT NULL | Reading time |
| quality_status | VARCHAR(50) | DEFAULT 'good' | good, warning, error |
| data_type | VARCHAR(50) | DEFAULT 'actual' | actual, estimated, manual |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |

**Indexes**: meter_id, timestamp, (meter_id, timestamp DESC)

**Sample Data**:
```sql
INSERT INTO readings (meter_id, value, timestamp, quality_status)
VALUES ('meter-uuid', 1250.500, '2024-01-15 10:30:00', 'good');
```

---

### invoices
**Purpose**: Track customer billing documents

| Column | Type | Constraints | Notes |
|--------|------|-----------|-------|
| id | UUID | PRIMARY KEY | Generated UUID |
| invoice_id | VARCHAR(50) | UNIQUE, NOT NULL | Invoice number |
| client_id | UUID | FOREIGN KEY → clients | Customer |
| billing_period_start | DATE | NOT NULL | Period start |
| billing_period_end | DATE | NOT NULL | Period end |
| due_date | DATE | NOT NULL | Payment deadline |
| amount_due | DECIMAL(12,2) | NOT NULL | Total due |
| amount_paid | DECIMAL(12,2) | DEFAULT 0.00 | Paid amount |
| late_fees | DECIMAL(12,2) | DEFAULT 0.00 | Penalty fees |
| status | VARCHAR(50) | DEFAULT 'unpaid' | unpaid, partial, paid, overdue |
| notes | TEXT | | Notes or comments |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |

**Indexes**: invoice_id, client_id, status, due_date

**Sample Data**:
```sql
INSERT INTO invoices (invoice_id, client_id, billing_period_start, billing_period_end, due_date, amount_due, status)
VALUES ('INV-001', 'client-uuid', '2024-01-01', '2024-01-31', '2024-02-10', 125.50, 'unpaid');
```

---

### payments
**Purpose**: Record payment transactions

| Column | Type | Constraints | Notes |
|--------|------|-----------|-------|
| id | UUID | PRIMARY KEY | Generated UUID |
| payment_id | VARCHAR(50) | UNIQUE, NOT NULL | Transaction ID |
| invoice_id | UUID | FOREIGN KEY → invoices | Related invoice |
| amount | DECIMAL(12,2) | NOT NULL | Payment amount |
| payment_method_id | UUID | FOREIGN KEY → payment_methods | Payment type |
| reference | VARCHAR(255) | | Transaction reference |
| notes | TEXT | | Transaction notes |
| status | VARCHAR(50) | DEFAULT 'completed' | pending, completed, failed |
| processed_by | UUID | FOREIGN KEY → users | Processed by user |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |

**Indexes**: payment_id, invoice_id, status

**Sample Data**:
```sql
INSERT INTO payments (payment_id, invoice_id, amount, payment_method_id, status)
VALUES ('PAY-001', 'invoice-uuid', 125.50, 'method-uuid', 'completed');
```

---

### work_orders
**Purpose**: Track field service requests

| Column | Type | Constraints | Notes |
|--------|------|-----------|-------|
| id | UUID | PRIMARY KEY | Generated UUID |
| work_order_id | VARCHAR(50) | UNIQUE, NOT NULL | Request ID |
| client_id | UUID | FOREIGN KEY → clients | Customer |
| assigned_to | UUID | FOREIGN KEY → users | Assigned technician |
| title | VARCHAR(255) | NOT NULL | Description title |
| description | TEXT | | Detailed description |
| priority | VARCHAR(50) | DEFAULT 'medium' | low, medium, high, critical |
| status | VARCHAR(50) | DEFAULT 'open' | open, in_progress, completed |
| scheduled_date | TIMESTAMP | | Scheduled time |
| completed_date | TIMESTAMP | | Completion time |
| notes | TEXT | | Work notes |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |

**Indexes**: work_order_id, client_id, assigned_to, status

**Sample Data**:
```sql
INSERT INTO work_orders (work_order_id, client_id, title, priority, status)
VALUES ('WO-001', 'client-uuid', 'Meter maintenance', 'high', 'open');
```

---

### assets
**Purpose**: Manage infrastructure assets and equipment

| Column | Type | Constraints | Notes |
|--------|------|-----------|-------|
| id | UUID | PRIMARY KEY | Generated UUID |
| asset_id | VARCHAR(100) | UNIQUE, NOT NULL | Asset identifier |
| type | VARCHAR(100) | NOT NULL | pump, tank, pipe, valve, etc. |
| location | VARCHAR(255) | | Physical location |
| region_id | UUID | FOREIGN KEY → regional_zones | Service region |
| status | VARCHAR(50) | DEFAULT 'active' | active, inactive, maintenance |
| purchase_date | DATE | | Purchase date |
| warranty_end | DATE | | Warranty expiration |
| model | VARCHAR(100) | | Equipment model |
| manufacturer | VARCHAR(100) | | Manufacturer |
| serial_number | VARCHAR(100) | | Device serial |
| cost | DECIMAL(12,2) | | Purchase cost |
| next_maintenance_date | DATE | | Scheduled maintenance |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |

**Indexes**: asset_id, type, status

---

### maintenance
**Purpose**: Track asset maintenance and repairs

| Column | Type | Constraints | Notes |
|--------|------|-----------|-------|
| id | UUID | PRIMARY KEY | Generated UUID |
| maintenance_id | VARCHAR(50) | UNIQUE, NOT NULL | Record ID |
| asset_id | UUID | FOREIGN KEY → assets | Asset being serviced |
| type | VARCHAR(50) | NOT NULL | preventive, corrective, emergency |
| scheduled_date | TIMESTAMP | | Planned date |
| completed_date | TIMESTAMP | | Actual completion |
| cost | DECIMAL(12,2) | | Service cost |
| performed_by | UUID | FOREIGN KEY → users | Technician |
| notes | TEXT | | Work notes |
| status | VARCHAR(50) | DEFAULT 'scheduled' | scheduled, in_progress, completed |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |

**Indexes**: maintenance_id, asset_id

---

### quality_data
**Purpose**: Store water quality test results

| Column | Type | Constraints | Notes |
|--------|------|-----------|-------|
| id | UUID | PRIMARY KEY | Generated UUID |
| meter_id | UUID | FOREIGN KEY → meters | Test location |
| ph_level | DECIMAL(4,2) | | pH value |
| turbidity | DECIMAL(8,2) | | Turbidity (NTU) |
| chlorine | DECIMAL(8,2) | | Free chlorine (mg/L) |
| hardness | DECIMAL(8,2) | | Hardness (mg/L) |
| temperature | DECIMAL(5,2) | | Temperature (°C) |
| timestamp | TIMESTAMP | NOT NULL | Test time |
| status | VARCHAR(50) | DEFAULT 'good' | good, warning, critical |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |

**Indexes**: meter_id, timestamp

---

### notifications
**Purpose**: System notification tracking

| Column | Type | Constraints | Notes |
|--------|------|-----------|-------|
| id | UUID | PRIMARY KEY | Generated UUID |
| notification_id | VARCHAR(50) | UNIQUE, NOT NULL | Notification ID |
| title | VARCHAR(255) | NOT NULL | Notification title |
| message | TEXT | NOT NULL | Notification message |
| type | VARCHAR(50) | | alert, info, warning, error |
| recipient_type | VARCHAR(50) | | user, role, region, all |
| recipient_id | UUID | | Recipient identifier |
| delivery_method | VARCHAR(50) | | email, sms, in_app |
| status | VARCHAR(50) | DEFAULT 'pending' | pending, sent, delivered |
| sent_at | TIMESTAMP | | Send time |
| read_at | TIMESTAMP | | Read time |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |

**Indexes**: notification_id, recipient_id, status

---

## Common Queries

### Get customer usage for billing period
```sql
SELECT 
  c.name,
  m.meter_id,
  (r.value - LAG(r.value) OVER (ORDER BY r.timestamp)) as usage,
  r.timestamp
FROM clients c
JOIN meters m ON c.id = m.client_id
JOIN readings r ON m.id = r.meter_id
WHERE c.id = ? 
  AND r.timestamp BETWEEN ? AND ?
ORDER BY r.timestamp;
```

### Find overdue accounts
```sql
SELECT 
  c.name,
  i.invoice_id,
  i.amount_due,
  i.due_date,
  (CURRENT_DATE - i.due_date) as days_overdue
FROM clients c
JOIN invoices i ON c.id = i.client_id
WHERE i.status != 'paid'
  AND i.due_date < CURRENT_DATE
ORDER BY days_overdue DESC;
```

### Meter error summary
```sql
SELECT 
  COUNT(*) as total_errors,
  error_status,
  COUNT(DISTINCT client_id) as affected_clients
FROM meters
WHERE status = 'error' AND deleted_at IS NULL
GROUP BY error_status;
```

### Water quality dashboard
```sql
SELECT 
  m.meter_id,
  c.name,
  AVG(qd.ph_level) as avg_ph,
  AVG(qd.turbidity) as avg_turbidity,
  AVG(qd.chlorine) as avg_chlorine,
  MAX(qd.timestamp) as last_test
FROM quality_data qd
JOIN meters m ON qd.meter_id = m.id
JOIN clients c ON m.client_id = c.id
WHERE qd.timestamp > NOW() - INTERVAL '30 days'
GROUP BY m.meter_id, c.name;
```

---

## Constraints and Relationships

- All UUIDs are generated on the client or database
- Timestamps are stored in UTC
- Soft deletes are used for audit trail
- Cascade updates/deletes for dependent records
- Foreign key constraints enforce referential integrity
