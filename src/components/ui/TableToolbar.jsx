import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@iconify/react";
import Filter from "@/components/ui/Filter";

export default function TableToolbar({
    searchTerm,
    onSearchChange,
    onAddClick,
    type,
}) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const isUsers = type === "users";
    const placeholder = isUsers
        ? "Escriba el nombre o clave de usuario"
        : "Escriba el nombre o escanee el código";
    const buttonText = isUsers ? "Agregar usuario" : "Agregar producto";

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
                {/* Buscador */}
                <div className="relative w-full md:w-[380px]">
                    <Icon
                        icon="material-symbols:search-rounded"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl"
                    />
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent text-sm text-gray-800"
                    />
                </div>
                <Filter onClick={() => setIsFilterOpen(!isFilterOpen)} />
            </div>

            {/* Add button */}
            <Button
                onClick={onAddClick}
                className="bg-deep-blue hover:bg-dark-blue text-white text-sm font-poppins font-semibold py-2 px-4 rounded-md transition inline-flex items-center"
            >
                <Icon icon="ic:round-plus" className="mr-2 text-xl" />
                {buttonText}
            </Button>
        </div>
    );
}
