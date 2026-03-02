"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import {
  Wrench,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Zap,
  Droplets,
  Settings,
  FileText,
  QrCode,
  Camera,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const maintenanceData = [
  { month: "Jan", scheduled: 45, completed: 42, emergency: 8 },
  { month: "Feb", scheduled: 38, completed: 35, emergency: 12 },
  { month: "Mar", scheduled: 52, completed: 48, emergency: 6 },
  { month: "Apr", scheduled: 41, completed: 39, emergency: 9 },
  { month: "May", scheduled: 47, completed: 44, emergency: 7 },
  { month: "Jun", scheduled: 55, completed: 52, emergency: 11 },
]

const assetCategories = [
  {
    id: "pumps",
    name: "Water Pumps",
    total: 156,
    operational: 148,
    maintenance: 6,
    offline: 2,
    icon: Zap,
    color: "blue",
  },
  {
    id: "pipes",
    name: "Distribution Pipes",
    total: 2847,
    operational: 2798,
    maintenance: 35,
    offline: 14,
    icon: Droplets,
    color: "green",
  },
  {
    id: "valves",
    name: "Control Valves",
    total: 892,
    operational: 875,
    maintenance: 12,
    offline: 5,
    icon: Settings,
    color: "orange",
  },
  {
    id: "meters",
    name: "Smart Meters",
    total: 3245,
    operational: 3198,
    maintenance: 28,
    offline: 19,
    icon: Clock,
    color: "purple",
  },
]

const maintenanceSchedule = [
  {
    id: "MAINT-001",
    asset: "Pump Station #3",
    type: "Preventive",
    priority: "Medium",
    scheduled: "2024-02-01",
    technician: "Mike Johnson",
    status: "Scheduled",
    estimatedHours: 4,
  },
  {
    id: "MAINT-002",
    asset: "Main Distribution Line",
    type: "Inspection",
    priority: "Low",
    scheduled: "2024-02-03",
    technician: "Sarah Wilson",
    status: "In Progress",
    estimatedHours: 6,
  },
  {
    id: "MAINT-003",
    asset: "Control Valve CV-45",
    type: "Repair",
    priority: "High",
    scheduled: "2024-01-30",
    technician: "David Chen",
    status: "Overdue",
    estimatedHours: 3,
  },
]

const assetDetails = [
  {
    id: "ASSET-001",
    name: "Main Water Pump #1",
    category: "Pumps",
    location: "Station A",
    installDate: "2019-03-15",
    lastMaintenance: "2024-01-15",
    nextMaintenance: "2024-04-15",
    condition: "Good",
    efficiency: 94,
    operatingHours: 8760,
    warrantyExpiry: "2024-03-15",
  },
  {
    id: "ASSET-002",
    name: "Distribution Line DL-North",
    category: "Pipes",
    location: "North District",
    installDate: "2015-08-20",
    lastMaintenance: "2023-11-10",
    nextMaintenance: "2024-05-10",
    condition: "Fair",
    efficiency: 87,
    operatingHours: null,
    warrantyExpiry: "Expired",
  },
]

