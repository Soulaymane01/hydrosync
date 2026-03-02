"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { CreditCard, DollarSign, TrendingUp, Download, Send, AlertCircle, FileText, Calculator } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 125000, collections: 118000, outstanding: 7000 },
  { month: "Feb", revenue: 132000, collections: 125000, outstanding: 14000 },
  { month: "Mar", revenue: 128000, collections: 130000, outstanding: 12000 },
  { month: "Apr", revenue: 135000, collections: 128000, outstanding: 19000 },
  { month: "May", revenue: 142000, collections: 135000, outstanding: 26000 },
  { month: "Jun", revenue: 148000, collections: 140000, outstanding: 34000 },
]

const paymentMethodData = [
  { name: "Auto-Pay", value: 45, color: "#3b82f6" },
  { name: "Online", value: 30, color: "#10b981" },
  { name: "Check", value: 15, color: "#f59e0b" },
  { name: "Cash", value: 10, color: "#ef4444" },
]

const billingCycles = [
  {
    id: "CYCLE-001",
    name: "Residential Monthly",
    frequency: "Monthly",
    customers: 2847,
    nextRun: "2024-02-01",
    status: "Active",
    avgBill: 85.5,
  },
  {
    id: "CYCLE-002",
    name: "Commercial Quarterly",
    frequency: "Quarterly",
    customers: 156,
    nextRun: "2024-03-01",
    status: "Active",
    avgBill: 1250.0,
  },
  {
    id: "CYCLE-003",
    name: "Industrial Monthly",
    frequency: "Monthly",
    customers: 23,
    nextRun: "2024-02-15",
    status: "Active",
    avgBill: 5800.0,
  },
]

const outstandingAccounts = [
  {
    id: "CUST-001",
    name: "John Smith",
    amount: 245.5,
    daysOverdue: 15,
    lastContact: "2024-01-20",
    status: "First Notice",
  },
  {
    id: "CUST-002",
    name: "ABC Manufacturing",
    amount: 1850.0,
    daysOverdue: 45,
    lastContact: "2024-01-10",
    status: "Final Notice",
  },
  {
    id: "CUST-003",
    name: "Sarah Johnson",
    amount: 125.75,
    daysOverdue: 8,
    lastContact: "2024-01-25",
    status: "Reminder",
  },
]

