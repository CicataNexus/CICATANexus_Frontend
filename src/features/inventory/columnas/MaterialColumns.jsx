import ProductStatusBadge from "../../../components/ui/ProductStatusBadge";

export const MaterialColumns = [
    // { header: "Código", accessorKey: "materialCode" }, might leave it out due to security reasons
    { header: "Descripción", accessorKey: "materialDescription" },
    { header: "Catálogo", accessorKey: "materialCatalog" },
    { header: "Marca", accessorKey: "materialBrand" },
    { header: "Caducidad", accessorKey: "expirationDate" },
    { header: "Ubicación", accessorKey: "location" },
    { header: "Cantidad", accessorKey: "materialQuantity" },
    {
        header: "Estado",
        accessorKey: "status",
        cell: ({ getValue }) => <ProductStatusBadge status={getValue()} />,
    },
];
