import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import { Button } from "@/components/ui/Button";

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
    "Recepción/resguardo de líneas celulares",
];

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
        const isValid =
            dateRange.startDate &&
            dateRange.endDate &&
            selectedOption &&
            timeRange.startTime &&
            timeRange.endTime &&
            (timeRange.reservedHours > 0 || timeRange.reservedMinutes > 0) &&
            selectedAreas.length > 0;

        if (!isValid) {
            alert("Por favor complete todos los campos requeridos.");
            return;
        }

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
            registrationNumber: "CUM-U-042",
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
                        <div className="p-2">
                            <p className="mb-2 font-montserrat font-semibold">
                                Fecha en la que se requiere *
                            </p>
                            <DatePicker
                                startDate={dateRange.startDate}
                                endDate={dateRange.endDate}
                                onChange={setDateRange}
                                mode="range"
                            />
                        </div>
                        <div className="p-2 flex flex-col">
                            <p className="mb-2 font-montserrat font-semibold">
                                Tipo de Apoyo *
                            </p>
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
                                                checked={
                                                    selectedOption === option
                                                }
                                                onChange={() =>
                                                    handleRadioButtonChange(
                                                        option
                                                    )
                                                }
                                                className="peer sr-only"
                                            />
                                            <div className="w-4 h-4 rounded-full border-2 border-primary-blue peer-checked:border-primary-blue peer-checked:bg-primary-blue flex items-center justify-center"></div>
                                            <div className="absolute w-2 h-2 rounded-fullleft-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 peer-checked:block hidden"></div>
                                        </div>
                                        <span>{option}</span>
                                    </label>
                                );
                            })}
                        </div>
                        <div className="p-2 flex flex-col">
                            <p className="mb-2 font-montserrat font-semibold">
                                Horario en el que se requiere *
                            </p>
                            <div className="flex gap-2 font-montserrat">
                                <div className="">
                                    <div className=" bg-white flex select-none">
                                        Desde
                                    </div>
                                    <TimePicker
                                        timeRange={timeRange}
                                        setTimeRange={setTimeRange}
                                        type="start"
                                    />
                                </div>
                                <div className="">
                                    <div className=" bg-white flex select-none">
                                        Hasta
                                    </div>
                                    <TimePicker
                                        timeRange={timeRange}
                                        setTimeRange={setTimeRange}
                                        type="end"
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
                                                        checked={selectedAreas.includes(
                                                            option
                                                        )}
                                                        onChange={() =>
                                                            handleAreaChange(
                                                                option
                                                            )
                                                        }
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
                                                <span className="ml-2">
                                                    {option}
                                                </span>
                                            </label>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="flex flex-col w-full">
                            <label
                                htmlFor="observaciones"
                                className="mb-2 select-none font-montserrat font-semibold"
                            >
                                Observaciones
                            </label>
                            <textarea
                                id="observaciones"
                                className="border border-primary-blue rounded-lg p-2 font-montserrat"
                                value={observations}
                                onChange={handleObservationsChange}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <Button
                        className="bg-deep-blue hover:bg-dark-blue text-white text-lg font-poppins font-semibold p-4 py-6 w-xs"
                        onClick={handleSubmit}
                    >
                        Enviar
                    </Button>
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
