import React from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Loader2, CheckCircle2 } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  status: "idle" | "running" | "completed" | "error";
  icon: React.ElementType;
  description: string;
  category: "data-gathering" | "processing";
  progress?: number;
}

interface AgentStatusProps {
  agents: Agent[];
  completedAgents: number;
  runningAgents: number;
  totalAgents: number;
  agentStatusCollapsed: boolean;
  setAgentStatusCollapsed: (collapsed: boolean) => void;
}

export default function AgentStatus({
  agents,
  completedAgents,
  runningAgents,
  totalAgents,
  agentStatusCollapsed,
  setAgentStatusCollapsed,
}: AgentStatusProps) {
  const categories = [
    {
      label: "Data Gathering Agents",
      key: "data-gathering",
    },
    {
      label: "Processing & Verification",
      key: "processing",
    },
  ];

  const getStatusIndicator = (agent: Agent) => {
    switch (agent.status) {
      case "running":
        return (
          <div className="flex items-center space-x-1">
            <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
            {agent.progress !== undefined && (
              <span className="text-xs text-blue-600">
                {Math.round(agent.progress)}%
              </span>
            )}
          </div>
        );
      case "completed":
        return <CheckCircle2 className="h-3 w-3 text-green-500" />;
      case "error":
        return <div className="w-3 h-3 rounded-full bg-red-500" />;
      default:
        return <div className="w-3 h-3 rounded-full bg-gray-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "text-blue-600";
      case "completed":
        return "text-green-600";
      case "error":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  const AgentItem = ({ agent }: { agent: Agent }) => (
    <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 transition-colors">
      {getStatusIndicator(agent)}
      <span
        className={`text-xs font-medium truncate ${getStatusColor(
          agent.status
        )}`}
      >
        {agent.name}
      </span>
    </div>
  );

  const mapped = categories.map((cat) => ({
    ...cat,
    agents: agents.filter((a) => a.category === cat.key),
  }));

  return (
    <div className="border-b border-border bg-white shrink-0">
      <button
        onClick={() => setAgentStatusCollapsed(!agentStatusCollapsed)}
        className="w-full p-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-semibold text-gray-900">Agent Status</h3>
          <Badge variant="secondary" className="text-xs">
            {completedAgents}/{totalAgents} complete
          </Badge>
          {runningAgents > 0 && (
            <Badge variant="outline" className="text-xs text-blue-600">
              {runningAgents} running
            </Badge>
          )}
        </div>
        {agentStatusCollapsed ? (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        )}
      </button>
      {!agentStatusCollapsed && (
        <div className="px-3 pb-3 space-y-3">
          {mapped.map((cat) => (
            <div key={cat.key}>
              <h4 className="text-xs font-medium text-gray-700 mb-2">
                {cat.label}
              </h4>
              <div className="grid grid-cols-3 gap-1">
                {cat.agents.map((agent: Agent) => (
                  <AgentItem key={agent.id} agent={agent} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
