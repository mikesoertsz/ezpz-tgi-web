"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  RefreshCw,
  Copy,
  Trash2,
  Edit,
  CheckCircle,
  Circle,
  Coins,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { BibliographySource } from "@/lib/report-data";

interface SectionFooterProps {
  sectionId: string;
  creditCost: number;
  bibliography: BibliographySource[];
  isRefreshing: boolean;
  isEditing: boolean;
  isApproved: boolean;
  onRefresh: (sectionId: string) => void;
  onEdit: (sectionId: string) => void;
  onApprovalToggle: (sectionId: string) => void;
}

export function SectionFooter({
  sectionId,
  creditCost,
  bibliography,
  isRefreshing,
  isEditing,
  isApproved,
  onRefresh,
  onEdit,
  onApprovalToggle,
}: SectionFooterProps) {
  const [bibliographyOpen, setBibliographyOpen] = useState(false);
  const [hoveredSource, setHoveredSource] = useState<string | null>(null);

  const handleSourceClick = (item: BibliographySource) => {
    if (item.url) {
      window.open(item.url, "_blank");
    }
  };

  return (
    <>
      {/* Bibliography Section */}
      {bibliography.length > 0 && (
        <div className="border-t border-gray-100 pt-3 mb-3">
          <Collapsible
            open={bibliographyOpen}
            onOpenChange={setBibliographyOpen}
          >
            <CollapsibleTrigger asChild>
              <button className="flex items-center space-x-2 text-xs text-gray-600 hover:text-gray-800 transition-colors">
                <span>Bibliography</span>
                {bibliographyOpen ? (
                  <ChevronUp size={12} />
                ) : (
                  <ChevronDown size={12} />
                )}
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="mt-2 space-y-1">
                {bibliography.map((item) => (
                  <div
                    key={item.id}
                    className={`text-xs p-2 rounded transition-colors cursor-pointer ${
                      hoveredSource === item.id
                        ? "bg-yellow-100 border border-yellow-300"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    onClick={() => handleSourceClick(item)}
                    onMouseEnter={() => setHoveredSource(item.id)}
                    onMouseLeave={() => setHoveredSource(null)}
                  >
                    <span className="text-gray-700">{item.source}</span>
                    {item.url && (
                      <ExternalLink className="inline w-3 h-3 ml-1 text-blue-600" />
                    )}
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Footer with action buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onRefresh(sectionId)}
              disabled={isRefreshing}
              className={`p-1.5 rounded-md transition-all duration-300 ${
                isRefreshing
                  ? "bg-green-100 text-green-600 cursor-not-allowed"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
              title="Refresh"
            >
              <RefreshCw
                size={14}
                className={`${
                  isRefreshing ? "animate-spin text-green-600" : "text-gray-600"
                } transition-colors duration-300`}
              />
            </button>
            <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-md hidden">
              <Coins size={10} className="text-gray-500" />
              <span className="text-xs text-gray-600 font-medium">
                {creditCost}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              /* Copy functionality */
            }}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors hidden"
            title="Copy"
          >
            <Copy size={14} className="text-gray-600" />
          </button>
          <button
            onClick={() => {
              /* Clear functionality */
            }}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            title="Clear"
          >
            <Trash2 size={14} className="text-gray-600" />
          </button>
          <button
            onClick={() => onEdit(sectionId)}
            className={`p-1.5 rounded-md transition-colors ${
              isEditing
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100 text-gray-600"
            }`}
            title={isEditing ? "Exit Edit Mode" : "Edit"}
          >
            <Edit
              size={14}
              className={isEditing ? "text-blue-600" : "text-gray-600"}
            />
          </button>
        </div>

        <button
          onClick={() => onApprovalToggle(sectionId)}
          className={`p-1.5 rounded-md transition-colors ${
            isApproved
              ? "hover:bg-green-50 text-green-600"
              : "hover:bg-gray-100 text-gray-400"
          }`}
          title={isApproved ? "Content Approved" : "Approve Content"}
        >
          {isApproved ? (
            <CheckCircle size={14} className="text-green-600" />
          ) : (
            <Circle size={14} className="text-gray-400" />
          )}
        </button>
      </div>
    </>
  );
}
