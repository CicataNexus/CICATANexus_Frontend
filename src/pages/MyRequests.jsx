import { useState, useMemo, useEffect } from "react";
import Header from "@/components/requestsComponents/Header";
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
];

const MyRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [requestToCancel, setRequestToCancel] = useState(null);
  const [page, setPage] = useState(1);
  const [requests, setRequests] = useState([]);
  const matricula = localStorage.getItem("matricula");

  const mapApiResponseToRequiredFormat = (apiResponse) => {
    return apiResponse.map((item) => {
      return {
        id: item.requestId,
        requestStatus: item.requestStatus,
        typeOfRequest: item.typeOfRequest,
        requestSubtype: item.requestSubtype,
        workArea: item.workArea,
        requestDate: {
          startingDate: item.startingDate,
          finishingDate: item.finishingDate,
          startingTime: item.startingTime,
          finishingTime: item.finishingTime,
        },
        requestedBy: {
          name: item.bookerName,
          email: item.bookerEmail,
          registrationNumber: item.bookerRegistrationNumber,
        },
        occupiedMaterial: item.occupiedMaterial,
        assignedTechnician: {
          name: item.assignedTechnicianName,
        },
        observations: item.observations,
      };
    });
  };

  // Example usage with the fetch call:
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${import.meta.env.VITE_SERVER_IP}:${
            import.meta.env.VITE_SERVER_PORT
          }/v1/request/user/${matricula}?${page}&limit=4`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const result = await response.json();

        // Transform the data to match the required format
        const transformedData = mapApiResponseToRequiredFormat(result.requests);
        setRequests(transformedData);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [matricula, page]);

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
    <main className="flex flex-col min-h-screen">
      <Header />
      <section className="p-15 w-full max-w-full overflow-x-hidden bg-background">
        <h2 className="text-poppins text-2xl font-bold mb-2">
          Solicitudes de servicio
        </h2>
        <h3 className="text-montserrat text-base font-regular mb-4">
          Puede cancelar su solicitud en progreso si ya no la requiere.
        </h3>
        <MyRequestsTable
          data={requests}
          columns={columns}
          selectedRequest={selectedRequest}
          onCloseDetails={() => setSelectedRequest(null)}
          onCancelRequest={handleCancelRequest}
        />
      </section>
      {showCancelModal && (
        <ModalCancelReqConfirmation
          onClose={handleCloseCancelModal}
          onConfirmCancel={handleConfirmCancel}
        />
      )}
    </main>
  );
};

export default MyRequests;
