'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Settings, Bell, Shield, Database, Users, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      analysisComplete: true,
      newFindings: true,
      systemAlerts: false,
      weeklyReport: true,
    },
    privacy: {
      logRetention: '90',
      encryptData: true,
      anonymizeResults: false,
    },
    performance: {
      maxConcurrentAnalyses: '5',
      analysisTimeout: '120',
      cacheResults: true,
    },
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Simulate saving
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure your intelligence platform preferences</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {saved && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Settings have been saved successfully.
            </AlertDescription>
          </Alert>
        )}

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>
              Configure how and when you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Analysis Complete</Label>
                <p className="text-sm text-gray-500">Notify when an analysis is completed</p>
              </div>
              <Switch
                checked={settings.notifications.analysisComplete}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, analysisComplete: checked }
                  }))
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>New Findings</Label>
                <p className="text-sm text-gray-500">Alert when high-priority findings are discovered</p>
              </div>
              <Switch
                checked={settings.notifications.newFindings}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, newFindings: checked }
                  }))
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>System Alerts</Label>
                <p className="text-sm text-gray-500">Receive notifications about system status</p>
              </div>
              <Switch
                checked={settings.notifications.systemAlerts}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, systemAlerts: checked }
                  }))
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Report</Label>
                <p className="text-sm text-gray-500">Send weekly summary of activities</p>
              </div>
              <Switch
                checked={settings.notifications.weeklyReport}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, weeklyReport: checked }
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Privacy & Security</span>
            </CardTitle>
            <CardDescription>
              Manage data privacy and security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logRetention">Log Retention Period (days)</Label>
              <Select
                value={settings.privacy.logRetention}
                onValueChange={(value) =>
                  setSettings(prev => ({
                    ...prev,
                    privacy: { ...prev.privacy, logRetention: value }
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Encrypt Data at Rest</Label>
                <p className="text-sm text-gray-500">Encrypt all stored analysis data</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.privacy.encryptData}
                  onCheckedChange={(checked) =>
                    setSettings(prev => ({
                      ...prev,
                      privacy: { ...prev.privacy, encryptData: checked }
                    }))
                  }
                />
                <Badge variant="outline" className="text-green-600">Recommended</Badge>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Anonymize Results</Label>
                <p className="text-sm text-gray-500">Remove personally identifiable information from exports</p>
              </div>
              <Switch
                checked={settings.privacy.anonymizeResults}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({
                    ...prev,
                    privacy: { ...prev.privacy, anonymizeResults: checked }
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Performance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>Performance</span>
            </CardTitle>
            <CardDescription>
              Optimize system performance and resource usage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxConcurrent">Max Concurrent Analyses</Label>
                <Select
                  value={settings.performance.maxConcurrentAnalyses}
                  onValueChange={(value) =>
                    setSettings(prev => ({
                      ...prev,
                      performance: { ...prev.performance, maxConcurrentAnalyses: value }
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 analyses</SelectItem>
                    <SelectItem value="5">5 analyses</SelectItem>
                    <SelectItem value="10">10 analyses</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeout">Analysis Timeout (minutes)</Label>
                <Select
                  value={settings.performance.analysisTimeout}
                  onValueChange={(value) =>
                    setSettings(prev => ({
                      ...prev,
                      performance: { ...prev.performance, analysisTimeout: value }
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                    <SelectItem value="480">8 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cache Results</Label>
                <p className="text-sm text-gray-500">Cache analysis results to improve performance</p>
              </div>
              <Switch
                checked={settings.performance.cacheResults}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({
                    ...prev,
                    performance: { ...prev.performance, cacheResults: checked }
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>System Status</span>
            </CardTitle>
            <CardDescription>
              Current system health and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">98.5%</div>
                <div className="text-sm text-gray-500">System Uptime</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-500">Active Analyses</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-orange-600">1.2s</div>
                <div className="text-sm text-gray-500">Avg Response Time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}