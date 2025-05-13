import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TableToolbar from "../components/ui/TableToolbar";
import InventoryTable from "../features/admin/inventory-mgmt/InventoryTable";
import { EquipmentColumns } from "../features/admin/inventory-mgmt/columns/EquipmentColumns.jsx";
import { MaterialColumns } from "../features/admin/inventory-mgmt/columns/MaterialColumns.jsx";
import { ReagentColumns } from "../features/admin/inventory-mgmt/columns/ReagentColumns.jsx";
import AddEquipmentPanel from "../features/admin/inventory-mgmt/forms/AddEquipmentPanel";
import AddMaterialPanel from "../features/admin/inventory-mgmt/forms/AddMaterialPanel";
import AddReagentPanel from "../features/admin/inventory-mgmt/forms/AddReagentPanel";
import AddProductPanel from "../features/admin/inventory-mgmt/AddProductPanel";

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
    equipos: `http://${import.meta.env.VITE_SERVER_IP}:${
        import.meta.env.VITE_SERVER_PORT
    }/v1/equipment`,
    reactivos: `http://${import.meta.env.VITE_SERVER_IP}:${
        import.meta.env.VITE_SERVER_PORT
    }/v1/reagent`,
    materiales: `http://${import.meta.env.VITE_SERVER_IP}:${
        import.meta.env.VITE_SERVER_PORT
    }/v1/materials`,
};

export default function GenericInventory() {
    const { type } = useParams();
    const [search, setSearch] = useState("");
    const [activeFilters, setActiveFilters] = useState({});
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isAddingMode, setIsAddingMode] = useState(false);
    const getProductId = (product, type) => {
        // Function to get the product ID based on the type
        if (!product) return null;
        if (type === "equipos") return product.barcode;
        if (type === "reactivos") return product.barcode;
        if (type === "materiales") return product.barcode;
        return null;
    };

    const handleEdit = (product) => {
        // If the product is already selected, deselect it
        if (
            selectedProduct &&
            getProductId(selectedProduct, type) === getProductId(product, type)
        ) {
            setSelectedProduct(null); // Deselect the product
        } else {
            // Otherwise, select the product
            setSelectedProduct(product);
            setIsAddingMode(false); // Close the add panel if it's open
        }
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
                const product = {
                    equipos: result.equipments,
                    reactivos: result.reagents,
                    materiales: result.materials
                }[type];
                setData(product);
            } catch (err) {
                setError(err);
            }
        };

        if (!isAddingMode && !selectedProduct) {
            fetchData();
        }
    }, [type, reload, isAddingMode, selectedProduct]);

    if (!columns || !data) {
        return (
            <p className="p-4 text-red-600 font-poppins">
                Tipo de inventario no válido: {type}
            </p>
        );
    }

    const normalizeText = (text) =>
        text
            ?.normalize("NFD")
            .replace(/[\u0301\u0300\u0302\u0308\u0304\u0307]/g, "")
            .toLowerCase();

    const searchedItem = normalizeText(search);

    const filteredData = data.filter((item) => {
        const matchesSearch = (() => {
        if (!searchedItem) return true;

            if (type === "equipos") {
                return (
                    normalizeText(item.inventoryNumber).includes(searchedItem) ||
                    normalizeText(item.equipmentName).includes(searchedItem) ||
                    normalizeText(item.equipmentBrand).includes(searchedItem) ||
                    normalizeText(item.equipmentModel).includes(searchedItem) ||
                    normalizeText(item.location).includes(searchedItem) ||
                    item.barcode === search
                );
            }

            if (type === "reactivos") {
                return (
                    normalizeText(item.reagentCode).includes(searchedItem) ||
                    normalizeText(item.reagentName).includes(searchedItem) ||
                    normalizeText(item.reagentBrand).includes(searchedItem) ||
                    normalizeText(item.location).includes(searchedItem) ||
                    item.barcode === search
                );
            }

            if (type === "materiales") {
                return (
                    normalizeText(item.materialDescription).includes(
                        searchedItem
                    ) ||
                    normalizeText(item.materialCatalog).includes(searchedItem) ||
                    normalizeText(item.materialBrand).includes(searchedItem) ||
                    normalizeText(item.location).includes(searchedItem) ||
                    item.barcode === search
                );
            }

            return true;
        })();

        const matchesFilters = Object.entries(activeFilters).every(([key, values]) => {
            if (!values || values.length === 0) return true;
            return values.includes(item[key]);
        });

        return matchesSearch && matchesFilters;
    });

    return (
        <section className="p-4 -mt-1 w-full max-w-full overflow-x-hidden">
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
                onAddClick={() => {
                    setIsAddingMode(true);
                    setSelectedProduct(null);
                }}
                onFiltersChange={setActiveFilters}
            />
            {Array.isArray(data) && data.length === 0 ? (
                <div className="flex items-center justify-center h-[60vh] text-gray-500 font-montserrat text-4xl font-semibold text-center">
                    No hay {type} disponibles en el inventario
                </div>
            ) : filteredData.length === 0 ? (
                <div className="flex items-center justify-center h-[60vh] text-gray-500 font-montserrat text-4xl font-semibold text-center">
                    No se encontraron resultados para "{search}"
                </div>
            ) : (
                <InventoryTable
                    data={filteredData}
                    columns={columns}
                    selectedProduct={selectedProduct} // Pass selected product to the table
                    type={type} // Pass the type to the table
                    onCloseEdit={() => setSelectedProduct(null)}
                />
            )}
            {isAddingMode && (
                <AddProductPanel
                    type={type}
                    onClose={() => setIsAddingMode(false)}
                    selectedProduct={selectedProduct}
                    setReload={setReload}
                />
            )}
        </section>
    );
}
