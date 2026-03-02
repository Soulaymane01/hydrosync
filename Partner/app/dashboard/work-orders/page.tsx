"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Plus, Wrench, Clock, CheckCircle, AlertTriangle, User, MapPin } from "lucide-react"

const workOrders = [
  {
    id: "WO-2024-001",
    title: "Meter Replacement - M-2849",
    description: "Replace faulty smart meter with low battery and weak signal",
    priority: "High",
    status: "In Progress",
    assignedTo: "John Martinez",
    clientId: "C-1003",
    clientName: "Mike Davis",
    location: "789 Elm Drive, East Region",
    meterId: "M-2849",
    createdDate: "2024-01-15",
    dueDate: "2024-01-17",
    estimatedHours: 2,
    actualHours: 1.5,
    category: "Meter Maintenance",
  },
  {
    id: "WO-2024-002",
    title: "Leak Investigation",
    description: "Customer reported unusual water usage spike, investigate potential leak",
    priority: "Medium",
    status: "Assigned",
    assignedTo: "Sarah Wilson",
    clientId: "C-1156",
    clientName: "Industrial Complex A",
    location: "456 Industrial Blvd, Central Region",
    meterId: "M-3456",
    createdDate: "2024-01-14",
    dueDate: "2024-01-18",
    estimatedHours: 3,
    actualHours: 0,
    category: "Investigation",
  },
  {
    id: "WO-2024-003",
    title: "Routine Maintenance",
    description: "Quarterly maintenance check for commercial meter",
    priority: "Low",
    status: "Completed",
    assignedTo: "Mike Rodriguez",
    clientId: "C-2234",
    clientName: "Shopping Mall B",
    location: "789 Commerce St, South Region",
    meterId: "M-4567",
    createdDate: "2024-01-10",
    dueDate: "2024-01-15",
    estimatedHours: 1,
    actualHours: 0.8,
    category: "Preventive Maintenance",
  },
  {
    id: "WO-2024-004",
    title: "New Installation",
    description: "Install smart meter for new residential customer",
    priority: "Medium",
    status: "Scheduled",
    assignedTo: "David Chen",
    clientId: "C-5678",
    clientName: "Jennifer Adams",
    location: "123 New Street, West Region",
    meterId: "M-5678",
    createdDate: "2024-01-16",
    dueDate: "2024-01-20",
    estimatedHours: 2.5,
    actualHours: 0,
    category: "Installation",
  },
]

const technicians = [
  { id: "T-001", name: "John Martinez", specialization: "Smart Meters", activeOrders: 3 },
  { id: "T-002", name: "Sarah Wilson", specialization: "Leak Detection", activeOrders: 2 },
  { id: "T-003", name: "Mike Rodriguez", specialization: "General Maintenance", activeOrders: 1 },
  { id: "T-004", name: "David Chen", specialization: "Installations", activeOrders: 2 },
]

export default function WorkOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredOrders = workOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase().replace(" ", "-") === statusFilter
    const matchesPriority = priorityFilter === "all" || order.priority.toLowerCase() === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      case "In Progress":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        )
      case "Assigned":
        return (
          <Badge variant="secondary">
            <User className="w-3 h-3 mr-1" />
            Assigned
          </Badge>
        )
      case "Scheduled":
        return (
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            Scheduled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">High</Badge>
      case "Medium":
        return <Badge variant="secondary">Medium</Badge>
      case "Low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const handleCreateWorkOrder = () => {
    setIsCreateDialogOpen(false)
    alert("Work order created successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Work Orders</h1>
          <p className="text-muted-foreground">Manage maintenance tasks and field operations</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Work Order
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Work Order</DialogTitle>
              <DialogDescription>Fill in the details to create a new maintenance work order.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="wo-title">Title</Label>
                <Input id="wo-title" placeholder="Enter work order title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="wo-description">Description</Label>
                <Textarea id="wo-description" placeholder="Describe the work to be performed" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="wo-priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="wo-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="installation">Installation</SelectItem>
                      <SelectItem value="maintenance">Meter Maintenance</SelectItem>
                      <SelectItem value="repair">Repair</SelectItem>
                      <SelectItem value="investigation">Investigation</SelectItem>
                      <SelectItem value="preventive">Preventive Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="wo-technician">Assign to Technician</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select technician" />
                    </SelectTrigger>
                    <SelectContent>
                      {technicians.map((tech) => (
                        <SelectItem key={tech.id} value={tech.id}>
                          {tech.name} - {tech.specialization}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="wo-hours">Estimated Hours</Label>
                  <Input id="wo-hours" type="number" placeholder="2.5" step="0.5" />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateWorkOrder}>Create Work Order</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Work Orders</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8</div>
            <p className="text-xs text-muted-foreground">Active work orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">Urgent attention needed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94%</div>
            <p className="text-xs text-muted-foreground">On-time completion</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Work Orders</TabsTrigger>
          <TabsTrigger value="technicians">Technicians</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Work Order Management</CardTitle>
              <CardDescription>Track and manage all maintenance and service requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by ID, title, or client name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Work Order ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden lg:table-cell">Client</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Assigned To</TableHead>
                      <TableHead className="hidden sm:table-cell">Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{order.title}</div>
                            <div className="text-sm text-muted-foreground">{order.category}</div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div>
                            <div className="font-medium">{order.clientName}</div>
                            <div className="text-sm text-muted-foreground flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {order.location.split(",")[1]}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell className="hidden md:table-cell">{order.assignedTo}</TableCell>
                        <TableCell className="hidden sm:table-cell">{order.dueDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technicians" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Field Technicians</CardTitle>
              <CardDescription>Manage technician assignments and workload</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {technicians.map((tech) => (
                  <div key={tech.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                        {tech.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium">{tech.name}</div>
                        <div className="text-sm text-muted-foreground">{tech.specialization}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{tech.activeOrders}</div>
                      <div className="text-sm text-muted-foreground">Active Orders</div>
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
