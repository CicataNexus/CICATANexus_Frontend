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

const columnsMap = {
    // For the table columns
    equipos: EquipmentColumns,
    materiales: MaterialColumns,
    reactivos: ReagentColumns,
};

const addPanelMap = {
    // For the add product panel
    equipos: AddEquipmentPanel,
    materiales: AddMaterialPanel,
    reactivos: AddReagentPanel,
};

const apiEndpoints = {
    // For the API endpoints
    equipos: "http://localhost:3000/v1/equipment",
    reactivos: "http://localhost:3000/v1/reagent",
    materiales: "http://localhost:3000/v1/materials",
};

export default function GenericInventory() {
    const { type } = useParams();
    const [search, setSearch] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isAddingMode, setIsAddingMode] = useState(false);

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsAddingMode(false);
    };
    const columns =
        typeof columnsMap[type] === "function"
            ? columnsMap[type](handleEdit, selectedProduct)
            : null; // Get the columns based on the type and pass the handleEdit function

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiEndpoints[type]);
                if (!response.ok) {
                    throw new Error("Error fetching data");
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err);
            }
        };

        fetchData();
    }, [type]);

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
                Gestione el inventario: agregue, edite o elimine {type}, y
                visualice sus detalles.
            </h3>
            <TableToolbar
                type={type}
                searchTerm={search}
                onSearchChange={setSearch}
                onAddClick={() => {setIsAddingMode(true); setSelectedProduct(null);}}
            />
            <InventoryTable 
                data={data} 
                columns={columns}
                selectedProduct={selectedProduct} // Pass selected product to the table
                type={type} // Pass the type to the table
                onCloseEdit={() => setSelectedProduct(null)}
            />
            {isAddingMode && (
                <AddProductPanel
                    type={type}
                    onClose={() => setIsAddingMode(false)}
                />
            )}
        </div>
    );
}
