import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TableToolbar from "../components/ui/TableToolbar";
import InventoryTable from "../features/inventory/InventoryTable";
import { EquipmentColumns } from "../features/inventory/columnas/EquipmentColumns.jsx";
import { MaterialColumns } from "../features/inventory/columnas/MaterialColumns.jsx";
import { ReagentColumns } from "../features/inventory/columnas/ReagentColumns.jsx";
import AddEquipmentPanel from "../features/inventory/forms/AddEquipmentPanel";
import AddMaterialPanel from "../features/inventory/forms/AddMaterialPanel";
import AddReagentPanel from "../features/inventory/forms/AddReagentPanel";
import AddProductPanel from "../features/inventory/AddProductPanel";

const columnsMap = { // For the table columns
    equipos: EquipmentColumns,
    materiales: MaterialColumns,
    reactivos: ReagentColumns,
};

const addPanelMap = { // For the add product panel
    equipos: AddEquipmentPanel,
    materiales: AddMaterialPanel,
    reactivos: AddReagentPanel,
};

const mockData = {
    equipos: [
        {
            inventoryNumber: "P0V000I0602019959500022023",
            equipmentName: "Agitador orbital",
            equipmentBrand: "Thermo Scientific",
            equipmentModel: "MAXQ2000",
            location: "Microbiología",
            status: "inUse", // It has to be registered as inUse or available so the frontend can translate it
        },
        {
            inventoryNumber: "P0V000I1502004520000012023",
            equipmentName: "Autoclave vertical",
            equipmentBrand: "EVAR",
            equipmentModel: "EV-36",
            location: "Acondicionamiento de material",
            status: "available",
        },
    ],
    materiales: [
        {
            // code: "MAT001", might leave it out due to security reasons
            materialDescription: "Agitador de 6X250 mm. K-40500",
            materialCatalog: "K-40500",
            materialBrand: "Labware",
            expirationDate: "N/A",
            location: "L2,L3,AL",
            materialQuantity: 10,
            status: "inUse",
        },
        {
            // code: "MAT002",
            materialDescription: "Guantes de nitrilo talla M",
            materialCatalog: "GN-100",
            materialBrand: "Ansell",
            expirationDate: "2026-12-01",
            location: "L1",
            materialQuantity: 3,
            status: "available",
        },
    ],
    reactivos: [
        {
            reagentCode: "MB1",
            reagentName: "2-Metil-2-Butanol",
            reagentPresentation: "Líquido",
            reagentWeightVolume: "1L",
            reagentBrand: "Sigma Aldrich",
            reagentSticker: "Verde",
            location: "Almacén",
            status: "inUse",
        },
        {
            reagentCode: "HCL01",
            reagentName: "Ácido Clorhídrico",
            reagentPresentation: "Solución",
            reagentWeightVolume: "500ml",
            reagentBrand: "J.T. Baker",
            reagentSticker: "Rojo",
            location: "L2",
            status: "available",
        },
    ],
};

export default function GenericInventory() {
    const { type } = useParams();
    const columns = columnsMap[type];
    const data = mockData[type];

    const [search, setSearch] = useState("");
    const [isAddingMode, setIsAddingMode] = useState(false);

    if (!columns || !data) {
        return (
            <p className="p-4 text-red-600">
                Tipo de inventario no válido: {type}
            </p>
        );
    }

    return (
        <div className="p-4 -mt-1 w-full max-w-full overflow-x-hidden">
            <h2 className="text-poppins text-2xl font-bold mb-2">
                Inventario de {type}
            </h2>
            <h3 className="text-montserrat text-base font-regular mb-4">
                Gestione el inventario: agregue, edite o elimine {type}, y visualice sus detalles.
            </h3>
            <TableToolbar
                type={type}
                searchTerm={search}
                onSearchChange={setSearch}
                onAddClick={() => setIsAddingMode(true)}
            />
            <InventoryTable data={data} columns={columns} />
            {isAddingMode && (
                <AddProductPanel
                    type={type}
                    onClose={() => setIsAddingMode(false)}
                />
            )}
        </div>
    );
}