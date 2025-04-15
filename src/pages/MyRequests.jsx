import { useState, useMemo } from "react";
import Header from "@/components/requestsComponents/Header";
import Request from "@/components/requestsComponents/Request";
import { IoMdClose } from "react-icons/io";
import MyRequestsTable from "@/features/user/my-requests/MyRequestsTable";
import { MyRequestsColumns } from "@/features/user/my-requests/MyRequestsColumns";

const solicitudes = [
    { type: "Equipo", date: "01/03/2025", status: "inProgress", id: 1 },
    { type: "Equipo", date: "28/02/2025", status: "inProgress", id: 2 },
    { type: "Material", date: "15/02/2025", status: "approved", id: 3 },
    { type: "Reactivo", date: "02/02/2025", status: "rejected", id: 4 },
    { type: "Reactivo", date: "02/02/2025", status: "rejected", id: 5 },
];

const MyRequests = () => {
    const [selectedRequest, setSelectedRequest] = useState(null);

    const handleToggleDetails = (request) => {
        if (selectedRequest?.id === request.id) {
            setSelectedRequest(null);
        } else {
            setSelectedRequest(request);
        }
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
            <main className="p-15 -mt-1 w-full max-w-full overflow-x-hidden">
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
                />
            </main>
        </>
    );
};

export default MyRequests;
