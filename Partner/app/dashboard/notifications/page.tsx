"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Mail, MessageSquare, Users } from "lucide-react"

const sentNotifications = [
  {
    id: "NOT-001",
    title: "Water Service Maintenance",
    message: "Scheduled maintenance in North Region on Jan 20th, 2024",
    recipients: "North Region (245 clients)",
    method: "Email + SMS",
    date: "2024-01-15",
    status: "Delivered",
  },
  {
    id: "NOT-002",
    title: "Payment Reminder",
    message: "Your water bill is due in 3 days. Please make payment to avoid late fees.",
    recipients: "Overdue clients (12 clients)",
    method: "Email",
    date: "2024-01-14",
    status: "Delivered",
  },
  {
    id: "NOT-003",
    title: "Meter Reading Notice",
    message: "Our technician will visit your property for meter reading between 9 AM - 5 PM.",
    recipients: "All clients (2,847 clients)",
    method: "SMS",
    date: "2024-01-12",
    status: "Delivered",
  },
]

export default function NotificationsPage() {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [recipients, setRecipients] = useState("")
  const [method, setMethod] = useState("")

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault()
    // In real app, this would send the notification
    alert("Notification sent successfully!")
    setTitle("")
    setMessage("")
    setRecipients("")
    setMethod("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Delivered
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Send alerts and communications to your customers</p>
      </div>

      <Tabs defaultValue="compose" className="space-y-4">
        <TabsList>
          <TabsTrigger value="compose">Compose Message</TabsTrigger>
          <TabsTrigger value="history">Message History</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send Notification</CardTitle>
              <CardDescription>Compose and send messages to your customers</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendNotification} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="recipients">Recipients</Label>
                    <Select value={recipients} onValueChange={setRecipients}>
                      <SelectTrigger>
                        <Users className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Select recipients" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Clients (2,847)</SelectItem>
                        <SelectItem value="north">North Region (245)</SelectItem>
                        <SelectItem value="south">South Region (312)</SelectItem>
                        <SelectItem value="east">East Region (198)</SelectItem>
                        <SelectItem value="west">West Region (234)</SelectItem>
                        <SelectItem value="central">Central Region (456)</SelectItem>
                        <SelectItem value="overdue">Overdue Clients (23)</SelectItem>
                        <SelectItem value="active">Active Clients (2,824)</SelectItem>
                        <SelectItem value="individual">Individual Client</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="method">Delivery Method</Label>
                    <Select value={method} onValueChange={setMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">
                          <div className="flex items-center">
                            <Mail className="mr-2 h-4 w-4" />
                            Email Only
                          </div>
                        </SelectItem>
                        <SelectItem value="sms">
                          <div className="flex items-center">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            SMS Only
                          </div>
                        </SelectItem>
                        <SelectItem value="both">
                          <div className="flex items-center">
                            <Send className="mr-2 h-4 w-4" />
                            Email + SMS
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Message Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter message title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message Content</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message content..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Keep messages clear and concise. SMS messages are limited to 160 characters.
                  </p>
                </div>

                <Button type="submit" className="w-full md:w-auto">
                  <Send className="mr-2 h-4 w-4" />
                  Send Notification
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Message History</CardTitle>
              <CardDescription>Previously sent notifications and their delivery status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">Recipients</TableHead>
                      <TableHead className="hidden sm:table-cell">Method</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sentNotifications.map((notification) => (
                      <TableRow key={notification.id}>
                        <TableCell className="font-medium">{notification.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{notification.title}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                              {notification.message}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{notification.recipients}</TableCell>
                        <TableCell className="hidden sm:table-cell">{notification.method}</TableCell>
                        <TableCell>{notification.date}</TableCell>
                        <TableCell>{getStatusBadge(notification.status)}</TableCell>
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
