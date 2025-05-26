import React from "react";
import TotalRequests from "@/features/admin/dashboard/components/cards/TotalRequests";
import RequestsStatus from "@/features/admin/dashboard/components/charts/RequestsStatus";
import RequestsByTech from "@/features/admin/dashboard/components/charts/RequestsByTech";
import ReagentsState from "@/features/admin/dashboard/components/cards/ReagentsState";

function Dashboard() {
    return (
        <section className="p-2 -mt-1 w-full max-w-full overflow-x-hidden">
            <h2 className="font-poppins text-2xl font-bold mb-2">
                Estado general
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                <TotalRequests />
                <RequestsStatus />
                <RequestsByTech />
                <ReagentsState />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="col-span-4 md:col-span-2 space-y-4">
                    <h2 className="font-poppins text-2xl font-bold mb-2">
                        Uso de recursos
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4">
                        <TotalRequests />
                        <TotalRequests />
                        <TotalRequests />
                        <TotalRequests />
                    </div>
                </div>
                <div className="col-span-4 md:col-span-2 space-y-4">
                    <h2 className="font-poppins text-2xl font-bold mb-2">
                        Patrones de uso
                    </h2>
                    <TotalRequests />
                    <TotalRequests />
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
