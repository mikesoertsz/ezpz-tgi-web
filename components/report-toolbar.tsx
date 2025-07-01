import React from "react";
import { Download, Printer, Lock, Settings } from "lucide-react";

export default function ReportToolbar() {
  const buttons = [
    {
      icon: Download,
      onClick: () => console.log("Download"),
      label: "Download",
    },
    { icon: Printer, onClick: () => console.log("Print"), label: "Print" },
    { icon: Lock, onClick: () => console.log("Lock"), label: "Lock" },
    {
      icon: Settings,
      onClick: () => console.log("Settings"),
      label: "Settings",
    },
  ];

  return (
    <div className="flex items-center ">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className="flex items-center justify-center h-8 w-8 hover:bg-gray-100 rounded-sm transition duration-200 ease-in-out cursor-pointer group"
          aria-label={button.label}
        >
          <button.icon
            className="text-gray-500 antialiased group-hover:text-black transition duration-200 ease-in"
            size={14}
            strokeWidth={2}
          />
        </button>
      ))}
    </div>
  );
}
