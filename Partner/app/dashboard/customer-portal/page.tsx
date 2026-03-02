"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Users, CreditCard, MessageSquare, Eye, Send, Globe, Smartphone } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const usageData = [
  { month: "Jan", usage: 2400, cost: 180 },
  { month: "Feb", usage: 2200, cost: 165 },
  { month: "Mar", usage: 2800, cost: 210 },
  { month: "Apr", usage: 3200, cost: 240 },
  { month: "May", usage: 3600, cost: 270 },
  { month: "Jun", usage: 4200, cost: 315 },
]

const customerAccounts = [
  {
    id: "CUST-001",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, ST 12345",
    accountStatus: "Active",
    balance: 0,
    lastPayment: "2024-01-15",
    nextBilling: "2024-02-15",
    serviceType: "Residential",
    meterNumber: "MTR-12345",
    currentUsage: 3200,
    avgUsage: 2800,
  },
  {
    id: "CUST-002",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 987-6543",
    address: "456 Oak Ave, Somewhere, ST 67890",
    accountStatus: "Active",
    balance: 125.5,
    lastPayment: "2024-01-10",
    nextBilling: "2024-02-10",
    serviceType: "Residential",
    meterNumber: "MTR-67890",
    currentUsage: 2800,
    avgUsage: 3100,
  },
]

const supportTickets = [
  {
    id: "TKT-001",
    subject: "Low water pressure issue",
    status: "Open",
    priority: "High",
    created: "2024-01-20",
    lastUpdate: "2024-01-22",
    category: "Service Issue",
  },
  {
    id: "TKT-002",
    subject: "Billing inquiry",
    status: "Resolved",
    priority: "Medium",
    created: "2024-01-18",
    lastUpdate: "2024-01-19",
    category: "Billing",
  },
]

export default function CustomerPortalPage() {
  const [selectedCustomer, setSelectedCustomer] = useState(customerAccounts[0])
  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Customer Portal Management</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Globe className="mr-2 h-4 w-4" />
            Launch Portal
          </Button>
        </div>
      </div>

      <Tabs defaultValue="accounts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="accounts">Customer Accounts</TabsTrigger>
          <TabsTrigger value="portal-config">Portal Configuration</TabsTrigger>
          <TabsTrigger value="support">Support Tickets</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Portal Users</CardTitle>
                <Smartphone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,923</div>
                <p className="text-xs text-muted-foreground">67.5% adoption rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,230</div>
                <p className="text-xs text-muted-foreground">-8% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">5 high priority</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Account Details</CardTitle>
                <CardDescription>Manage individual customer accounts and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  value={selectedCustomer.id}
                  onValueChange={(value) => {
                    const customer = customerAccounts.find((c) => c.id === value)
                    if (customer) setSelectedCustomer(customer)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {customerAccounts.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name} - {customer.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Account Status:</span>
                    <Badge variant={selectedCustomer.accountStatus === "Active" ? "default" : "secondary"}>
                      {selectedCustomer.accountStatus}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Current Balance:</span>
                    <span
                      className={`text-sm font-medium ${selectedCustomer.balance > 0 ? "text-red-600" : "text-green-600"}`}
                    >
                      ${selectedCustomer.balance.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Service Type:</span>
                    <span className="text-sm">{selectedCustomer.serviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Meter Number:</span>
                    <span className="text-sm">{selectedCustomer.meterNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Current Usage:</span>
                    <span className="text-sm">{selectedCustomer.currentUsage.toLocaleString()} gal</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    View Portal
                  </Button>
                  <Button size="sm" variant="outline">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Trends</CardTitle>
                <CardDescription>Customer water usage and billing history</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="portal-config" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portal Configuration</CardTitle>
              <CardDescription>Configure customer portal settings and features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">General Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-pay">Enable Auto-Pay</Label>
                      <Switch id="auto-pay" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="paperless">Paperless Billing</Label>
                      <Switch id="paperless" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="usage-alerts">Usage Alerts</Label>
                      <Switch id="usage-alerts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="maintenance-notifications">Maintenance Notifications</Label>
                      <Switch id="maintenance-notifications" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Security Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <Switch id="two-factor" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="session-timeout">Auto Session Timeout</Label>
                      <Switch id="session-timeout" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-alerts">Login Alerts</Label>
                      <Switch id="login-alerts" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Portal Features</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center space-x-2">
                    <Switch id="bill-pay" defaultChecked />
                    <Label htmlFor="bill-pay">Online Bill Payment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="usage-history" defaultChecked />
                    <Label htmlFor="usage-history">Usage History</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="service-requests" defaultChecked />
                    <Label htmlFor="service-requests">Service Requests</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="outage-map" defaultChecked />
                    <Label htmlFor="outage-map">Outage Map</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="conservation-tips" />
                    <Label htmlFor="conservation-tips">Conservation Tips</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="leak-detection" />
                    <Label htmlFor="leak-detection">Leak Detection Alerts</Label>
                  </div>
                </div>
              </div>

              <Button>Save Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Support Tickets</CardTitle>
                <CardDescription>Manage customer support requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{ticket.subject}</p>
                        <p className="text-xs text-muted-foreground">
                          {ticket.id} • {ticket.category}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge variant={ticket.status === "Open" ? "destructive" : "default"} className="text-xs">
                            {ticket.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {ticket.priority}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create Support Ticket</CardTitle>
                <CardDescription>Create a new support ticket for testing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Enter ticket subject"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newTicket.category}
                      onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="service">Service Issue</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newTicket.priority}
                      onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the issue or request"
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  />
                </div>
                <Button>Create Ticket</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="communications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Communications</CardTitle>
              <CardDescription>Manage notifications and announcements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Send Announcement</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="announcement-title">Title</Label>
                      <Input id="announcement-title" placeholder="Announcement title" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="announcement-message">Message</Label>
                      <Textarea id="announcement-message" placeholder="Announcement message" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="announcement-type">Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="outage">Service Outage</SelectItem>
                          <SelectItem value="billing">Billing Update</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button>
                      <Send className="mr-2 h-4 w-4" />
                      Send Announcement
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Notification Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <Switch id="sms-notifications" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <Switch id="push-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emergency-alerts">Emergency Alerts</Label>
                      <Switch id="emergency-alerts" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
