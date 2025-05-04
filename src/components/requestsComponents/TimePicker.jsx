import React from "react";

const TimePicker = ({ timeRange, setTimeRange, type = "start", className }) => {
  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  const handleChange = (unit, value) => {
    const key = type === "start" ? "startTime" : "endTime";
    const existingTime = timeRange[key] || "00:00";
    const [existingHour, existingMinute] = existingTime.split(":");

    const newTime =
      unit === "hour"
        ? `${value}:${existingMinute}`
        : `${existingHour}:${value}`;

    setTimeRange((prev) => ({
      ...prev,
      [key]: newTime,
    }));
  };

  const currentTime =
    timeRange[type === "start" ? "startTime" : "endTime"] || "00:00";
  const [hour, minute] = currentTime.split(":");

  return (
    <div className={`flex gap-2 ${className}`}>
      <select
        value={hour}
        onChange={(e) => handleChange("hour", e.target.value)}
        className="bg-white border border-primary-blue rounded-md shadow-sm p-2"
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

      <select
        value={minute}
        onChange={(e) => handleChange("minute", e.target.value)}
        className="bg-white border border-primary-blue rounded-md shadow-sm p-2"
      >
        <option value="" disabled>
          MM
        </option>
        {minutes.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimePicker;
