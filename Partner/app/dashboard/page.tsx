"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Line,
  LineChart,
  Area,
  AreaChart,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Droplets, Users, AlertTriangle, DollarSign, TrendingUp } from "lucide-react"

const usageData = [
  { month: "Jan", usage: 45000, revenue: 67500 },
  { month: "Feb", usage: 42000, revenue: 63000 },
  { month: "Mar", usage: 48000, revenue: 72000 },
  { month: "Apr", usage: 51000, revenue: 76500 },
  { month: "May", usage: 55000, revenue: 82500 },
  { month: "Jun", usage: 58000, revenue: 87000 },
]

const regionalData = [
  { region: "North", consumption: 15000 },
  { region: "South", consumption: 18000 },
  { region: "East", consumption: 12000 },
  { region: "West", consumption: 13000 },
  { region: "Central", consumption: 20000 },
]

const dailyUsageData = [
  { day: "Mon", usage: 2400 },
  { day: "Tue", usage: 2210 },
  { day: "Wed", usage: 2290 },
  { day: "Thu", usage: 2000 },
  { day: "Fri", usage: 2181 },
  { day: "Sat", usage: 2500 },
  { day: "Sun", usage: 2100 },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your water network operations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Houses Connected</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meters with Errors</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">23</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="destructive" className="text-xs">
                Urgent
              </Badge>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Water Usage</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78,000 m³</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimated Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$117,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Usage & Revenue Trends</CardTitle>
            <CardDescription>Monthly water usage and revenue over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer
                config={{
                  usage: {
                    label: "Usage (m³)",
                    color: "hsl(var(--chart-1))",
                  },
                  revenue: {
                    label: "Revenue ($)",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={usageData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="usage" stroke="var(--color-usage)" strokeWidth={2} />
                    <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Regional Consumption</CardTitle>
              <CardDescription>Water consumption by region</CardDescription>
            </div>
            <Select defaultValue="current">
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">This Month</SelectItem>
                <SelectItem value="last">Last Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer
                config={{
                  consumption: {
                    label: "Consumption (m³)",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionalData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="consumption" fill="var(--color-consumption)" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Usage Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Usage Trend</CardTitle>
          <CardDescription>Water consumption over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ChartContainer
              config={{
                usage: {
                  label: "Daily Usage (m³)",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyUsageData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="usage"
                    stroke="var(--color-usage)"
                    fill="var(--color-usage)"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system events and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Meter Error Detected</p>
                <p className="text-xs text-muted-foreground">Meter #M-2847 in North Region - 2 hours ago</p>
              </div>
              <Badge variant="destructive">Critical</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Payment Received</p>
                <p className="text-xs text-muted-foreground">Customer #C-1234 paid $156.78 - 4 hours ago</p>
              </div>
              <Badge variant="secondary">Payment</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New Customer Added</p>
                <p className="text-xs text-muted-foreground">John Smith registered in East Region - 6 hours ago</p>
              </div>
              <Badge variant="outline">Registration</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Maintenance Scheduled</p>
                <p className="text-xs text-muted-foreground">Pump Station #PS-12 maintenance tomorrow - 8 hours ago</p>
              </div>
              <Badge variant="outline">Maintenance</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Quality Test Completed</p>
                <p className="text-xs text-muted-foreground">Water quality test passed for Zone A - 12 hours ago</p>
              </div>
              <Badge variant="secondary">Quality</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
