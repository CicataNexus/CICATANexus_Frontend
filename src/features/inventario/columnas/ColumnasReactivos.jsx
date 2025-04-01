import EstadoProductoBadge from "../../../components/ui/estado-producto-badge";
import { cn } from "@/lib/utils";

export const columnasReactivos = [
    { header: "Código", accessorKey: "codigo" },
    { header: "Nombre", accessorKey: "nombre" },
    { header: "Presentación", accessorKey: "presentacion" },
    { header: "Peso/Volumen", accessorKey: "peso_volumen" },
    { header: "Marca", accessorKey: "marca" },
    { header: "Sticker", accessorKey: "sticker" }, // falta implementar la transformación de texto a circulo con el color
    { header: "Ubicación", accessorKey: "ubicación" },
    {
        header: "Estado",
        accessorKey: "estado",
        cell: ({ getValue }) => <EstadoProductoBadge estado={getValue()} />,
    },
];
