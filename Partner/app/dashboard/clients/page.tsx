"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Eye } from "lucide-react"

const clients = [
  {
    id: "C-1001",
    name: "John Smith",
    address: "123 Oak Street, North Region",
    phone: "+1 (555) 123-4567",
    meterId: "M-2847",
    status: "Active",
    balance: 156.78,
    lastReading: "2024-01-15",
  },
  {
    id: "C-1002",
    name: "Sarah Johnson",
    address: "456 Pine Avenue, South Region",
    phone: "+1 (555) 234-5678",
    meterId: "M-2848",
    status: "Active",
    balance: -45.2,
    lastReading: "2024-01-14",
  },
  {
    id: "C-1003",
    name: "Mike Davis",
    address: "789 Elm Drive, East Region",
    phone: "+1 (555) 345-6789",
    meterId: "M-2849",
    status: "Error",
    balance: 234.56,
    lastReading: "2024-01-10",
  },
  {
    id: "C-1004",
    name: "Emily Wilson",
    address: "321 Maple Lane, West Region",
    phone: "+1 (555) 456-7890",
    meterId: "M-2850",
    status: "Active",
    balance: 89.45,
    lastReading: "2024-01-15",
  },
  {
    id: "C-1005",
    name: "Robert Brown",
    address: "654 Cedar Court, Central Region",
    phone: "+1 (555) 567-8901",
    meterId: "M-2851",
    status: "Inactive",
    balance: 0.0,
    lastReading: "2023-12-28",
  },
]

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const router = useRouter()

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || client.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

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

  const getBalanceColor = (balance: number) => {
    if (balance < 0) return "text-red-600"
    if (balance > 200) return "text-orange-600"
    return "text-green-600"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <p className="text-muted-foreground">Manage your customer database and meter information</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Client Database</CardTitle>
          <CardDescription>Search and filter through your customer records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, name, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Client Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Address</TableHead>
                  <TableHead className="hidden sm:table-cell">Meter ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.id}</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{client.address}</TableCell>
                    <TableCell className="hidden sm:table-cell">{client.meterId}</TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                    <TableCell className={getBalanceColor(client.balance)}>
                      ${Math.abs(client.balance).toFixed(2)}
                      {client.balance < 0 && " (Credit)"}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/clients/${client.id}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredClients.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No clients found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
