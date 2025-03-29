import EstadoProductoBadge from "../../../components/ui/estado-producto-badge";

export const columnasMateriales = [
    { header: "Código", accessorKey: "codigo" },
    { header: "Descripción", accessorKey: "descripcion" },
    { header: "Catálogo", accessorKey: "catalogo" },
    { header: "Marca", accessorKey: "marca" },
    { header: "Fecha de caducidad", accessorKey: "caducidad" },
    { header: "Ubicación", accessorKey: "ubicacion" },
    { header: "Cantidad disponible", accessorKey: "cantidad" },
    {
        header: "Estado",
        accessorKey: "estado",
        cell: ({ getValue }) => <EstadoProductoBadge estado={getValue()} />,
    },
];
