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
                <header className="flex items-center justify-left px-4 sm:px-8 py-3 gap-4 w-full z-50 overflow-hidden">
                    <div className="flex items-start gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                    </div>
                    <img
                        src="/SepColor.png"
                        alt="Logo SEP"
                        className="h-12 max-w-[35%] object-contain"
                    />
                    <img
                        src="/IpnColor.png"
                        alt="Logo IPN"
                        className="h-14 max-w-[35%] object-contain"
                    />
                </header>

                <main className="p-3 w-full max-w-full overflow-x-hidden">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}