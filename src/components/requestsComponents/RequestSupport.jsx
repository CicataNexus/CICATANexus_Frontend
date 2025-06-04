import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import { showToast } from "@/utils/toastUtils";
import { Button } from "@/components/ui/Button";
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

const options = [
  "Asesoría técnica",
  "Acompañamiento de uso de equipos",
  "Capacitación de uso de equipos",
  "Esterilización en autoclave",
  "Recepción/resguardo de líneas celulares",
];

const matricula = localStorage.getItem("matricula");

const RequestSupport = () => {
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [timeRange, setTimeRange] = useState({
    startTime: "",
    endTime: "",
    reservedHours: 0,
    reservedMinutes: 0,
  });
  const [message, setMessage] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [observations, setObservations] = useState("");
  const [errors, setErrors] = useState({});

  const handleRadioButtonChange = (option) => {
    setSelectedOption(option);
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

  const handleSubmit = async () => {
    const newErrors = {
      dateRange: !dateRange.startDate || !dateRange.endDate,
      timeRange: !timeRange.startTime || !timeRange.endTime,
      timeRangeStartEnd:
        timeRange.startTime &&
        timeRange.endTime &&
        timeRange.startTime >= timeRange.endTime,
      selectedOption: !selectedOption,
      selectedAreas: selectedAreas.length === 0,
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) return;

    const formattedRequest = {
      typeOfRequest: "TA",
      requestSubtype: selectedOption,
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
        .registrationNumber,
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
        if (
          error.message ===
          "Error creating request: Error: Error fetching user: Technician not found or not assigned to this work area"
        ) {
          showToast(
            "No hay técnico asignado para alguna de las áreas",
            "error"
          );
          return;
        }
        throw new Error("Error al enviar la solicitud");
      }

      setMessage(true);
      setSelectedAreas([]);
      setDateRange({ startDate: "", endDate: "" });
      setTimeRange({
        startTime: "",
        endTime: "",
        reservedHours: 0,
        reservedMinutes: 0,
      });
      setObservations("");
      setSelectedOption("");
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
    <div className="relative w-full flex-1 flex items-center justify-center md:pt-4 md:pb-8">
      <div className="md:w-2/3 h-fit bg-white md:px-14 px-1 py-8 flex flex-col rounded-md shadow-md">
        <div className="text-lg mb-2 text-center font-poppins font-semibold">
          Ingrese los datos correspondientes
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mt-5">
          <div className="flex flex-col">
            <div className="p-2 flex flex-col">
              <span className="inline-block mb-2 font-montserrat font-semibold">
                Tipo de Apoyo <span className="text-red-500">*</span>
              </span>
              {options.map((option) => {
                return (
                  <label
                    key={option}
                    className="flex items-center space-x-2 font-montserrat cursor-pointer mb-1"
                  >
                    <div className="relative w-4 h-4">
                      <input
                        type="radio"
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => handleRadioButtonChange(option)}
                        className="peer sr-only"
                      />

                      <div className="w-4 h-4 rounded-full border-2 border-primary-blue peer-checked:border-primary-blue peer-checked:bg-primary-blue flex items-center justify-center"></div>
                      <div className="absolute w-2 h-2 rounded-fullleft-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 peer-checked:block hidden"></div>
                    </div>
                    <span>{option}</span>
                  </label>
                );
              })}
              {errors.selectedOption && (
                <p className="text-red-500 text-xs font-montserrat font-semibold">
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
                mode="range"
              />
              {errors.dateRange && (
                <p className="mt-1 text-red-500 text-xs font-montserrat font-semibold">
                  Este campo es obligatorio
                </p>
              )}
            </div>

            <div className="p-2 flex flex-col">
              <span className="inline-block mb-2 font-montserrat font-semibold">
                Horario en el que se requiere{" "}
                <span className="text-red-500">*</span>
              </span>
              <div className="flex flex-wrap gap-2">
                <div className="font-monot">
                  <div className=" bg-white flex select-none font-medium">
                    Desde
                  </div>
                  <TimePicker
                    timeRange={timeRange}
                    setTimeRange={setTimeRange}
                    type="start"
                    className="select-none"
                    onlyWorkHours={true}
                  />
                </div>
                <div className="">
                  <div className=" bg-white flex select-none font-medium">
                    Hasta
                  </div>
                  <TimePicker
                    timeRange={timeRange}
                    setTimeRange={setTimeRange}
                    type="end"
                    className="select-none"
                    onlyWorkHours={true}
                  />
                </div>
              </div>
              {errors.timeRange && (
                <p className="mt-1 text-red-500 text-xs font-montserrat font-semibold">
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
                <p className="mt-1 text-red-500 text-xs font-montserrat font-semibold">
                  Este campo es obligatorio
                </p>
              )}
            </div>
            <div className="flex flex-col w-full h-full p-2">
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

export default RequestSupport;
