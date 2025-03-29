import EstadoProductoBadge from "../../../components/ui/estado-producto-badge";

export const columnasEquipos = [
    { header: "No. de inventario", accessorKey: "no_inventario" },
    { header: "Nombre", accessorKey: "nombre" },
    { header: "Marca", accessorKey: "marca" },
    { header: "Modelo", accessorKey: "modelo" },
    { header: "Ubicación", accessorKey: "ubicacion" },
    {
        header: "Estado",
        accessorKey: "estado",
        cell: ({ getValue }) => <EstadoProductoBadge estado={getValue()} />,
    },
];