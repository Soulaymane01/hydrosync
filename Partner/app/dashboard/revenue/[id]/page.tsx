"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, FileText } from "lucide-react"

// Mock data - in real app, this would come from API
const paymentData = {
  "PAY-1001": {
    id: "PAY-1001",
    date: "2024-01-15",
    time: "14:32:15",
    amount: 156.78,
    method: "Credit Card",
    cardLast4: "4532",
    clientId: "C-1001",
    clientName: "John Smith",
    status: "Completed",
    transactionId: "TXN-789456123",
    notes: "",
    invoiceId: "INV-001",
    processingFee: 2.35,
    netAmount: 154.43,
  },
  "PAY-1003": {
    id: "PAY-1003",
    date: "2024-01-13",
    time: "09:15:42",
    amount: 234.56,
    method: "Cash",
    clientId: "C-1003",
    clientName: "Mike Davis",
    status: "Completed",
    notes: "Late fee applied",
    invoiceId: "INV-003",
    lateFee: 25.0,
    netAmount: 234.56,
  },
}

export default function PaymentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const paymentId = params.id as string

  const payment = paymentData[paymentId as keyof typeof paymentData]

  if (!payment) {
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
            <p>Payment not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Revenue
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Details</h1>
          <p className="text-muted-foreground">Payment ID: {payment.id}</p>
        </div>
      </div>

      {/* Payment Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Amount:</span>
              <span className="text-2xl font-bold text-green-600">${payment.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Status:</span>
              {getStatusBadge(payment.status)}
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Date:</span>
              <span>
                {payment.date} at {payment.time}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Method:</span>
              <span>{payment.method}</span>
            </div>
            {payment.cardLast4 && (
              <div className="flex justify-between">
                <span className="text-sm font-medium">Card:</span>
                <span>****{payment.cardLast4}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{payment.clientName}</div>
                <div className="text-sm text-muted-foreground">{payment.clientId}</div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/clients/${payment.clientId}`)}>
              View Client Profile
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Details */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {payment.transactionId && (
              <div className="flex justify-between">
                <span className="text-sm font-medium">Transaction ID:</span>
                <span className="font-mono text-sm">{payment.transactionId}</span>
              </div>
            )}
            {payment.invoiceId && (
              <div className="flex justify-between">
                <span className="text-sm font-medium">Invoice ID:</span>
                <span>{payment.invoiceId}</span>
              </div>
            )}
            {payment.processingFee && (
              <div className="flex justify-between">
                <span className="text-sm font-medium">Processing Fee:</span>
                <span>${payment.processingFee.toFixed(2)}</span>
              </div>
            )}
            {payment.lateFee && (
              <div className="flex justify-between">
                <span className="text-sm font-medium">Late Fee:</span>
                <span className="text-red-600">${payment.lateFee.toFixed(2)}</span>
              </div>
            )}
            {payment.netAmount && (
              <div className="flex justify-between">
                <span className="text-sm font-medium">Net Amount:</span>
                <span className="font-semibold">${payment.netAmount.toFixed(2)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      {payment.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-3">
              <FileText className="h-4 w-4 text-muted-foreground mt-1" />
              <p className="text-sm">{payment.notes}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
