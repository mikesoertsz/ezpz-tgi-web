'use client'

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  User, 
  Building2,
  Calendar,
  Eye,
  Download,
  MoreHorizontal
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [clientFilter, setClientFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")

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
      findings: 12,
      type: "Background Check"
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
      findings: 8,
      type: "Social Media Analysis"
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
      findings: 5,
      type: "Corporate Intelligence"
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
      findings: 0,
      type: "Threat Assessment"
    },
    {
      id: 5,
      title: "Financial Assets Analysis - Jennifer Davis",
      project: "Due Diligence Review",
      client: "Investment Partners LLC",
      target: "Jennifer Davis",
      targetEmail: "j.davis@example.com",
      targetLinkedIn: "linkedin.com/in/jenniferdavis",
      status: "Completed",
      riskLevel: "Medium",
      generated: "2024-01-23 11:20",
      findings: 15,
      type: "Financial Analysis"
    },
    {
      id: 6,
      title: "Property Holdings Investigation - Robert Wilson",
      project: "Asset Verification",
      client: "Legal Associates",
      target: "Robert Wilson",
      targetEmail: "r.wilson@example.com",
      targetLinkedIn: "linkedin.com/in/robertwilson",
      status: "In Progress",
      riskLevel: "High",
      generated: "2024-01-24 08:45",
      findings: 7,
      type: "Property Investigation"
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'default'
      case 'In Progress': return 'secondary'
      case 'Processing': return 'outline'
      default: return 'secondary'
    }
  }

  // Get unique values for filters
  const uniqueClients = [...new Set(reports.map(r => r.client).filter(Boolean))]
  const uniqueProjects = [...new Set(reports.map(r => r.project))]
  const uniqueStatuses = [...new Set(reports.map(r => r.status))]
  const uniqueRiskLevels = [...new Set(reports.map(r => r.riskLevel).filter(r => r !== 'Unknown'))]

  // Filter reports based on search and filters
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.targetEmail.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesClient = clientFilter === "all" || report.client === clientFilter
    const matchesProject = projectFilter === "all" || report.project === projectFilter
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesRisk = riskFilter === "all" || report.riskLevel === riskFilter

    return matchesSearch && matchesClient && matchesProject && matchesStatus && matchesRisk
  })

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
            <Link href="/reports/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </Link>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search reports..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Select value={clientFilter} onValueChange={setClientFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Clients</SelectItem>
                      {uniqueClients.map(client => (
                        <SelectItem key={client} value={client}>{client}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={projectFilter} onValueChange={setProjectFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      {uniqueProjects.map(project => (
                        <SelectItem key={project} value={project}>{project}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      {uniqueStatuses.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={riskFilter} onValueChange={setRiskFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Risk" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Risk</SelectItem>
                      {uniqueRiskLevels.map(risk => (
                        <SelectItem key={risk} value={risk}>{risk}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle>Reports ({filteredReports.length})</CardTitle>
              <CardDescription>
                Comprehensive intelligence reports and security assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Generated</TableHead>
                    <TableHead>Findings</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{report.title}</div>
                            <div className="text-sm text-muted-foreground">{report.type}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{report.target}</div>
                          <div className="text-sm text-muted-foreground">{report.targetEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {report.project}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {report.client ? (
                          <div className="flex items-center space-x-1">
                            <Building2 className="h-3 w-3" />
                            <span className="text-sm">{report.client}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">Independent</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(report.status)}
                          <Badge variant={getStatusColor(report.status)} className="text-xs">
                            {report.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getRiskIcon(report.riskLevel)}
                          <Badge variant={getRiskColor(report.riskLevel)} className="text-xs">
                            {report.riskLevel}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{report.generated}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {report.findings} findings
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Report Generation</CardTitle>
              <CardDescription>Create new intelligence reports using AI agents</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2 md:grid-cols-3">
              <Link href="/reports/new?type=person">
                <Button variant="outline" className="justify-start w-full">
                  <User className="h-4 w-4 mr-2" />
                  Person Analysis
                </Button>
              </Link>
              <Link href="/reports/new?type=company">
                <Button variant="outline" className="justify-start w-full">
                  <Building2 className="h-4 w-4 mr-2" />
                  Company Research
                </Button>
              </Link>
              <Link href="/reports/new?type=threat">
                <Button variant="outline" className="justify-start w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Threat Assessment
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}