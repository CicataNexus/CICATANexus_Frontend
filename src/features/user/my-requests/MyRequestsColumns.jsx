import MyRequestStatusBadge from "@/components/ui/MyRequestStatusBage";
import { Icon } from "@iconify/react";

export const MyRequestsColumns = (handleToggleDetails, selectedRequest) => [
    { header: "Tipo", accessorKey: "type"},
    { header: "Fecha", accessorKey: "date"},
    {
        header: "Estatus",
        accessorKey: "status",
        cell: ({ getValue }) => <MyRequestStatusBadge status={getValue()} />,
    },
    {
        header: "",
        id: "actions",
        cell: ({ row }) => {
            const isSelected =
                selectedRequest?.id === row.original.id;
            return (
                <button
                    onClick={() => handleToggleDetails(row.original)}
                    className={`text-black p-1 cursor-pointer transition-transform duration-200 ease-in-out ${
                        isSelected
                            ? "text-popup-background scale-115"
                            : "hover:text-popup-background hover:scale-115"
                    }`}
                    title="Ver detalles"
                >
                    <Icon icon="material-symbols:info-outline-rounded" className="text-2xl" />
                </button>
            );
        },
    },
]