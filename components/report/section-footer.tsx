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
  onRefresh: (sectionId: string) => void;
  onEdit: (sectionId: string) => void;
}

export function SectionFooter({
  sectionId,
  creditCost,
  bibliography,
  isRefreshing,
  isEditing,
  onRefresh,
  onEdit,
}: SectionFooterProps) {
  const [bibliographyOpen, setBibliographyOpen] = useState(false);
  const [hoveredSource, setHoveredSource] = useState<string | null>(null);

  const handleSourceClick = (item: BibliographySource) => {
    if (item.url) {
      window.open(item.url, "_blank");
    }
  };

  const buttons = [
    {
      title: "Refresh",
      icon: (
        <RefreshCw
          size={14}
          className={
            isRefreshing ? "animate-spin text-green-600" : "text-gray-600"
          }
        />
      ),
      onClick: () => onRefresh(sectionId),
      disabled: isRefreshing,
    },
    {
      title: "Copy",
      icon: <Copy size={14} className="text-gray-600" />,
      onClick: () => {
        /* Copy functionality */
      },
    },
    {
      title: "Clear",
      icon: <Trash2 size={14} className="text-gray-600" />,
      onClick: () => {
        /* Clear functionality */
      },
    },
    {
      title: isEditing ? "Exit Edit Mode" : "Edit",
      icon: (
        <Edit
          size={14}
          className={isEditing ? "text-blue-600" : "text-gray-600"}
        />
      ),
      onClick: () => onEdit(sectionId),
    },
  ];

  return (
    <>
      {/* Bibliography Section */}
      {bibliography.length > 0 && (
        <div className="border-t border-gray-100">
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
      <div className="flex items-center justify-between w-full h-8 pt-0 px-2 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2 h-full">
          <div className="flex items-center gap-1 h-full p-0.5">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={button.onClick}
                disabled={button.disabled}
                className="p-1 rounded-sm transition-colors h-full hover:bg-gray-100 aspect-square flex items-center justify-center"
                title={button.title}
              >
                {button.icon}
              </button>
            ))}
            <div className="items-center space-x-1 bg-gray-100 px-2 py-1 rounded-md hidden">
              <Coins size={10} className="text-gray-500" />
              <span className="text-xs text-gray-600 font-medium">
                {creditCost}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
