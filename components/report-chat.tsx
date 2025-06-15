'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Send, 
  Bot, 
  User, 
  Settings, 
  Play, 
  Pause, 
  RefreshCw,
  MessageSquare,
  Shield,
  Search,
  Database,
  FileText,
  Globe,
  Building2,
  DollarSign,
  Home,
  Scale,
  Image,
  CheckCircle2,
  Loader2,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  type: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  agent?: string
}

interface Agent {
  id: string
  name: string
  status: 'idle' | 'running' | 'completed' | 'error'
  icon: any
  description: string
  category: 'data-gathering' | 'processing'
}

export function ReportChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Intelligence gathering system initialized. Ready to begin investigation.',
      timestamp: new Date(),
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [agentStatusCollapsed, setAgentStatusCollapsed] = useState(false)

  const agents: Agent[] = [
    // Data Gathering Agents
    {
      id: 'personal',
      name: 'Personal Information',
      status: 'idle',
      icon: User,
      description: 'Basic demographics and background',
      category: 'data-gathering'
    },
    {
      id: 'social',
      name: 'Social Media Intelligence',
      status: 'idle',
      icon: Globe,
      description: 'Social media profiles and activity',
      category: 'data-gathering'
    },
    {
      id: 'financial',
      name: 'Financial Assets',
      status: 'idle',
      icon: DollarSign,
      description: 'Financial records and assets',
      category: 'data-gathering'
    },
    {
      id: 'business',
      name: 'Business Interests',
      status: 'idle',
      icon: Building2,
      description: 'Corporate affiliations and ventures',
      category: 'data-gathering'
    },
    {
      id: 'property',
      name: 'Property Holdings',
      status: 'idle',
      icon: Home,
      description: 'Real estate and property holdings',
      category: 'data-gathering'
    },
    {
      id: 'legal',
      name: 'Legal & Litigation',
      status: 'idle',
      icon: Scale,
      description: 'Legal proceedings and litigation',
      category: 'data-gathering'
    },
    {
      id: 'online',
      name: 'Online Presence',
      status: 'idle',
      icon: Search,
      description: 'Digital footprint and web presence',
      category: 'data-gathering'
    },
    // Processing Agents
    {
      id: 'images',
      name: 'Image Collection',
      status: 'idle',
      icon: Image,
      description: 'Photos and visual evidence gathering',
      category: 'processing'
    },
    {
      id: 'verifier',
      name: 'Source Verifier',
      status: 'idle',
      icon: Shield,
      description: 'Validates sources and prevents hallucination',
      category: 'processing'
    },
    {
      id: 'structurer',
      name: 'Data Structuring',
      status: 'idle',
      icon: Database,
      description: 'Cleans and organizes collected data',
      category: 'processing'
    },
    {
      id: 'reporter',
      name: 'Report Generator',
      status: 'idle',
      icon: FileText,
      description: 'Compiles final intelligence reports',
      category: 'processing'
    }
  ]

  const dataGatheringAgents = agents.filter(agent => agent.category === 'data-gathering')
  const processingAgents = agents.filter(agent => agent.category === 'processing')

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue('')
    setIsGenerating(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I'll help you investigate "${inputValue}". Let me activate the relevant agents to gather comprehensive intelligence. This may take a few minutes as I collect data from multiple sources.`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiResponse])
      setIsGenerating(false)
    }, 1000)
  }

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'running':
        return <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
      case 'completed':
        return <CheckCircle2 className="h-3 w-3 text-green-500" />
      case 'error':
        return <div className="w-3 h-3 rounded-full bg-red-500" />
      default:
        return <div className="w-3 h-3 rounded-full bg-gray-300" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-blue-600'
      case 'completed': return 'text-green-600'
      case 'error': return 'text-red-600'
      default: return 'text-gray-500'
    }
  }

  const AgentItem = ({ agent }: { agent: Agent }) => (
    <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 transition-colors">
      {getStatusIndicator(agent.status)}
      <span className={`text-xs font-medium truncate ${getStatusColor(agent.status)}`}>
        {agent.name}
      </span>
    </div>
  )

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b border-border bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">AI Intelligence Assistant</h2>
            <p className="text-sm text-muted-foreground">Powered by multiple specialized agents</p>
          </div>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Agent Status - Collapsible */}
      <div className="border-b border-border bg-white">
        <button
          onClick={() => setAgentStatusCollapsed(!agentStatusCollapsed)}
          className="w-full p-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-semibold text-gray-900">Agent Status</h3>
            <Badge variant="secondary" className="text-xs">
              {agents.length} agents
            </Badge>
          </div>
          {agentStatusCollapsed ? (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          )}
        </button>
        
        {!agentStatusCollapsed && (
          <div className="px-3 pb-3 space-y-3">
            {/* Data Gathering Agents */}
            <div>
              <h4 className="text-xs font-medium text-gray-700 mb-2">Data Gathering Agents</h4>
              <div className="grid grid-cols-3 gap-1">
                {dataGatheringAgents.map((agent) => (
                  <AgentItem key={agent.id} agent={agent} />
                ))}
              </div>
            </div>

            {/* Processing & Verification */}
            <div>
              <h4 className="text-xs font-medium text-gray-700 mb-2">Processing & Verification</h4>
              <div className="grid grid-cols-3 gap-1">
                {processingAgents.map((agent) => (
                  <AgentItem key={agent.id} agent={agent} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : message.type === 'system'
                  ? 'bg-muted text-muted-foreground'
                  : 'bg-white border border-gray-200'
              }`}>
                <div className="flex items-center space-x-2 mb-1">
                  {message.type === 'user' ? (
                    <User className="h-3 w-3" />
                  ) : message.type === 'system' ? (
                    <Shield className="h-3 w-3" />
                  ) : (
                    <Bot className="h-3 w-3" />
                  )}
                  <span className="text-xs font-medium">
                    {message.type === 'user' ? 'You' : message.type === 'system' ? 'System' : 'AI Assistant'}
                  </span>
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
                {message.agent && (
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {message.agent}
                  </Badge>
                )}
              </div>
            </div>
          ))}
          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center space-x-2">
                  <Bot className="h-3 w-3" />
                  <span className="text-xs font-medium">AI Assistant</span>
                  <Loader2 className="h-3 w-3 animate-spin" />
                </div>
                <p className="text-sm mt-1">Thinking...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-white">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter target name, email, or company to investigate..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isGenerating}
            className="bg-white"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isGenerating}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Play className="h-3 w-3 mr-1" />
              Start All
            </Button>
            <Button variant="outline" size="sm">
              <Pause className="h-3 w-3 mr-1" />
              Pause
            </Button>
          </div>
          <span className="text-xs text-muted-foreground">
            {agents.length} agents ready
          </span>
        </div>
      </div>
    </div>
  )
}