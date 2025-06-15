"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Upload,
  FileText,
  Trash2,
  Download,
  Settings,
  Brain,
  Database,
  Shield,
  Clock,
  Zap,
  AlertTriangle,
  Info,
  X,
  Key,
  Link,
  Plus,
  Eye,
  EyeOff
} from "lucide-react"

interface AgentSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  agent: {
    id: number
    name: string
    description: string
    category: string
    status: string
    defaultPrompt?: string
  }
}

export function AgentSettingsDialog({ open, onOpenChange, agent }: AgentSettingsDialogProps) {
  const [agentName, setAgentName] = React.useState(agent.name)
  const [agentDescription, setAgentDescription] = React.useState(agent.description)
  const [systemPrompt, setSystemPrompt] = React.useState(agent.defaultPrompt || "")
  const [model, setModel] = React.useState("gpt-4")
  const [temperature, setTemperature] = React.useState(0.7)
  const [maxTokens, setMaxTokens] = React.useState(4000)
  const [isEnabled, setIsEnabled] = React.useState(agent.status === "Active")
  const [autoRetry, setAutoRetry] = React.useState(true)
  const [rateLimitEnabled, setRateLimitEnabled] = React.useState(false)
  const [rateLimitRequests, setRateLimitRequests] = React.useState(100)
  const [rateLimitWindow, setRateLimitWindow] = React.useState(60)
  const [knowledgeBase, setKnowledgeBase] = React.useState<File[]>([])
  const [uploadedFiles, setUploadedFiles] = React.useState([
    { id: 1, name: "company_policies.pdf", size: "2.4 MB", uploadDate: "2024-01-20" },
    { id: 2, name: "security_guidelines.docx", size: "1.8 MB", uploadDate: "2024-01-18" },
    { id: 3, name: "threat_database.json", size: "5.2 MB", uploadDate: "2024-01-15" }
  ])

  // Integration settings
  const [integrations, setIntegrations] = React.useState([
    { id: 1, name: "LinkedIn API", type: "Social Media", status: "Connected", apiKey: "sk-linkedin-***", lastUsed: "2 hours ago" },
    { id: 2, name: "Twitter API", type: "Social Media", status: "Connected", apiKey: "bearer-twitter-***", lastUsed: "1 hour ago" },
    { id: 3, name: "Google Search API", type: "Search Engine", status: "Connected", apiKey: "AIza-google-***", lastUsed: "30 minutes ago" },
    { id: 4, name: "Clearbit API", type: "Business Data", status: "Disconnected", apiKey: "", lastUsed: "Never" },
    { id: 5, name: "Hunter.io API", type: "Email Verification", status: "Connected", apiKey: "hunter-***", lastUsed: "5 minutes ago" }
  ])
  const [newIntegration, setNewIntegration] = React.useState({ name: "", type: "", apiKey: "", endpoint: "" })
  const [showApiKeys, setShowApiKeys] = React.useState<{[key: number]: boolean}>({})

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setKnowledgeBase(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setKnowledgeBase(prev => prev.filter((_, i) => i !== index))
  }

  const removeUploadedFile = (id: number) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id))
  }

  const toggleApiKeyVisibility = (integrationId: number) => {
    setShowApiKeys(prev => ({
      ...prev,
      [integrationId]: !prev[integrationId]
    }))
  }

  const addIntegration = () => {
    if (newIntegration.name && newIntegration.type && newIntegration.apiKey) {
      const integration = {
        id: integrations.length + 1,
        name: newIntegration.name,
        type: newIntegration.type,
        status: "Connected" as const,
        apiKey: newIntegration.apiKey,
        lastUsed: "Just now"
      }
      setIntegrations(prev => [...prev, integration])
      setNewIntegration({ name: "", type: "", apiKey: "", endpoint: "" })
    }
  }

  const removeIntegration = (id: number) => {
    setIntegrations(prev => prev.filter(integration => integration.id !== id))
  }

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving agent settings:", {
      agentName,
      agentDescription,
      systemPrompt,
      model,
      temperature,
      maxTokens,
      isEnabled,
      autoRetry,
      rateLimitEnabled,
      rateLimitRequests,
      rateLimitWindow,
      knowledgeBase,
      integrations,
    })
    onOpenChange(false)
  }

  // Update system prompt when agent changes
  React.useEffect(() => {
    setSystemPrompt(agent.defaultPrompt || "")
    setAgentName(agent.name)
    setAgentDescription(agent.description)
    setIsEnabled(agent.status === "Active")
  }, [agent])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Agent Settings - {agent.name}
          </DialogTitle>
          <DialogDescription>
            Configure your AI agent's behavior, knowledge base, integrations, and operational parameters
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="prompt">Instructions</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Basic Configuration
                </CardTitle>
                <CardDescription>
                  Configure the basic settings for your AI agent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agent-name">Agent Name</Label>
                    <Input
                      id="agent-name"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      placeholder="Enter agent name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agent-status">Status</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="agent-status"
                        checked={isEnabled}
                        onCheckedChange={setIsEnabled}
                      />
                      <Label htmlFor="agent-status">
                        {isEnabled ? "Active" : "Inactive"}
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-description">Description</Label>
                  <Textarea
                    id="agent-description"
                    value={agentDescription}
                    onChange={(e) => setAgentDescription(e.target.value)}
                    placeholder="Describe what this agent does"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="model">AI Model</Label>
                    <Select value={model} onValueChange={setModel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                        <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select defaultValue={agent.category.toLowerCase().replace(' ', '-')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal-intelligence">Personal Intelligence</SelectItem>
                        <SelectItem value="digital-intelligence">Digital Intelligence</SelectItem>
                        <SelectItem value="financial-intelligence">Financial Intelligence</SelectItem>
                        <SelectItem value="corporate-intelligence">Corporate Intelligence</SelectItem>
                        <SelectItem value="asset-intelligence">Asset Intelligence</SelectItem>
                        <SelectItem value="legal-intelligence">Legal Intelligence</SelectItem>
                        <SelectItem value="analysis-reporting">Analysis & Reporting</SelectItem>
                        <SelectItem value="quality-assurance">Quality Assurance</SelectItem>
                        <SelectItem value="data-processing">Data Processing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prompt" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  System Instructions
                </CardTitle>
                <CardDescription>
                  Define how your agent should behave and respond to queries
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="system-prompt">System Prompt</Label>
                  <Textarea
                    id="system-prompt"
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    placeholder="You are an AI assistant specialized in threat intelligence and security analysis. Your role is to..."
                    rows={15}
                    className="font-mono text-sm"
                  />
                  <div className="text-xs text-muted-foreground">
                    Define the agent's personality, expertise, and response style. Be specific about its role and capabilities.
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Creativity (Temperature)</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="temperature"
                        type="number"
                        min="0"
                        max="2"
                        step="0.1"
                        value={temperature}
                        onChange={(e) => setTemperature(parseFloat(e.target.value))}
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">
                        {temperature < 0.3 ? "Focused" : temperature < 0.7 ? "Balanced" : "Creative"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-tokens">Max Response Length</Label>
                    <Select value={maxTokens.toString()} onValueChange={(value) => setMaxTokens(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1000">Short (1,000 tokens)</SelectItem>
                        <SelectItem value="2000">Medium (2,000 tokens)</SelectItem>
                        <SelectItem value="4000">Long (4,000 tokens)</SelectItem>
                        <SelectItem value="8000">Very Long (8,000 tokens)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Knowledge Base
                </CardTitle>
                <CardDescription>
                  Upload documents and files to enhance your agent's knowledge
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <div className="text-center">
                      <Label htmlFor="file-upload" className="cursor-pointer text-sm font-medium">
                        Click to upload files
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Supports PDF, DOCX, TXT, JSON, CSV files up to 25MB each
                      </p>
                    </div>
                    <Input
                      id="file-upload"
                      type="file"
                      multiple
                      accept=".pdf,.docx,.txt,.json,.csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {knowledgeBase.length > 0 && (
                  <div className="space-y-2">
                    <Label>Pending Uploads</Label>
                    <div className="space-y-2">
                      {knowledgeBase.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{file.name}</span>
                            <Badge variant="outline">{(file.size / 1024 / 1024).toFixed(1)} MB</Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  <Label>Uploaded Files</Label>
                  <div className="space-y-2">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4" />
                          <div>
                            <span className="text-sm font-medium">{file.name}</span>
                            <div className="text-xs text-muted-foreground">
                              {file.size} • Uploaded {file.uploadDate}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeUploadedFile(file.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="h-4 w-4" />
                  API Integrations
                </CardTitle>
                <CardDescription>
                  Connect external APIs and services to enhance agent capabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {integrations.map((integration) => (
                    <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Key className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{integration.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {integration.type} • Last used: {integration.lastUsed}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs">API Key:</span>
                            <code className="text-xs bg-muted px-1 py-0.5 rounded">
                              {showApiKeys[integration.id] ? integration.apiKey : integration.apiKey.replace(/./g, '*')}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleApiKeyVisibility(integration.id)}
                            >
                              {showApiKeys[integration.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={integration.status === "Connected" ? "default" : "secondary"}>
                          {integration.status}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeIntegration(integration.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Add New Integration</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="integration-name">Service Name</Label>
                      <Input
                        id="integration-name"
                        value={newIntegration.name}
                        onChange={(e) => setNewIntegration(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Facebook API"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="integration-type">Type</Label>
                      <Select value={newIntegration.type} onValueChange={(value) => setNewIntegration(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Social Media">Social Media</SelectItem>
                          <SelectItem value="Search Engine">Search Engine</SelectItem>
                          <SelectItem value="Business Data">Business Data</SelectItem>
                          <SelectItem value="Email Verification">Email Verification</SelectItem>
                          <SelectItem value="Financial Data">Financial Data</SelectItem>
                          <SelectItem value="Legal Database">Legal Database</SelectItem>
                          <SelectItem value="Property Records">Property Records</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="integration-api-key">API Key</Label>
                      <Input
                        id="integration-api-key"
                        type="password"
                        value={newIntegration.apiKey}
                        onChange={(e) => setNewIntegration(prev => ({ ...prev, apiKey: e.target.value }))}
                        placeholder="Enter API key"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="integration-endpoint">Endpoint (Optional)</Label>
                      <Input
                        id="integration-endpoint"
                        value={newIntegration.endpoint}
                        onChange={(e) => setNewIntegration(prev => ({ ...prev, endpoint: e.target.value }))}
                        placeholder="https://api.example.com"
                      />
                    </div>
                  </div>
                  <Button onClick={addIntegration} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Integration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Performance & Reliability
                </CardTitle>
                <CardDescription>
                  Configure advanced settings for optimal performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-retry on Failure</Label>
                    <div className="text-sm text-muted-foreground">
                      Automatically retry failed requests up to 3 times
                    </div>
                  </div>
                  <Switch
                    checked={autoRetry}
                    onCheckedChange={setAutoRetry}
                  />
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Rate Limiting</Label>
                      <div className="text-sm text-muted-foreground">
                        Limit the number of requests per time window
                      </div>
                    </div>
                    <Switch
                      checked={rateLimitEnabled}
                      onCheckedChange={setRateLimitEnabled}
                    />
                  </div>
                  {rateLimitEnabled && (
                    <div className="grid grid-cols-2 gap-4 pl-4">
                      <div className="space-y-2">
                        <Label htmlFor="rate-limit-requests">Max Requests</Label>
                        <Input
                          id="rate-limit-requests"
                          type="number"
                          value={rateLimitRequests}
                          onChange={(e) => setRateLimitRequests(parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rate-limit-window">Time Window (seconds)</Label>
                        <Input
                          id="rate-limit-window"
                          type="number"
                          value={rateLimitWindow}
                          onChange={(e) => setRateLimitWindow(parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Security & Compliance
                </CardTitle>
                <CardDescription>
                  Security settings and compliance options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Encryption</Label>
                    <div className="text-sm text-muted-foreground">
                      Encrypt all data in transit and at rest
                    </div>
                  </div>
                  <Switch checked={true} disabled />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Audit Logging</Label>
                    <div className="text-sm text-muted-foreground">
                      Log all agent interactions for compliance
                    </div>
                  </div>
                  <Switch checked={true} disabled />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>PII Detection</Label>
                    <div className="text-sm text-muted-foreground">
                      Automatically detect and protect personal information
                    </div>
                  </div>
                  <Switch checked={true} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-yellow-800">
                      Advanced Settings Warning
                    </div>
                    <div className="text-sm text-yellow-700">
                      Modifying these settings may affect agent performance. Only change these if you understand the implications.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
            <span>Changes will take effect immediately</span>
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Settings
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}