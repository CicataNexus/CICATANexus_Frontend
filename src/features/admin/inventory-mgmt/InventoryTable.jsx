import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";
import { Fragment } from "react";
import AddEquipmentPanel from "./forms/AddEquipmentPanel";
import AddReagentPanel from "./forms/AddReagentPanel";
import AddMaterialPanel from "./forms/AddMaterialPanel";
import PaginationControls from "@/components/PaginationControls";

const panelMap = {
    equipos: AddEquipmentPanel,
    reactivos: AddReagentPanel,
    materiales: AddMaterialPanel,
};

export default function InventoryTable({
    data,
    columns,
    selectedProduct,
    type,
    onCloseEdit,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalItems,
}) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const PanelComponent = panelMap[type];

    const getProductId = (product) => {
        if (type === "equipos") return product.barcode;
        if (type === "reactivos") return product.barcode;
        if (type === "materiales") return product.barcode;
        return null;
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto rounded-xl overflow-hidden font-poppins border-separate border-spacing-y-1.5">
                <thead className="bg-dark-blue text-white text-lg">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="p-5 text-center font-semibold break-words whitespace-normal min-w-[100px] max-w-[180px]"
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <Fragment key={row.id}>
                            <tr
                                key={row.id}
                                className="bg-table-row border-b border-sidebar-border hover:bg-table-row-hover transition"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="p-3 text-black text-center text-sm"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>

                            {selectedProduct && getProductId(selectedProduct) ===
                                getProductId(row.original) && (
                                <tr>
                                    <td colSpan={columns.length}>
                                        {PanelComponent && (
                                        <PanelComponent
                                            initialData={selectedProduct}
                                            onClose={onCloseEdit}
                                            isEditing={true}
                                        />
                                        )}
                                    </td>
                                </tr>
                            )}
                        </Fragment>
                    ))}
                </tbody>
            </table>
            <PaginationControls
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalItems={totalItems}
                type={type}
            />
        </div>
    );
}
