import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@iconify/react";

export default function ModalConfirmation({
    onClose,
    onDelete,
    isConfirming = false,
}) {
    const panelRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                onClose();
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                console.log("Escape key pressed");
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-gray backdrop-blur-xs flex items-center justify-center z-50">
            <div 
                ref={panelRef} 
                className="bg-white max-h-[50vh] overflow-y-auto rounded-xl shadow-lg w-[25%] max-w-6xl animate-fade-in p-2"
            >
                <div className="flex flex-col items-center justify-center">
                    <Button
                        onClick={onClose}
                        className="ml-auto"
                    >
                        <Icon
                            icon="mingcute:close-fill"
                            className="text-xl"
                        />
                    </Button>
                </div>
                <div className="flex flex-col items-center justify-center min-h-[25vh]">
                    {isConfirming ? (
                        <>
                            <h2 className="text-center text-2xl font-poppins font-semibold text-gray-800 pt-4 p-10">
                                ¿Seguro que desea eliminar el producto?
                            </h2>
                            <div className="flex justify-center gap-4 pt-4">
                                <Button
                                    onClick={onClose}
                                    className="w-40 bg-reject-btn hover:bg-reject-btn-hover text-white font-poppins font-semibold text-lg"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={onDelete}
                                    className="w-40 bg-approve-btn hover:bg-approve-btn-hover text-white font-poppins font-semibold text-lg"
                                >
                                    Confirmar
                                </Button>
                            </div>
                        </>
                    ) : (
                        <h2 className="text-center text-2xl font-poppins font-semibold text-gray-800 pt-4 p-10">
                            Producto agregado con éxito
                        </h2>
                    )}
                </div>
            </div>
        </div>
    );
};
