import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import FileInput from "@/components/ui/FileInput";
import DateInput from "@/components/ui/DateInput";
import { Icon } from "@iconify/react";

export default function AddEquipmentPanel({
    onClose,
    initialData = {},
    isEditing = false,
}) {
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
        ...initialData,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async () => {
        const payload = {
            inventoryNumber: formData.inventoryNumber,
            equipmentName: formData.equipmentName,
            equipmentBrand: formData.equipmentBrand,
            equipmentModel: formData.equipmentModel,
            equipmentSerialNumber: formData.equipmentSerialNumber,
            equipmentSupplier: formData.equipmentSupplier,
            equipmentImage: formData.equipmentImage,
            invoiceNumber: formData.invoiceNumber,
            dateOfReception: formData.dateOfReception,
            SICPatRegistered: formData.SICPatRegistered,
            vinculatedStrategicProject: formData.vinculatedStrategicProject,
            barcode: formData.barcode,
            location: formData.location,
            observations: formData.observations,
            occupiedTime: formData.occupiedTime,
        };

        try {
            const response = await fetch("http://localhost:3000/v1/equipment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Error al agregar el equipo");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-4 text-sm text-black font-montserrat bg-white rounded-xl">
                {/* Columns Grid */}
                <div className="grid grid-cols-3 divide-x divide-primary-blue">
                    {/* Column 1 - Información general */}
                    <fieldset className="space-y-2 p-4">
                        <h2 className="font-poppins font-bold text-base text-center mt-2 mb-2">
                            Información general
                        </h2>
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
                            <label
                                key={name}
                                className="flex flex-col font-montserrat font-semibold"
                            >
                                {label}
                                <Input
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    placeholder={placeholder}
                                    className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                                />
                            </label>
                        ))}
                        <label className="font-montserrat font-semibold">
                            Imagen
                            <FileInput
                                name="equipmentImage"
                                value={formData.equipmentImage}
                                onChange={handleChange}
                                className="placeholder:text-xs placeholder:font-montserrat placeholder:font-normal h-8"
                            />
                        </label>
                    </fieldset>

                    {/* Column 2 - Trazabilidad */}
                    <fieldset className="space-y-2 p-4">
                        <h2 className="font-poppins font-bold text-base text-center mt-2 mb-2">
                            Trazabilidad
                        </h2>
                        <label className="flex flex-col font-montserrat font-semibold">
                            Número de factura
                            <Input
                                name="invoiceNumber"
                                value={formData.invoiceNumber}
                                onChange={handleChange}
                                placeholder="Ingrese el número de factura"
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        <label className="flex flex-col font-montserrat font-semibold">
                            Fecha de llegada
                            <DateInput
                                type="date"
                                name="dateOfReception"
                                value={formData.dateOfReception}
                                onChange={handleChange}
                                placeholder="Ingrese la fecha de llegada dd-mm-aaaa"
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
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
                            <label
                                key={name}
                                className="flex flex-col font-montserrat font-semibold"
                            >
                                {label}
                                <Input
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    placeholder={placeholder}
                                    className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                                />
                            </label>
                        ))}
                    </fieldset>

                    {/* Column 3 - Estado y uso */}
                    <fieldset className="space-y-2 p-4">
                        <h2 className="font-poppins font-bold text-base text-center mt-2 mb-2">
                            Estado y uso
                        </h2>
                        <label className="flex flex-col font-montserrat font-semibold">
                            Ubicación
                            <Input
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Ingrese la ubicación"
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        <label className="flex flex-col font-montserrat font-semibold">
                            Observaciones
                            <textarea
                            name="observations"
                            value={formData.observations}
                            onChange={handleChange}
                            placeholder="Ingrese observaciones sobre el equipo"
                            className="mt-1 w-full h-24 rounded-md border border-gray-500 p-2 placeholder:text-xs placeholder:font-montserrat font-normal"
                        />
                        </label>
                    </fieldset>
                </div>
            </div>

            {/* Buttons */}
            {isEditing ? (
                <div className="flex justify-between pt-4 mb-4">
                    <div className="flex ml-4">
                        <Button
                            className="bg-delete-btn hover:bg-delete-btn-hover text-white text-base font-poppins font-semibold py-2 px-4 rounded-xl transition inline-flex items-center cursor-pointer"
                            onClick={() => console.log("Eliminar producto")}
                        >
                            <Icon
                                icon="ix:trashcan-filled"
                                className="mr-2 text-xl"
                            />
                            Eliminar producto
                        </Button>
                    </div>
                    <div className="flex gap-4 mr-4">
                        <Button
                            onClick={onClose}
                            className="w-40 bg-reject-btn hover:bg-reject-btn-hover text-white text-base font-poppins font-semibold py-2 px-4 rounded-xl transition inline-flex items-center cursor-pointer"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => console.log("Aplicar cambios")}
                            className="w-40 bg-approve-btn hover:bg-approve-btn-hover text-white text-base font-poppins font-semibold py-2 px-4 rounded-xl transition inline-flex items-center cursor-pointer"
                        >
                            Aplicar cambios
                        </Button>
                    </div>
                </div>
            ) : (
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
            )}
        </>
    );
}
