"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Leaf,
  Droplets,
  Zap,
  Recycle,
  TrendingDown,
  TrendingUp,
  CheckCircle,
  Target,
  Award,
  FileText,
  Download,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

const environmentalData = [
  { month: "Jan", waterSaved: 125000, energyUsed: 45000, carbonFootprint: 12.5, efficiency: 92 },
  { month: "Feb", waterSaved: 132000, energyUsed: 43000, carbonFootprint: 11.8, efficiency: 94 },
  { month: "Mar", waterSaved: 128000, energyUsed: 44000, carbonFootprint: 12.1, efficiency: 93 },
  { month: "Apr", waterSaved: 145000, energyUsed: 42000, carbonFootprint: 11.2, efficiency: 95 },
  { month: "May", waterSaved: 158000, energyUsed: 41000, carbonFootprint: 10.8, efficiency: 96 },
  { month: "Jun", waterSaved: 162000, energyUsed: 40000, carbonFootprint: 10.5, efficiency: 97 },
]

const sustainabilityGoals = [
  {
    id: "water-conservation",
    title: "Water Conservation",
    target: "Reduce water loss by 15%",
    current: 12.3,
    target_value: 15,
    unit: "%",
    status: "On Track",
    deadline: "2024-12-31",
    icon: Droplets,
    color: "blue",
  },
  {
    id: "energy-efficiency",
    title: "Energy Efficiency",
    target: "Reduce energy consumption by 20%",
    current: 18.5,
    target_value: 20,
    unit: "%",
    status: "On Track",
    deadline: "2024-12-31",
    icon: Zap,
    color: "yellow",
  },
  {
    id: "carbon-reduction",
    title: "Carbon Footprint",
    target: "Reduce CO2 emissions by 25%",
    current: 22.1,
    target_value: 25,
    unit: "%",
    status: "Ahead",
    deadline: "2024-12-31",
    icon: Leaf,
    color: "green",
  },
  {
    id: "waste-reduction",
    title: "Waste Reduction",
    target: "Achieve 90% recycling rate",
    current: 87,
    target_value: 90,
    unit: "%",
    status: "Behind",
    deadline: "2024-12-31",
    icon: Recycle,
    color: "purple",
  },
]

const certifications = [
  {
    id: "iso-14001",
    name: "ISO 14001",
    description: "Environmental Management System",
    status: "Certified",
    expiry: "2025-06-15",
    level: "Gold",
  },
  {
    id: "leed",
    name: "LEED Certification",
    description: "Leadership in Energy and Environmental Design",
    status: "Certified",
    expiry: "2026-03-20",
    level: "Platinum",
  },
  {
    id: "water-stewardship",
    name: "Water Stewardship",
    description: "Alliance for Water Stewardship Standard",
    status: "In Progress",
    expiry: "2024-09-30",
    level: "Core",
  },
]

const impactMetrics = [
  {
    metric: "Water Saved",
    value: "1.2M",
    unit: "gallons",
    change: "+15%",
    trend: "up",
    description: "Through leak detection and conservation programs",
  },
  {
    metric: "Energy Reduced",
    value: "245",
    unit: "MWh",
    change: "-18%",
    trend: "down",
    description: "Smart pump optimization and LED upgrades",
  },
  {
    metric: "CO2 Avoided",
    value: "89",
    unit: "tons",
    change: "-22%",
    trend: "down",
    description: "Renewable energy and efficiency improvements",
  },
  {
    metric: "Waste Diverted",
    value: "15.6",
    unit: "tons",
    change: "+12%",
    trend: "up",
    description: "Recycling and waste reduction initiatives",
  },
]

