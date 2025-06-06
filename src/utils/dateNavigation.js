import { useState } from "react";

const currentDate = new Date();
const currentDaySystem = currentDate.getDay();
const currentMonthSystem = currentDate.getMonth() + 1;
const currentYearSystem = currentDate.getFullYear();

export default function useDateNavigation(initialViewMode = 0) {
    const [viewMode, setViewMode] = useState(initialViewMode);
    const [currentDay, setCurrentDay] = useState(currentDaySystem);
    const [currentMonth, setCurrentMonth] = useState(currentMonthSystem);
    const [currentYear, setCurrentYear] = useState(currentYearSystem);

    const handleDayLeft = () => {
        setCurrentDay((prev) => (prev - 1 + 7) % 7);
    };

    const handleDayRight = () => {
        setCurrentDay((prev) => (prev + 1) % 7);
    };

    const handleYearLeft = () => {
        setCurrentYear((prev) => Math.max(2020, prev - 1));
    };

    const handleYearRight = () => {
        setCurrentYear((prev) => prev + 1);
    };


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
        currentDay,
        setCurrentDay,
        currentMonth,
        currentYear,
        handleLeftClick,
        handleRightClick,
        handleDayLeft,
        handleDayRight,
        handleYearLeft,
        handleYearRight,
        isLeftDisabled,
        isRightDisabled,
    };
}

export const getPeriodLabel = (viewMode, month, year, day) => {
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
    const dayNames = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
    ];

    return {
        label: viewMode === 0 ? monthNames[month - 1] : `${year}`,
        dayLabel: day !== undefined ? dayNames[day] : undefined,
    };
};

export const getEnglishDayName = (day) => {
    const dayNamesEnglish = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return dayNamesEnglish[day];
};
