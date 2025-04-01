import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileInput from "@/components/ui/FileInput";
import DateInput from "@/components/ui/DateInput";

export default function PanelAgregarMaterial({ onClose }) {
    const [formData, setFormData] = useState({
        materialCategory: "",
        materialDescription: "",
        materialPresentation: "",
        materialBrand: "",
        materialSupplier: "",
        materialCatalog: "",
        materialQuantity: "",
        materialImage: null,
        warehouseUnits: "",
        labUnits: "",
        l1: "",
        l2: "",
        l3: "",
        l4: "",
        l5: "",
        l6: "",
        cf: "",
        tempWarehouseUnits: "",
        materialLot: "",
        invoiceNumber: "",
        dateOfReception: "",
        expirationDate: "",
        receivingTemperature: "",
        barcode: "",
        location: "",
        observations: "",
        obsForUsers: "",
        verified: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox") {
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else if (type === "file") {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = () => {
        console.log("Nuevo material:", formData);
        onClose();
    };

    return (
        <div className="flex flex-col gap-4 text-sm text-black font-montserrat w-full">
            {/* Grid de columnas */}
            <div className="grid grid-cols-4 divide-x divide-primary-blue w-full">
                {/* Column 1 - Información general */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Información general
                    </h3>
                    {[
                        ["materialCategory", "Categoría", "Ingrese la categoría"],
                        ["materialDescription", "Descripción", "Ingrese la descripción"],
                        ["materialPresentation", "Presentación", "Ingrese la presentación"],
                        ["materialBrand", "Marca", "Ingrese la marca"],
                        ["materialSupplier", "Proveedor", "Ingrese el proveedor"],
                        ["materialCatalog", "Catálogo", "Ingrese el catálogo"],
                        ["materialQuantity", "Cantidad", "Ingrese la cantidad"],
                    ].map(([name, label, placeholder]) => (
                        <div key={name}>
                            <h4 className="font-montserrat font-semibold">
                                {label}
                            </h4>
                            <Input
                                type={name === "materialQuantity" ? "number" : "text"}
                                min={name === "materialQuantity" ? 0 : undefined}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                placeholder={placeholder}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                            />
                        </div>
                    ))}
                    <h4 className="font-montserrat font-semibold">Imagen</h4>
                    <FileInput name="materialImage" onChange={handleChange} />
                </div>

                {/* Column 2 - Localización específica */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Localización específica
                    </h3>
                    {[
                        ["warehouseUnits", "Unidades en almacén", "Ingrese las unidades en almacén"],
                        ["labUnits", "Unidades en laboratorio", "Ingrese las unidades en laboratorio"],
                    ].map(([name, label, placeholder]) => (
                        <div key={name}>
                            <h4 className="font-montserrat font-semibold">
                                {label}
                            </h4>
                            <Input
                                type="number"
                                min={0}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                placeholder={placeholder}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                            />
                        </div>
                    ))}
                    <div className="grid grid-cols-3 gap-2">
                        {["L1", "L2", "L3", "L4", "L5", "L6"].map((label) => (
                            <div key={label}>
                                <h4 className="font-montserrat font-semibold">
                                    {label}
                                </h4>
                                <Input
                                    type="number"
                                    min={0}
                                    name={label.toLowerCase()}
                                    value={formData[label.toLowerCase()]}
                                    onChange={handleChange}
                                    placeholder="Ingrese"
                                    className="mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                                />
                            </div>
                        ))}
                    </div>
                    {[
                        ["cf", "CF", "Ingrese las unidades en CF"],
                        ["tempWarehouseUnits", "Almacén temporal", "Ingrese las unidades en almacén temporal"],
                    ].map(([name, label, placeholder]) => (
                        <div key={name}>
                            <h4 className="font-montserrat font-semibold">
                                {label}
                            </h4>
                            <Input
                                type="number"
                                min={0}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                placeholder={placeholder}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                            />
                        </div>
                    ))}
                </div>

                {/* Column 3 - Trazabilidad */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Trazabilidad
                    </h3>
                    {[
                        ["materialLot", "Lote", "Ingrese el lote"],
                        ["invoiceNumber", "Número de factura", "Ingrese el número de factura"],
                        ["dateOfReception", "Fecha de llegada"],
                        ["expirationDate", "Fecha de caducidad"],
                        ["receivingTemperature", "Temperatura de recepción", "Ingrese la temperatura"],
                        ["barcode", "Escanear código de barras", "Haga clic y escanee"]
                    ].map(([name, label, placeholder]) =>
                        name === "dateOfReception" || name === "expirationDate" ? (
                            <div key={name}>
                                <h4 className="font-montserrat font-semibold">
                                    {label}
                                </h4>
                                <DateInput
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    placeholder={`Ingrese ${label.toLowerCase()}`}
                                    className="mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                                />
                            </div>
                        ) : (
                            <div key={name}>
                                <h4 className="font-montserrat font-semibold">
                                    {label}
                                </h4>
                                <Input
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    placeholder={placeholder}
                                    className="mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                                />
                            </div>
                        )
                    )}
                </div>

                {/* Column 4 - Estado y verificación */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Estado y verificación
                    </h3>
                    <h4 className="font-montserrat font-semibold">Ubicación</h4>
                    <Input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Ingrese la ubicación"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                    <h4 className="font-montserrat font-semibold">
                        Observaciones
                    </h4>
                    <textarea
                        name="observations"
                        value={formData.observations}
                        onChange={handleChange}
                        placeholder="Ingrese las observaciones"
                        className="w-full h-20 rounded-md border border-gray-500 p-2 -mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:text-placeholder-text"
                    />
                    <h4 className="font-montserrat font-semibold">
                        Observaciones para usuarios
                    </h4>
                    <textarea
                        name="obsForUsers"
                        value={formData.obsForUsers}
                        onChange={handleChange}
                        placeholder="Ingrese las observaciones para los usuarios"
                        className="w-full h-20 rounded-md border border-gray-500 p-2 -mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:text-placeholder-text"
                    />
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="verified"
                            onChange={handleChange}
                            className="h-4 w-4"
                        />
                        <label className="font-montserrat font-semibold">
                            Verificado
                        </label>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 pt-4 mb-4">
                <Button
                    onClick={onClose}
                    className="w-40 bg-reject-btn hover:bg-reject-btn-hover text-white font-poppins font-semibold text-lg"
                >
                    Cancelar
                </Button>
                <Button
                    onClick={handleSubmit}
                    className="w-40 bg-sidebar hover:bg-dim-blue-background text-white font-poppins font-semibold text-lg"
                >
                    Agregar
                </Button>
            </div>
        </div>
    );
}
