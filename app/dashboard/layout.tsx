'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Shield,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Building2,
  FolderOpen,
  FileText,
  Plus,
} from 'lucide-react';

// Mock data for clients and their projects
const mockClients = [
  {
    id: 1,
    name: 'TechCorp Inc.',
    projects: [
      { id: 1, name: 'Executive Background Check', reportCount: 3 },
      { id: 2, name: 'Competitor Analysis', reportCount: 1 },
    ]
  },
  {
    id: 2,
    name: 'Global Enterprises',
    projects: [
      { id: 3, name: 'Due Diligence Research', reportCount: 2 },
    ]
  },
  {
    id: 3,
    name: 'StartupXYZ',
    projects: [
      { id: 4, name: 'Investor Verification', reportCount: 4 },
      { id: 5, name: 'Market Intelligence', reportCount: 2 },
    ]
  },
];

const mainNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [expandedClients, setExpandedClients] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const email = localStorage.getItem('userEmail');
    
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      setUserEmail(email || '');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  const getUserInitials = (email: string) => {
    return email.split('@')[0].substring(0, 2).toUpperCase();
  };

  const toggleClientExpansion = (clientId: number) => {
    setExpandedClients(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Intel Platform</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <ScrollArea className="flex-1 h-full">
            <div className="p-4">
              {/* Main Navigation */}
              <div className="space-y-2 mb-6">
                {mainNavigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors rounded-md"
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </a>
                  );
                })}
              </div>

              {/* Clients Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-3 py-2">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Clients</h3>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {mockClients.map((client) => (
                  <Collapsible
                    key={client.id}
                    open={expandedClients.includes(client.id)}
                    onOpenChange={() => toggleClientExpansion(client.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-3 py-2 h-auto text-left"
                      >
                        <div className="flex items-center space-x-2 flex-1">
                          {expandedClients.includes(client.id) ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                          <Building2 className="w-4 h-4" />
                          <span className="truncate">{client.name}</span>
                        </div>
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-6 space-y-1">
                      {client.projects.map((project) => (
                        <a
                          key={project.id}
                          href={`/dashboard/clients/${client.id}/projects/${project.id}`}
                          className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors rounded-md"
                        >
                          <div className="flex items-center space-x-2">
                            <FolderOpen className="w-4 h-4" />
                            <span className="truncate">{project.name}</span>
                          </div>
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                            {project.reportCount}
                          </span>
                        </a>
                      ))}
                      <a
                        href={`/dashboard/clients/${client.id}/projects/new`}
                        className="flex items-center px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors rounded-md"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        New Project
                      </a>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
                
                <a
                  href="/dashboard/clients/new"
                  className="flex items-center px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors rounded-md"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Client
                </a>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className={`hidden lg:flex lg:flex-shrink-0 transition-all duration-300 ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-80'}`}>
        <div className="flex flex-col w-full bg-white border-r border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Intel Platform</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={sidebarCollapsed ? 'mx-auto' : ''}
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-4">
              {/* Main Navigation */}
              <div className={`space-y-2 mb-6 ${sidebarCollapsed ? 'hidden' : ''}`}>
                {mainNavigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors rounded-md"
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </a>
                  );
                })}
              </div>

              {/* Collapsed Navigation Icons */}
              {sidebarCollapsed && (
                <div className="space-y-2 mb-6">
                  {mainNavigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center justify-center p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors rounded-md"
                        title={item.name}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Clients Section */}
              {!sidebarCollapsed && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-3 py-2">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Clients</h3>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" asChild>
                      <a href="/dashboard/clients/new">
                        <Plus className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                  
                  {mockClients.map((client) => (
                    <Collapsible
                      key={client.id}
                      open={expandedClients.includes(client.id)}
                      onOpenChange={() => toggleClientExpansion(client.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start px-3 py-2 h-auto text-left"
                        >
                          <div className="flex items-center space-x-2 flex-1">
                            {expandedClients.includes(client.id) ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                            <Building2 className="w-4 h-4" />
                            <span className="truncate">{client.name}</span>
                          </div>
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="ml-6 space-y-1">
                        {client.projects.map((project) => (
                          <a
                            key={project.id}
                            href={`/dashboard/clients/${client.id}/projects/${project.id}`}
                            className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors rounded-md"
                          >
                            <div className="flex items-center space-x-2">
                              <FolderOpen className="w-4 h-4" />
                              <span className="truncate">{project.name}</span>
                            </div>
                            <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                              {project.reportCount}
                            </span>
                          </a>
                        ))}
                        <a
                          href={`/dashboard/clients/${client.id}/projects/new`}
                          className="flex items-center px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors rounded-md"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          New Project
                        </a>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                  
                  <a
                    href="/dashboard/clients"
                    className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors rounded-md"
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    All Clients
                  </a>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full ${sidebarCollapsed ? 'p-2' : 'justify-start p-2'}`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-600 text-white text-sm">
                      {getUserInitials(userEmail)}
                    </AvatarFallback>
                  </Avatar>
                  {!sidebarCollapsed && (
                    <div className="ml-3 text-left">
                      <p className="text-sm font-medium text-gray-900">{userEmail.split('@')[0]}</p>
                      <p className="text-xs text-gray-500">Agent</p>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-gray-900">Intel Platform</span>
          </div>
          <div className="w-10" />
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}