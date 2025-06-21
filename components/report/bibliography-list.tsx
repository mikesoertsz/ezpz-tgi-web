import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface BibliographyItem {
  id: string;
  source: string;
  url?: string;
  type: "url" | "document" | "database";
}

interface BibliographyListProps {
  bibliography: BibliographyItem[];
  open: boolean;
  onToggle: () => void;
  hoveredSource: string | null;
  setHoveredSource: (id: string | null) => void;
  onSourceClick: (item: BibliographyItem) => void;
}

export default function BibliographyList({
  bibliography,
  open,
  onToggle,
  hoveredSource,
  setHoveredSource,
  onSourceClick,
}: BibliographyListProps) {
  return (
    <div className="border-t border-gray-100 pt-3 mb-3">
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 text-xs text-gray-600 hover:text-gray-800 transition-colors"
      >
        <span>Bibliography</span>
        {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>
      {open && (
        <div className="mt-2 space-y-1">
          {bibliography.map((item) => (
            <div
              key={item.id}
              className={`text-xs p-2 rounded transition-colors cursor-pointer ${
                hoveredSource === item.id
                  ? "bg-yellow-100 border border-yellow-300"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
              onClick={() => onSourceClick(item)}
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
  );
}
