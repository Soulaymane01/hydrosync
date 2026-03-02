"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Download, TrendingUp, Users, Droplets, AlertTriangle } from "lucide-react"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"

const consumptionData = [
  { region: "North", consumption: 15000, customers: 245, avgPerCustomer: 61.2 },
  { region: "South", consumption: 18000, customers: 312, avgPerCustomer: 57.7 },
  { region: "East", consumption: 12000, customers: 198, avgPerCustomer: 60.6 },
  { region: "West", consumption: 13000, customers: 234, avgPerCustomer: 55.6 },
  { region: "Central", consumption: 20000, customers: 456, avgPerCustomer: 43.9 },
]

const monthlyTrends = [
  { month: "Jul", consumption: 65000, revenue: 97500, customers: 2780 },
  { month: "Aug", consumption: 68000, revenue: 102000, customers: 2795 },
  { month: "Sep", consumption: 62000, revenue: 93000, customers: 2810 },
  { month: "Oct", consumption: 58000, revenue: 87000, customers: 2825 },
  { month: "Nov", consumption: 61000, revenue: 91500, customers: 2835 },
  { month: "Dec", consumption: 70000, revenue: 105000, customers: 2847 },
]

const meterStatusData = [
  { name: "Active", value: 2824, color: "#22c55e" },
  { name: "Error", value: 23, color: "#ef4444" },
  { name: "Maintenance", value: 8, color: "#f59e0b" },
]

const topConsumers = [
  { id: "C-1156", name: "Industrial Complex A", consumption: 2450, region: "Central" },
  { id: "C-2234", name: "Shopping Mall B", consumption: 1890, region: "South" },
  { id: "C-3345", name: "Office Building C", consumption: 1650, region: "North" },
  { id: "C-4456", name: "Residential Complex D", consumption: 1420, region: "West" },
  { id: "C-5567", name: "Manufacturing Plant E", consumption: 1380, region: "East" },
]

export default function ReportsPage() {
  const [reportType, setReportType] = useState("consumption")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })

  const handleExportReport = () => {
    // In real app, this would generate and download the report
    alert("Report exported successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into your water network performance</p>
        </div>
        <Button onClick={handleExportReport}>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Report Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
          <CardDescription>Customize your report parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consumption">Consumption Analysis</SelectItem>
                <SelectItem value="revenue">Revenue Report</SelectItem>
                <SelectItem value="customer">Customer Analytics</SelectItem>
                <SelectItem value="operational">Operational Report</SelectItem>
              </SelectContent>
            </Select>
            <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Consumption</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78,000 m³</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.2%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12</span> new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$117,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Efficiency</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.7%</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                Excellent
              </Badge>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Consumption, revenue, and customer growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                consumption: {
                  label: "Consumption (m³)",
                  color: "hsl(var(--chart-1))",
                },
                revenue: {
                  label: "Revenue ($)",
                  color: "hsl(var(--chart-2))",
                },
                customers: {
                  label: "Customers",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="consumption" stroke="var(--color-consumption)" strokeWidth={2} />
                  <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meter Status Distribution</CardTitle>
            <CardDescription>Current status of all water meters in the network</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                active: {
                  label: "Active",
                  color: "#22c55e",
                },
                error: {
                  label: "Error",
                  color: "#ef4444",
                },
                maintenance: {
                  label: "Maintenance",
                  color: "#f59e0b",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={meterStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {meterStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {meterStatusData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Consumption Analysis</CardTitle>
          <CardDescription>Water consumption breakdown by geographic region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <ChartContainer
                config={{
                  consumption: {
                    label: "Consumption (m³)",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[250px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={consumptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="consumption" fill="var(--color-consumption)" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Regional Performance Metrics</h4>
              <div className="space-y-3">
                {consumptionData.map((region) => (
                  <div key={region.region} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{region.region} Region</div>
                      <div className="text-sm text-muted-foreground">{region.customers} customers</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{region.consumption.toLocaleString()} m³</div>
                      <div className="text-sm text-muted-foreground">{region.avgPerCustomer} m³/customer</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Consumers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Water Consumers</CardTitle>
          <CardDescription>Highest consuming customers in the current period</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Customer ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Consumption (m³)</TableHead>
                <TableHead>% of Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topConsumers.map((consumer, index) => (
                <TableRow key={consumer.id}>
                  <TableCell>
                    <Badge variant={index < 3 ? "default" : "secondary"}>#{index + 1}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{consumer.id}</TableCell>
                  <TableCell>{consumer.name}</TableCell>
                  <TableCell>{consumer.region}</TableCell>
                  <TableCell className="font-semibold">{consumer.consumption.toLocaleString()}</TableCell>
                  <TableCell>{((consumer.consumption / 78000) * 100).toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
