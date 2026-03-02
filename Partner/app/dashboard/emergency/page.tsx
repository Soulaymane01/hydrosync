"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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
import { AlertTriangle, Phone, MapPin, Clock, CheckCircle, Zap, Users, Radio, Shield, Plus } from "lucide-react"

const emergencyIncidents = [
  {
    id: "EMG-2024-001",
    title: "Main Water Line Break",
    type: "Infrastructure",
    severity: "Critical",
    status: "Active",
    location: "Downtown District, Main St & 5th Ave",
    reportedBy: "Field Technician",
    reportedAt: "2024-01-15 14:30",
    estimatedAffected: 1200,
    responseTeam: "Emergency Response Team A",
    description: "Major water line rupture causing street flooding and service disruption",
    actions: ["Emergency crew dispatched", "Traffic control established", "Affected customers notified"],
  },
  {
    id: "EMG-2024-002",
    title: "Water Quality Alert",
    type: "Quality",
    severity: "High",
    status: "Investigating",
    location: "North Treatment Plant",
    reportedBy: "Lab Technician",
    reportedAt: "2024-01-15 09:15",
    estimatedAffected: 3500,
    responseTeam: "Water Quality Team",
    description: "Elevated chlorine levels detected in distribution system",
    actions: ["Additional testing initiated", "Distribution system flushing", "Public notification prepared"],
  },
  {
    id: "EMG-2024-003",
    title: "Power Outage at Pump Station",
    type: "Equipment",
    severity: "Medium",
    status: "Resolved",
    location: "East Pump Station #3",
    reportedBy: "System Monitor",
    reportedAt: "2024-01-14 22:45",
    estimatedAffected: 800,
    responseTeam: "Maintenance Team B",
    description: "Complete power loss at primary pump station affecting water pressure",
    actions: ["Backup generators activated", "Power company contacted", "Service restored"],
  },
]

const responseTeams = [
  {
    id: "ERT-A",
    name: "Emergency Response Team A",
    status: "On Call",
    members: 6,
    specialization: "Infrastructure Repairs",
    currentIncident: "EMG-2024-001",
    contact: "+1-555-EMRG-A",
  },
  {
    id: "WQT",
    name: "Water Quality Team",
    status: "Active",
    members: 4,
    specialization: "Water Quality Issues",
    currentIncident: "EMG-2024-002",
    contact: "+1-555-QUAL-T",
  },
  {
    id: "ERT-B",
    name: "Maintenance Team B",
    status: "Available",
    members: 5,
    specialization: "Equipment & Electrical",
    currentIncident: null,
    contact: "+1-555-MAINT-B",
  },
]

const emergencyContacts = [
  { name: "Emergency Coordinator", phone: "+1-555-0911", role: "Primary Contact" },
  { name: "Water Quality Manager", phone: "+1-555-0912", role: "Quality Issues" },
  { name: "Operations Manager", phone: "+1-555-0913", role: "Infrastructure" },
  { name: "Public Relations", phone: "+1-555-0914", role: "Media & Communications" },
]

export default function EmergencyResponsePage() {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [incidentType, setIncidentType] = useState("")
  const [severity, setSeverity] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "Critical":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Critical
          </Badge>
        )
      case "High":
        return (
          <Badge variant="destructive" className="bg-orange-600">
            High
          </Badge>
        )
      case "Medium":
        return <Badge variant="secondary">Medium</Badge>
      case "Low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge variant="destructive">
            <Zap className="w-3 h-3 mr-1" />
            Active
          </Badge>
        )
      case "Investigating":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Investigating
          </Badge>
        )
      case "Resolved":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTeamStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge variant="destructive">
            <Radio className="w-3 h-3 mr-1" />
            Active
          </Badge>
        )
      case "On Call":
        return (
          <Badge variant="default" className="bg-orange-100 text-orange-800">
            On Call
          </Badge>
        )
      case "Available":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Available
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleReportIncident = () => {
    setIsReportDialogOpen(false)
    alert("Emergency incident reported successfully!")
    setIncidentType("")
    setSeverity("")
    setDescription("")
    setLocation("")
  }

  const activeIncidents = emergencyIncidents.filter(
    (incident) => incident.status === "Active" || incident.status === "Investigating",
  )
  const criticalIncidents = emergencyIncidents.filter((incident) => incident.severity === "Critical")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Emergency Response</h1>
          <p className="text-muted-foreground">Manage emergency incidents and coordinate response efforts</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Phone className="mr-2 h-4 w-4" />
            Emergency Contacts
          </Button>
          <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Plus className="mr-2 h-4 w-4" />
                Report Incident
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Report Emergency Incident</DialogTitle>
                <DialogDescription>
                  Provide details about the emergency incident for immediate response coordination.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="incident-type">Incident Type</Label>
                    <Select value={incidentType} onValueChange={setIncidentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select incident type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="infrastructure">Infrastructure Failure</SelectItem>
                        <SelectItem value="quality">Water Quality Issue</SelectItem>
                        <SelectItem value="equipment">Equipment Malfunction</SelectItem>
                        <SelectItem value="contamination">Contamination Event</SelectItem>
                        <SelectItem value="security">Security Incident</SelectItem>
                        <SelectItem value="natural">Natural Disaster</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="severity">Severity Level</Label>
                    <Select value={severity} onValueChange={setSeverity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter incident location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Incident Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the emergency incident in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleReportIncident}>
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Report Incident
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Emergency Status Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{activeIncidents.length}</div>
            <p className="text-xs text-muted-foreground">Requiring immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Incidents</CardTitle>
            <Zap className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalIncidents.length}</div>
            <p className="text-xs text-muted-foreground">Highest priority</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Teams</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{responseTeams.length}</div>
            <p className="text-xs text-muted-foreground">Available for deployment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Operational</div>
            <p className="text-xs text-muted-foreground">Emergency systems online</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="incidents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="incidents">Active Incidents</TabsTrigger>
          <TabsTrigger value="teams">Response Teams</TabsTrigger>
          <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="incidents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Incidents</CardTitle>
              <CardDescription>Monitor and manage active emergency situations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyIncidents.map((incident) => (
                  <div key={incident.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{incident.title}</h4>
                          {getSeverityBadge(incident.severity)}
                          {getStatusBadge(incident.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                        <div className="grid gap-2 md:grid-cols-2 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{incident.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>Reported: {incident.reportedAt}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>Affected: {incident.estimatedAffected.toLocaleString()} customers</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Radio className="h-4 w-4" />
                            <span>Team: {incident.responseTeam}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {incident.status === "Active" && (
                          <Button variant="destructive" size="sm">
                            Update Status
                          </Button>
                        )}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium mb-2">Response Actions:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {incident.actions.map((action, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Response Teams</CardTitle>
              <CardDescription>Coordinate and deploy emergency response personnel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {responseTeams.map((team) => (
                  <div key={team.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                        {team.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{team.name}</span>
                          {getTeamStatusBadge(team.status)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {team.specialization} • {team.members} members
                        </div>
                        {team.currentIncident && (
                          <div className="text-sm text-blue-600">Current: {team.currentIncident}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm">
                        Deploy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>Key personnel for emergency coordination and communication</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-muted-foreground">{contact.role}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm">{contact.phone}</div>
                      <Button variant="outline" size="sm" className="mt-1">
                        Call Now
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
