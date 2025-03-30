import { Icon } from "@iconify/react";

export function Logout() {
  return (
    <a
      href="/logout"
      className="flex items-center justify-center gap-2 text-white font-poppins font-semibold text-base transition-all duration-200 ease-in-out
        px-4 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
        group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:rounded-full group-data-[collapsible=icon]:p-2
        group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:text-white"
    >
      <Icon icon="ic:round-logout" className="w-5 h-5" />
      <span className="group-data-[collapsible=icon]:hidden">Cerrar sesión</span>
    </a>
  );
}
