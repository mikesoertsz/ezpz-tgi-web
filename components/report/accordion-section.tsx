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
  savingSections?: Record<string, boolean>;
  toggleSection: (id: string) => void;
  handleApprovalToggle: (sectionId: string) => void;
  handleRefresh: (sectionId: string) => void;
  handleEdit: (sectionId: string) => void;
  handleSave?: (sectionId: string) => void;
  headerActions?: React.ReactNode; // <-- add this
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
  savingSections = {},
  toggleSection,
  handleRefresh,
  handleEdit,
  handleSave,
  headerActions, // <-- add this
}: AccordionSectionProps) {
  const isOpen = openSections[sectionId];
  const isEditing = editingSections[sectionId];
  const isRefreshing = refreshingSections[sectionId];
  const isSaving = savingSections[sectionId];
  const section =
    reportData.sections[sectionId as keyof typeof reportData.sections];
  const bibliography = section?.bibliography || [];

  return (
    <div className="bg-white border border-stone-200 rounded-sm hover:shadow-sm transition duration-200 ease-in-out overflow-hidden w-full max-w-full">
      <button
        onClick={() => toggleSection(sectionId)}
        className="flex items-center justify-between w-full p-4 py-2 transition-colors "
      >
        <div className="flex items-center justify-center space-x-2">
          <Icon
            className="text-stone-500 subpixel-antialiased"
            size={12}
            strokeWidth={2}
          />
          <h3 className="text-[11px] uppercase font-mono text-stone-600 tracking-wider subpixel-antialiased">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {headerActions}
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="">
          <div className="mb-3 p-4">{children}</div>
          <SectionFooter
            sectionId={sectionId}
            creditCost={creditCost}
            bibliography={bibliography}
            isRefreshing={isRefreshing || false}
            isEditing={isEditing || false}
            isSaving={isSaving || false}
            onRefresh={handleRefresh}
            onEdit={handleEdit}
            onSave={handleSave}
          />
        </div>
      )}
    </div>
  );
}
