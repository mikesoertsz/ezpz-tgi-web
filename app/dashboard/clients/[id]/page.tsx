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
const clientData = {
  id: 1,
  name: 'TechCorp Inc.',
  email: 'contact@techcorp.com',
  phone: '+1 (555) 123-4567',
  website: 'https://techcorp.com',
  industry: 'Technology',
  status: 'active',
  createdAt: '2024-01-10T09:00:00Z',
  updatedAt: '2024-01-15T14:30:00Z',
  address: '123 Business Ave, Suite 100, New York, NY 10001',
  contactPerson: 'John Smith, CEO',
  notes: 'High-priority client with ongoing executive background checks.',
};

const projects = [
  {
    id: 1,
    name: 'Executive Background Check',
    description: 'Comprehensive background investigation of senior executives.',
    status: 'active',
    progress: 75,
    createdAt: '2024-01-10T09:00:00Z',
    deadline: '2024-01-20T17:00:00Z',
    reportCount: 3,
    budget: 15000,
    spent: 11250,
  },
  {
    id: 2,
    name: 'Competitor Analysis',
    description: 'Intelligence gathering on key market competitors.',
    status: 'completed',
    progress: 100,
    createdAt: '2024-01-05T14:00:00Z',
    deadline: '2024-01-15T17:00:00Z',
    reportCount: 1,
    budget: 8000,
    spent: 7500,
  },
];

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'active':
        return <Clock className="w-4 h-4" />;
      case 'inactive':
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
            Back to Clients
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <Building2 className="w-4 h-4" />
              <span>Client Details</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{clientData.name}</h1>
            <p className="text-gray-600 mt-2">{clientData.industry} • {clientData.contactPerson}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Client
            </Button>
            <Button asChild>
              <a href={`/dashboard/clients/${params.id}/projects/new`}>
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Client Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            {getStatusIcon(clientData.status)}
          </CardHeader>
          <CardContent>
            <Badge className={getStatusColor(clientData.status)}>
              {clientData.status}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">
              Since {formatDate(clientData.createdAt)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">
              {projects.filter(p => p.status === 'active').length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.reduce((sum, p) => sum + p.reportCount, 0)}</div>
            <p className="text-xs text-muted-foreground">Generated reports</p>
          </CardContent>
        </Card>
      </div>

      {/* Client Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
            <CardDescription>Contact details and company information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Email</Label>
                <p className="text-sm">{clientData.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Phone</Label>
                <p className="text-sm">{clientData.phone}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Website</Label>
                <p className="text-sm">
                  <a href={clientData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {clientData.website}
                  </a>
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Industry</Label>
                <p className="text-sm">{clientData.industry}</p>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Address</Label>
              <p className="text-sm">{clientData.address}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Notes</Label>
              <p className="text-sm">{clientData.notes}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
            <CardDescription>Recent client activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Client created</p>
                  <p className="text-xs text-gray-500">{formatDate(clientData.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Last updated</p>
                  <p className="text-xs text-gray-500">{formatDate(clientData.updatedAt)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                All projects for this client
              </CardDescription>
            </div>
            <Button asChild>
              <a href={`/dashboard/clients/${params.id}/projects/new`}>
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </a>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Reports</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-gray-500">{project.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(project.status)}>
                      <span className="flex items-center space-x-1">
                        {getStatusIcon(project.status)}
                        <span className="capitalize">{project.status}</span>
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={project.progress} className="flex-1 h-2" />
                      <span className="text-xs text-gray-500">{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{project.reportCount}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{formatCurrency(project.spent)}</div>
                      <div className="text-gray-500">of {formatCurrency(project.budget)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{formatDate(project.deadline)}</div>
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
                          <a href={`/dashboard/clients/${params.id}/projects/${project.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Project
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={`/dashboard/clients/${params.id}/projects/${project.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Project
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <a href={`/dashboard/clients/${params.id}/projects/${project.id}/reports/new`}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Report
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

function Label({ className, children, ...props }: { className?: string; children: React.ReactNode }) {
  return (
    <label className={className} {...props}>
      {children}
    </label>
  );
}