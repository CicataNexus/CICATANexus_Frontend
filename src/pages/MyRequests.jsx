import { useState, useMemo } from "react";
import Header from "@/components/requestsComponents/Header";
import Request from "@/components/requestsComponents/Request";
import { IoMdClose } from "react-icons/io";
import MyRequestsTable from "@/features/user/my-requests/MyRequestsTable";
import { MyRequestsColumns } from "@/features/user/my-requests/MyRequestsColumns";
import ModalCancelReqConfirmation from "@/components/ModalCancelReqConfirmation";

// Dummy data for demonstration purposes
// For implementation, this data would be fetched from API
const solicitudes = [
    {
        id: 1,
        requestStatus: "Pendiente de aprobación (Jefe de departamento)",
        typeOfRequest: "EQ",
        workArea: "Laboratorio de Física",
        requestDate: {
            startingDate: "2025-05-02T00:00:00.000Z",
            finishingDate: "2025-05-02T00:00:00.000Z",
            startingTime: "12:00",
            finishingTime: "13:30",
            reservedDays: 0,
            reservedHours: 1,
            reservedMinutes: 30,
        },
        requestedBy: {
            name: "Juan Pérez",
            email: "juan.perez@cicata.mx",
            registrationNumber: "CUM-U-001",
        },
        occupiedMaterial: [
            { _id: "1", name: "Incubadora de CO2", barcode: "EQ-001" },
            { _id: "2", name: "Microscopio invertido", barcode: "EQ-002" },
            { _id: "3", name: "Campana de bioseguridad", barcode: "EQ-003" },
        ],
        assignedTechnician: {
            name: "Ana Rodríguez",
            email: "ana.rodriguez@cicata.mx",
        },
        observations: [
            {
                userName: "Juan Pérez",
                message:
                    "usuario Juan Pérez ha iniciado la solicitud a las 2025-02-28T09:00:00Z",
                timestamp: "2025-02-28T09:00:00Z",
            },
            {
                userName: "Juan Pérez",
                message:
                    "Necesito los materiales de manera urgente para un experimento con el Dr. Castillo",
                timestamp: "2025-02-28T09:05:00Z",
            },
        ],
    },
    {
        id: 2,
        requestStatus: "Pendiente de aprobación (Técnico)",
        typeOfRequest: "EQ",
        workArea: "Laboratorio de Química",
        requestDate: {
            startingDate: "2025-02-28T00:00:00.000Z",
            finishingDate: "2025-02-28T00:00:00.000Z",
            startingTime: "10:00",
            finishingTime: "12:00",
            reservedDays: 0,
            reservedHours: 2,
            reservedMinutes: 0,
        },
        requestedBy: {
            name: "Laura Gómez",
            email: "laura.gomez@cicata.mx",
            registrationNumber: "CUM-U-002",
        },
        assignedTechnician: {
            name: "Carlos Méndez",
            email: "carlos.mendez@cicata.mx",
        },
        occupiedMaterial: [
            {
                _id: "4",
                name: "Centrífuga de alta velocidad",
                barcode: "EQ-004",
            },
            { _id: "5", name: "Espectrofotómetro UV-Vis", barcode: "EQ-005" },
            { _id: "6", name: "Balanza analítica", barcode: "EQ-006" },
        ],
        observations: [
            {
                userName: "Laura Gómez",
                message:
                    "usuario Laura Gómez ha iniciado la solicitud a las 2025-02-27T11:30:00Z",
                timestamp: "2025-02-27T11:30:00Z",
            },
        ],
    },
    {
        id: 3,
        requestStatus: "Aprobada y notificada",
        typeOfRequest: "R&M",
        workArea: "Laboratorio de Biología",
        requestDate: {
            startingDate: "2025-02-15T00:00:00.000Z",
            finishingDate: "2025-02-15T00:00:00.000Z",
            startingTime: "09:00",
            finishingTime: "11:00",
            reservedDays: 0,
            reservedHours: 2,
            reservedMinutes: 0,
        },
        requestedBy: {
            name: "Miguel Ruiz",
            email: "miguel.ruiz@cicata.mx",
            registrationNumber: "CUM-U-003",
        },
        assignedTechnician: {
            name: "Erika Torres",
            email: "erika.torres@cicata.mx",
        },
        occupiedMaterial: [
            { _id: "7", name: "Yodo", barcode: "RM-001" },
            { _id: "8", name: "Ácido Sulfúrico", barcode: "RM-002" },
            { _id: "9", name: "Agarosa E", barcode: "RM-003" },
        ],
        observations: [
            {
                userName: "Miguel Ruiz",
                message:
                    "usuario Miguel Ruiz ha iniciado la solicitud a las 2025-02-14T10:15:00Z",
                timestamp: "2025-02-14T10:15:00Z",
            },
        ],
    },
    {
        id: 4,
        requestStatus: "Rechazada y notificada",
        typeOfRequest: "R&M",
        workArea: "Laboratorio de Bioquímica",
        requestDate: {
            startingDate: "2025-02-02T00:00:00.000Z",
            finishingDate: "2025-02-02T00:00:00.000Z",
            startingTime: "14:00",
            finishingTime: "15:00",
            reservedDays: 0,
            reservedHours: 1,
            reservedMinutes: 0,
        },
        requestedBy: {
            name: "Andrés Salazar",
            email: "andres.salazar@cicata.mx",
            registrationNumber: "CUM-U-004",
        },
        assignedTechnician: {
            name: "Gabriela Soto",
            email: "gabriela.soto@cicata.mx",
        },
        occupiedMaterial: [
            {
                _id: "10",
                name: "Alcohol etilico 96º Garrafon de 10 L",
                barcode: "M-004",
            },
            {
                _id: "11",
                name: "Bulbo para pipeta pasteur pq con 50",
                barcode: "M-005",
            },
            { _id: "12", name: "Cinta testigo", barcode: "M-006" },
        ],
        observations: [
            {
                userName: "Andrés Salazar",
                message:
                    "usuario Andrés Salazar ha iniciado la solicitud a las 2025-02-01T13:00:00Z",
                timestamp: "2025-02-01T13:00:00Z",
            },
            {
                userName: "Andrés Salazar",
                message: "Revisión solicitada para reactivo vencido",
                timestamp: "2025-02-01T14:00:00Z",
            },
        ],
    },
    {
        id: 5,
        requestStatus: "Cancelada",
        typeOfRequest: "TA",
        requestSubtype: "Acompañamiento de uso de equipos",
        workArea: "Laboratorio de Microbiología",
        requestDate: {
            startingDate: "2025-02-02T00:00:00.000Z",
            finishingDate: "2025-02-02T00:00:00.000Z",
            startingTime: "08:00",
            finishingTime: "09:30",
            reservedDays: 0,
            reservedHours: 1,
            reservedMinutes: 30,
        },
        requestedBy: {
            name: "Carmen Navarro",
            email: "carmen.navarro@cicata.mx",
            registrationNumber: "CUM-U-005",
        },
        assignedTechnician: {
            name: "Iván Hernández",
            email: "ivan.hernandez@cicata.mx",
        },
        observations: [
            {
                userName: "Carmen Navarro",
                message:
                    "usuario Carmen Navarro ha iniciado la solicitud a las 2025-02-01T07:45:00Z",
                timestamp: "2025-02-01T07:45:00Z",
            },
            {
                userName: "Carmen Navarro",
                message: "Solicitud cancelada por duplicado",
                timestamp: "2025-02-01T08:00:00Z",
            },
        ],
    },
];

