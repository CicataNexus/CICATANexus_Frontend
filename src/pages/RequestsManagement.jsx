import { useState, useEffect, useMemo } from "react";
import RequestsTable from "@/features/admin/requests-mgmt/RequestsTable";
import { RequestsColumns } from "@/features/admin/requests-mgmt/RequestsColumns";
import ModalCancelReqConfirmation from "@/components/ModalCancelReqConfirmation";

const Requests = () => {
    const [requestsData, setRequestsData] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [requestToCancel, setRequestToCancel] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch(
                    `http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/v1/request`
                );
                if (!response.ok) throw new Error("Error fetching requests");
                const data = await response.json();

                const mapped = data.map((req) => {
                    const startDate = new Date(req.startingDate);
                    const endDate = new Date(req.finishingDate);
                    const reservedDays = Math.floor(
                        (endDate - startDate) / (1000 * 60 * 60 * 24)
                    );

                    const [startHour, startMin] = req.startingTime
                        .split(":")
                        .map(Number);
                    const [endHour, endMin] = req.finishingTime
                        .split(":")
                        .map(Number);
                    const totalMinutes =
                        endHour * 60 + endMin - (startHour * 60 + startMin);
                    const reservedHours = Math.floor(totalMinutes / 60);
                    const reservedMinutes = totalMinutes % 60;

                    return {
                        id: req.requestId,
                        typeOfRequest: req.typeOfRequest,
                        requestStatus: req.requestStatus,
                        workArea: req.workArea,
                        requestDate: {
                            startingDate: req.startingDate,
                            finishingDate: req.finishingDate,
                            startingTime: req.startingTime,
                            finishingTime: req.finishingTime,
                            reservedDays,
                            reservedHours,
                            reservedMinutes,
                        },
                        requestedBy: {
                            name: req.bookerName,
                            email: req.bookerEmail,
                            registrationNumber: req.bookerRegistrationNumber,
                        },
                        assignedTechnician: {
                            name: req.assignedTechnicianName,
                            email: "", // aún no hay campo para email en el back
                        },
                        occupiedMaterial: req.occupiedMaterial,
                        observations: req.observations,
                    };
                });

                setRequestsData(mapped);
            } catch (err) {
                console.error("Error fetching requests:", err);
            }
        };

        fetchRequests();
    }, []);

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
        () => RequestsColumns(handleToggleDetails, selectedRequest),
        [selectedRequest]
    );

    return (
        <>
            <section className="p-4 -mt-1 w-full max-w-full overflow-x-hidden">
                <h2 className="text-poppins text-2xl font-bold mb-2">
                    Solicitudes de servicio
                </h2>
                <h3 className="text-montserrat text-base font-regular mb-4">
                    Gestione las solicitudes: apruebe, rechace o agregue
                    observaciones según corresponda.
                </h3>
                <RequestsTable
                    data={requestsData}
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
        </>
    );
};

export default Requests;