export default function AssetsPage() {
  const [selectedAsset, setSelectedAsset] = useState(assetDetails[0])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Asset Management & Maintenance</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <QrCode className="mr-2 h-4 w-4" />
            Scan Asset
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assets">Asset Registry</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="lifecycle">Lifecycle Management</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7,140</div>
                <p className="text-xs text-muted-foreground">Across all categories</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Operational</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7,019</div>
                <p className="text-xs text-muted-foreground">98.3% availability</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Under Maintenance</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">81</div>
                <p className="text-xs text-muted-foreground">1.1% of total</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">40</div>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Asset Categories</CardTitle>
                <CardDescription>Status overview by asset category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {assetCategories.map((category) => {
                  const Icon = category.icon
                  const operationalPercentage = (category.operational / category.total) * 100

                  return (
                    <div key={category.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon className="h-4 w-4" />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {category.operational}/{category.total}
                        </span>
                      </div>
                      <Progress value={operationalPercentage} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{operationalPercentage.toFixed(1)}% operational</span>
                        <div className="space-x-2">
                          <span>{category.maintenance} maintenance</span>
                          <span>{category.offline} offline</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance Activity</CardTitle>
                <CardDescription>Monthly maintenance trends and completion rates</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={maintenanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="scheduled" fill="#3b82f6" name="Scheduled" />
                    <Bar dataKey="completed" fill="#10b981" name="Completed" />
                    <Bar dataKey="emergency" fill="#ef4444" name="Emergency" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Asset Registry</CardTitle>
                <CardDescription>Comprehensive asset database and tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input placeholder="Search assets..." className="flex-1" />
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="pumps">Pumps</SelectItem>
                      <SelectItem value="pipes">Pipes</SelectItem>
                      <SelectItem value="valves">Valves</SelectItem>
                      <SelectItem value="meters">Meters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  {assetDetails.map((asset) => (
                    <div
                      key={asset.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedAsset.id === asset.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedAsset(asset)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-medium">{asset.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {asset.id} • {asset.category}
                          </p>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-3 w-3" />
                            <span className="text-xs text-muted-foreground">{asset.location}</span>
                          </div>
                        </div>
                        <Badge
                          variant={
                            asset.condition === "Good"
                              ? "default"
                              : asset.condition === "Fair"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {asset.condition}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Asset Details</CardTitle>
                <CardDescription>Detailed information for {selectedAsset.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Asset ID:</span>
                    <span className="text-sm">{selectedAsset.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Category:</span>
                    <span className="text-sm">{selectedAsset.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Location:</span>
                    <span className="text-sm">{selectedAsset.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Install Date:</span>
                    <span className="text-sm">{selectedAsset.installDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Last Maintenance:</span>
                    <span className="text-sm">{selectedAsset.lastMaintenance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Next Maintenance:</span>
                    <span className="text-sm">{selectedAsset.nextMaintenance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Condition:</span>
                    <Badge
                      variant={
                        selectedAsset.condition === "Good"
                          ? "default"
                          : selectedAsset.condition === "Fair"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {selectedAsset.condition}
                    </Badge>
                  </div>
                  {selectedAsset.efficiency && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Efficiency:</span>
                      <span className="text-sm">{selectedAsset.efficiency}%</span>
                    </div>
                  )}
                  {selectedAsset.operatingHours && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Operating Hours:</span>
                      <span className="text-sm">{selectedAsset.operatingHours.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Warranty:</span>
                    <span className={`text-sm ${selectedAsset.warrantyExpiry === "Expired" ? "text-red-600" : ""}`}>
                      {selectedAsset.warrantyExpiry}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Camera className="mr-2 h-4 w-4" />
                    Photos
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Documents
                  </Button>
                  <Button size="sm">
                    <Wrench className="mr-2 h-4 w-4" />
                    Schedule Maintenance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Schedule</CardTitle>
              <CardDescription>Planned and ongoing maintenance activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="preventive">Preventive</SelectItem>
                      <SelectItem value="repair">Repair</SelectItem>
                      <SelectItem value="inspection">Inspection</SelectItem>
                    </SelectContent>
                  </Select>
                  <DatePickerWithRange />
                </div>
                <Button>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule New
                </Button>
              </div>

              <div className="space-y-3">
                {maintenanceSchedule.map((maintenance) => (
                  <div key={maintenance.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{maintenance.asset}</p>
                        <Badge
                          variant={
                            maintenance.status === "Overdue"
                              ? "destructive"
                              : maintenance.status === "In Progress"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {maintenance.status}
                        </Badge>
                        <Badge variant="outline">{maintenance.priority}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {maintenance.type} • {maintenance.scheduled} • {maintenance.estimatedHours}h
                      </p>
                      <p className="text-xs text-muted-foreground">Assigned to: {maintenance.technician}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      <Button size="sm">Update</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lifecycle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Asset Lifecycle Management</CardTitle>
              <CardDescription>Track asset lifecycle stages and replacement planning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">New Assets (0-5 years)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">2,847</div>
                    <p className="text-xs text-muted-foreground">39.9% of total</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Mature Assets (5-15 years)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">3,456</div>
                    <p className="text-xs text-muted-foreground">48.4% of total</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Aging Assets (15+ years)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">837</div>
                    <p className="text-xs text-muted-foreground">11.7% of total</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Replacement Planning</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Main Distribution Pump #2</p>
                      <p className="text-sm text-muted-foreground">Installed: 2008 • Expected replacement: 2025</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">High Priority</Badge>
                        <span className="text-xs text-muted-foreground">Est. Cost: $45,000</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Plan Replacement
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Control Valve System CV-12</p>
                      <p className="text-sm text-muted-foreground">Installed: 2010 • Expected replacement: 2026</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Medium Priority</Badge>
                        <span className="text-xs text-muted-foreground">Est. Cost: $12,500</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Plan Replacement
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Capital Planning</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>2024 Budget Allocated</Label>
                    <div className="text-2xl font-bold">$2.4M</div>
                    <Progress value={65} className="h-2" />
                    <p className="text-xs text-muted-foreground">65% utilized ($1.56M spent)</p>
                  </div>
                  <div className="space-y-2">
                    <Label>2025 Budget Forecast</Label>
                    <div className="text-2xl font-bold">$3.1M</div>
                    <p className="text-xs text-muted-foreground">Based on replacement schedule</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Asset Performance Analytics</CardTitle>
              <CardDescription>Monitor asset efficiency and performance metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Overall Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">92.4%</div>
                    <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Uptime</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">99.2%</div>
                    <p className="text-xs text-muted-foreground">Above target (99.0%)</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Energy Consumption</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">847 kWh</div>
                    <p className="text-xs text-muted-foreground">-5.2% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Maintenance Cost</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$12,450</div>
                    <p className="text-xs text-muted-foreground">Within budget</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Trends</CardTitle>
                    <CardDescription>Asset efficiency over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={maintenanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[80, 100]} />
                        <Tooltip formatter={(value) => [`${value}%`, ""]} />
                        <Line
                          type="monotone"
                          dataKey="completed"
                          stroke="#10b981"
                          strokeWidth={2}
                          name="Efficiency %"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Assets</CardTitle>
                    <CardDescription>Assets with highest efficiency ratings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pump Station #1</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={98} className="w-20 h-2" />
                        <span className="text-sm">98%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Control Valve CV-23</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={96} className="w-20 h-2" />
                        <span className="text-sm">96%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Distribution Line DL-East</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={94} className="w-20 h-2" />
                        <span className="text-sm">94%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Meter Bank MB-12</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={93} className="w-20 h-2" />
                        <span className="text-sm">93%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
