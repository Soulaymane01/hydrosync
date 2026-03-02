"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Target, Brain } from "lucide-react"
import { RoleGuard } from "@/components/role-guard"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"

const forecastData = [
  { month: "Jan", actual: 78000, predicted: 79500, confidence: 95 },
  { month: "Feb", actual: 82000, predicted: 83200, confidence: 94 },
  { month: "Mar", actual: 75000, predicted: 76800, confidence: 96 },
  { month: "Apr", actual: null, predicted: 81500, confidence: 92 },
  { month: "May", actual: null, predicted: 85200, confidence: 89 },
  { month: "Jun", actual: null, predicted: 88900, confidence: 87 },
]

const demandPatterns = [
  { hour: "00:00", residential: 120, commercial: 80, industrial: 200 },
  { hour: "06:00", residential: 180, commercial: 120, industrial: 220 },
  { hour: "12:00", residential: 250, commercial: 300, industrial: 180 },
  { hour: "18:00", residential: 320, commercial: 200, industrial: 160 },
  { hour: "24:00", residential: 140, commercial: 90, industrial: 190 },
]

const efficiencyMetrics = [
  { metric: "Network Efficiency", current: 94.2, target: 95.0, trend: "up" },
  { metric: "Revenue Collection", current: 97.8, target: 98.0, trend: "up" },
  { metric: "Customer Satisfaction", current: 89.5, target: 90.0, trend: "down" },
  { metric: "Response Time", current: 2.3, target: 2.0, trend: "down", unit: "hours" },
]

const predictiveInsights = [
  {
    id: 1,
    title: "Peak Demand Forecast",
    description: "Summer peak demand expected to increase by 15% based on weather patterns",
    impact: "High",
    confidence: 87,
    recommendation: "Increase reservoir capacity and optimize distribution",
  },
  {
    id: 2,
    title: "Meter Failure Prediction",
    description: "12 meters in East Region likely to fail within next 30 days",
    impact: "Medium",
    confidence: 92,
    recommendation: "Schedule preventive maintenance for identified meters",
  },
  {
    id: 3,
    title: "Revenue Optimization",
    description: "Billing cycle adjustment could improve collection rate by 2.3%",
    impact: "Medium",
    confidence: 78,
    recommendation: "Implement staggered billing cycles for better cash flow",
  },
]

const customerSegments = [
  { name: "Residential", value: 2456, color: "#3b82f6", percentage: 86.3 },
  { name: "Commercial", value: 312, color: "#10b981", percentage: 11.0 },
  { name: "Industrial", value: 79, color: "#f59e0b", percentage: 2.7 },
]

export default function AdvancedAnalyticsPage() {
  const [forecastPeriod, setForecastPeriod] = useState("6months")
  const [analysisType, setAnalysisType] = useState("consumption")

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "High":
        return <Badge variant="destructive">High Impact</Badge>
      case "Medium":
        return <Badge variant="secondary">Medium Impact</Badge>
      case "Low":
        return <Badge variant="outline">Low Impact</Badge>
      default:
        return <Badge variant="outline">{impact}</Badge>
    }
  }

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  return (
    <RoleGuard requiredResource="analytics" requiredAction="read">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advanced Analytics</h1>
          <p className="text-muted-foreground">AI-powered insights and predictive analytics for your water network</p>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid gap-4 md:grid-cols-4">
          {efficiencyMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
                {getTrendIcon(metric.trend)}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metric.current}
                  {metric.unit ? ` ${metric.unit}` : "%"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Target: {metric.target}
                  {metric.unit ? ` ${metric.unit}` : "%"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="forecasting" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="forecasting">Demand Forecasting</TabsTrigger>
            <TabsTrigger value="patterns">Usage Patterns</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
          </TabsList>

          <TabsContent value="forecasting" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Demand Forecasting</CardTitle>
                <CardDescription>AI-powered predictions for water consumption and demand planning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="Forecast period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3months">3 Months</SelectItem>
                      <SelectItem value="6months">6 Months</SelectItem>
                      <SelectItem value="12months">12 Months</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={analysisType} onValueChange={setAnalysisType}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="Analysis type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consumption">Water Consumption</SelectItem>
                      <SelectItem value="revenue">Revenue Forecast</SelectItem>
                      <SelectItem value="demand">Peak Demand</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Brain className="mr-2 h-4 w-4" />
                    Regenerate Forecast
                  </Button>
                </div>

                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={forecastData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="actual"
                        stackId="1"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="predicted"
                        stackId="2"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.4}
                        strokeDasharray="5 5"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">92%</div>
                        <div className="text-sm text-muted-foreground">Forecast Accuracy</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">+8.5%</div>
                        <div className="text-sm text-muted-foreground">Predicted Growth</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">15%</div>
                        <div className="text-sm text-muted-foreground">Seasonal Variance</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Usage Patterns</CardTitle>
                  <CardDescription>Water consumption patterns by customer type throughout the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={demandPatterns} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="residential"
                          stackId="1"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="commercial"
                          stackId="1"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="industrial"
                          stackId="1"
                          stroke="#f59e0b"
                          fill="#f59e0b"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Segmentation</CardTitle>
                  <CardDescription>Distribution of customers by type and consumption patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={customerSegments}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {customerSegments.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center space-x-4 mt-4">
                    {customerSegments.map((segment) => (
                      <div key={segment.name} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }}></div>
                        <span className="text-sm">
                          {segment.name}: {segment.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Insights</CardTitle>
                <CardDescription>
                  Machine learning insights and recommendations for operational optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {predictiveInsights.map((insight) => (
                    <div key={insight.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Brain className="h-5 w-5 text-blue-600" />
                          <h4 className="font-semibold">{insight.title}</h4>
                          {getImpactBadge(insight.impact)}
                        </div>
                        <Badge variant="outline">{insight.confidence}% confidence</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-blue-900">Recommendation:</p>
                        <p className="text-sm text-blue-800">{insight.recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Network Optimization</CardTitle>
                  <CardDescription>Optimize distribution network for efficiency and cost reduction</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Pressure Optimization</div>
                      <div className="text-sm text-muted-foreground">Reduce energy costs by 12%</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Target className="mr-2 h-4 w-4" />
                      Apply
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Route Optimization</div>
                      <div className="text-sm text-muted-foreground">Improve maintenance efficiency by 18%</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Target className="mr-2 h-4 w-4" />
                      Apply
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Demand Balancing</div>
                      <div className="text-sm text-muted-foreground">Reduce peak load by 8%</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Target className="mr-2 h-4 w-4" />
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Optimization</CardTitle>
                  <CardDescription>Identify opportunities for operational cost savings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Energy Efficiency</span>
                      <span className="text-green-600 font-semibold">$2,400/month</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Optimize pump schedules during off-peak hours</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Maintenance Scheduling</span>
                      <span className="text-green-600 font-semibold">$1,800/month</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Predictive maintenance reduces emergency repairs
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Billing Optimization</span>
                      <span className="text-green-600 font-semibold">$950/month</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Automated billing reduces processing costs</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </RoleGuard>
  )
}
