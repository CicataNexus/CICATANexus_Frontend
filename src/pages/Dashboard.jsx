import React from "react";
import TotalRequests from "@/features/admin/dashboard/components/cards/TotalRequests";
import RequestsStatus from "@/features/admin/dashboard/components/charts/RequestsStatus";
import RequestsByTech from "@/features/admin/dashboard/components/charts/RequestsByTech";
import ReagentsState from "@/features/admin/dashboard/components/cards/ReagentsState";
import TopEquipments from "@/features/admin/dashboard/components/charts/TopEquipments";
import TopReagents from "@/features/admin/dashboard/components/charts/TopReagents";
import TopMaterials from "@/features/admin/dashboard/components/charts/TopMaterials";
import TopAreas from "@/features/admin/dashboard/components/charts/TopAreas";
import TopActiveUsers from "@/features/admin/dashboard/components/charts/TopActiveUsers";
import FrequentHours from "@/features/admin/dashboard/components/charts/FrequentHours";

function Dashboard() {
    return (
        <section className="p-2 -mt-1 w-full max-w-full overflow-x-hidden overflow-y-hidden pb-15">
            <h2 className="font-poppins text-2xl font-bold mb-2">
                Estado general
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                <TotalRequests />
                <RequestsStatus />
                <RequestsByTech />
                <ReagentsState />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Columna izquierda */}
                <div className="space-y-2 h-auto">
                    <h2 className="text-2xl font-bold font-poppins">
                        Uso de recursos
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 h-full">
                        <TopEquipments />
                        <TopReagents />
                        <TopMaterials />
                        <TopAreas />
                    </div>
                </div>

                {/* Columna derecha */}
                <div className="space-y-2 h-auto">
                    <h2 className="text-2xl font-bold font-poppins">
                        Patrones de uso
                    </h2>
                    <div className="grid grid-rows-2 gap-4 h-full">
                        <FrequentHours />
                        <TopActiveUsers />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
