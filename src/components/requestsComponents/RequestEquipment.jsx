import { useEffect, useState } from "react";
import DatePicker from "./DatePicker";
import SearchSelect from "./SearchSelect";
import TimePicker from "./TimePicker";
import { IoMdClose } from "react-icons/io";
import { Button } from "@/components/ui/button";

const areas = [
  "Laboratorio de Biología Molecular",
  "Laboratorio de Cultivo Celular y Microscopía",
  "Anexo de Cultivo Celular",
  "Laboratorio de Microbiología",
  "Laboratorio de Cromatografia y Espectrofotometría",
  "Laboratorio de Bioprocesos",
  "Laboratorio de Acondicionamiento",
  "Cámara Fría",
  "Bioterio",
];

const RequestEquipment = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [occupiedDates, setOccupiedDates] = useState([]);
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

  const matricula = localStorage.getItem("matricula");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${import.meta.env.VITE_SERVER_IP}:${
            import.meta.env.VITE_SERVER_PORT
          }/v1/equipment`
        );

        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        const equipmentList = await response.json();

        const enrichedEquipment = await Promise.all(
          equipmentList.map(async (equipment) => {
            try {
              const photoResponse = await fetch(
                `http://${import.meta.env.VITE_SERVER_IP}:${
                  import.meta.env.VITE_SERVER_PORT
                }/v1/photo/${equipment.photoId}`
              );

              if (!photoResponse.ok) {
                throw new Error("Failed to fetch photo");
              }

              const blob = await photoResponse.blob();

              const photoUrl = URL.createObjectURL(blob);

              return {
                ...equipment,
                photo: photoUrl,
              };
            } catch (error) {
              console.error(
                `Error fetching photo for ${equipment.barcode}:`,
                error
              );
              return {
                ...equipment,
                photo: null,
              };
            }
          })
        );

        setEquipments(enrichedEquipment);
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

  const handleAreaChange = (area) => {
    setSelectedAreas((prevSelectedAreas) => {
      if (prevSelectedAreas.includes(area)) {
        return prevSelectedAreas.filter((item) => item !== area);
      } else {
        return [...prevSelectedAreas, area];
      }
    });
  };

  const handleObservationsChange = (event) => {
    setObservations(event.target.value);
  };

  const calculateTimeDifference = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const start = new Date(0, 0, 0, startHour, startMinute);
    const end = new Date(0, 0, 0, endHour, endMinute);

    let diff = (end - start) / (1000 * 60);

    if (diff < 0) {
      diff += 24 * 60;
    }

    const reservedHours = Math.floor(diff / 60);
    const reservedMinutes = diff % 60;

    return { reservedHours, reservedMinutes };
  };

  const handleSubmit = async () => {
    const isValid =
      !!dateRange.startDate &&
      !!dateRange.endDate &&
      selectedItems.length > 0 &&
      typeof timeRange.startTime === "string" &&
      typeof timeRange.endTime === "string" &&
      timeRange.startTime.length > 0 &&
      timeRange.endTime.length > 0 &&
      selectedAreas.length > 0;

    if (!isValid) {
      alert("Por favor complete todos los campos requeridos.");
      return;
    }

    const { reservedHours, reservedMinutes } = calculateTimeDifference(
      timeRange.startTime,
      timeRange.endTime
    );

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
        reservedHours,
        reservedMinutes,
      },
      registrationNumber: matricula,
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
              <p className="mb-2 font-montserrat font-semibold">
                Equipo(s) que utilizará *
              </p>
              <SearchSelect
                options={equipments.map((eq) => ({
                  barcode: eq.barcode,
                  name: eq.equipmentName,
                  brand: eq.equipmentBrand,
                  location: eq.location,
                  image: eq.photo,
                }))}
                selectedItems={selectedItems}
                onSelectedItemsChange={handleSelectedItemsChange}
                className="font-montserrat text-sm"
                placeholder="Buscar con el nombre"
              />
            </div>
            <div className="p-2">
              <p className="mb-2 font-montserrat font-semibold">
                Fecha en la que se requiere *
              </p>
              <DatePicker
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                onChange={setDateRange}
                mode={datePickerMode}
                occupiedDates={occupiedDates}
              />
            </div>

            <div className="p-2 flex flex-col font-montserrat">
              <p className="mb-2 font-semibold">
                Horario en el que se requiere *
              </p>
              <div className="flex gap-2">
                <div className="font-monot">
                  <div className="bg-white flex select-none">Desde</div>
                  <TimePicker
                    timeRange={timeRange}
                    setTimeRange={setTimeRange}
                    type="start"
                    className="select-none"
                  />
                </div>
                <div className="font-montserrat">
                  <div className="bg-white flex select-none">Hasta</div>
                  <TimePicker
                    timeRange={timeRange}
                    setTimeRange={setTimeRange}
                    type="end"
                    className="select-none"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="p-2">
              <p className="mb-2 font-montserrat font-semibold">
                Áreas de Trabajo *
              </p>
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
            </div>
            <div className="flex flex-col w-full h-full">
              <label
                htmlFor="observaciones"
                className="mb-2 select-none font-montserrat font-semibold "
              >
                Observaciones
              </label>
              <textarea
                id="observaciones"
                className="border border-primary-blue rounded-lg p-2 font-montserrat focus:outline-none focus:ring-1 focus:ring-primary-blue focus:border-transparent focus:bg-input-background placeholder:text-sm text-sm h-full"
                placeholder="Escriba aquí sus observaciones."
                value={observations}
                onChange={handleObservationsChange}
              ></textarea>
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
        </div>
      </div>
      {message && (
        <div className="h-full w-full absolute backdrop-blur-sm bg-black/50 flex text-center justify-center items-center">
          <div className="relative bg-white p-30 text-2xl rounded-3xl">
            Solicitud enviada con éxito
            <button
              className="absolute right-4 top-4"
              onClick={handleCloseMessage}
            >
              <IoMdClose size={30} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestEquipment;
