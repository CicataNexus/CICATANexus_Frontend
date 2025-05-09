import { useState } from "react";
import ModalDeclineReqConfirmation from "@/components/ModalDeclineReqConfirmation";
import { Button } from "@/components/ui/button";
import { showToast } from '@/utils/toastUtils';
import { Icon } from "@iconify/react";
import { jwtDecode } from "jwt-decode";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import SelectInput from "@/components/ui/SelectInput";


export default function RequestDetailsPanel({ request, onClose, setReload }) {
    const [showModal, setShowModal] = useState(false);
    const [modalAction, setModalAction] = useState("approve");
    const {
        requestedBy,
        assignedTechnician,
        workArea,
        typeOfRequest,
        requestSubtype,
        requestDate,
        observations,
        requestStatus,
        occupiedMaterial,
    } = request;

    const requestedDate = 
        requestDate?.startingDate && requestDate?.finishingDate
            ? `${new Date(requestDate.startingDate).toLocaleDateString()} - ${new Date(requestDate.finishingDate).toLocaleDateString()}`
            : `${new Date(requestDate.startingDate).toLocaleDateString()}`;
    const requestedTime =
        requestDate?.startingTime && requestDate?.finishingTime
            ? `${requestDate.startingTime} - ${requestDate.finishingTime}`
            : `${requestDate.startingTime}`;

    const getObservationText = () => {
        const obsText = document.getElementById("observation")?.value || "";
        return obsText.trim();
    };

    const { role } = jwtDecode(localStorage.getItem("token"));

    const visibleStatesByRole = {
        Administrator: ["Pendiente de aprobación (Jefe de departamento)", "Aprobada por técnico"],
        tech: ["Pendiente de aprobación (Técnico)"],
    };
    
    const showActionButtons = visibleStatesByRole[role]?.includes(requestStatus) ?? false;

    const handleAprove = async () => {
        const { registrationNumber, role } = jwtDecode(localStorage.getItem("token"));
        let nextStatus = null;
    
        if (role === "Administrator" && requestStatus === "Pendiente de aprobación (Jefe de departamento)") {
            nextStatus = "Pendiente de aprobación (Técnico)";
        } else if (role === "tech" && requestStatus === "Pendiente de aprobación (Técnico)") {
            nextStatus = "Aprobada por técnico";
        } else if (role === "Administrator" && requestStatus === "Aprobada por técnico") {
            nextStatus = "Aprobada y notificada";
        } else {
            console.warn("No se puede aprobar en este estado con este rol.");
            return;
        }
    
        try {
            const response = await fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/v1/request/admin-action/${request.id}`, 
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    registrationNumber,
                    requestStatus: nextStatus,
                    observations: getObservationText(),
                }),
            });

            if (!response.ok) {
                throw new Error("Error approving request");
            }
            setReload(prev => !prev);
        } catch (error) {
            console.error("Error approving request:", error);
        }
    };    

    const handleReject = async () => {
        const { registrationNumber, role } = jwtDecode(localStorage.getItem("token"));
        let nextStatus = null;
    
        if (role === "Administrator" && (requestStatus === "Pendiente de aprobación (Jefe de departamento)" || requestStatus === "Aprobada por técnico")) {
            nextStatus = "Rechazada y notificada";
        } else if (role === "tech" && requestStatus === "Pendiente de aprobación (Técnico)") {
            nextStatus = "Rechazada por Técnico";
        } else {
            console.warn("No se puede rechazar en este estado con este rol.");
            return;
        }
    
        try {
            const response = await fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/v1/request/admin-action/${request.id}`, 
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    registrationNumber,
                    requestStatus: nextStatus,
                    observations: getObservationText(),
                }),
            });

            if (!response.ok) {
                throw new Error("Error rejecting request");
            }
            setReload(prev => !prev);
        } catch (error) {
            console.error("Error rejecting request:", error);
        }
    };

    return (
        <>
            {showModal && (
                <ModalDeclineReqConfirmation
                    isVisible={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={async () => {
                        setShowModal(false);
                        if (modalAction === "approve") {
                            await handleAprove();
                            showToast("La solicitud se aprobó correctamente", "success");
                        } else {
                            await handleReject();
                            showToast("La solicitud se rechazó correctamente", "success");
                        }
                        onClose();
                    }}                    
                    action={modalAction}
                />
            )}

            <div className="w-full max-w-4xl flex justify-center py-2 place-self-center">
                <section>
                    <article className="flex flex-col items-center justify-center p-4 w-full max-w-4xl rounded-xl bg-white font-montserrat text-sm shadow-sm">
                        <div className="grid grid-cols-2 w-full gap-4 divide-primary-blue divide-x">
                            <div className="space-y-1.5 p-2">
                                <p className="mb-3">
                                    <strong>Email</strong>
                                    <br />
                                    {requestedBy?.email}
                                </p>
                                <p className="mb-3">
                                    <strong>Nombre</strong>
                                    <br />
                                    {requestedBy?.name}
                                </p>
                                <p className="mb-3">
                                    <strong>Clave de usuario</strong>
                                    <br />
                                    {requestedBy?.registrationNumber}
                                </p>
                                <p className="mb-3">
                                    <strong>Fecha en que se requiere</strong>
                                    <br />
                                    {requestedDate}
                                </p>
                                <p className="mb-3">
                                    <strong>Horario en que se requiere</strong>
                                    <br />
                                    {requestedTime}
                                </p>
                                <p className="mb-3">
                                    <strong>Área de trabajo</strong>
                                    <br />
                                    {workArea}
                                </p>
                                <p className="mb-3">
                                    <strong>Estado de la solicitud</strong>
                                    <br />
                                    {requestStatus}
                                </p>
                            </div>
                            <div className="space-y-1.5 p-2">
                                <p className="mb-3">
                                    <strong>Tipo</strong>
                                    <br />
                                    {typeOfRequest === "EQ"
                                        ? "Equipo"
                                        : typeOfRequest === "R&M"
                                        ? "Reactivo o Material"
                                        : "Asistencia técnica"}
                                </p>
                                <p><strong>Técnico asignado</strong></p>
                                <SelectInput
                                    className="-mt-0.5 w-auto text-xs font-montserrat"
                                    value={assignedTechnician?.id || ""}
                                    onChange={(e) => {
                                        const selectedTechnicianId = e.target.value;
                                        // Aquí guardar el nuevo ID seleccionado (state, post, etc.)
                                        console.log(
                                            "Técnico seleccionado:",
                                            selectedTechnicianId
                                        );
                                        // Tal vez llamar a una función: handleTechnicianChange(selectedTechnicianId)
                                    }}
                                >
                                    {/* Este sería el técnico asignado actualmente */}
                                    {assignedTechnician && (
                                        <option value={assignedTechnician.id}>
                                            {assignedTechnician.name}
                                        </option>
                                    )}

                                    {/* Técnicos disponibles (ejemplo hardcodeado, pero luego será del backend) */}
                                    {/* {availableTechnicians
                                        ?.filter(
                                            (tech) =>
                                                tech.id !== assignedTechnician?.id
                                        )
                                        .map((tech) => (
                                            <option key={tech.id} value={tech.id}>
                                                {tech.name}
                                            </option>
                                        ))} */}
                                </SelectInput>
                                <p className="mb-3 mt-3">
                                    <strong>
                                        {typeOfRequest === "EQ"
                                            ? "Equipo(s) que utilizará"
                                            : typeOfRequest === "R&M"
                                            ? "Reactivo(s) o Material(es) que utilizará"
                                            : "Tipo de apoyo"}
                                    </strong>
                                    <br />
                                    {typeOfRequest === "TA"
                                        ? requestSubtype || "-"
                                        : occupiedMaterial?.length > 0
                                        ? occupiedMaterial
                                            .map((mat) => mat.name)
                                            .join(", ")
                                        : "-"}
                                </p>
                                <p>
                                    <strong>Observaciones</strong>
                                </p>
                                <div className="max-h-32 overflow-y-auto border border-primary-blue rounded-md p-2">
                                    <ul className="flex flex-col gap-2 text-xs font-montserrat">
                                        {observations?.map((obs, index) => {
                                            const isSystemLog =
                                                obs.message.includes(
                                                    "ha iniciado"
                                                ) ||
                                                obs.message.includes(
                                                    "ha aprobado"
                                                ) ||
                                                obs.message.includes(
                                                    "ha rechazado"
                                                );

                                            return (
                                                <li
                                                    key={index}
                                                    className={`rounded-md p-2 ${
                                                        isSystemLog
                                                            ? "bg-gray-100 text-gray-700 italic"
                                                            : "bg-blue-50 text-black"
                                                    }`}
                                                >
                                                    <span className="font-semibold">
                                                        {obs.userName}
                                                    </span>
                                                    : {obs.message}
                                                    <br />
                                                    <span className="text-xs text-gray-500">
                                                        (
                                                        {new Date(
                                                            obs.timestamp
                                                        ).toLocaleString()}
                                                        )
                                                    </span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </article>
                    
                    {showActionButtons && (
                        <section className="mt-3 w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-6 space-y-4">
                            <h2 className="text-base font-semibold font-poppins text-gray-800 border-b border-b-primary-blue pb-2">
                                Revisión de la solicitud
                            </h2>

                            <div className="flex flex-col">
                                <div className="flex items-center gap-1 mb-1">
                                    <label
                                        htmlFor="observation"
                                        className="font-medium text-sm text-gray-700"
                                    >
                                        Observaciones
                                    </label>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button
                                                type="button"
                                                className="text-gray-500 hover:text-primary-blue transition"
                                                aria-label="Información sobre observaciones"
                                            >
                                                <Icon
                                                    icon="mdi:information-outline"
                                                    className="text-base"
                                                />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side="right"
                                            sideOffset={8}
                                            className="bg-white border border-primary-blue text-black rounded-md shadow-lg text-xs font-poppins font-medium w-auto"
                                        >
                                            Este campo es opcional.
                                        </TooltipContent>
                                    </Tooltip>
                                </div>

                                <textarea
                                    id="observation"
                                    className="border border-gray-400 rounded-md p-3 text-sm h-25 focus:outline-none focus:ring-1 focus:ring-primary-blue font-montserrat focus:border-white"
                                    placeholder="Ej. El equipo no requiere calibración extra. Se entrega a las 10:00 AM."
                                />
                            </div>

                            <div className="flex justify-end gap-4 pt-1">
                                <Button 
                                    className="bg-reject-btn hover:bg-reject-btn-hover text-white text-base font-poppins font-semibold transition inline-flex items-center cursor-pointer px-6 py-2 w-32 "
                                    onClick={() => { setModalAction("reject"); setShowModal(true); }}
                                >
                                    Rechazar
                                </Button>
                                <Button 
                                    className="bg-approve-btn hover:bg-approve-btn-hover text-white text-base font-poppins font-semibold transition inline-flex items-center cursor-pointer px-6 py-2 w-32"
                                    onClick={() => { setModalAction("approve"); setShowModal(true); }}
                                >
                                    Aprobar
                                </Button>
                            </div>
                        </section>
                    )}
                </section>
            </div>
        </>
    );
}
