import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const DateRangePicker = ({
  startDate,
  endDate,
  onChange,
  mode,
  occupiedDates = [],
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selecting, setSelecting] = useState("start");
  const [hoverDate, setHoverDate] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: startDate ? new Date(startDate) : null,
    end: endDate ? new Date(endDate) : null,
  });

  useEffect(() => {
    if (startDate && endDate) {
      setDateRange({
        start: new Date(startDate),
        end: new Date(endDate),
      });
    } else {
      setDateRange({ start: null, end: null });
    }
  }, [startDate, endDate]);

  const parseLocalDate = (isoString) => {
    const [year, month, day] = isoString.split("T")[0].split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const blockedRanges = occupiedDates.map(
    ({ startingDate, finishingDate }) => ({
      start: parseLocalDate(startingDate),
      end: parseLocalDate(finishingDate),
    })
  );

  const isBlocked = (date) => {
    return blockedRanges.some(({ start, end }) => {
      const day = new Date(date);
      day.setHours(0, 0, 0, 0);
      start = new Date(start);
      end = new Date(end);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      return day >= start && day <= end;
    });
  };

  const isPast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const day = new Date(date);
    day.setHours(0, 0, 0, 0);

    return day < today;
  };

  const isBlockedStart = (date) => {
    return blockedRanges.some(({ start }) => {
      const day = new Date(date);
      day.setHours(0, 0, 0, 0);
      start = new Date(start);
      start.setHours(0, 0, 0, 0);
      return day.getTime() === start.getTime();
    });
  };

  const isBlockedEnd = (date) => {
    return blockedRanges.some(({ end }) => {
      const day = new Date(date);
      day.setHours(0, 0, 0, 0);
      end = new Date(end);
      end.setHours(0, 0, 0, 0);
      return day.getTime() === end.getTime();
    });
  };

  const isBlockedInRange = (start, end) => {
    let currentDate = new Date(start);
    currentDate.setDate(currentDate.getDate() + 1);
    while (currentDate < end) {
      if (isBlocked(currentDate)) {
        return true;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return false;
  };

  const generateCalendarDays = (month, year) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const days = [];

    const firstDay = firstDayOfMonth.getDay();
    const prevMonthDaysCount = new Date(year, month, 0).getDate();
    const prevMonthStartDay = prevMonthDaysCount - firstDay + 1;

    for (let i = prevMonthStartDay; i <= prevMonthDaysCount; i++) {
      days.push(new Date(year, month - 1, i));
    }

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    const totalCells = 42;
    const remainingCells = totalCells - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const isInRange = (date) => {
    if (!dateRange.start || !dateRange.end) return false;
    return date > dateRange.start && date < dateRange.end;
  };

  const isInHoverRange = (date) => {
    if (!dateRange.start || !hoverDate || dateRange.end) return false;
    return (
      (date > dateRange.start && date < hoverDate) ||
      (date < dateRange.start && date > hoverDate)
    );
  };

  const handleDateSelect = (selectedDate) => {
    if (
      isPast(selectedDate) ||
      (isBlocked(selectedDate) &&
        !isBlockedStart(selectedDate) &&
        !isBlockedEnd(selectedDate))
    )
      return;

    const newDateRange = { ...dateRange };

    if (mode === "single") {
      newDateRange.start = selectedDate;
      newDateRange.end = selectedDate;
      onChange({
        startDate: selectedDate.toISOString(),
        endDate: selectedDate.toISOString(),
        reservedDays: 1,
      });
    } else {
      if (selecting === "start" || !dateRange.start) {
        newDateRange.start = selectedDate;
        newDateRange.end = null;
        setSelecting("end");
      } else {
        if (selectedDate < dateRange.start) {
          newDateRange.end = newDateRange.start;
          newDateRange.start = selectedDate;
        } else {
          newDateRange.end = selectedDate;
        }

        if (isBlockedInRange(newDateRange.start, newDateRange.end)) {
          alert("Rango de fecha invalido");
          return;
        }
        setSelecting("start");

        const reservedDays =
          Math.ceil(
            (newDateRange.end.setHours(0, 0, 0, 0) -
              newDateRange.start.setHours(0, 0, 0, 0)) /
              (1000 * 60 * 60 * 24)
          ) + 1;

        onChange({
          startDate: newDateRange.start.toISOString(),
          endDate: newDateRange.end.toISOString(),
          reservedDays,
        });
      }
    }

    setDateRange(newDateRange);
  };

  const handleDateHover = (date) => {
    if (dateRange.start && !dateRange.end) {
      setHoverDate(date);
    }
  };

  const handlePreviousMonth = (e) => {
    e.stopPropagation();
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const { month, year } = {
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  };

  const days = generateCalendarDays(month, year);
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="relative select-none">
      {" "}
      <div className="w-full p-5 bg-white border-2 border-primary-blue rounded-lg z-10 font-montserrat">
        {" "}
        <div className="flex justify-between items-center pb-4">
          {" "}
          <span className="p-2 text-base font-semibold">
            {capitalize(
              new Date(year, month).toLocaleString("es-MX", {
                month: "long",
              })
            )}{" "}
            {year}
          </span>
          <div>
            {" "}
            <button
              type="button"
              onClick={handlePreviousMonth}
              className="text-gray-600 hover:text-primary-blue transition cursor-pointer"
            >
              <Icon icon="iconamoon:arrow-left-2-light" className="text-2xl" />
            </button>
            <button
              onClick={handleNextMonth}
              className="text-gray-600 hover:text-primary-blue transition p-2 cursor-pointer"
            >
              <Icon icon="iconamoon:arrow-right-2-light" className="text-2xl" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-0.5 text-sm text-gray-700">
          {" "}
          {/* Day of week headers */}
          {["D", "L", "M", "M", "J", "V", "S"].map((day, index) => (
            <div
              key={index}
              className="w-10 h-10 flex justify-center items-start"
            >
              {day}
            </div>
          ))}
          {days.map((day, index) => {
            const isStart =
              dateRange.start &&
              day.toDateString() === dateRange.start.toDateString();
            const isEnd =
              dateRange.end &&
              day.toDateString() === dateRange.end.toDateString();
            const isRangeDay = isInRange(day);
            const isHoverDay = isInHoverRange(day);
            const isDisabled = isBlocked(day);
            const isBlockedStartDay = isBlockedStart(day);
            const isBlockedEndDay = isBlockedEnd(day);
            const isPastDay = isPast(day);

            return (
              <div
                key={index}
                onClick={() => handleDateSelect(day)}
                onMouseEnter={() => handleDateHover(day)}
                className={`w-10 h-10 flex items-center justify-center 
                  ${isDisabled ? "cursor-not-allowed" : ""}
                  ${isHoverDay ? "bg-indigo-50 text-black rounded-full" : ""}
                  ${
                    isBlockedStartDay
                      ? `bg-deep-blue/75 text-white rounded-full ${
                          isPastDay ? "cursor-not-allowed" : "cursor-pointer"
                        }`
                      : ""
                  } 
                  ${
                    isBlockedEndDay
                      ? `bg-deep-blue/75 text-white rounded-full ${
                          isPastDay ? "cursor-not-allowed" : "cursor-pointer"
                        }`
                      : ""
                  } 
                  ${
                    isDisabled && !isBlockedStartDay && !isBlockedEndDay
                      ? "bg-deep-blue text-white rounded-full"
                      : ""
                  } 
                  ${
                    isStart || isEnd
                      ? "bg-primary-blue text-white rounded-full"
                      : ""
                  } 
                  ${isRangeDay ? "bg-indigo-100 rounded-full" : ""} 
                  ${day.getMonth() !== month ? "text-gray-400" : ""} 
                  ${!isDisabled ? "hover:bg-indigo-100 hover:rounded-full" : ""}
                  ${isPastDay ? "text-gray-400 cursor-not-allowed" : ""}
                `}
              >
                {day.getDate()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
