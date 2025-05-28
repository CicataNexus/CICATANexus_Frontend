import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import DatePicker from "./DatePicker";
import { showToast } from "@/utils/toastUtils";
import SearchSelect from "./SearchSelect";
import TimePicker from "./TimePicker";
import { Button } from "@/components/ui/button";
import ModalRequestConfirmation from "@/components/ModalRequestConfirmation";

const areas = [
  "Laboratorio de Biología Molecular",
  "Laboratorio de Cultivo Celular y Microscopía",
  "Anexo de Cultivo Celular",
  "Laboratorio de Microbiología",
  "Laboratorio de Cromatografía y Espectrofotometría",
  "Laboratorio de Bioprocesos",
  "Laboratorio de Acondicionamiento",
  "Cámara Fría",
  "Bioterio",
];

const RequestEquipment = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [occupiedDates, setOccupiedDates] = useState([]);
  const [occupiedTime, setOccupiedTime] = useState({
    startTime: "",
    startDirection: "before",
    endDirection: "after",
    endTime: "",
  });
  const [datePickerMode, setDatePickerMode] = useState("single");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
    reservedDays: 0,
  });
  const [timeRange, setTimeRange] = useState({
    startTime: "",
    endTime: "",
    reservedHours: 0,
    reservedMinutes: 0,
  });
  const [message, setMessage] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [observations, setObservations] = useState("");
  const [equipments, setEquipments] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${import.meta.env.VITE_SERVER_IP}:${
            import.meta.env.VITE_SERVER_PORT
          }/v1/equipment/basic`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const result = await response.json();
        setEquipments(result);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSelectedEquipmentData = async () => {
      try {
        const occupied = [];
        let hasDailyReservation = false;

        const fetches = selectedItems.map(async (equipment) => {
          const equipmentResponse = await fetch(
            `http://${import.meta.env.VITE_SERVER_IP}:${
              import.meta.env.VITE_SERVER_PORT
            }/v1/equipment/barcode/${equipment.barcode}`
          );

          if (!equipmentResponse.ok) {
            throw new Error("Failed to fetch equipment");
          }

          const data = await equipmentResponse.json();

          // Check if reservationType is "D"
          if (data.reservationType === "D") {
            hasDailyReservation = true;
          }

          if (Array.isArray(data.occupiedTime)) {
            occupied.push(...data.occupiedTime);
          }
        });

        await Promise.all(fetches);

        // Set the datePickerMode based on the presence of "D"
        setDatePickerMode(hasDailyReservation ? "range" : "single");

        setOccupiedDates(occupied);
      } catch (err) {
        setError(err);
      }
    };

    if (selectedItems.length > 0) {
      fetchSelectedEquipmentData();
    } else {
      setOccupiedDates([]);
      setDatePickerMode("single"); // reset when no items selected
    }
  }, [selectedItems]);

  const handleSelectedItemsChange = (newSelectedItems) => {
    setSelectedItems(newSelectedItems);
    setDateRange({
      startDate: "",
      endDate: "",
      reservedDays: 0,
    });
  };

  const parseLocalDate = (isoString) => {
    const [year, month, day] = isoString.split("T")[0].split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  useEffect(() => {
    const checkOccupiedTimes = () => {
      if (!dateRange.startDate || !dateRange.endDate) return;

      const start = parseLocalDate(dateRange.startDate);
      const end = parseLocalDate(dateRange.endDate);

      let newOccupiedTime = { startTime: "", endTime: "" };

      occupiedDates.forEach((occ) => {
        const occStart = parseLocalDate(occ.startingDate);
        const occEnd = parseLocalDate(occ.finishingDate);

        const startDateOnly = start.toISOString().split("T")[0];
        const endDateOnly = end.toISOString().split("T")[0];
        const occStartDateOnly = occStart.toISOString().split("T")[0];
        const occEndDateOnly = occEnd.toISOString().split("T")[0];

        if (startDateOnly === occStartDateOnly) {
          newOccupiedTime.startTime = occ.startingTime;
          newOccupiedTime.startDirection = "before";
        }
        if (endDateOnly === occEndDateOnly) {
          newOccupiedTime.endTime = occ.finishingTime;
          newOccupiedTime.endDirection = "after";
        }
        if (startDateOnly === occEndDateOnly) {
          newOccupiedTime.startTime = occ.finishingTime;
          newOccupiedTime.startDirection = "after";
        }
        if (occStartDateOnly === endDateOnly) {
          newOccupiedTime.endTime = occ.startingTime;
          newOccupiedTime.endDirection = "before";
        }
      });

      setOccupiedTime(newOccupiedTime);
    };

    checkOccupiedTimes();
  }, [dateRange]);

  const handleAreaChange = (area) => {
    setSelectedAreas((prevSelectedAreas) => {
      if (prevSelectedAreas.includes(area)) {
        return prevSelectedAreas.filter((item) => item !== area);
      } else {
        return [...prevSelectedAreas, area];
      }
    });
  };
  useEffect(() => {
    const { startTime, endTime } = timeRange;

    if (!startTime || !endTime) return; // Don't calculate if times are incomplete

    const calculateTimeDifference = (startTime, endTime) => {
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);

      const start = new Date(0, 0, 0, startHour, startMinute);
      const end = new Date(0, 0, 0, endHour, endMinute);

      let diff = (end - start) / (1000 * 60); // difference in minutes

      if (diff < 0) {
        diff += 24 * 60; // handle overnight
      }

      const reservedHours = Math.floor(diff / 60);
      const reservedMinutes = diff % 60;

      return { reservedHours, reservedMinutes };
    };

    const { reservedHours, reservedMinutes } = calculateTimeDifference(
      startTime,
      endTime
    );

    setTimeRange((prev) => ({
      ...prev,
      reservedHours,
      reservedMinutes,
    }));
  }, [timeRange.startTime, timeRange.endTime]);

  const handleObservationsChange = (event) => {
    setObservations(event.target.value);
  };

  const handleSubmit = async () => {
    const newErrors = {
      dateRange: !dateRange.startDate || !dateRange.endDate,
      timeRange: !timeRange.startTime || !timeRange.endTime,
      timeRangeStartEnd: timeRange.startTime >= timeRange.endTime,
      selectedItems: selectedItems.length === 0,
      selectedAreas: selectedAreas.length === 0,
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) return;

    const formattedRequest = {
      typeOfRequest: "EQ",
      occupiedMaterial: selectedItems.map((item) => ({
        barcode: item.barcode,
      })),
      workArea: selectedAreas,
      requestDate: {
        startingDate: new Date(dateRange.startDate).toISOString(),
        finishingDate: new Date(dateRange.endDate).toISOString(),
        startingTime: timeRange.startTime,
        finishingTime: timeRange.endTime,
        reservedDays: dateRange.reservedDays,
        reservedHours: timeRange.reservedHours,
        reservedMinutes: timeRange.reservedMinutes,
      },
      registrationNumber: jwtDecode(localStorage.getItem("token"))
        .registrationNumber, // placeholder
      observations: observations,
    };

    console.log(formattedRequest);

    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_SERVER_IP}:${
          import.meta.env.VITE_SERVER_PORT
        }/v1/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedRequest),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        if (error.message === "Error creating request: Error: Error fetching user: Technician not found or not assigned to this work area") {
          showToast("No hay técnico asignado para alguna de las áreas", "error");
          return;
        }
        throw new Error("Error al enviar la solicitud");
      }

      setMessage(true);
      setSelectedItems([]);
      setDateRange({ startDate: "", endDate: "", reservedDays: 0 });
      setTimeRange({
        startTime: "",
        endTime: "",
        reservedHours: 0,
        reservedMinutes: 0,
      });
      setSelectedAreas([]);
      setObservations("");
      setErrors({});
    } catch (error) {
      alert("Ocurrió un error al enviar la solicitud. Intente de nuevo.");
      console.error(error);
    }
  };

  const handleCloseMessage = () => {
    setMessage(false);
  };

  return (
    <div className="relative w-full flex-1 flex items-center justify-center py-4">
      <div className="w-2/3 h-fit bg-white px-14 py-8 flex flex-col rounded-md shadow-md">
        <div className="text-lg mb-2 text-center font-poppins font-semibold">
          Ingrese los datos correspondientes
        </div>
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div className="flex flex-col">
            <div className="p-2 flex flex-col">
              <span className="inline-block mb-2 font-montserrat font-semibold">
                Equipo(s) que utilizará <span className="text-red-500">*</span>
              </span>
              <SearchSelect
                options={equipments.map((eq) => ({
                  barcode: eq.barcode,
                  photoId: eq.photoID,
                  name: eq.name,
                  brand: eq.brand,
                  location: eq.location,
                }))}
                selectedItems={selectedItems}
                onSelectedItemsChange={handleSelectedItemsChange}
                className="font-montserrat text-sm"
                placeholder="Buscar con el nombre"
              />
              {errors.selectedItems && (
                <p className="text-red-500 text-xs font-montserrat font-semibold mt-1">
                  Este campo es obligatorio
                </p>
              )}
            </div>
            <div className="p-2">
              <span className="inline-block mb-2 font-montserrat font-semibold">
                Fecha en la que se requiere{" "}
                <span className="text-red-500">*</span>
              </span>
              <DatePicker
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                onChange={setDateRange}
                mode={datePickerMode}
                occupiedDates={occupiedDates}
              />
              {errors.dateRange && (
                <p className="mt-1 text-red-500 text-xs font-montserrat font-semibold">
                  Este campo es obligatorio
                </p>
              )}
            </div>

            <div className="p-2 flex flex-col font-montserrat">
              <span className="inline-block mb-2 font-semibold">
                Horario en el que se requiere{" "}
                <span className="text-red-500">*</span>
              </span>
              <div className="flex gap-2">
                <div className="font-monot">
                  <div className="bg-white flex select-none font-medium">
                    Desde
                  </div>
                  <TimePicker
                    timeRange={timeRange}
                    setTimeRange={setTimeRange}
                    type="start"
                    className="select-none"
                    limitTime={occupiedTime.startTime}
                    limitDirection={occupiedTime.startDirection}
                  />
                </div>
                <div className="font-montserrat">
                  <div className="bg-white flex select-none font-medium">
                    Hasta
                  </div>
                  <TimePicker
                    timeRange={timeRange}
                    setTimeRange={setTimeRange}
                    type="end"
                    className="select-none"
                    limitTime={occupiedTime.endTime}
                    limitDirection={occupiedTime.endDirection}
                  />
                </div>
              </div>
              {errors.timeRange && (
                <p className="text-red-500 text-xs font-montserrat font-semibold mt-1">
                  Este campo es obligatorio
                </p>
              )}
              {errors.timeRangeStartEnd && (
                <p className="text-red-500 text-xs font-montserrat font-semibold mt-1">
                  El tiempo final debe de ser mayor al de inicio
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="p-2">
              <span className="inline-block mb-1 font-montserrat font-semibold">
                Áreas de Trabajo <span className="text-red-500">*</span>
              </span>
              <ul className="font-montserrat">
                {areas.map((option) => {
                  return (
                    <li key={option}>
                      <label className="flex items-center cursor-pointer mb-1">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={selectedAreas.includes(option)}
                            onChange={() => handleAreaChange(option)}
                            className="sr-only peer"
                          />
                          <div className="w-4 h-4 border-2 border-primary-blue rounded-xs peer-checked:bg-primary-blue"></div>
                          <svg
                            className="absolute top-1/2 left-1/2 w-3.5 h-3.5 text-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden peer-checked:block"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="ml-2">{option}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              {errors.selectedAreas && (
                <p className="text-red-500 text-xs font-montserrat font-semibold">
                  Este campo es obligatorio
                </p>
              )}
            </div>
            <div className="flex flex-col w-full h-full">
              <label
                htmlFor="observaciones"
                className="mb-2 select-none font-montserrat font-semibold"
              >
                Observaciones
              </label>
              <textarea
                id="observaciones"
                className="w-full h-24 rounded-md border-2 border-primary-blue p-3 placeholder:text-sm placeholder:font-montserrat font-montserrat font-normal focus:outline-none focus:ring-primary-blue focus:border-transparent focus:bg-input-background focus:ring-2"
                placeholder="Escriba aquí sus observaciones."
                value={observations}
                onChange={handleObservationsChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Button
            className="bg-deep-blue hover:bg-dark-blue text-white text-xl font-poppins font-semibold tracking-wide py-5 w-auto px-15"
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        </div>
      </div>
      {message && (
        <ModalRequestConfirmation
          onClose={handleCloseMessage}
          isConfirming={false}
        />
      )}
    </div>
  );
};

export default RequestEquipment;
