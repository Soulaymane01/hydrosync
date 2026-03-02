"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Shield, FileText, AlertTriangle, CheckCircle, Calendar, Download } from "lucide-react"

const complianceReports = [
  {
    id: "CR-2024-001",
    title: "EPA Water Quality Report",
    type: "Water Quality",
    dueDate: "2024-02-15",
    status: "In Progress",
    completionRate: 75,
    assignedTo: "Dr. Sarah Chen",
    priority: "High",
    description: "Monthly water quality compliance report for EPA submission",
  },
  {
    id: "CR-2024-002",
    title: "State Utility Commission Filing",
    type: "Financial",
    dueDate: "2024-01-31",
    status: "Completed",
    completionRate: 100,
    assignedTo: "Finance Team",
    priority: "Medium",
    description: "Quarterly financial and operational report for state commission",
  },
  {
    id: "CR-2024-003",
    title: "Safety Inspection Report",
    type: "Safety",
    dueDate: "2024-02-28",
    status: "Not Started",
    completionRate: 0,
    assignedTo: "Safety Officer",
    priority: "Medium",
    description: "Annual safety inspection and compliance documentation",
  },
  {
    id: "CR-2024-004",
    title: "Environmental Impact Assessment",
    type: "Environmental",
    dueDate: "2024-03-15",
    status: "In Progress",
    completionRate: 45,
    assignedTo: "Environmental Team",
    priority: "High",
    description: "Bi-annual environmental impact assessment and mitigation report",
  },
]

const regulations = [
  {
    id: "REG-001",
    title: "Safe Drinking Water Act (SDWA)",
    agency: "EPA",
    category: "Water Quality",
    lastUpdated: "2024-01-10",
    complianceStatus: "Compliant",
    nextReview: "2024-04-10",
    requirements: ["Monthly water quality testing", "Consumer confidence reports", "Violation notifications"],
  },
  {
    id: "REG-002",
    title: "Public Utility Regulatory Policies Act",
    agency: "State Commission",
    category: "Financial",
    lastUpdated: "2023-12-15",
    complianceStatus: "Compliant",
    nextReview: "2024-03-15",
    requirements: ["Rate structure documentation", "Financial reporting", "Service quality metrics"],
  },
  {
    id: "REG-003",
    title: "Occupational Safety and Health Standards",
    agency: "OSHA",
    category: "Safety",
    lastUpdated: "2024-01-05",
    complianceStatus: "Action Required",
    nextReview: "2024-02-05",
    requirements: ["Employee safety training", "Hazard communication", "Personal protective equipment"],
  },
]

const auditHistory = [
  {
    id: "AUD-001",
    date: "2023-11-15",
    auditor: "State Environmental Agency",
    type: "Water Quality",
    result: "Passed",
    findings: 2,
    recommendations: 3,
    followUpDue: "2024-02-15",
  },
  {
    id: "AUD-002",
    date: "2023-09-20",
    auditor: "Public Utility Commission",
    type: "Financial",
    result: "Passed with Conditions",
    findings: 1,
    recommendations: 5,
    followUpDue: "2024-01-20",
  },
  {
    id: "AUD-003",
    date: "2023-08-10",
    auditor: "OSHA Inspector",
    type: "Safety",
    result: "Passed",
    findings: 0,
    recommendations: 2,
    followUpDue: "2024-08-10",
  },
]

export default function CompliancePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

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
            In Progress
          </Badge>
        )
      case "Not Started":
        return <Badge variant="secondary">Not Started</Badge>
      case "Overdue":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Overdue
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getComplianceBadge = (status: string) => {
    switch (status) {
      case "Compliant":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Compliant
          </Badge>
        )
      case "Action Required":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Action Required
          </Badge>
        )
      case "Under Review":
        return <Badge variant="secondary">Under Review</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getAuditResultBadge = (result: string) => {
    switch (result) {
      case "Passed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Passed
          </Badge>
        )
      case "Passed with Conditions":
        return <Badge variant="secondary">Passed with Conditions</Badge>
      case "Failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">{result}</Badge>
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

  const filteredReports = complianceReports.filter((report) => {
    const matchesCategory = selectedCategory === "all" || report.type.toLowerCase() === selectedCategory
    const matchesStatus = selectedStatus === "all" || report.status.toLowerCase().replace(" ", "-") === selectedStatus
    return matchesCategory && matchesStatus
  })

  const overallCompliance = Math.round(
    (regulations.filter((r) => r.complianceStatus === "Compliant").length / regulations.length) * 100,
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Compliance Management</h1>
          <p className="text-muted-foreground">Track regulatory compliance and manage reporting requirements</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Compliance Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{overallCompliance}%</div>
            <Progress value={overallCompliance} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 in progress, 2 pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Action Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">Compliance Reports</TabsTrigger>
          <TabsTrigger value="regulations">Regulations</TabsTrigger>
          <TabsTrigger value="audits">Audit History</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Reports</CardTitle>
              <CardDescription>Track and manage regulatory reporting requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="water quality">Water Quality</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="environmental">Environmental</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div key={report.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{report.title}</h4>
                          {getPriorityBadge(report.priority)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Due: {report.dueDate}</span>
                          <span>Assigned to: {report.assignedTo}</span>
                          <span>Type: {report.type}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {getStatusBadge(report.status)}
                        <div className="text-right">
                          <div className="text-sm font-medium">{report.completionRate}% Complete</div>
                          <Progress value={report.completionRate} className="w-24 mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regulations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Framework</CardTitle>
              <CardDescription>Monitor compliance with applicable regulations and standards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regulations.map((regulation) => (
                  <div key={regulation.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{regulation.title}</h4>
                          {getComplianceBadge(regulation.complianceStatus)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                          <span>Agency: {regulation.agency}</span>
                          <span>Category: {regulation.category}</span>
                          <span>Next Review: {regulation.nextReview}</span>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium mb-2">Key Requirements:</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {regulation.requirements.map((req, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit History</CardTitle>
              <CardDescription>Track audit results and follow-up actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Auditor</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Findings</TableHead>
                      <TableHead>Recommendations</TableHead>
                      <TableHead>Follow-up Due</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditHistory.map((audit) => (
                      <TableRow key={audit.id}>
                        <TableCell>{audit.date}</TableCell>
                        <TableCell className="font-medium">{audit.auditor}</TableCell>
                        <TableCell>{audit.type}</TableCell>
                        <TableCell>{getAuditResultBadge(audit.result)}</TableCell>
                        <TableCell>
                          <Badge variant={audit.findings > 0 ? "destructive" : "default"}>{audit.findings}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{audit.recommendations}</Badge>
                        </TableCell>
                        <TableCell>{audit.followUpDue}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
