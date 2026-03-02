"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Book, MessageCircle, Phone, Mail, ExternalLink } from "lucide-react"

const faqData = [
  {
    question: "How do I add a new customer to the system?",
    answer:
      "Navigate to the Clients section and click 'Add New Client'. Fill in the required information including name, address, and meter details. The system will automatically assign a unique client ID.",
  },
  {
    question: "What should I do when a meter shows an error status?",
    answer:
      "Check the Smart Meters section for detailed error information. Common issues include low battery, weak signal, or mechanical problems. Contact the maintenance team for physical inspections if needed.",
  },
  {
    question: "How can I generate monthly billing reports?",
    answer:
      "Go to Reports & Analytics, select 'Revenue Report' as the report type, choose your date range, and click 'Export Report'. The system will generate a comprehensive billing report.",
  },
  {
    question: "How do I send notifications to customers?",
    answer:
      "Use the Notifications section to compose messages. You can target specific regions, customer groups, or individual clients. Choose between email, SMS, or both delivery methods.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "HydroSync supports credit/debit cards, bank transfers, auto-pay, and cash payments. Payment methods can be configured in the Settings section under Billing Configuration.",
  },
]

const tutorials = [
  {
    title: "Getting Started with HydroSync",
    description: "Learn the basics of navigating the system",
    duration: "5 min",
    category: "Beginner",
  },
  {
    title: "Managing Customer Accounts",
    description: "How to add, edit, and manage customer information",
    duration: "8 min",
    category: "Beginner",
  },
  {
    title: "Smart Meter Monitoring",
    description: "Understanding meter status and troubleshooting",
    duration: "12 min",
    category: "Intermediate",
  },
  {
    title: "Billing and Payment Processing",
    description: "Setting up billing cycles and processing payments",
    duration: "10 min",
    category: "Intermediate",
  },
  {
    title: "Advanced Reporting Features",
    description: "Creating custom reports and analytics",
    duration: "15 min",
    category: "Advanced",
  },
]

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">Find answers, tutorials, and get assistance with HydroSync</p>
      </div>

      {/* Quick Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for help articles, tutorials, or features..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions and answers about using HydroSync</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>Step-by-step guides to help you master HydroSync features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {tutorials.map((tutorial, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Book className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{tutorial.title}</div>
                        <div className="text-sm text-muted-foreground">{tutorial.description}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {tutorial.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{tutorial.duration}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Technical Support</CardTitle>
                <CardDescription>Get help with technical issues and system problems</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Phone Support</div>
                    <div className="text-sm text-muted-foreground">+1 (800) 555-HYDRO</div>
                    <div className="text-xs text-muted-foreground">Mon-Fri, 8 AM - 6 PM EST</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Email Support</div>
                    <div className="text-sm text-muted-foreground">support@hydrosync.com</div>
                    <div className="text-xs text-muted-foreground">Response within 24 hours</div>
                  </div>
                </div>
                <Button className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales & Billing</CardTitle>
                <CardDescription>Questions about pricing, billing, and account management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Sales Team</div>
                    <div className="text-sm text-muted-foreground">+1 (800) 555-SALES</div>
                    <div className="text-xs text-muted-foreground">Mon-Fri, 9 AM - 5 PM EST</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Billing Inquiries</div>
                    <div className="text-sm text-muted-foreground">billing@hydrosync.com</div>
                    <div className="text-xs text-muted-foreground">Response within 48 hours</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Submit Billing Ticket
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>Comprehensive guides and API documentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Book className="mr-2 h-4 w-4" />
                  User Manual
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Book className="mr-2 h-4 w-4" />
                  API Documentation
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Book className="mr-2 h-4 w-4" />
                  Installation Guide
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current system status and maintenance updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">All Systems Operational</span>
                  </div>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Online
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">Last updated: 2 minutes ago</div>
                <Button variant="outline" className="w-full">
                  View Status Page
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Release Notes</CardTitle>
              <CardDescription>Latest updates and new features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-2 border-blue-500 pl-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Version 2.1.0</h4>
                    <Badge variant="default">Latest</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enhanced reporting features, improved meter monitoring, and new notification options.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Released: January 15, 2024</p>
                </div>
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-medium">Version 2.0.5</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Bug fixes and performance improvements for the billing system.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Released: December 20, 2023</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
