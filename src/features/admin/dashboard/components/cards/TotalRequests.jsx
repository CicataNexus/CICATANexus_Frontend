import { useState } from "react";
import { Icon } from "@iconify/react";
import ViewModeSwitch from "@/components/ViewModeSwitch";

export default function TotalRequests() {
    const [viewMode, setViewMode] = useState("monthly");
    const [currentLabel, setCurrentLabel] = useState("Marzo");

    const total = 40;

    return (
        <div className="rounded-xl bg-white p-6 shadow flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4 gap-4">
                <h2 className="text-base font-semibold font-poppins leading-tight">
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

            <div className="flex justify-center items-center gap-4 mt-2 text-sm font-semibold">
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
