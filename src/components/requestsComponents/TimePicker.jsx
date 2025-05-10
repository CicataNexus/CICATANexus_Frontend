import React from "react";

const TimePicker = ({
  timeRange,
  setTimeRange,
  type = "start",
  className,
  limitTime = null,
  limitDirection = null,
}) => {
  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  const handleChange = (unit, value) => {
    const key = type === "start" ? "startTime" : "endTime";
    const existingTime = timeRange[key] || ":";
    const [existingHour = "", existingMinute = ""] = existingTime.split(":");

    const newTime =
      unit === "hour"
        ? `${value}:${existingMinute || "00"}`
        : `${existingHour || "00"}:${value}`;

    setTimeRange((prev) => ({
      ...prev,
      [key]: newTime,
    }));
  };

  const currentTime =
    timeRange[type === "start" ? "startTime" : "endTime"] || "";
  const [selectedHour = "", selectedMinute = ""] = currentTime.split(":");

  const [limitHour, limitMinute] = limitTime
    ? limitTime.split(":").map(Number)
    : [null, null];

  const limitTotalMinutes =
    limitHour !== null && limitMinute !== null
      ? limitHour * 60 + limitMinute
      : null;

  const isAllowed = (h, m) => {
    if (limitTotalMinutes === null) return true;
    const total = parseInt(h) * 60 + parseInt(m);
    if (limitDirection === "before") return total < limitTotalMinutes;
    if (limitDirection === "after") return total > limitTotalMinutes;
    return true; // default allow
  };

  const getValidHours = () =>
    hours.filter((h) => minutes.some((m) => isAllowed(h, m)));

  const getValidMinutes = () =>
    minutes.map((m) => ({
      value: m,
      disabled: !selectedHour || !isAllowed(selectedHour, m),
    }));

  const validHours = getValidHours();
  const validMinutes = getValidMinutes();

  return (
    <div className={`flex gap-2 ${className}`}>
      <select
        value={selectedHour}
        onChange={(e) => handleChange("hour", e.target.value)}
        className="bg-white border border-primary-blue rounded-md shadow-sm p-2"
      >
        <option value="">HH</option>
        {validHours.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>

      <select
        value={selectedMinute}
        onChange={(e) => handleChange("minute", e.target.value)}
        className={`bg-white border border-primary-blue rounded-md shadow-sm p-2 ${
          !selectedHour && ""
        }`}
        disabled={!selectedHour}
      >
        <option value="">MM</option>
        {validMinutes.map(({ value, disabled }) => (
          <option key={value} value={value} disabled={disabled}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimePicker;
