import * as React from "react"
import { Icon } from "@iconify/react"
import { NavMain } from "@/components/nav-main"
import { Logout } from "@/components/logout-footer"
import { CicataLogo } from "@/components/cicata-logo-header"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: "material-symbols:home-outline-rounded",
      isActive: true,
    },
    {
      title: "Solicitudes",
      url: "/gestion/solicitudes",
      icon: "fluent:form-28-regular",
    },
    {
      title: "Inventarios",
      url: "/inventario/equipos",
      icon: "ix:product-catalog",
      items: [
        {
          title: "Equipos",
          url: "/inventario/equipos",
        },
        {
          title: "Reactivos",
          url: "/inventario/reactivos",
        },
        {
          title: "Materiales",
          url: "/inventario/materiales",
        },
      ],
    },
    {
      title: "Usuarios",
      url: "/gestion/usuarios",
      icon: "la:users-cog",
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CicataLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Logout />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
