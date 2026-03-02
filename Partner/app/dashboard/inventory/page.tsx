"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Search, Plus, Package, AlertTriangle, TrendingDown, Wrench } from "lucide-react"

const inventoryItems = [
  {
    id: "INV-001",
    name: "Smart Water Meter - Model X1",
    category: "Meters",
    sku: "SWM-X1-001",
    currentStock: 25,
    minStock: 10,
    maxStock: 50,
    unitCost: 245.0,
    supplier: "AquaTech Solutions",
    location: "Warehouse A - Section 1",
    lastRestocked: "2024-01-10",
    status: "In Stock",
  },
  {
    id: "INV-002",
    name: "Pipe Coupling 2-inch",
    category: "Fittings",
    sku: "PC-2IN-002",
    currentStock: 5,
    minStock: 15,
    maxStock: 100,
    unitCost: 12.5,
    supplier: "Industrial Pipes Co.",
    location: "Warehouse B - Section 3",
    lastRestocked: "2024-01-05",
    status: "Low Stock",
  },
  {
    id: "INV-003",
    name: "Water Quality Test Kit",
    category: "Testing Equipment",
    sku: "WQT-KIT-003",
    currentStock: 8,
    minStock: 5,
    maxStock: 20,
    unitCost: 89.99,
    supplier: "LabTech Supplies",
    location: "Warehouse A - Section 2",
    lastRestocked: "2024-01-12",
    status: "In Stock",
  },
  {
    id: "INV-004",
    name: "Valve Actuator Motor",
    category: "Electrical",
    sku: "VAM-ELC-004",
    currentStock: 0,
    minStock: 3,
    maxStock: 15,
    unitCost: 156.75,
    supplier: "ElectroFlow Systems",
    location: "Warehouse C - Section 1",
    lastRestocked: "2023-12-20",
    status: "Out of Stock",
  },
  {
    id: "INV-005",
    name: "Pressure Gauge Digital",
    category: "Instruments",
    sku: "PGD-DIG-005",
    currentStock: 12,
    minStock: 8,
    maxStock: 25,
    unitCost: 78.25,
    supplier: "Precision Instruments",
    location: "Warehouse A - Section 3",
    lastRestocked: "2024-01-08",
    status: "In Stock",
  },
]

const stockMovements = [
  {
    id: "SM-001",
    itemName: "Smart Water Meter - Model X1",
    type: "Inbound",
    quantity: 15,
    date: "2024-01-10",
    reference: "PO-2024-001",
    notes: "Regular restock order",
  },
  {
    id: "SM-002",
    itemName: "Pipe Coupling 2-inch",
    type: "Outbound",
    quantity: -8,
    date: "2024-01-14",
    reference: "WO-2024-003",
    notes: "Used for main line repair",
  },
  {
    id: "SM-003",
    itemName: "Water Quality Test Kit",
    type: "Inbound",
    quantity: 5,
    date: "2024-01-12",
    reference: "PO-2024-002",
    notes: "Emergency restock",
  },
]

