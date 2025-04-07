import React from "react";

const TimePicker = ({ hour, setHour, minute, setMinute }) => {
  const hours = Array.from({ length: 24 }, (_, index) =>
    String(index).padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, index) =>
    String(index).padStart(2, "0")
  );

  return (
    <div className="flex">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center overflow-hidden max-h-32 pr-2">
          <select
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="bg-white border border-primary-blue rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
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

        <div className="flex flex-col items-center overflow-hidden max-h-32">
          <select
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="bg-white border border-primary-blue rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
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
      </div>
    </div>
  );
};

export default TimePicker;
