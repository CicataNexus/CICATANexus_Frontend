import ProductStatusBadge from "@/components/ui/ProductStatusBadge";
import { Icon } from "@iconify/react";

export const MaterialColumns = (handleEdit, selectedProduct) => [
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
    {
        header: "",
        id: "actions",
        cell: ({ row }) => {
            const isSelected =
                selectedProduct?.materialDescription ===
                row.original.materialDescription;
            return (
                <button
                    onClick={() => handleEdit(row.original)}
                    className={`text-black p-1 cursor-pointer transition-transform duration-200 ease-in-out ${
                        isSelected
                            ? "text-popup-background scale-115"
                            : "hover:text-popup-background hover:scale-115"
                    }`}
                    title="Editar producto"
                >
                    <Icon icon="mdi:edit-circle-outline" className="text-2xl" />
                </button>
            );
        },
    },
];
