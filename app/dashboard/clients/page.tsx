'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import { Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Plus, Building2, FolderOpen } from 'lucide-react';

const clients = [
  {
    id: 1,
    name: 'TechCorp Inc.',
    email: 'contact@techcorp.com',
    phone: '+1 (555) 123-4567',
    industry: 'Technology',
    status: 'active',
    projectCount: 2,
    lastActivity: '2024-01-15T11:45:00Z',
    totalReports: 4,
  },
  {
    id: 2,
    name: 'Global Enterprises',
    email: 'info@globalent.com',
    phone: '+1 (555) 987-6543',
    industry: 'Finance',
    status: 'active',
    projectCount: 1,
    lastActivity: '2024-01-14T16:20:00Z',
    totalReports: 2,
  },
  {
    id: 3,
    name: 'StartupXYZ',
    email: 'hello@startupxyz.com',
    phone: '+1 (555) 456-7890',
    industry: 'Startup',
    status: 'inactive',
    projectCount: 2,
    lastActivity: '2024-01-10T09:15:00Z',
    totalReports: 6,
  },
  {
    id: 4,
    name: 'Manufacturing Co.',
    email: 'contact@mfgco.com',
    phone: '+1 (555) 321-0987',
    industry: 'Manufacturing',
    status: 'active',
    projectCount: 0,
    lastActivity: '2024-01-12T14:30:00Z',
    totalReports: 0,
  },
];

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState(clients);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = clients.filter(
      client =>
        client.name.toLowerCase().includes(term.toLowerCase()) ||
        client.email.toLowerCase().includes(term.toLowerCase()) ||
        client.industry.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredClients(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
            <p className="text-gray-600 mt-2">Manage your intelligence gathering clients</p>
          </div>
          <Button asChild>
            <a href="/dashboard/clients/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </a>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.filter(c => c.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.reduce((sum, c) => sum + c.projectCount, 0)}</div>
            <p className="text-xs text-muted-foreground">Across all clients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.reduce((sum, c) => sum + c.totalReports, 0)}</div>
            <p className="text-xs text-muted-foreground">Generated reports</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Clients</CardTitle>
              <CardDescription>
                {filteredClients.length} client{filteredClients.length !== 1 ? 's' : ''} found
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search clients..."
                  className="pl-10 w-80"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Reports</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{client.industry}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(client.status)}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{client.projectCount}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{client.totalReports}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{formatDate(client.lastActivity)}</div>
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
                          <a href={`/dashboard/clients/${client.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={`/dashboard/clients/${client.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Client
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Client
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