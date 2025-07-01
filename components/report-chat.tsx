"use client";

import ChatMessages from "@/components/report-chat-messages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Building2,
  Database,
  DollarSign,
  FileText,
  Globe,
  Home,
  Image,
  Scale,
  Search,
  Send,
  Settings,
  Shield,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Message {
  id: string;
  type: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  agent?: string;
}

interface Agent {
  id: string;
  name: string;
  status: "idle" | "running" | "completed" | "error";
  icon: React.ElementType;
  description: string;
  category: "data-gathering" | "processing";
  progress?: number;
}

interface ReportChatProps {
  reportId?: string;
}

export function ReportChat({ reportId }: ReportChatProps) {
  const isNewExecution = reportId && /^\d+$/.test(reportId);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "system",
      content: reportId
        ? isNewExecution
          ? `New investigation initiated with execution ID #${reportId}. AI agents are beginning intelligence gathering...`
          : `Intelligence gathering system loaded for Report #${reportId}. Continuing investigation...`
        : "Intelligence gathering system initialized. Ready to begin investigation.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const [agents, setAgents] = useState<Agent[]>([
    // Data Gathering Agents
    {
      id: "personal",
      name: "Personal Information",
      status: reportId ? (isNewExecution ? "running" : "completed") : "idle",
      icon: User,
      description: "Basic demographics and background",
      category: "data-gathering",
      progress: reportId ? (isNewExecution ? 15 : 100) : 0,
    },
    {
      id: "social",
      name: "Social Media Intelligence",
      status: reportId ? (isNewExecution ? "running" : "running") : "idle",
      icon: Globe,
      description: "Social media profiles and activity",
      category: "data-gathering",
      progress: reportId ? (isNewExecution ? 25 : 65) : 0,
    },
    {
      id: "financial",
      name: "Financial Assets",
      status: reportId ? (isNewExecution ? "idle" : "completed") : "idle",
      icon: DollarSign,
      description: "Financial records and assets",
      category: "data-gathering",
      progress: reportId ? (isNewExecution ? 0 : 100) : 0,
    },
    {
      id: "business",
      name: "Business Interests",
      status: reportId ? "idle" : "idle",
      icon: Building2,
      description: "Corporate affiliations and ventures",
      category: "data-gathering",
      progress: 0,
    },
    {
      id: "property",
      name: "Property Holdings",
      status: reportId ? (isNewExecution ? "idle" : "completed") : "idle",
      icon: Home,
      description: "Real estate and property holdings",
      category: "data-gathering",
      progress: reportId ? (isNewExecution ? 0 : 100) : 0,
    },
    {
      id: "legal",
      name: "Legal & Litigation",
      status: reportId ? (isNewExecution ? "idle" : "running") : "idle",
      icon: Scale,
      description: "Legal proceedings and litigation",
      category: "data-gathering",
      progress: reportId ? (isNewExecution ? 0 : 30) : 0,
    },
    {
      id: "online",
      name: "Online Presence",
      status: reportId ? (isNewExecution ? "running" : "completed") : "idle",
      icon: Search,
      description: "Digital footprint and web presence",
      category: "data-gathering",
      progress: reportId ? (isNewExecution ? 10 : 100) : 0,
    },
    // Processing Agents
    {
      id: "images",
      name: "Image Collection",
      status: reportId ? (isNewExecution ? "idle" : "completed") : "idle",
      icon: Image,
      description: "Photos and visual evidence gathering",
      category: "processing",
      progress: reportId ? (isNewExecution ? 0 : 100) : 0,
    },
    {
      id: "verifier",
      name: "Source Verifier",
      status: reportId ? (isNewExecution ? "idle" : "running") : "idle",
      icon: Shield,
      description: "Validates sources and prevents hallucination",
      category: "processing",
      progress: reportId ? (isNewExecution ? 0 : 80) : 0,
    },
    {
      id: "structurer",
      name: "Data Structuring",
      status: reportId ? (isNewExecution ? "idle" : "completed") : "idle",
      icon: Database,
      description: "Cleans and organizes collected data",
      category: "processing",
      progress: reportId ? (isNewExecution ? 0 : 100) : 0,
    },
    {
      id: "reporter",
      name: "Report Generator",
      status: reportId ? "idle" : "idle",
      icon: FileText,
      description: "Compiles final intelligence reports",
      category: "processing",
      progress: 0,
    },
  ]);

  // Simulate agent progress for existing reports
  useEffect(() => {
    if (reportId) {
      const interval = setInterval(() => {
        setAgents((prevAgents) =>
          prevAgents.map((agent) => {
            if (agent.status === "running" && agent.progress! < 100) {
              const newProgress = Math.min(
                agent.progress! + Math.random() * 10,
                100
              );
              return {
                ...agent,
                progress: newProgress,
                status: newProgress >= 100 ? "completed" : "running",
              };
            }
            return agent;
          })
        );
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [reportId]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: reportId
          ? `Continuing analysis for "${inputValue}". I'm updating the existing investigation with new information and cross-referencing with current findings.`
          : `I'll help you investigate "${inputValue}". Let me activate the relevant agents to gather comprehensive intelligence. This may take a few minutes as I collect data from multiple sources.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsGenerating(false);
    }, 1000);
  };

  const completedAgents = agents.filter((a) => a.status === "completed").length;
  const runningAgents = agents.filter((a) => a.status === "running").length;
  const totalAgents = agents.length;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b border-border bg-[#FDF6EE] shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              {reportId ? `Report #${reportId}` : "AI Intelligence Assistant"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {reportId
                ? `${completedAgents}/${totalAgents} agents completed • ${runningAgents} running`
                : "Powered by multiple specialized agents"}
            </p>
          </div>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chat Messages - Scrollable Area */}
      <ChatMessages messages={messages} isGenerating={isGenerating} />

      {/* Input Area - Fixed at Bottom */}
      <div className="p-4 border-t border-border bg-gray-50 shrink-0">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              reportId
                ? "Ask questions about this report or request additional analysis..."
                : "Enter target name, email, or company to investigate..."
            }
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={isGenerating}
            className="bg-white h-8 rounded-sm shadow-sm border-gray-300"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isGenerating}
            size="sm"
            variant="outline"
            className="aspect-square h-8 w-8"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
