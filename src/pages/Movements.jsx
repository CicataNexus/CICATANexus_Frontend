import { useState, useEffect, useMemo } from "react";
import TableToolbar from "../components/ui/TableToolbar";
import MovementsTable from "@/features/technician/MovementsTable";
import PaginationControls from "@/components/PaginationControls";
import { MovementsColumns } from "@/features/technician/MovementsColumns";

const Movements = () => {
    const [reload, setReload] = useState(false);
    const [search, setSearch] = useState("");
    const [activeFilters, setActiveFilters] = useState({});
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalItems, setTotalItems] = useState(0);
    const [movementsData, setMovementsData] = useState([]);
    const [selectedMovement, setSelectedMovement] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestResponse = await fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/v1/request`);
                const equipmentResponse = await fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/v1/equipment/basic`);
                const requestData = await requestResponse.json();
                const equipmentData = await equipmentResponse.json();

                if (!requestResponse.ok || !equipmentResponse.ok) {
                    throw new Error("Error al obtener los datos");
                }

                const data = (requestData.requests || requestData)
                .filter((req) => req.typeOfRequest === "EQ")
                .flatMap((req) => {
                    return req.occupiedMaterial.map((mat) => {
                        const equipment = equipmentData.find(eq => eq.barcode === mat.barcode);

                        return {
                            bookerName: req.bookerName || "-",
                            bookerRegistrationNumber: req.bookerRegistrationNumber || "-",
                            startingDate: req.startingDate || "-",
                            startingTime: req.startingTime || "-",
                            workArea: req.workArea || "-",
                            equipment: {
                                name: equipment?.name || "-",
                                brand: equipment?.brand || "-",
                                model: equipment?.model || "-",
                                location: equipment?.location || "-",
                                barcode: equipment?.barcode || "-",
                                status: equipment?.status || "-",
                                photoID: equipment?.photoID || null,
                            },
                        };
                    });
                });

                setMovementsData(data);
            } catch (err) {
                console.error("Error al obtener los datos:", err);
            }
        };

        fetchData();
    }, [reload]);

    const normalizeText = (text) =>
        text
            ?.normalize("NFD")
            .replace(/[\u0301\u0300\u0302\u0308\u0304\u0307]/g, "")
            .toLowerCase();

    const searchedItem = normalizeText(search);

    const filteredData = movementsData.filter((request) => {
        const matchesSearch = (() => {
            if (!searchedItem) return true;
            const bookerName = request.bookerName ?? "";
            const bookerRegistrationNumber = request.bookerRegistrationNumber ?? "";

            return (
                normalizeText(bookerName).includes(searchedItem) ||
                normalizeText(bookerRegistrationNumber).includes(searchedItem)
            );
        })();

        const matchesFilters = Object.entries(activeFilters).every(([key, values]) => {
            if (!values || values.length === 0) return true;
            return values.includes(request[key]);
        });

        return matchesSearch && matchesFilters;
    });
    

    const handleToggleDetails = (request) => {
        setSelectedMovement((prev) =>
            prev === request ? null : request
        );
    };

    const columns = useMemo(
        () => MovementsColumns(handleToggleDetails, selectedMovement),
        [selectedMovement]
    );

    return (
        <>
            <section className="p-4 -mt-1 w-full max-w-full overflow-x-hidden">
                <h2 className="text-poppins text-2xl font-bold mb-2">
                    Registro de movimientos
                </h2>
                <h3 className="text-montserrat text-base font-regular mb-4">
                    Gestione el ingreso y la salida de equipos de manera eficiente.
                </h3>
                <TableToolbar
                    type="movements"
                    searchTerm={search}
                    onSearchChange={setSearch}
                    onAddClick={() => {
                        setSelectedMovement(null);
                    }}
                    data={movementsData}
                    onFiltersChange={setActiveFilters}
                />
                <>
                    <div className="min-h-[500px] flex flex-col justify-between">
                        <MovementsTable
                            data={filteredData}
                            columns={columns}
                            selectedMovement={selectedMovement}
                            onCloseDetails={() => setSelectedMovement(null)}
                            setReload={setReload}
                        />
                    </div>
                    <div className="mt-17">
                        <PaginationControls
                            page={page}
                            setPage={setPage}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                            totalItems={totalItems}
                            type="solicitud"
                        />
                    </div>
                </>
            </section>
        </>
    );
}

export default Movements;