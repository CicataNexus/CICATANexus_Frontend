import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import FileInput from "@/components/ui/FileInput";
import DateInput from "@/components/ui/DateInput";

export default function AddEquipmentPanel({ onClose }) {
    const [formData, setFormData] = useState({
        inventoryNumber: "",
        equipmentName: "",
        equipmentBrand: "",
        equipmentModel: "",
        equipmentSerialNumber: "",
        equipmentSupplier: "",
        equipmentImage: null,
        invoiceNumber: "",
        dateOfReception: "",
        SICPatRegistered: "",
        vinculatedStrategicProject: "",
        barcode: "",
        location: "",
        observations: "",
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = () => {
        console.log("Nuevo producto:", formData);
        onClose();
    };

    return (
        <div className="flex flex-col gap-4 text-sm text-black font-montserrat">
            {/* Columns Grid */}
            <div className="grid grid-cols-3 divide-x divide-primary-blue">
                {/* Column 1 - Información general */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Información general
                    </h3>
                    {[
                        [
                            "inventoryNumber",
                            "Número de inventario",
                            "Ingrese el número de inventario",
                        ],
                        [
                            "equipmentName",
                            "Nombre del equipo",
                            "Ingrese el nombre del equipo",
                        ],
                        ["equipmentBrand", "Marca", "Ingrese la marca"],
                        ["equipmentModel", "Modelo", "Ingrese el modelo"],
                        [
                            "equipmentSerialNumber",
                            "Número de serie",
                            "Ingrese el número de serie",
                        ],
                        [
                            "equipmentSupplier",
                            "Proveedor",
                            "Ingrese el proveedor",
                        ],
                    ].map(([name, label, placeholder]) => (
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
                    ))}
                    <h4 className="font-montserrat font-semibold">Imagen</h4>
                    <FileInput name="equipmentImage" onChange={handleChange} />
                </div>

                {/* Column 2 - Trazabilidad */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Trazabilidad
                    </h3>
                    <h4 className="font-montserrat font-semibold">
                        Número de factura
                    </h4>
                    <Input
                        name="invoiceNumber"
                        value={formData.invoiceNumber}
                        onChange={handleChange}
                        placeholder="Ingrese el número de factura"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                    <h4 className="font-montserrat font-semibold">
                        Fecha de llegada
                    </h4>
                    <DateInput
                        type="date"
                        name="dateOfReception"
                        value={formData.dateOfReception}
                        onChange={handleChange}
                        placeholder="Ingrese la fecha de llegada dd-mm-aaaa"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                    {[
                        [
                            "SICPatRegistered",
                            "Registro en SICPat",
                            "Ingrese el registro",
                        ],
                        [
                            "vinculatedStrategicProject",
                            "Proyecto estratégico vinculado",
                            "Ingrese el proyecto vinculado",
                        ],
                        [
                            "barcode",
                            "Escanear código de barras",
                            "Haga clic y escanee",
                        ],
                    ].map(([name, label, placeholder]) => (
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
                    ))}
                </div>

                {/* Column 3 - Estado y uso */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Estado y uso
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
                        placeholder="Ingrese observaciones sobre el equipo"
                        className="w-full h-24 rounded-md border border-gray-500 p-2 -mt-1 placeholder:text-xs placeholder:font-montserrat"
                    />
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
