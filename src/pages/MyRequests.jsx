import { useState, useMemo, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Header from "@/components/requestsComponents/Header";
import MyRequestsTable from "@/features/user/my-requests/MyRequestsTable";
import PaginationControls from "@/components/PaginationControls";
import { MyRequestsColumns } from "@/features/user/my-requests/MyRequestsColumns";
import ModalCancelReqConfirmation from "@/components/ModalCancelReqConfirmation";

const MyRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [requestToCancel, setRequestToCancel] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [type, setType] = useState("");
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
        setTotalItems(result.totalItems || result.total || transformedData.length);

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
      <section className="p-10 w-full max-w-full overflow-x-hidden bg-background">
        <h2 className="font-poppins text-2xl font-semibold mb-2">
          Solicitudes de servicio
        </h2>
        <h3 className="font-montserrat text-base font-normal mb-4">
          Puede cancelar su solicitud en progreso si ya no la requiere.
        </h3>
        <div className="min-h-[400px] flex flex-col justify-between">
          <MyRequestsTable
            data={requests}
            columns={columns}
            selectedRequest={selectedRequest}
            onCloseDetails={() => setSelectedRequest(null)}
            onCancelRequest={handleCancelRequest}
          />
        </div>
        <div className="mt-15">
          <PaginationControls
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalItems={totalItems}
            type="solicitud"
          />
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
