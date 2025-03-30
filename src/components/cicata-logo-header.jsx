import * as React from "react";
import { SidebarMenu, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";

export function CicataLogo() {
  const { state } = useSidebar();

  const isCollapsed = state === "collapsed";
  const logoSrc = isCollapsed ? "/cicata_cuadrado.png" : "/cicata_blanco.png";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex w-full items-center justify-center mt-5">
          <img
            src={logoSrc}
            alt="CICATA Logo"
            className={isCollapsed ? "h-10 w-18 object-contain" : "h-12 object-contain"}
          />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
