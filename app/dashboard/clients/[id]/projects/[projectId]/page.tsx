'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  ArrowLeft, 
  FolderOpen, 
  FileText, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Download, 
  Edit,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building2
} from 'lucide-react';

// Mock data
const projectData = {
  id: 1,
  name: 'Executive Background Check',
  description: 'Comprehensive background investigation of senior executives for due diligence purposes.',
  client: {
    id: 1,
    name: 'TechCorp Inc.',
  },
  status: 'active',
  progress: 75,
  createdAt: '2024-01-10T09:00:00Z',
  updatedAt: '2024-01-15T14:30:00Z',
  deadline: '2024-01-20T17:00:00Z',
  budget: 15000,
  spent: 11250,
};

const reports = [
  {
    id: 1,
    title: 'John Smith - CEO Background Report',
    status: 'completed',
    createdAt: '2024-01-12T10:00:00Z',
    completedAt: '2024-01-14T16:30:00Z',
    findings: 24,
    riskLevel: 'medium',
    pages: 45,
  },
  {
    id: 2,
    title: 'Sarah Johnson - CTO Analysis',
    status: 'in-progress',
    createdAt: '2024-01-13T14:00:00Z',
    findings: 12,
    riskLevel: 'low',
    progress: 65,
  },
  {
    id: 3,
    title: 'Michael Chen - CFO Investigation',
    status: 'pending',
    createdAt: '2024-01-15T09:00:00Z',
    findings: 0,
    riskLevel: 'unknown',
    progress: 0,
  },
];

export default function ProjectDetailPage({ params }: { params: { id: string; projectId: string } }) {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Client
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <Building2 className="w-4 h-4" />
              <span>{projectData.client.name}</span>
              <span>/</span>
              <FolderOpen className="w-4 h-4" />
              <span>Project</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{projectData.name}</h1>
            <p className="text-gray-600 mt-2">{projectData.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Project
            </Button>
            <Button asChild>
              <a href={`/dashboard/clients/${params.id}/projects/${params.projectId}/reports/new`}>
                <Plus className="w-4 h-4 mr-2" />
                New Report
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            {getStatusIcon(projectData.status)}
          </CardHeader>
          <CardContent>
            <Badge className={getStatusColor(projectData.status)}>
              {projectData.status}
            </Badge>
            <div className="mt-2">
              <Progress value={projectData.progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">{projectData.progress}% complete</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
            <p className="text-xs text-muted-foreground">
              {reports.filter(r => r.status === 'completed').length} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget</CardTitle>
            <div className="text-xs text-gray-500">
              {Math.round((projectData.spent / projectData.budget) * 100)}% used
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(projectData.spent)}</div>
            <p className="text-xs text-muted-foreground">
              of {formatCurrency(projectData.budget)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deadline</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatDate(projectData.deadline)}</div>
            <p className="text-xs text-muted-foreground">5 days remaining</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Intelligence Reports</CardTitle>
              <CardDescription>
                All reports generated for this project
              </CardDescription>
            </div>
            <Button asChild>
              <a href={`/dashboard/clients/${params.id}/projects/${params.projectId}/reports/new`}>
                <Plus className="w-4 h-4 mr-2" />
                New Report
              </a>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Findings</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="font-medium">{report.title}</div>
                    {report.pages && (
                      <div className="text-sm text-gray-500">{report.pages} pages</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(report.status)}>
                      <span className="flex items-center space-x-1">
                        {getStatusIcon(report.status)}
                        <span className="capitalize">{report.status.replace('-', ' ')}</span>
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRiskColor(report.riskLevel)}>
                      {report.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{report.findings}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{formatDate(report.createdAt)}</div>
                  </TableCell>
                  <TableCell>
                    {report.status === 'in-progress' ? (
                      <div className="flex items-center space-x-2">
                        <Progress value={report.progress} className="flex-1 h-2" />
                        <span className="text-xs text-gray-500">{report.progress}%</span>
                      </div>
                    ) : report.status === 'completed' ? (
                      <span className="text-sm text-green-600">Complete</span>
                    ) : (
                      <span className="text-sm text-gray-500">Pending</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <a href={`/dashboard/clients/${params.id}/projects/${params.projectId}/reports/${report.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Report
                          </a>
                        </DropdownMenuItem>
                        {report.status === 'completed' && (
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <a href={`/dashboard/clients/${params.id}/projects/${params.projectId}/reports/${report.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Report
                          </a>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}