import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import ViewModeSwitch from "@/components/ViewModeSwitch";

export default function TotalRequests() {
    const [viewMode, setViewMode] = useState(0);
    const [currentLabel, setCurrentLabel] = useState("Junio");
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchTotal = async () => {
            const period = viewMode;
            const year = 2025;
            const month = period === 0 ? 6 : undefined;

            let url = `http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/v1/analytics/total?period=${period}&year=${year}`;
            if (month) {
                url += `&month=${month}`;
            }

            try {
                const response = await fetch(url);
                const data = await response.json();
                setTotal(data.total ?? 0);
            } catch (error) {
                console.error("Error al obtener total:", error);
            }
        };

        fetchTotal();
    }, [viewMode]);

    return (
        <div className="rounded-xl bg-white p-6 shadow flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4 gap-4">
                <h2 className="text-base font-semibold font-poppins leading-none">
                    Total de solicitudes
                </h2>
                <ViewModeSwitch viewMode={viewMode} setViewMode={setViewMode} />
            </div>

            <div className="flex justify-center items-center mt-2 gap-4 mb-4">
                <Icon
                    icon="fluent:form-28-regular"
                    className="h-14 w-14 text-blue-500"
                />
                <span className="text-6xl font-semibold font-montserrat">
                    {total}
                </span>
            </div>

            <div className="flex justify-center items-center gap-2 mt-2 text-sm font-semibold">
                <Icon
                    icon="iconamoon:arrow-left-2-light"
                    className="h-4 w-4 cursor-pointer text-blue-600"
                />
                <span className="font-montserrat font-medium">
                    {currentLabel}
                </span>
                <Icon
                    icon="iconamoon:arrow-right-2-light"
                    className="h-4 w-4 cursor-pointer text-blue-600"
                />
            </div>
        </div>
    );
}
