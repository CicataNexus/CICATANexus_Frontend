import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { showToast } from "@/utils/toastUtils";
import ModalMovementConfirmation from "@/components/ModalMovementConfirmation";

export default function MovementsDetailsPanel({ request, onClose, setReload, }) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const {
        bookerName,
        bookerRegistrationNumber,
        startingDate,
        startingTime,
        workArea,
        equipment,
    } = request;

    const handleConfirm = async () => {
        try {
            const currentStatus = request.equipment?.status;

            if (!currentStatus || !["inUse", "available"].includes(currentStatus)) {
                console.warn("Estado no válido para cambiar:", currentStatus);
                return;
            }

            const newStatus = currentStatus === "inUse" ? "available" : "inUse";

            const response = await fetch(
                `http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/v1/equipment/barcode/${request.equipment.barcode}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: newStatus }),
                }
            );

            if (!response.ok) {
                throw new Error("Error al actualizar el estado del equipo");
            } else {
                showToast("Estado actualizado correctamente", "success");
                onClose();
                setTimeout(() => {
                    setReload((prev) => !prev);
                }, 0);
            }
        } catch (error) {
            console.error("Error al cambiar el estado del equipo:", error);
            showToast("No se pudo actualizar el estado", "error");
        }
    };

    return (
        <>
            {showConfirmation && (
                <ModalMovementConfirmation
                    onClose={() => setShowConfirmation(false)}
                    onChange={handleConfirm}
                />
            )}
            <div className="w-full max-w-4xl flex justify-center py-2 place-self-center">
                <section className ="w-full">
                    <article className="flex flex-col items-center justify-center p-4 w-full max-w-4xl rounded-xl bg-white font-montserrat text-sm shadow-sm">
                        <div className="grid grid-cols-2 w-full gap-4 divide-primary-blue divide-x">
                            <div className="space-y-1.5 p-2">
                                <p className="mb-3">
                                    <strong>Nombre</strong>
                                    <br />
                                    {bookerName}
                                </p>
                                <p className="mb-3">
                                    <strong>Clave de usuario</strong>
                                    <br />
                                    {bookerRegistrationNumber}
                                </p>
                                <p className="mb-3">
                                    <strong>Fecha en que se requiere</strong>
                                    <br />
                                    {startingDate
                                        ? new Date(startingDate).toLocaleDateString(
                                            "es-MX"
                                        )
                                        : "-"}
                                </p>
                                <p className="mb-3">
                                    <strong>Horario en que se requiere</strong>
                                    <br />
                                    {startingTime || "-"}
                                </p>
                                <p className="mb-3">
                                    <strong>Área de trabajo</strong>
                                    <br />
                                    {workArea || "-"}
                                </p>
                            </div>

                            <div className="space-y-1.5 p-2">
                                <p className="mb-3">
                                    <strong>Nombre del equipo</strong>
                                    <br />
                                    {equipment?.name || "-"}
                                </p>
                                <p className="mb-3">
                                    <strong>Marca</strong>
                                    <br />
                                    {equipment?.brand || "-"}
                                </p>
                                <p className="mb-3">
                                    <strong>Modelo</strong>
                                    <br />
                                    {equipment?.model || "-"}
                                </p>
                                <p className="mb-3">
                                    <strong>Ubicación</strong>
                                    <br />
                                    {equipment?.location || "-"}
                                </p>
                                <p className="mb-3">
                                    <strong>Código de barras</strong>
                                    <br />
                                    {equipment?.barcode || "-"}
                                </p>
                                {equipment?.photoID && (
                                    <img
                                        src={`http://${
                                            import.meta.env.VITE_SERVER_IP
                                        }:${
                                            import.meta.env.VITE_SERVER_PORT
                                        }/v1/photo/${equipment.photoID}`}
                                        alt="Foto del equipo"
                                        className="mt-2 mx-auto w-[50%] h-40 object-cover"
                                    />
                                )}
                            </div>
                        </div>
                    </article>
                    <div className="flex justify-end gap-4 pt-4 mb-4">
                        <Button
                            onClick={onClose}
                            className="w-40 bg-gray-300 text-gray-600 hover:opacity-85 font-poppins font-semibold text-base"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => setShowConfirmation(true)}
                            className="w-40 text-white text-base font-poppins font-semibold py-2 text-center cursor-pointer transition bg-sidebar hover:bg-dim-blue-background"
                        >
                            Cambiar estado
                        </Button>
                    </div>
                </section>
            </div>
        </>
    );
}
