import React from "react";
import { Bot, User, Shield, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  type: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  agent?: string;
}

interface ChatMessagesProps {
  messages: Message[];
  isGenerating: boolean;
}

export default function ChatMessages({
  messages,
  isGenerating,
}: ChatMessagesProps) {
  return (
    <div className="flex-1 min-h-0">
      <ScrollArea className="h-full p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : message.type === "system"
                    ? "bg-muted text-muted-foreground"
                    : "bg-white border border-gray-200"
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.type === "user" ? (
                    <User className="h-3 w-3" />
                  ) : message.type === "system" ? (
                    <Shield className="h-3 w-3" />
                  ) : (
                    <Bot className="h-3 w-3" />
                  )}
                  <span className="text-xs font-medium">
                    {message.type === "user"
                      ? "You"
                      : message.type === "system"
                      ? "System"
                      : "AI Assistant"}
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
    </div>
  );
}
