import ProductStatusBadge from "../../../components/ui/ProductStatusBadge";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const ReagentColumns = [
    { header: "Código", accessorKey: "reagentCode" },
    { header: "Nombre", accessorKey: "reagentName" },
    { header: "Presentación", accessorKey: "reagentPresentation" },
    { header: "Peso/Volumen", accessorKey: "reagentWeightVolume" },
    { header: "Marca", accessorKey: "reagentBrand" },
    {
        header: "Sticker",
        accessorKey: "reagentSticker",
        cell: ({ row }) => {
            const color = row.getValue("reagentSticker");
            const colorMap = {
                Verde: {
                    colorClass: "bg-in-use-sticker",
                    description: "En uso",
                },
                Rojo: {
                    colorClass: "bg-low-stock-sticker",
                    description: "Baja disponibilidad",
                },
                Amarillo: {
                    colorClass: "bg-reserved-sticker",
                    description: "En reserva",
                },
                Azul: {
                    colorClass: "bg-expiring-soon",
                    description: "Pronto a caducar",
                },
            };

            const colorInfo =  colorMap[color];

            if (!colorInfo) return null;

            return (
                <div className="flex justify-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full cursor-pointer",
                          colorInfo.colorClass
                        )}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="right" align="center" className="bg-white text-black px-2 py-2 rounded-md shadow-lg text-xs font-montserrat">
                      <span className="text-xs">{colorInfo.description}</span>
                    </TooltipContent>
                  </Tooltip>
                </div>
              );
        },
    },
    { header: "Ubicación", accessorKey: "location" },
    {
        header: "Estado",
        accessorKey: "status",
        cell: ({ getValue }) => <ProductStatusBadge status={getValue()} />,
    },
];

