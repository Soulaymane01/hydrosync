# HydroSync Backend Class Design

## Overview

This document provides the complete object-oriented design for the HydroSync backend system, including class hierarchies, relationships, and responsibilities.

## Class Hierarchy Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      BaseEntity                             │
├─────────────────────────────────────────────────────────────┤
│ - id: UUID                                                  │
│ - created_at: DateTime                                      │
│ - updated_at: DateTime                                      │
│ - deleted_at: DateTime (nullable)                           │
├─────────────────────────────────────────────────────────────┤
│ + getId(): UUID                                             │
│ + getCreatedAt(): DateTime                                  │
│ + getUpdatedAt(): DateTime                                  │
│ + isDeleted(): Boolean                                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ├─────────────────────┬──────────────────────┬──────────────────┐
                       │                     │                      │                  │
              ┌────────▼─────────┐  ┌────────▼─────────┐  ┌────────▼────────┐  ┌─────▼──────────┐
              │      User        │  │     Client       │  │     Meter       │  │     Asset      │
              └──────────────────┘  └──────────────────┘  └─────────────────┘  └────────────────┘
                       │                     │                      │                  │
         ┌─────────────┼─────────────┐      │        ┌─────────────┼──────────────┐  │
         │             │             │      │        │             │              │  │
    ┌────▼────┐  ┌─────▼─────┐ ┌────▼───┐ │   ┌─────▼──────┐ ┌───▼──────────┐  │  └──────────┐
    │ Admin   │  │ Operator  │ │ Tech   │ │   │  Reading   │ │ QualityData  │  │        Maintenance
    └─────────┘  │ Customer  │ │Viewer  │ │   └────────────┘ └──────────────┘  │
                 │ Service   │ └────────┘ │                                     │
                 └───────────┘           │                            ┌─────────▼──────────┐
                                         │                            │  PreventiveMaint   │
                                         │                            └────────────────────┘
                                         │
                                    ┌────▼────┐
                                    │ Invoice │
                                    └─────────┘
                                         │
                                    ┌────▼───────┐
                                    │  Payment   │
                                    └────────────┘
```

## Core Entity Classes

### BaseEntity (Abstract)

```typescript
abstract class BaseEntity {
  id: UUID;
  createdAt: DateTime;
  updatedAt: DateTime;
  deletedAt: DateTime | null;

  constructor(id: UUID, createdAt: DateTime) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = createdAt;
    this.deletedAt = null;
  }

  getId(): UUID {
    return this.id;
  }

  getCreatedAt(): DateTime {
    return this.createdAt;
  }

  getUpdatedAt(): DateTime {
    return this.updatedAt;
  }

  isDeleted(): boolean {
    return this.deletedAt !== null;
  }

  markDeleted(): void {
    this.deletedAt = DateTime.now();
  }

  restore(): void {
    this.deletedAt = null;
  }
}
```

### User Class

```typescript
class User extends BaseEntity {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  department: string;
  phone: string;
  status: 'active' | 'inactive' | 'suspended';
  avatarUrl: string | null;
  lastLogin: DateTime | null;

  constructor(
    id: UUID,
    email: string,
    firstName: string,
    lastName: string,
    role: Role,
    createdAt: DateTime
  ) {
    super(id, createdAt);
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.status = 'active';
  }

  // Methods
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  hasPermission(resource: string, action: string): boolean {
    return this.role.hasPermission(resource, action);
  }

  canAccessClient(client: Client): boolean {
    // Implement business logic for access control
    return true;
  }

  updateLastLogin(): void {
    this.lastLogin = DateTime.now();
    this.updatedAt = DateTime.now();
  }

  changePassword(newPassword: string): void {
    this.password = hashPassword(newPassword);
    this.updatedAt = DateTime.now();
  }

  deactivate(): void {
    this.status = 'inactive';
    this.updatedAt = DateTime.now();
  }

  activate(): void {
    this.status = 'active';
    this.updatedAt = DateTime.now();
  }
}
```

### Role Class

```typescript
class Role extends BaseEntity {
  name: string;
  description: string;
  permissions: Permission[];
  isActive: boolean;

