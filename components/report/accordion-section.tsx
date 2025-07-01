import { ReportData } from "@/lib/report-data";
import type { LucideIcon } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";
import { SectionFooter } from "./section-footer";

// Local type definition for AccordionSection props
export type AccordionSectionProps = {
  sectionId: string;
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  creditCost?: number;
  reportData: ReportData;
  openSections: Record<string, boolean>;
  editingSections: Record<string, boolean>;
  refreshingSections: Record<string, boolean>;
  approvedSections: Record<string, boolean>;
  toggleSection: (id: string) => void;
  handleApprovalToggle: (sectionId: string) => void;
  handleRefresh: (sectionId: string) => void;
  handleEdit: (sectionId: string) => void;
};

export default function AccordionSection({
  sectionId,
  title,
  icon: Icon,
  children,
  creditCost = 2.1,
  reportData,
  openSections,
  editingSections,
  refreshingSections,
  toggleSection,
  handleRefresh,
  handleEdit,
}: AccordionSectionProps) {
  const isOpen = openSections[sectionId];
  const isEditing = editingSections[sectionId];
  const isRefreshing = refreshingSections[sectionId];
  const section =
    reportData.sections[sectionId as keyof typeof reportData.sections];
  const bibliography = section?.bibliography || [];

  return (
    <div className="bg-white border border-stone-200 rounded-sm hover:shadow-sm transition duration-200 ease-in-out">
      <button
        onClick={() => toggleSection(sectionId)}
        className="flex items-center justify-between w-full p-4 py-2 transition-colors hover:bg-gray-50"
      >
        <div className="flex items-center space-x-2">
          <Icon className="h-4 w-4 text-muted-foreground" size={14} />
          <h3 className="text-[11px] uppercase font-mono font-medium text-stone-800">
            {title}
          </h3>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <div className="px-4 pb-4">
          <div className="mb-3 p-4">{children}</div>

          <SectionFooter
            sectionId={sectionId}
            creditCost={creditCost}
            bibliography={bibliography}
            isRefreshing={isRefreshing || false}
            isEditing={isEditing || false}
            onRefresh={handleRefresh}
            onEdit={handleEdit}
          />
        </div>
      )}
    </div>
  );
}
