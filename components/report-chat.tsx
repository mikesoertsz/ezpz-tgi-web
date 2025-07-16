"use client";

import ChatMessages from "@/components/report-chat-messages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  type: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

interface ReportChatProps {
  reportId?: string;
}

export default function ReportChat({ reportId }: ReportChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "system",
      content: reportId
        ? `Intelligence gathering system loaded for Report #${reportId}. Continuing investigation...`
        : "Intelligence gathering system initialized. Ready to begin investigation.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

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

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Chat Messages - Scrollable Area */}
      <ChatMessages messages={messages} isGenerating={isGenerating} />

      {/* Input Area - Fixed at Bottom */}
      <div className="p-4 border-t border-stone-200 shrink-0 bg-stone-100">
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
            className="bg-white h-10 rounded-sm shadow-xs border-stone-300"
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
