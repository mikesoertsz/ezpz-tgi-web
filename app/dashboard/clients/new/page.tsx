'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Building2, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function NewClientPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    address: '',
    contactPerson: '',
    notes: '',
    status: 'active',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Redirect after success
      setTimeout(() => {
        router.push('/dashboard/clients');
      }, 2000);
    }, 1000);
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
              <CardTitle className="text-2xl">Client Created Successfully</CardTitle>
              <CardDescription>
                {formData.name} has been added to your client list
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Building2 className="h-4 w-4" />
                <AlertDescription>
                  Client ID: <strong>CLI-{Date.now().toString().slice(-6)}</strong>
                  <br />
                  You can now create projects for this client.
                </AlertDescription>
              </Alert>
              <div className="flex justify-center space-x-4">
                <Button onClick={() => router.push('/dashboard/clients')}>
                  View All Clients
                </Button>
                <Button variant="outline" onClick={() => router.push(`/dashboard/clients/1/projects/new`)}>
                  Create First Project
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
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Client</h1>
            <p className="text-gray-600 mt-2">Create a new client profile for intelligence gathering services</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="w-5 h-5" />
                <span>Client Information</span>
              </CardTitle>
              <CardDescription>
                Basic details about the client organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name *</Label>
                  <Input
                    id="name"
                    placeholder="TechCorp Inc."
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="startup">Startup</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@techcorp.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="https://techcorp.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Primary Contact</Label>
                  <Input
                    id="contactPerson"
                    placeholder="John Smith, CEO"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  placeholder="123 Business Ave, Suite 100, New York, NY 10001"
                  rows={2}
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional information about the client..."
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Status & Submit */}
          <Card>
            <CardHeader>
              <CardTitle>Client Status</CardTitle>
              <CardDescription>
                Set the initial status for this client
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="prospect">Prospect</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || !formData.name}>
                  {isSubmitting ? 'Creating Client...' : 'Create Client'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}