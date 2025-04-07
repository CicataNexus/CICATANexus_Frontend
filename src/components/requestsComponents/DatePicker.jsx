import React, { useState, useEffect } from "react";

const DateRangePicker = ({ startDate, endDate, onChange }) => {
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
      setDateRange({
        start: null,
        end: null,
      });
    }
  }, [startDate, endDate]);

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
      dateRange.start &&
      hoverDate &&
      ((date > dateRange.start && date < hoverDate) ||
        (date < dateRange.start && date > hoverDate))
    );
  };

  const handleDateSelect = (selectedDate) => {
    const newDateRange = { ...dateRange };

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
      setSelecting("start");

      onChange({
        startDate: newDateRange.start.toISOString(),
        endDate: newDateRange.end.toISOString(),
      });
    }

    setDateRange(newDateRange);
  };

  const handleDateHover = (date) => {
    if (dateRange.start && !dateRange.end) {
      setHoverDate(date);
    }
  };

  const handlePreviousMonth = (event) => {
    event.stopPropagation();
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = (event) => {
    event.stopPropagation();
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };

  const { month, year } = {
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  };

  const days = generateCalendarDays(month, year);

  return (
    <div className="relative">
      <div className="w-full p-4 bg-white border border-primary-blue rounded-lg z-10">
        <div className="flex justify-between items-center pb-4">
          <span className="p-2 text-lg font-semibold">
            {new Date(year, month).toLocaleString("default", {
              month: "long",
            })}{" "}
            {year}
          </span>
          <div>
            <button
              type="button"
              onClick={handlePreviousMonth}
              className="text-gray-600 hover:text-indigo-600 p-2"
            >
              &lt;
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="text-gray-600 hover:text-indigo-600 p-2"
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 text-sm text-gray-700">
          {["D", "L", "M", "M", "J", "V", "S"].map((day, index) => (
            <div key={index} className="flex justify-center items-start mb-2">
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

            return (
              <div
                key={index}
                onClick={() => handleDateSelect(day)}
                onMouseEnter={() => handleDateHover(day)}
                className={`p-2 flex items-center justify-center rounded-lg cursor-pointer 
                  ${isStart || isEnd ? "bg-primary-blue text-white" : ""}
                  ${isRangeDay ? "bg-indigo-100" : ""}
                  ${isHoverDay ? "bg-indigo-50" : ""}
                  ${
                    day.getMonth() !== month ? "text-gray-400" : "text-gray-700"
                  }
                  hover:bg-indigo-100`}
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
