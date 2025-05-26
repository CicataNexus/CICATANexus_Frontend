import { useState, useEffect, useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { ROLES } from "@/constants/roles";
import TableToolbar from "../components/ui/TableToolbar";
import RequestsTable from "@/features/admin/requests-mgmt/RequestsTable";
import PaginationControls from "@/components/PaginationControls";
import { RequestsColumns } from "@/features/admin/requests-mgmt/RequestsColumns";
import ModalCancelReqConfirmation from "@/components/ModalCancelReqConfirmation";

const Requests = () => {
    const [reload, setReload] = useState(false);
    const [search, setSearch] = useState("");
    const [activeFilters, setActiveFilters] = useState({});
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalItems, setTotalItems] = useState(0);
    const [type, setType] = useState("");
    const [requestsData, setRequestsData] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [requestToCancel, setRequestToCancel] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const { role, registrationNumber } = jwtDecode(localStorage.getItem("token"));
                const endpoint = role === ROLES.TECH
                    ? `http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/v1/request/technician/${registrationNumber}`
                    : `http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/v1/request`;
                const response = await fetch(endpoint);
                if (!response.ok) throw new Error("Error fetching requests");
                const data = await response.json();

                const requestsArray = data.requests || data;
                const mapped = requestsArray.map((req) => {
                    const startDate = new Date(req.requestDate?.startingDate);
                    const endDate = req.requestDate?.finishingDate ? new Date(req.requestDate.finishingDate) : null;
                    const reservedDays = endDate
                        ? Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24))
                        : null;

                    let reservedHours = null;
                    let reservedMinutes = null;

                    if (req.requestDate?.startingTime && req.requestDate?.finishingTime) {
                        const [startHour, startMin] = req.requestDate.startingTime.split(":").map(Number);
                        const [endHour, endMin] = req.requestDate.finishingTime.split(":").map(Number);
                        const totalMinutes =
                            endHour * 60 + endMin - (startHour * 60 + startMin);
                        reservedHours = Math.floor(totalMinutes / 60);
                        reservedMinutes = totalMinutes % 60;
                    }

                    return {
                        id: req.requestId,
                        typeOfRequest: req.typeOfRequest,
                        requestSubtype: req.requestSubtype,
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
                setTotalItems(data.total || mapped.length);
            } catch (err) {
                console.error("Error fetching requests:", err);
            }
        };

        fetchRequests();
    }, [reload]);

    const normalizeText = (text) =>
        text
            ?.normalize("NFD")
            .replace(/[\u0301\u0300\u0302\u0308\u0304\u0307]/g, "")
            .toLowerCase();

    const searchedItem = normalizeText(search);

    const filteredData = requestsData.filter((request) => {
        const matchesSearch = (() => {
            if (!searchedItem) return true;
        
            const name = request.requestedBy?.name ?? "";
            const regNumber = request.requestedBy?.registrationNumber ?? "";
        
            return (
                normalizeText(name).includes(searchedItem) ||
                normalizeText(regNumber).includes(searchedItem)
            );
        })();

        const matchesFilters = Object.entries(activeFilters).every(([key, values]) => {
            if (!values || values.length === 0) return true;
            return values.includes(request[key]);
        });

        return matchesSearch && matchesFilters;
    });
    

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
                <h2 className="font-poppins text-2xl font-semibold mb-2">
                    Solicitudes de servicio
                </h2>
                <h3 className="font-montserrat text-base font-normal mb-4">
                    Gestione las solicitudes: apruebe, rechace o agregue
                    observaciones según corresponda.
                </h3>
                <TableToolbar
                    type="requests"
                    searchTerm={search}
                    onSearchChange={setSearch}
                    onAddClick={() => {
                        setSelectedRequest(null);
                    }}
                    data={requestsData}
                    onFiltersChange={setActiveFilters}
                />
                {Array.isArray(requestsData) && requestsData.length === 0 ? (
                    <div className="flex items-center justify-center h-[60vh] text-gray-500 font-montserrat text-4xl font-semibold text-center">
                        No hay solicitudes registradas
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="flex items-center justify-center h-[60vh] text-gray-500 font-montserrat text-4xl font-semibold text-center">
                        {search
                            ? `No se encontraron solicitudes para "${search}"`
                            : Object.values(activeFilters).some((arr) => Array.isArray(arr) && arr.length > 0)
                                ? "No se encontraron solicitudes con los filtros aplicados"
                                : "No hay resultados disponibles"
                        }
                    </div>
                ) : (
                    <>
                        <div className="min-h-[400px] flex flex-col justify-between">
                            <RequestsTable
                                data={filteredData}
                                columns={columns}
                                selectedRequest={selectedRequest}
                                onCloseDetails={() => setSelectedRequest(null)}
                                onCancelRequest={handleCancelRequest}
                                setReload={setReload}
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
                    </>
                )}
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
