"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Bell, DollarSign, Users, Shield, Database } from "lucide-react"

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [maintenanceAlerts, setMaintenanceAlerts] = useState(true)
  const [paymentReminders, setPaymentReminders] = useState(true)
  const [autoBackup, setAutoBackup] = useState(true)
  const [dataRetention, setDataRetention] = useState("12")
  const [currency, setCurrency] = useState("USD")
  const [timezone, setTimezone] = useState("America/New_York")
  const [waterRate, setWaterRate] = useState("1.50")
  const [lateFee, setLateFee] = useState("25.00")

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    // In real app, this would save settings to backend
    alert("Settings saved successfully!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">Configure your HydroSync system preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic system configuration and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="HydroSync Water Utilities" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="CAD">CAD (C$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="data-retention">Data Retention (months)</Label>
                    <Select value={dataRetention} onValueChange={setDataRetention}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="36">36 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">System Features</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Automatic Backup</Label>
                        <p className="text-sm text-muted-foreground">Automatically backup system data daily</p>
                      </div>
                      <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
                    </div>
                  </div>
                </div>

                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how and when you receive system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium flex items-center">
                    <Bell className="mr-2 h-4 w-4" />
                    Delivery Methods
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                      </div>
                      <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Alert Types</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Maintenance Alerts</Label>
                        <p className="text-sm text-muted-foreground">Notifications for meter maintenance and issues</p>
                      </div>
                      <Switch checked={maintenanceAlerts} onCheckedChange={setMaintenanceAlerts} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Payment Reminders</Label>
                        <p className="text-sm text-muted-foreground">Automatic payment reminder notifications</p>
                      </div>
                      <Switch checked={paymentReminders} onCheckedChange={setPaymentReminders} />
                    </div>
                  </div>
                </div>

                <Button>Save Notification Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing Configuration</CardTitle>
              <CardDescription>Set up billing rates and payment options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="water-rate">Water Rate (per m³)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="water-rate"
                        value={waterRate}
                        onChange={(e) => setWaterRate(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="late-fee">Late Payment Fee</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="late-fee"
                        value={lateFee}
                        onChange={(e) => setLateFee(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Payment Methods</h4>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Credit/Debit Cards</div>
                        <div className="text-sm text-muted-foreground">Visa, MasterCard, American Express</div>
                      </div>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Bank Transfer</div>
                        <div className="text-sm text-muted-foreground">ACH and wire transfers</div>
                      </div>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Auto-Pay</div>
                        <div className="text-sm text-muted-foreground">Automatic recurring payments</div>
                      </div>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Cash Payments</div>
                        <div className="text-sm text-muted-foreground">In-person cash payments</div>
                      </div>
                      <Badge variant="secondary">Disabled</Badge>
                    </div>
                  </div>
                </div>

                <Button>Save Billing Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage system users and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Active Users
                  </h4>
                  <Button>Add New User</Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        AU
                      </div>
                      <div>
                        <div className="font-medium">Admin User</div>
                        <div className="text-sm text-muted-foreground">admin@hydrosync.com</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">Administrator</Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        JD
                      </div>
                      <div>
                        <div className="font-medium">Jane Doe</div>
                        <div className="text-sm text-muted-foreground">jane.doe@hydrosync.com</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">Operator</Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security policies and access controls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    Password Policy
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Minimum Password Length</Label>
                      <Select defaultValue="8">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6 characters</SelectItem>
                          <SelectItem value="8">8 characters</SelectItem>
                          <SelectItem value="12">12 characters</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Session Timeout</Label>
                      <Select defaultValue="60">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                          <SelectItem value="480">8 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium flex items-center">
                    <Database className="mr-2 h-4 w-4" />
                    Data Security
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Data Encryption</div>
                        <div className="text-sm text-muted-foreground">AES-256 encryption for sensitive data</div>
                      </div>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Audit Logging</div>
                        <div className="text-sm text-muted-foreground">Track all system access and changes</div>
                      </div>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Two-Factor Authentication</div>
                        <div className="text-sm text-muted-foreground">Additional security for user accounts</div>
                      </div>
                      <Badge variant="secondary">Available</Badge>
                    </div>
                  </div>
                </div>

                <Button>Save Security Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