  constructor(
    id: UUID,
    name: string,
    description: string,
    createdAt: DateTime
  ) {
    super(id, createdAt);
    this.name = name;
    this.description = description;
    this.permissions = [];
    this.isActive = true;
  }

  // Methods
  addPermission(permission: Permission): void {
    if (!this.permissions.includes(permission)) {
      this.permissions.push(permission);
    }
  }

  removePermission(permission: Permission): void {
    this.permissions = this.permissions.filter(p => p.id !== permission.id);
  }

  hasPermission(resource: string, action: string): boolean {
    return this.permissions.some(
      p => p.resource === resource && p.action === action
    );
  }

  getPermissionCount(): number {
    return this.permissions.length;
  }

  canPerformAction(resource: string, action: string): boolean {
    return this.isActive && this.hasPermission(resource, action);
  }
}
```

### Permission Class

```typescript
class Permission extends BaseEntity {
  role: Role;
  resource: string;
  action: string;

  constructor(
    id: UUID,
    role: Role,
    resource: string,
    action: string,
    createdAt: DateTime
  ) {
    super(id, createdAt);
    this.role = role;
    this.resource = resource;
    this.action = action;
  }

  // Methods
  matches(resource: string, action: string): boolean {
    return this.resource === resource && this.action === action;
  }

  getDescription(): string {
    return `${this.action} on ${this.resource}`;
  }
}
```

### Client Class

```typescript
class Client extends BaseEntity {
  clientId: string;
  name: string;
  address: string;
  city: string;
  region: Region;
  phone: string;
  email: string;
  contactPerson: string;
  accountType: 'residential' | 'commercial' | 'industrial';
  billingCycle: BillingCycle;
  status: 'active' | 'inactive' | 'suspended';
  balance: number;
  meters: Meter[];
  invoices: Invoice[];

  constructor(
    id: UUID,
    clientId: string,
    name: string,
    address: string,
    region: Region,
    createdAt: DateTime
  ) {
    super(id, createdAt);
    this.clientId = clientId;
    this.name = name;
    this.address = address;
    this.region = region;
    this.status = 'active';
    this.balance = 0;
    this.meters = [];
    this.invoices = [];
  }

  // Methods
  addMeter(meter: Meter): void {
    if (!this.meters.find(m => m.id === meter.id)) {
      this.meters.push(meter);
    }
  }

  removeMeter(meter: Meter): void {
    this.meters = this.meters.filter(m => m.id !== meter.id);
  }

  getTotalWaterUsage(startDate: DateTime, endDate: DateTime): number {
    return this.meters.reduce((total, meter) => {
      return total + meter.getUsageBetween(startDate, endDate);
    }, 0);
  }

  getOutstandingBalance(): number {
    return this.invoices
      .filter(inv => inv.status !== 'paid')
      .reduce((total, inv) => total + inv.getOutstanding(), 0);
  }

  hasOverdueInvoices(): boolean {
    return this.invoices.some(inv => inv.isOverdue());
  }

  suspend(): void {
    this.status = 'suspended';
    this.updatedAt = DateTime.now();
  }

  reactivate(): void {
    this.status = 'active';
    this.updatedAt = DateTime.now();
  }

  getAverageMonthlyUsage(): number {
    if (this.meters.length === 0) return 0;
    return this.meters.reduce((avg, meter) => {
      return avg + meter.getAverageMonthlyUsage();
    }, 0) / this.meters.length;
  }
}
```

### Meter Class

```typescript
class Meter extends BaseEntity {
  meterId: string;
  client: Client;
  type: 'smart' | 'analog' | 'hybrid';
  model: string;
  manufacturer: string;
  installDate: Date;
  lastReading: number;
  lastReadingDate: DateTime;
  errorStatus: string | null;
  status: 'active' | 'inactive' | 'error';
  firmwareVersion: string;
  serialNumber: string;
  readings: Reading[];
  qualityData: QualityData[];

  constructor(
    id: UUID,
    meterId: string,
    client: Client,
    type: string,
    installDate: Date,
    createdAt: DateTime
  ) {
    super(id, createdAt);
    this.meterId = meterId;
    this.client = client;
    this.type = type as any;
    this.installDate = installDate;
    this.status = 'active';
    this.readings = [];
    this.qualityData = [];
  }

