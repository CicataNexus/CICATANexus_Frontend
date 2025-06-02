import { useState } from "react";

const currentDate = new Date();
const currentMonthSystem = currentDate.getMonth() + 1;
const currentYearSystem = currentDate.getFullYear();

export default function useDateNavigation(initialViewMode = 0) {
    const [viewMode, setViewMode] = useState(initialViewMode);
    const [currentMonth, setCurrentMonth] = useState(currentMonthSystem);
    const [currentYear, setCurrentYear] = useState(currentYearSystem);

    const handleLeftClick = () => {
        if (viewMode === 0 && currentMonth > 1) {
            setCurrentMonth((prev) => prev - 1);
        }
        if (viewMode === 1 && currentYear > 2022) {
            setCurrentYear((prev) => prev - 1);
        }
    };

    const handleRightClick = () => {
        if (
            viewMode === 0 &&
            currentMonth < currentMonthSystem &&
            currentYear === currentYearSystem
        ) {
            setCurrentMonth((prev) => prev + 1);
        }
        if (viewMode === 1 && currentYear < currentYearSystem) {
            setCurrentYear((prev) => prev + 1);
        }
    };

    const isLeftDisabled =
        (viewMode === 0 && currentMonth === 1) ||
        (viewMode === 1 && currentYear === 2022);

    const isRightDisabled =
        (viewMode === 0 &&
            currentMonth === currentMonthSystem &&
            currentYear === currentYearSystem) ||
        (viewMode === 1 && currentYear === currentYearSystem);

    return {
        viewMode,
        setViewMode,
        currentMonth,
        currentYear,
        handleLeftClick,
        handleRightClick,
        isLeftDisabled,
        isRightDisabled,
    };
}

export const getPeriodLabel = (viewMode, month, year) => {
    const monthNames = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];
    return viewMode === 0 ? monthNames[month - 1] : `${year}`;
};
