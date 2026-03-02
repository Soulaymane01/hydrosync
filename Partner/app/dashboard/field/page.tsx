"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Smartphone,
  MapPin,
  Camera,
  Clock,
  CheckCircle,
  AlertTriangle,
  Navigation,
  Battery,
  Signal,
  Upload,
} from "lucide-react"

const fieldTasks = [
  {
    id: "FT-001",
    workOrderId: "WO-2024-001",
    title: "Meter Replacement",
    location: "789 Elm Drive, East Region",
    priority: "High",
    status: "In Progress",
    estimatedTime: "2 hours",
    assignedTo: "Current User",
    instructions: "Replace faulty smart meter M-2849. Check battery and signal strength.",
    clientName: "Mike Davis",
    meterId: "M-2849",
  },
  {
    id: "FT-002",
    workOrderId: "WO-2024-005",
    title: "Routine Inspection",
    location: "456 Oak Street, North Region",
    priority: "Medium",
    status: "Pending",
    estimatedTime: "1 hour",
    assignedTo: "Current User",
    instructions: "Quarterly inspection of commercial meter. Check for leaks and proper operation.",
    clientName: "ABC Corporation",
    meterId: "M-3456",
  },
]

const completedTasks = [
  {
    id: "FT-003",
    title: "Leak Investigation",
    location: "123 Pine Avenue, South Region",
    completedAt: "2024-01-15 14:30",
    duration: "1.5 hours",
    notes: "No leak found. Meter reading error resolved by recalibration.",
    photos: 2,
  },
]

export default function FieldTechnicianPage() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [taskNotes, setTaskNotes] = useState("")
  const [taskStatus, setTaskStatus] = useState("completed")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Progress":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        )
      case "Pending":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "Completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
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

  const handleCompleteTask = () => {
    setIsReportDialogOpen(false)
    alert("Task completed and report submitted!")
    setTaskNotes("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Field Operations</h1>
          <p className="text-muted-foreground">Mobile interface for field technicians</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Signal className="h-3 w-3" />
            <span>4G Strong</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Battery className="h-3 w-3" />
            <span>85%</span>
          </Badge>
        </div>
      </div>

      {/* Quick Status */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Tasks</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 completed, 3 pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Location</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">North Region</div>
            <p className="text-xs text-muted-foreground">GPS: 40.7128, -74.0060</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time on Route</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2h</div>
            <p className="text-xs text-muted-foreground">Since 8:00 AM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">95%</div>
            <p className="text-xs text-muted-foreground">Above target</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Tasks</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="tools">Field Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="space-y-4">
            {fieldTasks.map((task) => (
              <Card key={task.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      {getPriorityBadge(task.priority)}
                    </div>
                    {getStatusBadge(task.status)}
                  </div>
                  <CardDescription>Work Order: {task.workOrderId}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-sm font-medium">Location</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{task.location}</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Customer</Label>
                      <div className="text-sm mt-1">{task.clientName}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Meter ID</Label>
                      <div className="text-sm mt-1">{task.meterId}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Estimated Time</Label>
                      <div className="text-sm mt-1">{task.estimatedTime}</div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Instructions</Label>
                    <div className="text-sm text-muted-foreground mt-1 p-3 bg-gray-50 rounded-md">
                      {task.instructions}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button className="flex-1">
                      <Navigation className="mr-2 h-4 w-4" />
                      Navigate
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Camera className="mr-2 h-4 w-4" />
                      Take Photo
                    </Button>
                    <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Complete Task
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Complete Task Report</DialogTitle>
                          <DialogDescription>
                            Provide details about the completed work for {task.title}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="task-status">Task Status</Label>
                            <Select value={taskStatus} onValueChange={setTaskStatus}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="completed">Completed Successfully</SelectItem>
                                <SelectItem value="partial">Partially Completed</SelectItem>
                                <SelectItem value="unable">Unable to Complete</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="task-notes">Work Notes</Label>
                            <Textarea
                              id="task-notes"
                              placeholder="Describe the work performed, any issues encountered, or additional observations..."
                              value={taskNotes}
                              onChange={(e) => setTaskNotes(e.target.value)}
                              rows={4}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label>Photos Attached</Label>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Camera className="mr-2 h-4 w-4" />
                                Add Photo
                              </Button>
                              <span className="text-sm text-muted-foreground">2 photos attached</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleCompleteTask}>
                            <Upload className="mr-2 h-4 w-4" />
                            Submit Report
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Tasks Today</CardTitle>
              <CardDescription>Tasks completed during current shift</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-muted-foreground">{task.location}</div>
                        <div className="text-xs text-muted-foreground">
                          Completed at {task.completedAt} • Duration: {task.duration}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{task.photos} photos</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common field operations and tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Camera className="mr-2 h-4 w-4" />
                  Take Meter Reading Photo
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Report Emergency
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="mr-2 h-4 w-4" />
                  Mark GPS Location
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  Log Break Time
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Offline Tools</CardTitle>
                <CardDescription>Tools available without internet connection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Meter Reading Scanner
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Navigation className="mr-2 h-4 w-4" />
                  Offline Maps
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="mr-2 h-4 w-4" />
                  Sync Offline Data
                </Button>
                <div className="text-xs text-muted-foreground mt-2">Last sync: 2 hours ago</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
