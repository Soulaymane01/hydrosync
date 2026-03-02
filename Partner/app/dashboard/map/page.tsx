"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Layers, Filter, Zap, AlertTriangle, CheckCircle, Navigation } from "lucide-react"

const mapData = {
  regions: [
    { id: "north", name: "North Region", meters: 245, alerts: 2, color: "#3b82f6" },
    { id: "south", name: "South Region", meters: 312, alerts: 1, color: "#10b981" },
    { id: "east", name: "East Region", meters: 198, alerts: 5, color: "#f59e0b" },
    { id: "west", name: "West Region", meters: 234, alerts: 0, color: "#8b5cf6" },
    { id: "central", name: "Central Region", meters: 456, alerts: 3, color: "#ef4444" },
  ],
  meters: [
    { id: "M-2847", lat: 40.7128, lng: -74.006, status: "Active", type: "Smart", region: "North" },
    { id: "M-2848", lat: 40.7589, lng: -73.9851, status: "Active", type: "Smart", region: "South" },
    { id: "M-2849", lat: 40.7505, lng: -73.9934, status: "Error", type: "Smart", region: "East" },
    { id: "M-2850", lat: 40.7282, lng: -74.0776, status: "Active", type: "Mechanical", region: "West" },
    { id: "M-2851", lat: 40.7831, lng: -73.9712, status: "Maintenance", type: "Smart", region: "Central" },
  ],
  workOrders: [
    { id: "WO-001", lat: 40.7505, lng: -73.9934, priority: "High", status: "In Progress" },
    { id: "WO-002", lat: 40.7589, lng: -73.9851, priority: "Medium", status: "Assigned" },
  ],
}

export default function MapPage() {
  const [selectedLayer, setSelectedLayer] = useState("meters")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "#22c55e"
      case "Error":
        return "#ef4444"
      case "Maintenance":
        return "#f59e0b"
      default:
        return "#6b7280"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "#ef4444"
      case "Medium":
        return "#f59e0b"
      case "Low":
        return "#22c55e"
      default:
        return "#6b7280"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Network Map</h1>
        <p className="text-muted-foreground">Visualize your water infrastructure and field operations</p>
      </div>

      {/* Map Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Map Controls</CardTitle>
          <CardDescription>Configure map layers and filters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedLayer} onValueChange={setSelectedLayer}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Layers className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select layer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meters">Water Meters</SelectItem>
                <SelectItem value="workorders">Work Orders</SelectItem>
                <SelectItem value="regions">Service Regions</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {mapData.regions.map((region) => (
                  <SelectItem key={region.id} value={region.id}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Navigation className="mr-2 h-4 w-4" />
              Center Map
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Map Placeholder */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Map</CardTitle>
              <CardDescription>Real-time view of your water network infrastructure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-[500px] bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="h-16 w-16 text-gray-400 mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-600">Interactive Map View</h3>
                    <p className="text-sm text-gray-500">
                      In a real application, this would display an interactive map
                      <br />
                      showing meter locations, work orders, and service regions
                    </p>
                  </div>

                  {/* Simulated Map Elements */}
                  <div className="absolute inset-4 pointer-events-none">
                    {/* Simulated meter markers */}
                    {mapData.meters.map((meter, index) => (
                      <div
                        key={meter.id}
                        className="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg"
                        style={{
                          backgroundColor: getStatusColor(meter.status),
                          left: `${20 + index * 15}%`,
                          top: `${30 + index * 10}%`,
                        }}
                        title={`${meter.id} - ${meter.status}`}
                      />
                    ))}

                    {/* Simulated work order markers */}
                    {mapData.workOrders.map((wo, index) => (
                      <div
                        key={wo.id}
                        className="absolute w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                        style={{
                          backgroundColor: getPriorityColor(wo.priority),
                          left: `${60 + index * 20}%`,
                          top: `${40 + index * 15}%`,
                        }}
                      >
                        <Zap className="h-3 w-3 text-white" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Legend and Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Map Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Meter Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Active Meters</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">Error Status</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-sm">Maintenance</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Work Orders</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                      <Zap className="h-2 w-2 text-white" />
                    </div>
                    <span className="text-sm">High Priority</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center">
                      <Zap className="h-2 w-2 text-white" />
                    </div>
                    <span className="text-sm">Medium Priority</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <Zap className="h-2 w-2 text-white" />
                    </div>
                    <span className="text-sm">Low Priority</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mapData.regions.map((region) => (
                  <div key={region.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: region.color }}></div>
                      <div>
                        <div className="font-medium">{region.name}</div>
                        <div className="text-sm text-muted-foreground">{region.meters} meters</div>
                      </div>
                    </div>
                    <div className="text-right">
                      {region.alerts > 0 ? (
                        <Badge variant="destructive">{region.alerts} alerts</Badge>
                      ) : (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          OK
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4" />
                Locate Meter
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Zap className="mr-2 h-4 w-4" />
                Create Work Order
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Report Issue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
