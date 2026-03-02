"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ArrowLeft, Phone, MapPin } from "lucide-react"

// Mock data - in real app, this would come from API
const clientData = {
  "C-1001": {
    id: "C-1001",
    name: "John Smith",
    address: "123 Oak Street, North Region",
    phone: "+1 (555) 123-4567",
    email: "john.smith@email.com",
    meterId: "M-2847",
    meterType: "Smart Digital",
    installDate: "2022-03-15",
    status: "Active",
    balance: 156.78,
    billingCycle: "Monthly",
    paymentMethod: "Auto-Pay (Credit Card)",
    lastReading: "2024-01-15",
    usageHistory: [
      { month: "Jul", usage: 850 },
      { month: "Aug", usage: 920 },
      { month: "Sep", usage: 780 },
      { month: "Oct", usage: 650 },
      { month: "Nov", usage: 720 },
      { month: "Dec", usage: 890 },
    ],
    invoices: [
      { id: "INV-001", date: "2024-01-01", amount: 156.78, status: "Paid" },
      { id: "INV-002", date: "2023-12-01", amount: 142.5, status: "Paid" },
      { id: "INV-003", date: "2023-11-01", amount: 168.9, status: "Paid" },
    ],
  },
}

export default function ClientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const clientId = params.id as string

  const client = clientData[clientId as keyof typeof clientData]

  if (!client) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <Card>
          <CardContent className="text-center py-8">
            <p>Client not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      case "Inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "Error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getInvoiceStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Paid
          </Badge>
        )
      case "Unpaid":
        return <Badge variant="destructive">Unpaid</Badge>
      case "Overdue":
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Clients
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
          <p className="text-muted-foreground">Client ID: {client.id}</p>
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{client.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{client.address}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">Status:</span>
              {getStatusBadge(client.status)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meter Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Meter ID:</span>
              <span>{client.meterId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Type:</span>
              <span>{client.meterType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Install Date:</span>
              <span>{client.installDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Last Reading:</span>
              <span>{client.lastReading}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
              <p className="text-2xl font-bold text-green-600">${client.balance.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Billing Cycle</p>
              <p className="text-lg">{client.billingCycle}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
              <p className="text-lg">{client.paymentMethod}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Water Usage History</CardTitle>
          <CardDescription>Monthly water consumption over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              usage: {
                label: "Usage (gallons)",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={client.usageHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="usage" stroke="var(--color-usage)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Recent invoices and payment status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {client.invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>{getInvoiceStatusBadge(invoice.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
