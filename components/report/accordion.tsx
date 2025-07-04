import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Coins,
  Copy,
  Trash2,
  Edit,
  CheckCircle,
  Circle,
} from "lucide-react";

export interface BibliographyItem {
  id: string;
  source: string;
  url?: string;
  type: "url" | "document" | "database";
}

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  sectionId: string;
  approvedSections: Record<string, boolean>;
  onApprovalToggle: (sectionId: string) => void;
  bibliography: BibliographyItem[];
  onRefresh: (sectionId: string) => void;
  isRefreshing: boolean;
  onEdit: (sectionId: string) => void;
  isEditing: boolean;
  creditCost: number;
}

export default function Accordion({
  title,
  children,
  isOpen,
  onToggle,
  sectionId,
  approvedSections,
  onApprovalToggle,
  bibliography,
  onRefresh,
  isRefreshing,
  onEdit,
  isEditing,
  creditCost,
}: AccordionProps) {
  const [bibliographyOpen, setBibliographyOpen] = useState(false);
  const [hoveredSource, setHoveredSource] = useState<string | null>(null);
  const isApproved = approvedSections[sectionId] || false;

  const handleRefresh = () => onRefresh(sectionId);
  const handleCopy = () => {};
  const handleClear = () => {};
  const handleEdit = () => onEdit(sectionId);
  const handleApprove = () => onApprovalToggle(sectionId);
  const handleSourceClick = (item: BibliographyItem) => {
    if (item.url) window.open(item.url, "_blank");
  };

  return (
    <div className="mb-3 bg-white border border-gray-200 rounded-lg">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-4 transition-colors hover:bg-gray-50"
      >
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <div className="mb-3">{children}</div>
          <div className="border-t border-gray-100 pt-3 mb-3">
            <button
              onClick={() => setBibliographyOpen(!bibliographyOpen)}
              className="flex items-center space-x-2 text-xs text-gray-600 hover:text-gray-800 transition-colors"
            >
              <span>Bibliography</span>
              {bibliographyOpen ? (
                <ChevronUp size={12} />
              ) : (
                <ChevronDown size={12} />
              )}
            </button>
            {bibliographyOpen && (
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
                    {item.url && <span className="text-blue-600 ml-1">↗</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleRefresh}
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
                    className={`$${
                      isRefreshing
                        ? "animate-spin text-green-600"
                        : "text-gray-600"
                    } transition-colors duration-300`}
                  />
                </button>
                <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-md">
                  <Coins size={10} className="text-gray-500" />
                  <span className="text-xs text-gray-600 font-medium">
                    {creditCost}
                  </span>
                </div>
              </div>
              <button
                onClick={handleCopy}
                className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                title="Copy"
              >
                <Copy size={14} className="text-gray-600" />
              </button>
              <button
                onClick={handleClear}
                className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                title="Clear"
              >
                <Trash2 size={14} className="text-gray-600" />
              </button>
              <button
                onClick={handleEdit}
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
              onClick={handleApprove}
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
        </div>
      )}
    </div>
  );
}
