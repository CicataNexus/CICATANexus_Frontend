import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import DatePicker from "./DatePicker";
import SearchSelect from "./SearchSelect";
import TimePicker from "./TimePicker";
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

const RequestMaterial = () => {
  const [selectedItems, setSelectedItems] = useState([]);
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
  const [reagents, setReagents] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [observations, setObservations] = useState("");
  const [materials, setMaterials] = useState([]);
  const [errors, setErrors] = useState({});
  const [combinedItems, setCombinedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://${import.meta.env.VITE_SERVER_IP}:${
            import.meta.env.VITE_SERVER_PORT
          }/v1/combined/basic`
        );
        if (!res.ok) {
          throw new Error("Error fetching combined items");
        }
        const data = await res.json();
        setCombinedItems(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleSelectedItemsChange = (newSelectedItems) => {
    setSelectedItems(newSelectedItems);
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
      dateRange: !dateRange.startDate,
      timeRange: !timeRange.startTime,
      selectedItems: selectedItems.length === 0,
      selectedAreas: selectedAreas.length === 0,
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) return;
    const token = localStorage.getItem("token");

  
      console.log("Raw token:", token);

      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);

    const formattedRequest = {
      typeOfRequest: "R&M",
      occupiedMaterial: selectedItems.map((item) => ({
        barcode: item.barcode,
      })),
      workArea: selectedAreas[0], // Por ahora, solo se permite un área en el backend, para arreglarlo solo se quita el [0]
      requestDate: {
        startingDate: new Date(dateRange.startDate).toISOString(),
        startingTime: timeRange.startTime,
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
        throw new Error("Error al enviar la solicitud.");
      }

      setMessage(true);
      setSelectedItems([]);
      setDateRange({ startDate: "", endDate: "" });
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
      alert(error.message);
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
              <span className="mb-2 font-montserrat font-semibold">
                Reactivo(s) y/o material(es) que utilizará{" "}
                <span className="text-red-500">*</span>
              </span>
              <SearchSelect
                options={combinedItems.map((item) => ({
                  barcode: item.barcode,
                  name: item.name,
                  brand: item.brand,
                  location: item.location,
                  photoId: item.photoId,
                }))}
                selectedItems={selectedItems}
                onSelectedItemsChange={handleSelectedItemsChange}
                className="font-montserrat"
                placeholder="Buscar con el nombre"
              />
              {errors.selectedItems && (
                <p className="mt-1 text-red-500 text-xs font-montserrat font-semibold">
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
                mode="single"
              />
              {errors.dateRange && (
                <p className="mt-1 text-red-500 text-xs font-montserrat font-semibold">
                  Este campo es obligatorio
                </p>
              )}
            </div>

            <div className="p-2 flex flex-col">
              <p className="mb-2 font-montserrat font-semibold">
                Horario en el que se requiere{" "}
                <span className="text-red-500">*</span>
              </p>
              <div className="flex gap-2">
                <div className="font-montserrat">
                  <div className=" bg-white flex select-none font-medium">
                    Desde
                  </div>
                  <TimePicker
                    timeRange={timeRange}
                    setTimeRange={setTimeRange}
                    type="start"
                    className="select-none"
                  />
                  {errors.timeRange && (
                    <p className="mt-1 text-red-500 text-xs font-montserrat font-semibold">
                      Este campo es obligatorio
                    </p>
                  )}
                </div>
              </div>
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

export default RequestMaterial;