  // Methods
  addReading(reading: Reading): void {
    this.readings.push(reading);
    this.lastReading = reading.value;
    this.lastReadingDate = reading.timestamp;
    this.updatedAt = DateTime.now();
  }

  getLatestReading(): Reading | null {
    return this.readings.length > 0
      ? this.readings[this.readings.length - 1]
      : null;
  }

  getUsageBetween(startDate: DateTime, endDate: DateTime): number {
    const relevantReadings = this.readings.filter(
      r => r.timestamp >= startDate && r.timestamp <= endDate
    );
    if (relevantReadings.length < 2) return 0;
    const start = relevantReadings[0].value;
    const end = relevantReadings[relevantReadings.length - 1].value;
    return end - start;
  }

  getAverageMonthlyUsage(): number {
    if (this.readings.length < 2) return 0;
    const firstReading = this.readings[0];
    const lastReading = this.readings[this.readings.length - 1];
    const daysDiff = Math.ceil(
      (lastReading.timestamp.getTime() - firstReading.timestamp.getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const months = daysDiff / 30;
    const totalUsage = lastReading.value - firstReading.value;
    return months > 0 ? totalUsage / months : 0;
  }

  hasErrors(): boolean {
    return this.status === 'error' || this.errorStatus !== null;
  }

  clearErrors(): void {
    this.errorStatus = null;
    this.status = 'active';
    this.updatedAt = DateTime.now();
  }

  setError(errorMessage: string): void {
    this.errorStatus = errorMessage;
    this.status = 'error';
    this.updatedAt = DateTime.now();
  }

  getReadingsTrend(days: number): Reading[] {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    return this.readings.filter(
      r => new Date(r.timestamp.getTime()) >= startDate
    );
  }
}
```

### Reading Class

```typescript
class Reading extends BaseEntity {
  meter: Meter;
  value: number;
  unit: string;
  timestamp: DateTime;
  qualityStatus: 'good' | 'warning' | 'error';
  dataType: 'actual' | 'estimated' | 'manual';

  constructor(
    id: UUID,
    meter: Meter,
    value: number,
    timestamp: DateTime,
    createdAt: DateTime
  ) {
    super(id, createdAt);
    this.meter = meter;
    this.value = value;
    this.unit = 'm3';
    this.timestamp = timestamp;
    this.qualityStatus = 'good';
    this.dataType = 'actual';
  }

  // Methods
  getValue(): number {
    return this.value;
  }

  getValueInLiters(): number {
    return this.unit === 'm3' ? this.value * 1000 : this.value;
  }

  isOutlier(averageValue: number, threshold: number = 2): boolean {
    const deviation = Math.abs(this.value - averageValue);
    return deviation > averageValue * threshold;
  }

  markAsEstimated(): void {
    this.dataType = 'estimated';
    this.updatedAt = DateTime.now();
  }

  markAsManual(): void {
    this.dataType = 'manual';
    this.updatedAt = DateTime.now();
  }

  hasQualityIssue(): boolean {
    return this.qualityStatus !== 'good';
  }
}
```

### QualityData Class

```typescript
class QualityData extends BaseEntity {
  meter: Meter;
  phLevel: number | null;
  turbidity: number | null;
  chlorine: number | null;
  hardness: number | null;
  temperature: number | null;
  timestamp: DateTime;
  status: 'good' | 'warning' | 'critical';

  constructor(
    id: UUID,
    meter: Meter,
    timestamp: DateTime,
    createdAt: DateTime
  ) {
    super(id, createdAt);
    this.meter = meter;
    this.timestamp = timestamp;
    this.status = 'good';
  }

  // Methods
  setPhLevel(level: number): void {
    this.phLevel = level;
    this.evaluateStatus();
  }

  setTurbidity(value: number): void {
    this.turbidity = value;
    this.evaluateStatus();
  }

  setChlorine(value: number): void {
    this.chlorine = value;
    this.evaluateStatus();
  }

  setHardness(value: number): void {
    this.hardness = value;
    this.evaluateStatus();
  }

  setTemperature(temp: number): void {
    this.temperature = temp;
    this.evaluateStatus();
  }

  evaluateStatus(): void {
    // Implement quality evaluation logic
    if (this.isWithinNormalRange()) {
      this.status = 'good';
    } else if (this.hasWarningLevels()) {
      this.status = 'warning';
    } else {
      this.status = 'critical';
    }
    this.updatedAt = DateTime.now();
  }

  isWithinNormalRange(): boolean {
    // Implement standard water quality checks
    return true;
  }

  hasWarningLevels(): boolean {
    // Check for warning levels
    return false;
  }

  getAllReadings(): object {
    return {
      ph: this.phLevel,
      turbidity: this.turbidity,
      chlorine: this.chlorine,
      hardness: this.hardness,
      temperature: this.temperature
    };
  }
}
```

### Invoice Class

```typescript
class Invoice extends BaseEntity {
  invoiceId: string;
  client: Client;
  billingPeriodStart: Date;
  billingPeriodEnd: Date;
  dueDate: Date;
  amountDue: number;
  amountPaid: number;
  lateFees: number;
  status: 'unpaid' | 'partial' | 'paid' | 'overdue';
  notes: string;
  payments: Payment[];

  constructor(
    id: UUID,
    invoiceId: string,
    client: Client,
    billingPeriodStart: Date,
    billingPeriodEnd: Date,
    amountDue: number,
    createdAt: DateTime
  ) {
    super(id, createdAt);
    this.invoiceId = invoiceId;
    this.client = client;
    this.billingPeriodStart = billingPeriodStart;
    this.billingPeriodEnd = billingPeriodEnd;
    this.amountDue = amountDue;
    this.amountPaid = 0;
    this.lateFees = 0;
    this.status = 'unpaid';
    this.payments = [];
  }

  // Methods
  addPayment(payment: Payment): void {
    this.payments.push(payment);
    this.amountPaid += payment.amount;
    this.updateStatus();
    this.updatedAt = DateTime.now();
  }

  updateStatus(): void {
    const total = this.amountDue + this.lateFees;
    if (this.amountPaid >= total) {
      this.status = 'paid';
    } else if (this.amountPaid > 0) {
      this.status = 'partial';
    } else if (this.isOverdue()) {
      this.status = 'overdue';
    } else {
      this.status = 'unpaid';
    }
  }

  isOverdue(): boolean {
    return new Date() > this.dueDate && this.status !== 'paid';
  }

  getOutstanding(): number {
    const total = this.amountDue + this.lateFees;
    return Math.max(0, total - this.amountPaid);
  }

  addLateFee(fee: number): void {
    this.lateFees += fee;
    this.updateStatus();
    this.updatedAt = DateTime.now();
  }

  getDaysSinceDue(): number {
    if (!this.isOverdue()) return 0;
    const today = new Date();
    return Math.floor((today.getTime() - this.dueDate.getTime()) / (1000 * 60 * 60 * 24));
  }
}
```

### Payment Class

```typescript
class Payment extends BaseEntity {
  paymentId: string;
  invoice: Invoice;
  amount: number;
  paymentMethod: PaymentMethod;
  reference: string;
  notes: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  processedBy: User | null;

  constructor(
    id: UUID,
    paymentId: string,
    invoice: Invoice,
    amount: number,
    paymentMethod: PaymentMethod,
    createdAt: DateTime
  ) {
    super(id, createdAt);
    this.paymentId = paymentId;
    this.invoice = invoice;
    this.amount = amount;
    this.paymentMethod = paymentMethod;
    this.status = 'pending';
    this.reference = '';
    this.notes = '';
  }

  // Methods
  processPayment(processedBy: User): void {
    this.status = 'completed';
    this.processedBy = processedBy;
    this.invoice.addPayment(this);
    this.updatedAt = DateTime.now();
  }

  markAsFailed(reason: string): void {
    this.status = 'failed';
    this.notes = reason;
    this.updatedAt = DateTime.now();
  }

  cancel(): void {
    if (this.status === 'pending') {
      this.status = 'cancelled';
      this.updatedAt = DateTime.now();
    }
  }

  getPaymentMethod(): PaymentMethod {
    return this.paymentMethod;
  }

  isSuccessful(): boolean {
    return this.status === 'completed';
  }
}
```

### PaymentMethod Class

```typescript
class PaymentMethod extends BaseEntity {
  name: string;
  description: string;
  isActive: boolean;

  constructor(
    id: UUID,
    name: string,
    createdAt: DateTime
  ) {
    super(id, createdAt);
    this.name = name;
    this.isActive = true;
  }

  // Methods
  getName(): string {
    return this.name;
  }

  activate(): void {
    this.isActive = true;
    this.updatedAt = DateTime.now();
  }

  deactivate(): void {
    this.isActive = false;
    this.updatedAt = DateTime.now();
  }

  isAvailable(): boolean {
    return this.isActive;
  }
}
```

### Asset Class

```typescript
class Asset extends BaseEntity {
  assetId: string;
  type: string;
  location: string;
  region: Region;
  status: 'active' | 'inactive' | 'maintenance' | 'decommissioned';
  purchaseDate: Date;
  warrantyEnd: Date;
  model: string;
  manufacturer: string;
  serialNumber: string;
  cost: number;
  nextMaintenanceDate: Date;
  maintenanceRecords: Maintenance[];

  constructor(
    id: UUID,
    assetId: string,
    type: string,
    region: Region,
    createdAt: DateTime
  ) {
    super(id, createdAt);
    this.assetId = assetId;
    this.type = type;
    this.region = region;
    this.status = 'active';
    this.maintenanceRecords = [];
  }

  // Methods
  addMaintenanceRecord(maintenance: Maintenance): void {
    this.maintenanceRecords.push(maintenance);
    this.updatedAt = DateTime.now();
  }

  isUnderWarranty(): boolean {
    return new Date() < this.warrantyEnd;
  }

  requiresMaintenance(): boolean {
    return new Date() >= this.nextMaintenanceDate;
  }

  getMaintenanceHistory(): Maintenance[] {
    return this.maintenanceRecords.sort(
      (a, b) => b.completedDate.getTime() - a.completedDate.getTime()
    );
  }

  getLastMaintenanceDate(): Date | null {
    if (this.maintenanceRecords.length === 0) return null;
    return this.maintenanceRecords[0].completedDate;
  }

  getTotalMaintenanceCost(): number {
    return this.maintenanceRecords.reduce((total, m) => total + m.cost, 0);
  }

  scheduleNextMaintenance(daysFromNow: number): void {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + daysFromNow);
    this.nextMaintenanceDate = nextDate;
    this.updatedAt = DateTime.now();
  }

  decommission(): void {
    this.status = 'decommissioned';
    this.updatedAt = DateTime.now();
  }
}
```

### Maintenance Class

```typescript
class Maintenance extends BaseEntity {
  maintenanceId: string;
  asset: Asset;
  type: 'preventive' | 'corrective' | 'emergency';
  scheduledDate: DateTime;
  completedDate: DateTime | null;
  cost: number;
  performedBy: User | null;
  notes: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

