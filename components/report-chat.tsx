'use client'

import { useState } from "react"
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
  Image
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
  status: 'active' | 'idle' | 'working'
  icon: any
  description: string
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

  const agents: Agent[] = [
    {
      id: 'personal',
      name: 'Personal Info',
      status: 'idle',
      icon: User,
      description: 'Basic demographics and background'
    },
    {
      id: 'social',
      name: 'Social Media',
      status: 'idle',
      icon: Globe,
      description: 'Social media profiles and activity'
    },
    {
      id: 'financial',
      name: 'Financial',
      status: 'idle',
      icon: DollarSign,
      description: 'Financial records and assets'
    },
    {
      id: 'business',
      name: 'Business',
      status: 'idle',
      icon: Building2,
      description: 'Corporate affiliations and ventures'
    },
    {
      id: 'property',
      name: 'Property',
      status: 'idle',
      icon: Home,
      description: 'Real estate and property holdings'
    },
    {
      id: 'legal',
      name: 'Legal',
      status: 'idle',
      icon: Scale,
      description: 'Legal proceedings and litigation'
    },
    {
      id: 'online',
      name: 'Online Presence',
      status: 'idle',
      icon: Search,
      description: 'Digital footprint and web presence'
    },
    {
      id: 'images',
      name: 'Image Collection',
      status: 'idle',
      icon: Image,
      description: 'Photos and visual evidence'
    }
  ]

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'working': return 'bg-blue-500'
      case 'idle': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
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

      {/* Agent Status */}
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium mb-3">Active Agents</h3>
        <div className="grid grid-cols-2 gap-2">
          {agents.map((agent) => {
            const IconComponent = agent.icon
            return (
              <div key={agent.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                <IconComponent className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs font-medium truncate">{agent.name}</span>
              </div>
            )
          })}
        </div>
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
                  : 'bg-muted'
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
              <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center space-x-2">
                  <Bot className="h-3 w-3" />
                  <span className="text-xs font-medium">AI Assistant</span>
                  <RefreshCw className="h-3 w-3 animate-spin" />
                </div>
                <p className="text-sm mt-1">Thinking...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter target name, email, or company to investigate..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isGenerating}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isGenerating}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between mt-2">
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
            8 agents ready
          </span>
        </div>
      </div>
    </div>
  )
}