"use client";
import { useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Icon } from "@iconify/react";

export function NavMain({ items }) {
    const location = useLocation();
    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => {
                    const isActive = location.pathname.startsWith(item.url);
                    if (item.title === "Inventarios") {
                        return (
                            <Collapsible
                                key={item.title}
                                asChild
                                defaultOpen={item.items?.some((sub) => location.pathname === sub.url)}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={item.title} isActive={isActive}>
                                            {item.icon && (
                                                <Icon
                                                    icon={item.icon}
                                                    className="!w-5 !h-5 mr-1"
                                                />
                                            )}

                                            <span>{item.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => {
                                                const isActive =
                                                    location.pathname ===
                                                    subItem.url;

                                                return (
                                                    <SidebarMenuSubItem
                                                        key={subItem.title}
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            className={`w-full font-poppins text-left px-4 py-2 text-sm transition-colors ${
                                                                isActive
                                                                    ? "bg-sidebar-accent text-white border-l-2 border-chart-light-blue"
                                                                    : "hover:bg-muted"
                                                            }`}
                                                        >
                                                            <a
                                                                href={
                                                                    subItem.url
                                                                }
                                                            >
                                                                <span>
                                                                    {
                                                                        subItem.title
                                                                    }
                                                                </span>
                                                            </a>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                );
                                            })}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        );
                    }

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                                <a
                                    href={item.url}
                                    className="flex items-center w-full"
                                >
                                    {item.icon && (
                                        <Icon
                                            icon={item.icon}
                                            className="!w-5 !h-5 mr-1"
                                        />
                                    )}
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
