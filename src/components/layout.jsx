import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Separator } from "@/components/ui/Separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/Sidebar";

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
                        src="/SepColor.png"
                        alt="Logo SEP"
                        className="h-12 w-auto mr-12"
                    />
                    <img
                        src="/IpnColor.png"
                        alt="Logo IPN"
                        className="h-14 w-auto"
                    />
                </header>

                <main className="p-3 w-full max-w-full overflow-x-hidden">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}