import React from "react";
import { Download, Printer, Lock, Settings } from "lucide-react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarShortcut,
} from "@/components/ui/menubar";

export default function ReportToolbar() {
  return (
    <Menubar className="bg-transparent border-none">
      <MenubarMenu>
        <MenubarTrigger>
          <Download className="text-gray-500 antialiased hover:text-black transition duration-200 ease-in" size={12} strokeWidth={2} />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => console.log("Download")}>
            Download <MenubarShortcut>⌘D</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Printer className="text-gray-500 antialiased hover:text-black transition duration-200 ease-in" size={12} strokeWidth={2} />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => console.log("Print")}>
            Print <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Lock className="text-gray-500 antialiased hover:text-black transition duration-200 ease-in" size={12} strokeWidth={2} />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => console.log("Lock")}>
            Lock <MenubarShortcut>⌘L</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Settings className="text-gray-500 antialiased hover:text-black transition duration-200 ease-in" size={12} strokeWidth={2} />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => console.log("Settings")}>
            Settings <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
