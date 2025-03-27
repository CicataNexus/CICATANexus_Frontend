import * as React from "react";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export function CicataLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex w-full items-center justify-center px-3 py-3">
          <img src="/cicata_blanco.png" alt="CICATA Logo" />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
