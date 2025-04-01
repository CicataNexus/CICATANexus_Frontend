import ProductStatusBadge from "../../../components/ui/ProductStatusBadge";

export const EquipmentColumns = [
    { header: "No. de inventario", accessorKey: "inventoryNumber" },
    { header: "Nombre", accessorKey: "equipmentName" },
    { header: "Marca", accessorKey: "equipmentBrand" },
    { header: "Modelo", accessorKey: "equipmentModel" },
    { header: "Ubicación", accessorKey: "location" },
    {
        header: "Estado",
        accessorKey: "status",
        cell: ({ getValue }) => <ProductStatusBadge status={getValue()} />,
    },
];