export default function EnvironmentalPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Environmental Impact Monitoring</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Sustainability Report
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate ESG Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">Sustainability Goals</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="reporting">ESG Reporting</TabsTrigger>
          <TabsTrigger value="initiatives">Green Initiatives</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {impactMetrics.map((metric) => (
              <Card key={metric.metric}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-green-600" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metric.value} <span className="text-sm font-normal text-muted-foreground">{metric.unit}</span>
                  </div>
                  <p className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-green-600"}`}>
                    {metric.change} from last year
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Performance Trends</CardTitle>
                <CardDescription>Key environmental metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={environmentalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="waterSaved"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                      name="Water Saved (gal)"
                    />
                    <Area
                      type="monotone"
                      dataKey="energyUsed"
                      stackId="2"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                      name="Energy Used (kWh)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Carbon Footprint Reduction</CardTitle>
                <CardDescription>Monthly CO2 emissions and efficiency improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={environmentalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="carbonFootprint"
                      stroke="#ef4444"
                      strokeWidth={2}
                      name="CO2 Emissions (tons)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="efficiency"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Efficiency %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Goals & Targets</CardTitle>
              <CardDescription>Track progress towards environmental objectives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                {sustainabilityGoals.map((goal) => {
                  const Icon = goal.icon
                  const progressPercentage = (goal.current / goal.target_value) * 100

                  return (
                    <div key={goal.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-${goal.color}-100`}>
                            <Icon className={`h-5 w-5 text-${goal.color}-600`} />
                          </div>
                          <div>
                            <h4 className="font-medium">{goal.title}</h4>
                            <p className="text-sm text-muted-foreground">{goal.target}</p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            goal.status === "Ahead"
                              ? "default"
                              : goal.status === "On Track"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {goal.status}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            Progress: {goal.current}
                            {goal.unit}
                          </span>
                          <span>
                            Target: {goal.target_value}
                            {goal.unit}
                          </span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                        <p className="text-xs text-muted-foreground">Deadline: {goal.deadline}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Certifications</CardTitle>
              <CardDescription>Manage environmental certifications and compliance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{cert.name}</h4>
                        <Badge variant={cert.status === "Certified" ? "default" : "secondary"}>{cert.status}</Badge>
                        {cert.level && <Badge variant="outline">{cert.level}</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{cert.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {cert.status === "Certified" ? "Expires" : "Target"}: {cert.expiry}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        View Certificate
                      </Button>
                      {cert.status === "In Progress" && <Button size="sm">Update Progress</Button>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <Button>
                  <Award className="mr-2 h-4 w-4" />
                  Apply for New Certification
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reporting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ESG Reporting Dashboard</CardTitle>
              <CardDescription>Environmental, Social, and Governance reporting metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <Leaf className="h-4 w-4" />
                      <span>Environmental</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Carbon Intensity</span>
                      <span className="font-medium">0.45 kg CO2/m³</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Water Efficiency</span>
                      <span className="font-medium">94.2%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Renewable Energy</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Waste Recycled</span>
                      <span className="font-medium">87%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <Target className="h-4 w-4" />
                      <span>Social</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Customer Satisfaction</span>
                      <span className="font-medium">4.6/5.0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service Reliability</span>
                      <span className="font-medium">99.8%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Community Investment</span>
                      <span className="font-medium">$125K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Employee Safety</span>
                      <span className="font-medium">0 incidents</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Governance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Compliance Score</span>
                      <span className="font-medium">98.5%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Audit Findings</span>
                      <span className="font-medium">2 minor</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Data Security</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Transparency Index</span>
                      <span className="font-medium">A+</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Regulatory Compliance</h4>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">EPA Water Quality Standards</p>
                      <p className="text-sm text-muted-foreground">Last audit: January 2024</p>
                    </div>
                    <Badge variant="default">Compliant</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">State Environmental Regulations</p>
                      <p className="text-sm text-muted-foreground">Last audit: December 2023</p>
                    </div>
                    <Badge variant="default">Compliant</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">OSHA Safety Standards</p>
                      <p className="text-sm text-muted-foreground">Last audit: November 2023</p>
                    </div>
                    <Badge variant="secondary">Minor Issues</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">ISO 14001 Environmental Management</p>
                      <p className="text-sm text-muted-foreground">Last audit: October 2023</p>
                    </div>
                    <Badge variant="default">Certified</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="initiatives" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Green Initiatives & Programs</CardTitle>
              <CardDescription>Active environmental improvement programs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <Droplets className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Smart Water Conservation Program</h4>
                        <p className="text-sm text-muted-foreground">
                          AI-powered leak detection and customer conservation incentives
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="grid gap-2 md:grid-cols-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Water Saved:</span>
                      <span className="font-medium ml-2">1.2M gallons</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Participants:</span>
                      <span className="font-medium ml-2">1,847 customers</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cost Savings:</span>
                      <span className="font-medium ml-2">$45,000</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-yellow-100">
                        <Zap className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Renewable Energy Transition</h4>
                        <p className="text-sm text-muted-foreground">
                          Solar panel installation and energy efficiency upgrades
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">In Progress</Badge>
                  </div>
                  <div className="grid gap-2 md:grid-cols-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Solar Capacity:</span>
                      <span className="font-medium ml-2">250 kW</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Energy Reduced:</span>
                      <span className="font-medium ml-2">18.5%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">CO2 Avoided:</span>
                      <span className="font-medium ml-2">89 tons/year</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-green-100">
                        <Recycle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Circular Economy Initiative</h4>
                        <p className="text-sm text-muted-foreground">
                          Waste reduction, recycling, and resource recovery programs
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="grid gap-2 md:grid-cols-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Waste Diverted:</span>
                      <span className="font-medium ml-2">15.6 tons</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Recycling Rate:</span>
                      <span className="font-medium ml-2">87%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cost Savings:</span>
                      <span className="font-medium ml-2">$12,300</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button>
                  <Leaf className="mr-2 h-4 w-4" />
                  Launch New Initiative
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
