import { mapRequestStatusForUser } from "@/utils/mapRequestStatus";
import { Button } from "@/components/ui/button";
import ModalCancelReqConfirmation from "@/components/ModalCancelReqConfirmation";
import { useState } from "react";

export default function MyRequestDetailsPanel({ request, onCancel }) {
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

    const userStatus = mapRequestStatusForUser(requestStatus);
    const showCancelButton = userStatus === "inProgress";
    const fechaRequiere = requestDate?.startingDate
        ? new Date(requestDate.startingDate).toLocaleDateString()
        : "-";
    const horaRequiere =
        requestDate?.startingTime && requestDate?.finishingTime
            ? `${requestDate.startingTime} - ${requestDate.finishingTime}`
            : "-";

    return (
        <>
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white w-full font-montserrat text-sm ">
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
                            {fechaRequiere}
                        </p>
                        <p className="mb-3">
                            <strong>Horario en que se requiere</strong>
                            <br />
                            {horaRequiere}
                        </p>
                        <p>
                            <strong>Área de trabajo</strong>
                            <br />
                            {workArea}
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
                        <p className="mb-3">
                            <strong>Técnico asignado</strong>
                            <br />
                            {assignedTechnician?.name}
                        </p>
                        <p className="mb-3">
                            <strong>
                                {typeOfRequest === "EQ"
                                    ? "Equipo(s) que utilizará"
                                    : typeOfRequest === "R&M"
                                    ? "Reactivo(s) o Material(es) que utilizará"
                                    : "Tipo de apoyo"}
                            </strong>
                            <br />
                            {typeOfRequest === "TA"
                                ? request.requestSubtype || "-"
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
                                        obs.message.includes("ha iniciado") ||
                                        obs.message.includes("ha aprobado") ||
                                        obs.message.includes("ha rechazado");

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
            </div>

            {showCancelButton && (
                <div className="w-full flex justify-end mt-4 mb-4">
                    <Button
                        onClick={onCancel}
                        className="bg-delete-btn hover:bg-delete-btn-hover text-white text-base font-poppins font-semibold py-2 px-4 rounded-md transition inline-flex items-center cursor-pointer"
                    >
                        Cancelar solicitud
                    </Button>
                </div>
            )}
        </>
    );
}
