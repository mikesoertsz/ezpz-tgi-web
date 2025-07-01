"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ReportChat } from "@/components/report-chat";
import { ReportDocument } from "@/components/report-document";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useParams } from "next/navigation";
import { Suspense } from "react";

function ReportPageContent() {
  const params = useParams();
  const reportId = params?.id as string;

  if (!reportId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Invalid Report ID</h2>
          <p className="text-muted-foreground">
            Please check the URL and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 overflow-hidden h-screen bg-[#F4F3EC]">
          {/* Left Column - AI Chat - Fixed Height */}
          <div className="w-1/3 border-r h-full flex flex-col">
            <ReportChat reportId={reportId} />
          </div>

          {/* Right Column - Report Document - Scrollable */}
          <div className="flex-1 h-full overflow-y-auto">
            <ReportDocument reportId={reportId} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Loading report...</p>
          </div>
        </div>
      }
    >
      <ReportPageContent />
    </Suspense>
  );
}
