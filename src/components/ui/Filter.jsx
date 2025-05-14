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
        { label : 'Estado del equipo', value: 'status' },
    ],
    reactivos: [
        { label: 'Sticker de disponibilidad', value: 'reagentSticker' },
        { label: 'Presentación de reactivo', value: 'reagentPresentation' },
    ],
    materiales: [
        { label: 'Categoría del material', value: 'materialCategory' },
    ],
    users: [
        { label: 'Rol de usuario', value: 'role' },
        { label: 'Área de trabajo', value: 'workArea', dependsOn: { field: 'role', value: 'tech' } },
    ],
};

const filterValues = {
    // Request
    workArea: [
        { label: 'Laboratorio de Biología Molecular', value: 'Laboratorio de Biología Molecular' },
        { label: 'Laboratorio de Cultivo Celular y Microscopía', value: 'Laboratorio de Cultivo Celular y Microscopía' },
        { label: 'Anexo de Cultivo Celular', value: 'Anexo de Cultivo Celular' },
        { label: 'Laboratorio de Microbiología', value: 'Laboratorio de Microbiología' },
        { label: 'Laboratorio de Cromatografía y Espectrofotometría', value: 'Laboratorio de Cromatografía y Espectrofotometría' },
        { label: 'Laboratorio de Bioprocesos', value: 'Laboratorio de Bioprocesos' },
        { label: 'Laboratorio de Acondicionamiento', value: 'Laboratorio de Acondicionamiento' },
        { label: 'Cámara Fría', value: 'Cámara Fría' },
        { label: 'Bioterio', value: 'Bioterio' },
    ],
    requestStatus: [
        { label: 'Pendiente de aprobación (Jefe de departamento)', value: 'Pendiente de aprobación (Jefe de departamento)' },
        { label: 'Pendiente de aprobación (Técnico)', value: 'Pendiente de aprobación (Técnico)' },
        { label: 'Aprobada por técnico', value: 'Aprobada por técnico' },
        { label: 'Aprobada y notificada', value: 'Aprobada y notificada' },
        { label: 'Rechazada por Técnico', value: 'Rechazada por Técnico' },
        { label: 'Rechazada y notificada', value: 'Rechazada y notificada' },
        { label: 'Cancelada', value: 'Cancelada' },
    ],
    typeOfRequest: [
        { label: 'Equipos', value: 'EQ'},
        { label: 'Reactivos y Materiales', value: 'R&M'},
        { label: 'Apoyo técnico', value: 'TA'},
    ],

    // Equipment
    reservationType: [
        { label: 'Corta duración', value: 'N' },
        { label: 'Media duración', value: 'H' },
        { label: 'Larga duración', value: 'D' },
    ],
    status: [
        { label: 'Disponible', value: 'available' },
        { label: 'En uso', value: 'inUse' },
    ],

    // Reagent
    reagentSticker: [
        { label: 'Baja disponibilidad', value: 4 },
        { label: 'En reserva', value: 1 },
        { label: 'En uso', value: 3 },
        { label: 'Pronto a caducar', value: 2 },
    ],
    reagentPresentation: [
        { label: 'Polvo', value: 'Polvo' },
        { label: 'Líquido', value: 'Líquido' },
        { label: 'Kit', value: 'Kit' },
        { label: 'Tableta', value: 'Tableta' },
        { label: 'Unidades', value: 'Unidades' },
        { label: 'Lentejas', value: 'Lentejas' },
        { label: 'Otros', value: 'Otros' },
    ],
    
    // Material
    materialCategory: [
        { label: 'Material', value: 'Material' },
        { label: 'EPP', value: 'EPP' },
        { label: 'RPBIs', value: 'RPBIs' },
        { label: 'Cristaleria', value: 'Cristaleria' },
        { label: 'Herramienta', value: 'Herramienta' },
        { label: 'Limpieza', value: 'Limpieza' },
        { label: 'Otros', value: 'Otros' },
    ],

    // User
    role: [
        { label: 'Administrador', value: 'Administrator' },
        { label: 'Técnico', value: 'tech' },
        { label: 'Usuario', value: 'user' },
    ],
};

export default function Filter({
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
                className = 'p-2 cursor-pointer'
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
                <div ref = {panelRef} className = 'absolute mt-2 w-150 overflow-auto bg-white border border-gray-300 rounded-md shadow-md p-4 z-10'>
                    {filterOptions[type]?.map((option) => {
                        if (option.dependsOn) {
                            const { field, value } = option.dependsOn;
                            if (!selectedFilters[field]?.includes(value)) {
                                return null;
                            }
                        }
                        
                        return (
                            <div key = {option.value} className = 'mb-4'>
                                <label className = 'block text-montserrat text-sm font-medium mb-2'>
                                    {option.label}
                                </label>
                                <div className = 'grid grid-cols-3 gap-x-4 gap-y-1'>
                                    {filterValues[option.value]?.map((val) => (
                                        <label key = {val.value} className = 'flex items-center gap-2 text-sm'>
                                            <div className = 'relative'>
                                                <input
                                                    type = 'checkbox'
                                                    className = 'sr-only peer'
                                                    checked = {selectedFilters[option.value]?.includes(val.value) || false}
                                                    onChange={(e) => {
                                                        setSelectedFilters((prev) => {
                                                            const current = prev[option.value] || [];
                                                            const updated = e.target.checked
                                                            ? [...current, val.value]
                                                            : current.filter((v) => v !== val.value);
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
                                            <span>{val.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
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
