import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Search, MoreHorizontal, Shield, AlertTriangle, CheckCircle, Clock, User, Building2 } from "lucide-react"

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      title: "Executive Background Check - John Smith",
      project: "Corporate Security Assessment",
      client: "Acme Corporation",
      target: "John Smith",
      targetEmail: "john.smith@example.com",
      targetLinkedIn: "linkedin.com/in/johnsmith",
      status: "Completed",
      riskLevel: "High",
      generated: "2024-01-25 14:30",
      findings: 12
    },
    {
      id: 2,
      title: "Social Media Analysis - Sarah Johnson",
      project: "Executive Background Check",
      client: "Global Dynamics",
      target: "Sarah Johnson",
      targetEmail: "sarah.j@globaldynamics.com",
      targetLinkedIn: "linkedin.com/in/sarahjohnson",
      status: "In Progress",
      riskLevel: "Medium",
      generated: "2024-01-25 10:15",
      findings: 8
    },
    {
      id: 3,
      title: "Corporate Intelligence - TechCorp Inc",
      project: "Competitive Intelligence",
      client: null,
      target: "TechCorp Inc",
      targetEmail: "info@techcorp.com",
      targetLinkedIn: "linkedin.com/company/techcorp",
      status: "Completed",
      riskLevel: "Low",
      generated: "2024-01-24 16:45",
      findings: 5
    },
    {
      id: 4,
      title: "Threat Assessment - Michael Brown",
      project: "Security Assessment",
      client: "TechStart Inc",
      target: "Michael Brown",
      targetEmail: "m.brown@techstart.com",
      targetLinkedIn: "linkedin.com/in/michaelbrown",
      status: "Processing",
      riskLevel: "Unknown",
      generated: "2024-01-25 09:00",
      findings: 0
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'In Progress': return <Clock className="h-4 w-4 text-blue-500" />
      case 'Processing': return <Clock className="h-4 w-4 text-yellow-500" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'High': return <Shield className="h-4 w-4 text-red-500" />
      case 'Medium': return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'Low': return <CheckCircle className="h-4 w-4 text-green-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'destructive'
      case 'Medium': return 'secondary'
      case 'Low': return 'default'
      default: return 'outline'
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Reports</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Intelligence Reports</h1>
              <p className="text-muted-foreground">AI-generated threat analysis and security assessments</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search reports..." className="pl-8" />
            </div>
          </div>

          <div className="grid gap-4">
            {reports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {report.project}
                    </Badge>
                    {report.client && (
                      <Badge variant="outline" className="text-xs">
                        <Building2 className="h-3 w-3 mr-1" />
                        {report.client}
                      </Badge>
                    )}
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(report.status)}
                      <span className="text-xs">{report.status}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getRiskIcon(report.riskLevel)}
                      <Badge variant={getRiskColor(report.riskLevel)} className="text-xs">
                        {report.riskLevel} Risk
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-muted/50 p-3 rounded-md">
                    <div className="text-sm font-medium mb-2">Target Information:</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Name:</span>
                        <div className="font-medium">{report.target}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <div className="font-medium">{report.targetEmail}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">LinkedIn:</span>
                        <div className="font-medium truncate">{report.targetLinkedIn}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div>
                        <span className="text-muted-foreground">Generated:</span>
                        <span className="font-medium ml-1">{report.generated}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Findings:</span>
                        <span className="font-medium ml-1">{report.findings}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Report Generation</CardTitle>
              <CardDescription>Create new intelligence reports using AI agents</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2 md:grid-cols-3">
              <Button variant="outline" className="justify-start">
                <User className="h-4 w-4 mr-2" />
                Person Analysis
              </Button>
              <Button variant="outline" className="justify-start">
                <Building2 className="h-4 w-4 mr-2" />
                Company Research
              </Button>
              <Button variant="outline" className="justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Threat Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}