export default function BillingPage() {
  const [selectedCycle, setSelectedCycle] = useState(billingCycles[0])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Advanced Billing System</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
          <Button>
            <Calculator className="mr-2 h-4 w-4" />
            Run Billing
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cycles">Billing Cycles</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="rates">Rate Management</TabsTrigger>
          <TabsTrigger value="payments">Payment Processing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$148,000</div>
                <p className="text-xs text-muted-foreground">+4.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Collections Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.6%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$34,000</div>
                <p className="text-xs text-muted-foreground">156 accounts</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Auto-Pay Adoption</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45%</div>
                <p className="text-xs text-muted-foreground">1,281 customers</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue & Collections Trend</CardTitle>
                <CardDescription>Monthly revenue and collection performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue" />
                    <Line type="monotone" dataKey="collections" stroke="#10b981" strokeWidth={2} name="Collections" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Distribution of payment methods used by customers</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {paymentMethodData.map((item) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">
                        {item.name}: {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cycles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing Cycles Management</CardTitle>
              <CardDescription>Configure and manage billing cycles for different customer segments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {billingCycles.map((cycle) => (
                  <div key={cycle.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{cycle.name}</h4>
                        <Badge variant={cycle.status === "Active" ? "default" : "secondary"}>{cycle.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {cycle.frequency} • {cycle.customers.toLocaleString()} customers • Avg: $
                        {cycle.avgBill.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">Next run: {cycle.nextRun}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Configure
                      </Button>
                      <Button size="sm">Run Now</Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Create New Billing Cycle
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Collections Management</CardTitle>
              <CardDescription>Manage overdue accounts and collection processes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">0-30 Days</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">$12,500</div>
                    <p className="text-xs text-muted-foreground">45 accounts</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">31-60 Days</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">$15,200</div>
                    <p className="text-xs text-muted-foreground">32 accounts</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">60+ Days</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">$6,300</div>
                    <p className="text-xs text-muted-foreground">18 accounts</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Outstanding Accounts</h4>
                {outstandingAccounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{account.name}</p>
                        <Badge
                          variant={
                            account.status === "Final Notice"
                              ? "destructive"
                              : account.status === "First Notice"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {account.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ${account.amount.toFixed(2)} • {account.daysOverdue} days overdue
                      </p>
                      <p className="text-xs text-muted-foreground">Last contact: {account.lastContact}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Send className="mr-2 h-4 w-4" />
                        Contact
                      </Button>
                      <Button size="sm">Payment Plan</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rate Structure Management</CardTitle>
              <CardDescription>Configure water rates and billing structures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Residential Rates</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Base Rate (0-3,000 gal)</span>
                      <div className="flex items-center space-x-2">
                        <Input className="w-20 h-8" defaultValue="25.00" />
                        <span className="text-sm text-muted-foreground">$/month</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tier 1 (3,001-6,000 gal)</span>
                      <div className="flex items-center space-x-2">
                        <Input className="w-20 h-8" defaultValue="2.50" />
                        <span className="text-sm text-muted-foreground">$/1000 gal</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tier 2 (6,001+ gal)</span>
                      <div className="flex items-center space-x-2">
                        <Input className="w-20 h-8" defaultValue="3.75" />
                        <span className="text-sm text-muted-foreground">$/1000 gal</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Commercial Rates</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Base Rate (0-10,000 gal)</span>
                      <div className="flex items-center space-x-2">
                        <Input className="w-20 h-8" defaultValue="75.00" />
                        <span className="text-sm text-muted-foreground">$/month</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Usage Rate (10,001+ gal)</span>
                      <div className="flex items-center space-x-2">
                        <Input className="w-20 h-8" defaultValue="4.25" />
                        <span className="text-sm text-muted-foreground">$/1000 gal</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Peak Usage Surcharge</span>
                      <div className="flex items-center space-x-2">
                        <Input className="w-20 h-8" defaultValue="1.50" />
                        <span className="text-sm text-muted-foreground">$/1000 gal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Additional Fees</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Late Payment Fee</Label>
                    <div className="flex items-center space-x-2">
                      <Input className="h-8" defaultValue="15.00" />
                      <span className="text-sm text-muted-foreground">$</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Reconnection Fee</Label>
                    <div className="flex items-center space-x-2">
                      <Input className="h-8" defaultValue="50.00" />
                      <span className="text-sm text-muted-foreground">$</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Service Call Fee</Label>
                    <div className="flex items-center space-x-2">
                      <Input className="h-8" defaultValue="35.00" />
                      <span className="text-sm text-muted-foreground">$</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button>Save Rate Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Processing</CardTitle>
              <CardDescription>Configure payment methods and processing settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Payment Methods</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="credit-cards">Credit/Debit Cards</Label>
                      <Switch id="credit-cards" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="ach">ACH/Bank Transfer</Label>
                      <Switch id="ach" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="paypal">PayPal</Label>
                      <Switch id="paypal" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="apple-pay">Apple Pay</Label>
                      <Switch id="apple-pay" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="google-pay">Google Pay</Label>
                      <Switch id="google-pay" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Processing Settings</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Processing Fee</Label>
                      <div className="flex items-center space-x-2">
                        <Input className="h-8" defaultValue="2.9" />
                        <span className="text-sm text-muted-foreground">% + $0.30</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Auto-Pay Discount</Label>
                      <div className="flex items-center space-x-2">
                        <Input className="h-8" defaultValue="2.00" />
                        <span className="text-sm text-muted-foreground">$</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="instant-payments">Instant Payment Verification</Label>
                      <Switch id="instant-payments" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Auto-Pay Configuration</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Default Payment Date</Label>
                    <Select defaultValue="due-date">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="due-date">Due Date</SelectItem>
                        <SelectItem value="5-days-early">5 Days Early</SelectItem>
                        <SelectItem value="10-days-early">10 Days Early</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Retry Failed Payments</Label>
                    <Select defaultValue="3-times">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-time">1 Time</SelectItem>
                        <SelectItem value="3-times">3 Times</SelectItem>
                        <SelectItem value="5-times">5 Times</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Notification Timing</Label>
                    <Select defaultValue="3-days">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-day">1 Day Before</SelectItem>
                        <SelectItem value="3-days">3 Days Before</SelectItem>
                        <SelectItem value="7-days">7 Days Before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button>Save Payment Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
