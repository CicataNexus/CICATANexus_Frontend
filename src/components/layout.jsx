import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Layout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex top-0 w-full items-center justify-left py-5 z-50">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                    </div>
                    <img
                        src="/sep_color.png"
                        alt="Logo SEP"
                        className="h-12 w-auto mr-12"
                    />
                    <img
                        src="/ipn_color.png"
                        alt="Logo IPN"
                        className="h-14 w-auto"
                    />
                </header>

                {/* Contenido principal, con margen para no quedar detrás del header */}
                <main className="p-3">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}