import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/Button";
import { Icon } from '@iconify/react';

const filterOptions = {
    requests: [
        { label: 'Área de trabajo', value: 'workArea' },
        { label: 'Estado de solicitud', value: 'requestStatus' },
        { label: 'Tipo de solicitud', value: 'typeOfRequest' },
    ],
    equipos: [
        { label: 'Duración de la reserva', value: 'reservationType' },
        // { label : 'Estado del equipo', value: 'status' }, Uncomment when status is available
    ],
    reactivos: [
        { label: 'Fecha de caducidad', value: 'expirationDate' },
        { label: 'Sticker de disponibilidad', value: 'reagentSticker' },
        { label: 'Presencia de reactivo', value: 'reagentPresentation' },
    ],
    materiales: [
        { label: 'Categoría de material', value: 'materialCategory' },
        { label: 'Fecha de caducidad', key: 'expirationDate' },
        // { label : 'Estado del material', value: 'status' }, Uncomment when status is available
    ],
    users: [
        { label: 'Rol de usuario', value: 'role' },
        { label: 'Área de trabajo', value: 'workArea' },
    ],
};

const filterValues = {
    // Request
    workArea: ['Biología', 'Química', 'Física'],
    requestStatus: ['Pendiente', 'Aprobada', 'Rechazada'],
    typeOfRequest: ['Equipo', 'Material', 'Reactivo'],

    // Equipment
    reservationType: ['Corta duración', 'Larga duración'],

    // Reagent
    expirationDate: ['Este mes', 'Próximo mes', 'Más de 3 meses'],
    reagentSticker: ['Disponible', 'No disponible'],
    reagentPresentation: ['Líquido', 'Sólido'],
    
    // Material
    materialCategory: ['Vidrio', 'Plástico', 'Papel'],

    // User
    role: ['Admin', 'Técnico', 'Usuario'],
};

export default function Filter( {
    type,
    onClose,
    onChange,
}) {
    const [isHovered, setIsHovered]  =  useState(false);
    const [open, setOpen]  =  useState(false);
    const [selectedFilters, setSelectedFilters] = useState({});

    const panelRef = useRef(null);

    useEffect(() => {
    const handleClickOutside = (event) => {
        if (panelRef.current && !panelRef.current.contains(event.target)) {
            setOpen(false);
            onClose?.();
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setOpen(false);
            onClose?.();
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

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
                <div ref = {panelRef} className = 'absolute top-full mt-2 w-50 bg-white border border-gray-300 rounded-md shadow-md p-4 z-10'>
                    {filterOptions[type]?.map((option) => (
                        <div key = {option.value} className = 'mb-4'>
                            <label className = 'block text-montserrat text-sm font-medium mb-2'>
                                {option.label}
                            </label>
                            <div className = 'flex flex-col gap-1'>
                                {filterValues[option.value]?.map((val) => (
                                    <label key = {val} className = 'flex items-center gap-2 text-sm'>
                                        <div className = 'relative'>
                                            <input
                                                type = 'checkbox'
                                                className = 'sr-only peer'
                                                checked = {selectedFilters[option.value]?.includes(val) || false}
                                                onChange={(e) => {
                                                    setSelectedFilters((prev) => {
                                                        const current = prev[option.value] || [];
                                                        const updated = e.target.checked
                                                        ? [...current, val] // add
                                                        : current.filter((v) => v !== val); // remove
                                                        const newFilters = { ...prev, [option.value]: updated };
                                                        onChange?.(newFilters);
                                                        return newFilters;
                                                    });
                                                }}
                                            />
                                            <div className = 'w-4 h-4 border-2 border-primary-blue rounded-xs peer-checked:bg-primary-blue' />
                                            <svg
                                                className =' absolute top-1/2 left-1/2 w-3.5 h-3.5 text-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden peer-checked:block'
                                                fill = 'none'
                                                stroke = 'currentColor'
                                                strokeWidth = '3'
                                                viewBox = '0 0 24 24'
                                            >
                                                <path
                                                    strokeLinecap = 'round'
                                                    strokeLinejoin = 'round'
                                                    d = 'M5 13l4 4L19 7'
                                                />
                                            </svg>
                                        </div>
                                        <span>{val}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className = 'flex flex-col gap-y-2'>
                        <Button
                            className = 'w-full sm:w-40 bg-sidebar hover:bg-dim-blue-background text-white font-poppins font-semibold text-sm'
                            onClick={() => alert("Se aplicó")}
                        >
                            Aplicar cambios
                        </Button>
                        <Button
                            className = 'w-full sm:w-40 bg-gray-300 text-gray-600 hover:opacity-85 font-poppins font-semibold text-sm'
                            onClick = {() => {
                                setSelectedFilters({});
                                onChange?.({});
                            }}
                        >
                            Borrar filtros
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
