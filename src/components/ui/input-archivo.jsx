import { useState } from "react";
import { Icon } from "@iconify/react";

export default function InputArchivo({ onChange }) {
    const [nombreArchivo, setNombreArchivo] = useState("");

    const handleArchivo = (e) => {
        const archivo = e.target.files?.[0];
        if (archivo) {
            setNombreArchivo(archivo.name);
            onChange?.(e); // si se pasa una función onChange desde fuera
        }
    };

    return (
        <label className="relative flex items-center w-full cursor-pointer">
            <input
                type="file"
                id="input-file"
                accept=".png, .jpg, .jpeg"
                onChange={handleArchivo}
                className="hidden"
            />

            <div className="flex items-center w-full h-8 px-3 py-1 rounded-md border border-input bg-transparent font-montserrat shadow-xs border-gray-500 overflow-hidden whitespace-nowrap text-xs -mt-1">
                <span className="text-muted-foreground truncate">
                    {nombreArchivo || "Selecciona una imagen"}
                </span>

                <div className="ml-auto pl-3 flex-shrink-0">
                    <Icon
                        icon="heroicons-outline:paper-clip"
                        className="text-xl text-dark-blue"
                    />
                </div>
            </div>
        </label>
    );
}
