"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MapPin, Activity, AlertTriangle, CheckCircle, Settings } from "lucide-react"

const meters = [
  {
    id: "M-2847",
    clientId: "C-1001",
    clientName: "John Smith",
    location: "123 Oak Street, North Region",
    type: "Smart Digital",
    status: "Active",
    lastReading: "2024-01-15 14:32",
    currentReading: 1247.5,
    batteryLevel: 85,
    signalStrength: 92,
    installDate: "2022-03-15",
  },
  {
    id: "M-2848",
    clientId: "C-1002",
    clientName: "Sarah Johnson",
    location: "456 Pine Avenue, South Region",
    type: "Smart Digital",
    status: "Active",
    lastReading: "2024-01-15 13:45",
    currentReading: 892.3,
    batteryLevel: 78,
    signalStrength: 88,
    installDate: "2022-05-20",
  },
  {
    id: "M-2849",
    clientId: "C-1003",
    clientName: "Mike Davis",
    location: "789 Elm Drive, East Region",
    type: "Smart Digital",
    status: "Error",
    lastReading: "2024-01-10 09:15",
    currentReading: 1456.8,
    batteryLevel: 15,
    signalStrength: 45,
    installDate: "2021-11-08",
  },
  {
    id: "M-2850",
    clientId: "C-1004",
    clientName: "Emily Wilson",
    location: "321 Maple Lane, West Region",
    type: "Mechanical",
    status: "Active",
    lastReading: "2024-01-14 16:20",
    currentReading: 634.2,
    batteryLevel: null,
    signalStrength: null,
    installDate: "2020-08-12",
  },
  {
    id: "M-2851",
    clientId: "C-1005",
    clientName: "Robert Brown",
    location: "654 Cedar Court, Central Region",
    type: "Smart Digital",
    status: "Maintenance",
    lastReading: "2024-01-12 11:30",
    currentReading: 2134.7,
    batteryLevel: 92,
    signalStrength: 95,
    installDate: "2023-01-25",
  },
]

const meterAlerts = [
  {
    id: "ALT-001",
    meterId: "M-2849",
    type: "Low Battery",
    severity: "High",
    message: "Battery level critically low (15%)",
    timestamp: "2024-01-15 10:30",
    status: "Active",
  },
  {
    id: "ALT-002",
    meterId: "M-2849",
    type: "Weak Signal",
    severity: "Medium",
    message: "Signal strength below threshold (45%)",
    timestamp: "2024-01-15 10:25",
    status: "Active",
  },
  {
    id: "ALT-003",
    meterId: "M-2851",
    type: "Maintenance Due",
    severity: "Low",
    message: "Scheduled maintenance required",
    timestamp: "2024-01-14 08:00",
    status: "Acknowledged",
  },
]

export default function MetersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredMeters = meters.filter((meter) => {
    const matchesSearch =
      meter.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meter.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meter.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || meter.status.toLowerCase() === statusFilter
    const matchesType = typeFilter === "all" || meter.type.toLowerCase().includes(typeFilter.toLowerCase())
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        )
      case "Error":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Error
          </Badge>
        )
      case "Maintenance":
        return (
          <Badge variant="secondary">
            <Settings className="w-3 h-3 mr-1" />
            Maintenance
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "High":
        return <Badge variant="destructive">High</Badge>
      case "Medium":
        return <Badge variant="secondary">Medium</Badge>
      case "Low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  const getBatteryColor = (level: number | null) => {
    if (level === null) return "text-gray-400"
    if (level < 20) return "text-red-600"
    if (level < 50) return "text-orange-600"
    return "text-green-600"
  }

  const getSignalColor = (strength: number | null) => {
    if (strength === null) return "text-gray-400"
    if (strength < 50) return "text-red-600"
    if (strength < 80) return "text-orange-600"
    return "text-green-600"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Smart Meters</h1>
        <p className="text-muted-foreground">Monitor and manage your water meter network</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Meters</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,855</div>
            <p className="text-xs text-muted-foreground">Across all regions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Meters</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">2,824</div>
            <p className="text-xs text-muted-foreground">98.9% operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Status</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">23</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <Settings className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">8</div>
            <p className="text-xs text-muted-foreground">Scheduled maintenance</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="meters" className="space-y-4">
        <TabsList>
          <TabsTrigger value="meters">Meter Management</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="meters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meter Database</CardTitle>
              <CardDescription>Monitor and manage all water meters in your network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by meter ID, client name, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="smart">Smart Digital</SelectItem>
                    <SelectItem value="mechanical">Mechanical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Meter ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead className="hidden lg:table-cell">Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Reading</TableHead>
                      <TableHead className="hidden sm:table-cell">Battery</TableHead>
                      <TableHead className="hidden sm:table-cell">Signal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMeters.map((meter) => (
                      <TableRow key={meter.id}>
                        <TableCell className="font-medium">{meter.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{meter.clientName}</div>
                            <div className="text-sm text-muted-foreground">{meter.clientId}</div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{meter.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>{meter.type}</TableCell>
                        <TableCell>{getStatusBadge(meter.status)}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div>
                            <div className="font-medium">{meter.currentReading} m³</div>
                            <div className="text-xs text-muted-foreground">{meter.lastReading}</div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <span className={getBatteryColor(meter.batteryLevel)}>
                            {meter.batteryLevel ? `${meter.batteryLevel}%` : "N/A"}
                          </span>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <span className={getSignalColor(meter.signalStrength)}>
                            {meter.signalStrength ? `${meter.signalStrength}%` : "N/A"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
              <CardDescription>Monitor meter issues and maintenance requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {meterAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{alert.type}</span>
                          {getSeverityBadge(alert.severity)}
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">
                          Meter: {alert.meterId} • {alert.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={alert.status === "Active" ? "destructive" : "secondary"}>{alert.status}</Badge>
                      <Button variant="outline" size="sm">
                        Resolve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