  constructor(
    id: UUID,
    maintenanceId: string,
    asset: Asset,
    type: string,
    scheduledDate: DateTime,
    createdAt: DateTime
  ) {
    super(id, createdAt);
    this.maintenanceId = maintenanceId;
    this.asset = asset;
    this.type = type as any;
    this.scheduledDate = scheduledDate;
    this.status = 'scheduled';
    this.cost = 0;
  }

  // Methods
  startMaintenance(performedBy: User): void {
    this.status = 'in_progress';
    this.performedBy = performedBy;
    this.updatedAt = DateTime.now();
  }

  completeMaintenance(cost: number): void {
    this.status = 'completed';
    this.completedDate = DateTime.now();
    this.cost = cost;
    this.asset.addMaintenanceRecord(this);
    this.updatedAt = DateTime.now();
  }

  cancel(): void {
    this.status = 'cancelled';
    this.updatedAt = DateTime.now();
  }

  isOverdue(): boolean {
    return this.status === 'scheduled' && DateTime.now() > this.scheduledDate;
  }

  getDaysSinceScheduled(): number {
    return Math.floor(
      (DateTime.now().getTime() - this.scheduledDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  }
}
```

### WorkOrder Class

```typescript
class WorkOrder extends BaseEntity {
  workOrderId: string;
  client: Client;
  assignedTo: User | null;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  scheduledDate: DateTime;
  completedDate: DateTime | null;
  notes: string;

  constructor(
    id: UUID,
    workOrderId: string,
    client: Client,
    title: string,
    createdAt: DateTime
  ) {
    super(id, createdAt);
    this.workOrderId = workOrderId;
    this.client = client;
    this.title = title;
    this.status = 'open';
    this.priority = 'medium';
  }

  // Methods
  assign(user: User): void {
    this.assignedTo = user;
    this.updatedAt = DateTime.now();
  }

  start(): void {
    this.status = 'in_progress';
    this.updatedAt = DateTime.now();
  }

  complete(notes: string): void {
    this.status = 'completed';
    this.completedDate = DateTime.now();
    this.notes = notes;
    this.updatedAt = DateTime.now();
  }

  cancel(): void {
    this.status = 'cancelled';
    this.updatedAt = DateTime.now();
  }

  isOverdue(): boolean {
    return this.status !== 'completed' && DateTime.now() > this.scheduledDate;
  }

  isPrioritized(): boolean {
    return this.priority === 'high' || this.priority === 'critical';
  }
}
```

### Region Class

```typescript
class Region extends BaseEntity {
  name: string;
  description: string;
  totalClients: number;
  totalMeters: number;
  averageUsage: number;
  clients: Client[];
  assets: Asset[];

  constructor(
    id: UUID,
    name: string,
    createdAt: DateTime
  ) {
    super(id, createdAt);
    this.name = name;
    this.totalClients = 0;
    this.totalMeters = 0;
    this.averageUsage = 0;
    this.clients = [];
    this.assets = [];
  }

  // Methods
  addClient(client: Client): void {
    this.clients.push(client);
    this.totalClients++;
    this.updatedAt = DateTime.now();
  }

  removeClient(client: Client): void {
    this.clients = this.clients.filter(c => c.id !== client.id);
    this.totalClients--;
    this.updatedAt = DateTime.now();
  }

  addAsset(asset: Asset): void {
    this.assets.push(asset);
    this.updatedAt = DateTime.now();
  }

  getTotalWaterUsage(): number {
    return this.clients.reduce((total, client) => {
      return total + client.getTotalWaterUsage(DateTime.now(), DateTime.now());
    }, 0);
  }

  getAverageClientUsage(): number {
    if (this.clients.length === 0) return 0;
    return this.getTotalWaterUsage() / this.clients.length;
  }

  updateMetersCount(): void {
    this.totalMeters = this.clients.reduce(
      (total, client) => total + client.meters.length,
      0
    );
  }
}
```

### BillingCycle Class

```typescript
class BillingCycle extends BaseEntity {
  name: string;
  frequency: 'monthly' | 'quarterly' | 'annually';
  dayOfMonth: number;
  isActive: boolean;

  constructor(
    id: UUID,
    name: string,
    frequency: string,
    dayOfMonth: number,
    createdAt: DateTime
  ) {
    super(id, createdAt);
    this.name = name;
    this.frequency = frequency as any;
    this.dayOfMonth = dayOfMonth;
    this.isActive = true;
  }

  // Methods
  getNextBillingDate(): DateTime {
    const today = new Date();
    const nextDate = new Date(today);

    if (this.frequency === 'monthly') {
      nextDate.setMonth(nextDate.getMonth() + 1);
      nextDate.setDate(this.dayOfMonth);
    } else if (this.frequency === 'quarterly') {
      nextDate.setMonth(nextDate.getMonth() + 3);
      nextDate.setDate(this.dayOfMonth);
    } else if (this.frequency === 'annually') {
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      nextDate.setDate(this.dayOfMonth);
    }

    return nextDate;
  }

  getFrequencyInDays(): number {
    if (this.frequency === 'monthly') return 30;
    if (this.frequency === 'quarterly') return 90;
    if (this.frequency === 'annually') return 365;
    return 0;
  }

  activate(): void {
    this.isActive = true;
    this.updatedAt = DateTime.now();
  }

  deactivate(): void {
    this.isActive = false;
    this.updatedAt = DateTime.now();
  }
}
```

## Service Layer Classes

### UserService

```typescript
interface IUserService {
  createUser(userData: CreateUserDTO): Promise<User>;
  getUserById(id: UUID): Promise<User | null>;
  updateUser(id: UUID, userData: UpdateUserDTO): Promise<User>;
  deleteUser(id: UUID): Promise<void>;
  getUserByEmail(email: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  getUsersByRole(roleId: UUID): Promise<User[]>;
  verifyCredentials(email: string, password: string): Promise<User | null>;
}
```

### ClientService

```typescript
interface IClientService {
  createClient(clientData: CreateClientDTO): Promise<Client>;
  getClientById(id: UUID): Promise<Client | null>;
  updateClient(id: UUID, clientData: UpdateClientDTO): Promise<Client>;
  deleteClient(id: UUID): Promise<void>;
  getClientsByRegion(regionId: UUID): Promise<Client[]>;
  getClientUsageReport(clientId: UUID): Promise<UsageReport>;
  suspendClient(clientId: UUID): Promise<void>;
  reactivateClient(clientId: UUID): Promise<void>;
}
```

### MeterService

```typescript
interface IMeterService {
  createMeter(meterData: CreateMeterDTO): Promise<Meter>;
  getMeterById(id: UUID): Promise<Meter | null>;
  updateMeter(id: UUID, meterData: UpdateMeterDTO): Promise<Meter>;
  addReading(meterId: UUID, reading: ReadingDTO): Promise<Reading>;
  getMeterReadings(meterId: UUID, limit?: number): Promise<Reading[]>;
  getMetersByClient(clientId: UUID): Promise<Meter[]>;
  getMetersWithErrors(): Promise<Meter[]>;
  checkMeterHealth(meterId: UUID): Promise<MeterHealthDTO>;
}
```

### InvoiceService

```typescript
interface IInvoiceService {
  createInvoice(invoiceData: CreateInvoiceDTO): Promise<Invoice>;
  getInvoiceById(id: UUID): Promise<Invoice | null>;
  getClientInvoices(clientId: UUID): Promise<Invoice[]>;
  getOverdueInvoices(): Promise<Invoice[]>;
  addPayment(invoiceId: UUID, payment: PaymentDTO): Promise<Payment>;
  generateBillingReport(): Promise<BillingReport>;
  calculateLateFees(invoiceId: UUID): Promise<number>;
}
```

## Domain Events

```typescript
interface IDomainEvent {
  eventId: UUID;
  aggregateName: string;
  aggregateId: UUID;
  eventType: string;
  timestamp: DateTime;
  data: Record<string, any>;
}

class MeterReadingAddedEvent implements IDomainEvent {
  eventId: UUID;
  aggregateName = 'Meter';
  aggregateId: UUID;
  eventType = 'MeterReadingAdded';
  timestamp: DateTime;
  data: { meterId: UUID; value: number; timestamp: DateTime };
}

class PaymentProcessedEvent implements IDomainEvent {
  eventId: UUID;
  aggregateName = 'Payment';
  aggregateId: UUID;
  eventType = 'PaymentProcessed';
  timestamp: DateTime;
  data: { invoiceId: UUID; amount: number; paymentMethod: string };
}

class WorkOrderCompletedEvent implements IDomainEvent {
  eventId: UUID;
  aggregateName = 'WorkOrder';
  aggregateId: UUID;
  eventType = 'WorkOrderCompleted';
  timestamp: DateTime;
  data: { workOrderId: UUID; completedDate: DateTime; notes: string };
}
```

## Architecture Patterns

- **Domain-Driven Design**: Core business entities with rich behavior
- **Value Objects**: Immutable objects representing conceptual values
- **Repositories**: Abstract data access patterns
- **Services**: Business logic orchestration
- **Domain Events**: Publish-subscribe event model for cross-entity communication
- **Entity Hierarchy**: All entities inherit from BaseEntity with common functionality

This design ensures a robust, maintainable, and scalable backend architecture for HydroSync.
