"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Droplets, Thermometer, Zap, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react"

const qualityData = [
  { date: "2024-01-10", ph: 7.2, chlorine: 0.8, turbidity: 0.3, temperature: 18.5 },
  { date: "2024-01-11", ph: 7.1, chlorine: 0.9, turbidity: 0.2, temperature: 19.2 },
  { date: "2024-01-12", ph: 7.3, chlorine: 0.7, turbidity: 0.4, temperature: 18.8 },
  { date: "2024-01-13", ph: 7.0, chlorine: 1.0, turbidity: 0.3, temperature: 19.5 },
  { date: "2024-01-14", ph: 7.2, chlorine: 0.8, turbidity: 0.2, temperature: 18.9 },
  { date: "2024-01-15", ph: 7.4, chlorine: 0.9, turbidity: 0.3, temperature: 19.1 },
]

const testResults = [
  {
    id: "QT-2024-001",
    location: "North Treatment Plant",
    testDate: "2024-01-15",
    testTime: "08:30",
    ph: 7.2,
    chlorine: 0.8,
    turbidity: 0.3,
    bacteria: "Negative",
    status: "Pass",
    technician: "Dr. Sarah Chen",
  },
  {
    id: "QT-2024-002",
    location: "South Distribution Point",
    testDate: "2024-01-15",
    testTime: "10:15",
    ph: 7.1,
    chlorine: 0.9,
    turbidity: 0.2,
    bacteria: "Negative",
    status: "Pass",
    technician: "Mike Rodriguez",
  },
  {
    id: "QT-2024-003",
    location: "East Reservoir",
    testDate: "2024-01-14",
    testTime: "14:45",
    ph: 6.8,
    chlorine: 0.5,
    turbidity: 0.6,
    bacteria: "Negative",
    status: "Warning",
    technician: "Dr. Sarah Chen",
  },
  {
    id: "QT-2024-004",
    location: "Central Processing",
    testDate: "2024-01-14",
    testTime: "09:20",
    ph: 7.3,
    chlorine: 1.1,
    turbidity: 0.4,
    bacteria: "Negative",
    status: "Pass",
    technician: "Jennifer Adams",
  },
]

const alerts = [
  {
    id: "QA-001",
    location: "East Reservoir",
    parameter: "pH Level",
    value: 6.8,
    threshold: "7.0 - 8.5",
    severity: "Medium",
    timestamp: "2024-01-14 14:45",
    status: "Active",
  },
  {
    id: "QA-002",
    location: "West Distribution",
    parameter: "Chlorine",
    value: 0.4,
    threshold: "0.5 - 2.0 mg/L",
    severity: "High",
    timestamp: "2024-01-13 16:30",
    status: "Resolved",
  },
]

export default function WaterQualityPage() {
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedParameter, setSelectedParameter] = useState("ph")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pass":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Pass
          </Badge>
        )
      case "Warning":
        return (
          <Badge variant="secondary">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Warning
          </Badge>
        )
      case "Fail":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Fail
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

  const getParameterInfo = (param: string) => {
    switch (param) {
      case "ph":
        return { name: "pH Level", unit: "", range: "6.5 - 8.5", icon: Zap }
      case "chlorine":
        return { name: "Chlorine", unit: "mg/L", range: "0.5 - 2.0", icon: Droplets }
      case "turbidity":
        return { name: "Turbidity", unit: "NTU", range: "< 1.0", icon: TrendingUp }
      case "temperature":
        return { name: "Temperature", unit: "°C", range: "15 - 25", icon: Thermometer }
      default:
        return { name: param, unit: "", range: "", icon: Droplets }
    }
  }

  const paramInfo = getParameterInfo(selectedParameter)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Water Quality</h1>
        <p className="text-muted-foreground">Monitor water quality parameters and compliance standards</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tests Today</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across all locations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98.5%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">1</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg pH Level</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2</div>
            <p className="text-xs text-muted-foreground">Within normal range</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monitoring" className="space-y-4">
        <TabsList>
          <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
          <TabsTrigger value="tests">Test Results</TabsTrigger>
          <TabsTrigger value="alerts">Quality Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Parameter Monitoring</CardTitle>
              <CardDescription>Real-time water quality parameter tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Select value={selectedParameter} onValueChange={setSelectedParameter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Select parameter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ph">pH Level</SelectItem>
                    <SelectItem value="chlorine">Chlorine (mg/L)</SelectItem>
                    <SelectItem value="turbidity">Turbidity (NTU)</SelectItem>
                    <SelectItem value="temperature">Temperature (°C)</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="north">North Treatment Plant</SelectItem>
                    <SelectItem value="south">South Distribution</SelectItem>
                    <SelectItem value="east">East Reservoir</SelectItem>
                    <SelectItem value="west">West Distribution</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <ChartContainer
                    config={{
                      [selectedParameter]: {
                        label: paramInfo.name,
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={qualityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey={selectedParameter} stroke="var(--color-ph)" strokeWidth={2} />
                        {/* Reference lines for acceptable ranges */}
                        {selectedParameter === "ph" && (
                          <>
                            <ReferenceLine y={6.5} stroke="#ef4444" strokeDasharray="5 5" />
                            <ReferenceLine y={8.5} stroke="#ef4444" strokeDasharray="5 5" />
                          </>
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Current Reading</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <paramInfo.icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="text-2xl font-bold">
                            {qualityData[qualityData.length - 1][selectedParameter as keyof (typeof qualityData)[0]]}
                            {paramInfo.unit && ` ${paramInfo.unit}`}
                          </div>
                          <div className="text-sm text-muted-foreground">Range: {paramInfo.range}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Within Normal Range
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laboratory Test Results</CardTitle>
              <CardDescription>Detailed water quality test results from all monitoring locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Test ID</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Date/Time</TableHead>
                      <TableHead>pH</TableHead>
                      <TableHead>Chlorine</TableHead>
                      <TableHead>Turbidity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Technician</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testResults.map((test) => (
                      <TableRow key={test.id}>
                        <TableCell className="font-medium">{test.id}</TableCell>
                        <TableCell>{test.location}</TableCell>
                        <TableCell>
                          <div>
                            <div>{test.testDate}</div>
                            <div className="text-sm text-muted-foreground">{test.testTime}</div>
                          </div>
                        </TableCell>
                        <TableCell>{test.ph}</TableCell>
                        <TableCell>{test.chlorine} mg/L</TableCell>
                        <TableCell>{test.turbidity} NTU</TableCell>
                        <TableCell>{getStatusBadge(test.status)}</TableCell>
                        <TableCell>{test.technician}</TableCell>
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
              <CardTitle>Quality Alerts</CardTitle>
              <CardDescription>Monitor and manage water quality alerts and violations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{alert.parameter} Alert</span>
                          {getSeverityBadge(alert.severity)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {alert.location}: {alert.value} (Threshold: {alert.threshold})
                        </p>
                        <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={alert.status === "Active" ? "destructive" : "default"}>{alert.status}</Badge>
                      <Button variant="outline" size="sm">
                        {alert.status === "Active" ? "Resolve" : "View"}
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
