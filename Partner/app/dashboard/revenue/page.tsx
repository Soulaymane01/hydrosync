"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, DollarSign, TrendingUp, Calendar } from "lucide-react"

const payments = [
  {
    id: "PAY-1001",
    date: "2024-01-15",
    amount: 156.78,
    method: "Credit Card",
    clientId: "C-1001",
    clientName: "John Smith",
    status: "Completed",
    notes: "",
  },
  {
    id: "PAY-1002",
    date: "2024-01-14",
    amount: 89.45,
    method: "Bank Transfer",
    clientId: "C-1004",
    clientName: "Emily Wilson",
    status: "Completed",
    notes: "",
  },
  {
    id: "PAY-1003",
    date: "2024-01-13",
    amount: 234.56,
    method: "Cash",
    clientId: "C-1003",
    clientName: "Mike Davis",
    status: "Completed",
    notes: "Late fee applied",
  },
  {
    id: "PAY-1004",
    date: "2024-01-12",
    amount: 142.3,
    method: "Credit Card",
    clientId: "C-1002",
    clientName: "Sarah Johnson",
    status: "Pending",
    notes: "",
  },
  {
    id: "PAY-1005",
    date: "2024-01-11",
    amount: 198.9,
    method: "Auto-Pay",
    clientId: "C-1005",
    clientName: "Robert Brown",
    status: "Failed",
    notes: "Insufficient funds",
  },
]

export default function RevenuePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const router = useRouter()

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.clientId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status.toLowerCase() === statusFilter
    const matchesMethod = methodFilter === "all" || payment.method.toLowerCase().includes(methodFilter.toLowerCase())
    return matchesSearch && matchesStatus && matchesMethod
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "Pending":
        return <Badge variant="secondary">Pending</Badge>
      case "Failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const totalRevenue = payments
    .filter((p) => p.status === "Completed")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const pendingRevenue = payments
    .filter((p) => p.status === "Pending")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const failedRevenue = payments.filter((p) => p.status === "Failed").reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Revenue</h1>
        <p className="text-muted-foreground">Track payments and financial transactions</p>
      </div>

      {/* Revenue Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Completed payments this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Revenue</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${pendingRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Payments</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${failedRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>All payment transactions and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by payment ID, client name, or ID..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="credit">Credit Card</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="auto">Auto-Pay</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden sm:table-cell">Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{payment.clientName}</div>
                        <div className="text-sm text-muted-foreground">{payment.clientId}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${payment.amount.toFixed(2)}</TableCell>
                    <TableCell className="hidden sm:table-cell">{payment.method}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/revenue/${payment.id}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No payments found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
