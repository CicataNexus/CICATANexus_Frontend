import { useState, useMemo, useEffect } from "react";
import Header from "@/components/requestsComponents/Header";
import MyRequestsTable from "@/features/user/my-requests/MyRequestsTable";
import { MyRequestsColumns } from "@/features/user/my-requests/MyRequestsColumns";
import ModalCancelReqConfirmation from "@/components/ModalCancelReqConfirmation";

const MyRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [requestToCancel, setRequestToCancel] = useState(null);
  const [page, setPage] = useState(1);
  const [requests, setRequests] = useState([]);
  const registrationNumber = jwtDecode(
    localStorage.getItem("token")
  ).registrationNumber;

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
          }/v1/request/user/${registrationNumber}?page=${page}&limit=5`
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
  }, [page]);

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
        <div className="flex w-full justify-between gap-4 pt-5">
          <div className="text-sm">Mostrando 1 a 5 de 40 solicitudes</div>
          <div>
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded disabled:opacity-50"
            >
              &lt;
            </button>
            <span className="self-center px-4 py-3 bg-white rounded-full">
              {page}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 rounded"
            >
              &gt;
            </button>
          </div>
        </div>
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
