'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, FileText, CheckCircle2, AlertCircle, Building2, FolderOpen } from 'lucide-react';

const analysisModules = [
  {
    id: 'social-media',
    name: 'Social Media Profiles',
    description: 'Scan major social platforms for profiles and activity',
    enabled: true,
  },
  {
    id: 'professional',
    name: 'Professional Networks',
    description: 'LinkedIn, professional directories, and career history',
    enabled: true,
  },
  {
    id: 'public-records',
    name: 'Public Records',
    description: 'Court records, property records, and public filings',
    enabled: false,
  },
  {
    id: 'news-mentions',
    name: 'News & Media Mentions',
    description: 'News articles, press releases, and media coverage',
    enabled: true,
  },
  {
    id: 'web-presence',
    name: 'Web Presence',
    description: 'Personal websites, blogs, and online content',
    enabled: true,
  },
  {
    id: 'data-breaches',
    name: 'Data Breach Check',
    description: 'Check if email appears in known data breaches',
    enabled: false,
  },
];

export default function NewReportPage({ params }: { params: { id: string; projectId: string } }) {
  const [formData, setFormData] = useState({
    title: '',
    targetName: '',
    targetEmail: '',
    targetPhone: '',
    targetLocation: '',
    targetCompany: '',
    targetJobTitle: '',
    additionalInfo: '',
    priority: 'medium',
    reportType: 'background-check',
  });
  const [selectedModules, setSelectedModules] = useState(
    analysisModules.filter(m => m.enabled).map(m => m.id)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleModuleToggle = (moduleId: string, checked: boolean) => {
    if (checked) {
      setSelectedModules(prev => [...prev, moduleId]);
    } else {
      setSelectedModules(prev => prev.filter(id => id !== moduleId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Report Generation Started</CardTitle>
              <CardDescription>
                Intelligence gathering for "{formData.targetName}" has been initiated
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Report ID: <strong>RPT-{Date.now().toString().slice(-6)}</strong>
                  <br />
                  Estimated completion time: 45-90 minutes
                </AlertDescription>
              </Alert>
              <div className="flex justify-center space-x-4">
                <Button onClick={() => router.push(`/dashboard/clients/${params.id}/projects/${params.projectId}`)}>
                  Back to Project
                </Button>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Create Another Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Project
          </Button>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
          <Building2 className="w-4 h-4" />
          <span>TechCorp Inc.</span>
          <span>/</span>
          <FolderOpen className="w-4 h-4" />
          <span>Executive Background Check</span>
          <span>/</span>
          <FileText className="w-4 h-4" />
          <span>New Report</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900">Create Intelligence Report</h1>
        <p className="text-gray-600 mt-2">Generate a comprehensive intelligence analysis report</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Report Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Report Details</span>
              </CardTitle>
              <CardDescription>
                Basic information about this intelligence report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Report Title *</Label>
                  <Input
                    id="title"
                    placeholder="Executive Background Analysis - John Smith"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reportType">Report Type</Label>
                  <Select value={formData.reportType} onValueChange={(value) => handleInputChange('reportType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="background-check">Background Check</SelectItem>
                      <SelectItem value="due-diligence">Due Diligence</SelectItem>
                      <SelectItem value="competitive-intelligence">Competitive Intelligence</SelectItem>
                      <SelectItem value="threat-assessment">Threat Assessment</SelectItem>
                      <SelectItem value="fraud-investigation">Fraud Investigation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Target Information */}
          <Card>
            <CardHeader>
              <CardTitle>Target Subject Information</CardTitle>
              <CardDescription>
                Details about the individual or entity being investigated
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetName">Full Name *</Label>
                  <Input
                    id="targetName"
                    placeholder="John Smith"
                    value={formData.targetName}
                    onChange={(e) => handleInputChange('targetName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetEmail">Email Address</Label>
                  <Input
                    id="targetEmail"
                    type="email"
                    placeholder="john.smith@company.com"
                    value={formData.targetEmail}
                    onChange={(e) => handleInputChange('targetEmail', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetPhone">Phone Number</Label>
                  <Input
                    id="targetPhone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.targetPhone}
                    onChange={(e) => handleInputChange('targetPhone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetLocation">Location</Label>
                  <Input
                    id="targetLocation"
                    placeholder="New York, NY"
                    value={formData.targetLocation}
                    onChange={(e) => handleInputChange('targetLocation', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetCompany">Company</Label>
                  <Input
                    id="targetCompany"
                    placeholder="Tech Corporation Inc."
                    value={formData.targetCompany}
                    onChange={(e) => handleInputChange('targetCompany', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetJobTitle">Job Title</Label>
                  <Input
                    id="targetJobTitle"
                    placeholder="Chief Executive Officer"
                    value={formData.targetJobTitle}
                    onChange={(e) => handleInputChange('targetJobTitle', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Any additional context, aliases, or specific information about the target..."
                  rows={3}
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Analysis Modules */}
          <Card>
            <CardHeader>
              <CardTitle>Intelligence Gathering Modules</CardTitle>
              <CardDescription>
                Select which types of intelligence gathering to perform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysisModules.map((module) => (
                  <div key={module.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={module.id}
                      checked={selectedModules.includes(module.id)}
                      onCheckedChange={(checked: boolean) => 
                        handleModuleToggle(module.id, checked)
                      }
                    />
                    <div className="flex-1">
                      <Label htmlFor={module.id} className="font-medium cursor-pointer">
                        {module.name}
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">{module.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Priority & Submit */}
          <Card>
            <CardHeader>
              <CardTitle>Report Priority</CardTitle>
              <CardDescription>
                Set the priority level for this intelligence report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">Low</Badge>
                        <span>Standard processing (2-4 hours)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                        <span>Priority processing (1-2 hours)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center space-x-2">
                        <Badge variant="destructive">High</Badge>
                        <span>Urgent processing (30-60 minutes)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || !formData.title || !formData.targetName}>
                  {isSubmitting ? 'Generating Report...' : 'Generate Report'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}