const suppliers = [
  { id: "SUP-001", name: "AquaTech Solutions", contact: "sales@aquatech.com", phone: "+1-555-0101" },
  { id: "SUP-002", name: "Industrial Pipes Co.", contact: "orders@indpipes.com", phone: "+1-555-0102" },
  { id: "SUP-003", name: "LabTech Supplies", contact: "support@labtech.com", phone: "+1-555-0103" },
  { id: "SUP-004", name: "ElectroFlow Systems", contact: "info@electroflow.com", phone: "+1-555-0104" },
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category.toLowerCase() === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status.toLowerCase().replace(" ", "-") === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusBadge = (status: string, currentStock: number, minStock: number) => {
    if (currentStock === 0) {
      return (
        <Badge variant="destructive">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Out of Stock
        </Badge>
      )
    } else if (currentStock <= minStock) {
      return (
        <Badge variant="secondary">
          <TrendingDown className="w-3 h-3 mr-1" />
          Low Stock
        </Badge>
      )
    } else {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          In Stock
        </Badge>
      )
    }
  }

  const getMovementBadge = (type: string) => {
    return type === "Inbound" ? (
      <Badge variant="default" className="bg-green-100 text-green-800">
        Inbound
      </Badge>
    ) : (
      <Badge variant="secondary">Outbound</Badge>
    )
  }

  const handleAddItem = () => {
    setIsAddDialogOpen(false)
    alert("Item added to inventory!")
  }

  const lowStockCount = inventoryItems.filter((item) => item.currentStock <= item.minStock).length
  const outOfStockCount = inventoryItems.filter((item) => item.currentStock === 0).length
  const totalValue = inventoryItems.reduce((sum, item) => sum + item.currentStock * item.unitCost, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">Track parts, equipment, and supplies for field operations</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
              <DialogDescription>Enter the details for the new inventory item.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="item-name">Item Name</Label>
                  <Input id="item-name" placeholder="Enter item name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="item-sku">SKU</Label>
                  <Input id="item-sku" placeholder="Enter SKU" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="item-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meters">Meters</SelectItem>
                      <SelectItem value="fittings">Fittings</SelectItem>
                      <SelectItem value="testing">Testing Equipment</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="instruments">Instruments</SelectItem>
                      <SelectItem value="tools">Tools</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="item-supplier">Supplier</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="current-stock">Current Stock</Label>
                  <Input id="current-stock" type="number" placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="min-stock">Min Stock</Label>
                  <Input id="min-stock" type="number" placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unit-cost">Unit Cost ($)</Label>
                  <Input id="unit-cost" type="number" step="0.01" placeholder="0.00" />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem}>Add Item</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryItems.length}</div>
            <p className="text-xs text-muted-foreground">Unique items in inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStockCount}</div>
            <p className="text-xs text-muted-foreground">Items below minimum</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockCount}</div>
            <p className="text-xs text-muted-foreground">Items requiring restock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Current inventory value</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Inventory Items</TabsTrigger>
          <TabsTrigger value="movements">Stock Movements</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Items</CardTitle>
              <CardDescription>Manage your parts and equipment inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="meters">Meters</SelectItem>
                    <SelectItem value="fittings">Fittings</SelectItem>
                    <SelectItem value="testing equipment">Testing Equipment</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="instruments">Instruments</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="low-stock">Low Stock</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item Name</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Current Stock</TableHead>
                      <TableHead>Min/Max</TableHead>
                      <TableHead>Unit Cost</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">{item.supplier}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <div className="font-semibold">{item.currentStock}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {item.minStock} / {item.maxStock}
                          </div>
                        </TableCell>
                        <TableCell>${item.unitCost.toFixed(2)}</TableCell>
                        <TableCell>{getStatusBadge(item.status, item.currentStock, item.minStock)}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Wrench className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stock Movements</CardTitle>
              <CardDescription>Track inventory inbound and outbound transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockMovements.map((movement) => (
                      <TableRow key={movement.id}>
                        <TableCell>{movement.date}</TableCell>
                        <TableCell className="font-medium">{movement.itemName}</TableCell>
                        <TableCell>{getMovementBadge(movement.type)}</TableCell>
                        <TableCell>
                          <span className={movement.quantity > 0 ? "text-green-600" : "text-red-600"}>
                            {movement.quantity > 0 ? "+" : ""}
                            {movement.quantity}
                          </span>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{movement.reference}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{movement.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Directory</CardTitle>
              <CardDescription>Manage your inventory suppliers and contacts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {suppliers.map((supplier) => (
                  <div key={supplier.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{supplier.name}</div>
                      <div className="text-sm text-muted-foreground">{supplier.contact}</div>
                      <div className="text-sm text-muted-foreground">{supplier.phone}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Contact
                    </Button>
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
