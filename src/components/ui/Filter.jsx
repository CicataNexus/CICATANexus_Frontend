import { useState } from 'react';
import { Icon } from '@iconify/react';

const filterOptions = {
    requests: [
        { label: 'Área de trabajo', value: 'workArea' },
        { label: 'Estado de solicitud', value: 'requestStatus' },
        { label: 'Tipo de solicitud', value: 'typeOfRequest' },
    ],
    equipment: [
        { label: 'Duración de la reserva', value: 'reservationType' },
        // { label : 'Estado del equipo', value: 'status' }, Uncomment when status is available
    ],
    reagent: [
        { label: 'Fecha de caducidad', value: 'expirationDate' },
        { label: 'Sticker de disponibilidad', value: 'reagentSticker' },
        { label: 'Presencia de reactivo', value: 'reagentPresentation' },
    ],
    material: [
        { label: 'Categoría de material', value: 'materialCategory' },
        { label: 'Fecha de caducidad', key: 'expirationDate' },
        // { label : 'Estado del material', value: 'status' }, Uncomment when status is available
    ],
    user: [
        { label: 'Rol de usuario', value: 'role' },
        { label: 'Área de trabajo', value: 'workArea' },
    ],
};

export default function Filter( {
    type,
    onChange,
}) {
    const [isHovered, setIsHovered]  =  useState(false);
    const [open, setOpen]  =  useState(false);
    const [selectedFilters, setSelectedFilters] = useState({});

    const toggleFilter = (key) => {
        const updated = { ...selectedFilters, [key]: !selectedFilters[key] };
        setSelectedFilters(updated);
        onChange?.(updated);
    };

    return (
        <div className = 'relative'>
            <button
                onClick = {() => setOpen(!open)}
                onMouseEnter = {() => setIsHovered(true)}
                onMouseLeave = {() => setIsHovered(false)}
                className = 'p-2 rounded-md cursor-pointer'
            >
                <Icon
                    icon = {
                        isHovered
                            ? 'flowbite:filter-solid'
                            : 'flowbite:filter-outline'
                    }
                    className = 'text-2xl transition-all duration-200'
                />
            </button>

            {open && (
                <div className = 'absolute top-full mt-2 w-50 bg-white border border-gray-300 rounded-md shadow-md p-4 z-10'>
                    {filterOptions[type]?.map((option) => (
                        <label key = '' className = 'text-sm font-medium mb-2'>
                            {option.label}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