const MyRequests = () => {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [requestToCancel, setRequestToCancel] = useState(null);


    const handleToggleDetails = (request) => {
        if (selectedRequest?.id === request.id) {
            setSelectedRequest(null);
        } else {
            setSelectedRequest(request);
        }
    };

    const handleCancelRequest = (request) => {
        setRequestToCancel(request);
        setShowCancelModal(true);
    };
    
    const handleConfirmCancel = () => {
        console.log("Request cancelled:", requestToCancel.id);
        setShowCancelModal(false);
        setRequestToCancel(null);
        // Fetch
    };
    
    const handleCloseCancelModal = () => {
        setShowCancelModal(false);
        setRequestToCancel(null);
    };

    const columns = useMemo(
        () => MyRequestsColumns(handleToggleDetails, selectedRequest),
        [selectedRequest]
    );

    return (
        <>
            <div>
                <Header />
            </div>
            <main className="p-15 -mt-1 w-full max-w-full overflow-x-hidden bg-background">
                <h2 className="text-poppins text-2xl font-bold mb-2">
                    Solicitudes de servicio
                </h2>
                <h3 className="text-montserrat text-base font-regular mb-4">
                    Puede cancelar su solicitud en progreso si ya no la
                    requiere.
                </h3>
                <MyRequestsTable
                    data={solicitudes}
                    columns={columns}
                    selectedRequest={selectedRequest}
                    onCloseDetails={() => setSelectedRequest(null)}
                    onCancelRequest={handleCancelRequest}
                />
            </main>
            {showCancelModal && (
                <ModalCancelReqConfirmation
                    onClose={handleCloseCancelModal}
                    onConfirmCancel={handleConfirmCancel}
                />
            )}
        </>
    );
};

export default MyRequests;
