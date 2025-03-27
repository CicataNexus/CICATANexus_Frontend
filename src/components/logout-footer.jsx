"use client";

import { LogOut } from "lucide-react";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar";

export function Logout() {
    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        size="lg"
                        className="flex items-center justify-center text-sidebar-foreground focus:text-sidebar-accent-foreground text-lg font-semibold mb-8"
                    >
                        <span className="mr-2">
                            <LogOut />
                        </span>
                        <span className="text-base">Cerrar Sesión</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    );
}