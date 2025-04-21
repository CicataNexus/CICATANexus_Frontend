import React, { useEffect } from "react";

const TimePicker = ({ timeRange, setTimeRange, type }) => {
  const hours = Array.from({ length: 10 }, (_, index) =>
    String(index + 8 ).padStart(2, "0")
  );

  // Get current time values for the selected start or end time
  const currentHour = timeRange[type + "Time"]?.split(":")[0] || "";
  const currentMinute = timeRange[type + "Time"]?.split(":")[1] || "";
  
  const availableMinutes = (() => {
    const hour = parseInt(currentHour);
    if (hour === 17) {
      return ["00"]; // only allow 17:00
    }
    return Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
  })();
  

  const handleHourChange = (e) => {
    const hour = e.target.value;
    setTimeRange((prev) => ({
      ...prev,
      [type + "Time"]: `${hour}:${prev[type + "Time"]?.split(":")[1] || "00"}`,
    }));
  };

  const handleMinuteChange = (e) => {
    const minute = e.target.value;
    setTimeRange((prev) => ({
      ...prev,
      [type + "Time"]: `${
        prev[type + "Time"]?.split(":")[0] || "00"
      }:${minute}`,
    }));
  };

  // Effect for calculating the reserved time (hours and minutes)
  useEffect(() => {
    const { startTime, endTime } = timeRange;

    if (!startTime || !endTime) return;

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const start = new Date();
    const end = new Date();

    start.setHours(startHour, startMinute, 0);
    end.setHours(endHour, endMinute, 0);

    if (end <= start) {
      setTimeRange((prev) => ({
        ...prev,
        reservedHours: 0,
        reservedMinutes: 0,
      }));
      return;
    }

    const diffMs = end - start;
    const totalMinutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    setTimeRange((prev) => ({
      ...prev,
      reservedHours: hours,
      reservedMinutes: minutes,
    }));
  }, [timeRange.startTime, timeRange.endTime]);

  return (
    <div className="flex">
      <div className="flex flex-col items-center overflow-hidden max-h-32 pr-2 font-montserrat">
        <select
          value={currentHour}
          onChange={handleHourChange}
          className="bg-white border border-primary-blue rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue p-2"
        >
          <option value="" disabled>
            HH
          </option>
          {hours.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col items-center overflow-hidden max-h-32 font-montserrat">
        <select
          value={currentMinute}
          onChange={handleMinuteChange}
          className="bg-white border border-primary-blue rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue p-2"
        >
          <option value="" disabled>
            MM
          </option>
          {availableMinutes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimePicker;
