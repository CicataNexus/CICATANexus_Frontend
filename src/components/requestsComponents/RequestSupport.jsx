import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";

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

const options = [
  "Asesoría técnica",
  "Acompañamiento de uso de equipos",
  "Capacitación de uso de equipos",
  "Esterilización en autoclave",
  "Expansion de lineas celulares",
];

const RequestSupport = () => {
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const [message, setMessage] = useState(false);
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [observations, setObservations] = useState("");

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

  const handleSubmit = () => {
    const isValid =
      dateRange.startDate &&
      dateRange.endDate &&
      selectedOption &&
      startHour &&
      startMinute &&
      endHour &&
      endMinute &&
      selectedAreas.length > 0;

    if (!isValid) {
      alert("Por favor complete todos los campos requeridos.");
      return;
    }

    setMessage(true);
    setSelectedAreas([]);
    setDateRange({ startDate: "", endDate: "" });
    setStartHour("");
    setStartMinute("");
    setEndHour("");
    setEndMinute("");
    setObservations("");
    setSelectedOption("");
  };

  const handleCloseMessage = () => {
    setMessage(false);
  };

  return (
    <div className="relative w-full h-full items-center bg-neutral-100 flex justify-center py-4">
      <div className="w-2/3 h-fit bg-white px-14 py-8 flex flex-col rounded-md shadow-md">
        <div className="text-xl mb-2 text-center">
          Ingrese los datos correspondientes
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <div className="p-2">
              <p className="mb-2">Fecha en la que se requiere *</p>
              <DatePicker
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                onChange={setDateRange}
              />
            </div>
            <div className="p-2 flex flex-col">
              <p className="mb-2">Tipo de Apoyo *</p>
              {options.map((option) => {
                return (
                  <label className="flex items-center" key={option}>
                    <input
                      type="radio"
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => handleRadioButtonChange(option)}
                      className="mr-2 appearance-none border rounded-full checked:bg-primary-blue w-4 h-4 border-primary-blue"
                    />
                    {option}
                  </label>
                );
              })}
            </div>
            <div className="p-2 flex flex-col">
              <p className="mb-2">Horario en el que se requiere *</p>
              <div className="flex gap-2">
                <div className="">
                  <div className=" bg-white flex select-none">Desde</div>
                  <TimePicker
                    hour={startHour}
                    setHour={setStartHour}
                    minute={startMinute}
                    setMinute={setStartMinute}
                  />
                </div>
                <div className="">
                  <div className=" bg-white flex select-none">Hasta</div>
                  <TimePicker
                    hour={endHour}
                    setHour={setEndHour}
                    minute={endMinute}
                    setMinute={setEndMinute}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="p-2">
              <p className="mb-2">Áreas de Trabajo *</p>
              <ul className="">
                {areas.map((option) => {
                  return (
                    <li key={option}>
                      <label className="flex items-center ">
                        <input
                          type="checkbox"
                          className="mr-2 appearance-none border rounded-sm checked:bg-primary-blue w-4 h-4 border-primary-blue"
                          checked={selectedAreas.includes(option)}
                          onChange={() => handleAreaChange(option)}
                        />
                        {option}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="observaciones"
                className="text-gray-700 font-medium mb-2 select-none "
              >
                Observaciones
              </label>
              <textarea
                id="observaciones"
                className="border border-primary-blue rounded-lg p-2"
                value={observations}
                onChange={handleObservationsChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <button
            className="bg-deep-blue text-white rounded-lg p-4"
            onClick={handleSubmit}
          >
            Enviar
          </button>
        </div>
      </div>
      {message && (
        <div className="h-full w-full absolute backdrop-blur-sm bg-black/50 flex text-center justify-center items-center">
          <div className="relative bg-green-100 p-30 text-2xl rounded-3xl">
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

export default RequestSupport;
