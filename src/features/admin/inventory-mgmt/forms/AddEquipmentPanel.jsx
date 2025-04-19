import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import ModalConfirmation from "@/components/ModalConfirmation";
import FileInput from "@/components/ui/FileInput";
import DateInput from "@/components/ui/DateInput";

export default function AddEquipmentPanel({
    onClose,
    initialData = {},
    isEditing = false,
}) {
    const [modalConfirming, setModalConfirming] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [errors, setErrors] = useState({});
    const requiredFields = [
        "equipmentName",
        "equipmentBrand",
        "equipmentModel",
        "equipmentSerialNumber",
        "equipmentSupplier",
        //"equipmentImage", Uncomment when implementation is ready in backend
        "vinculatedStrategicProject",
        "barcode",
        "reservationType",
        "location",
    ];

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
        reservationType: "",
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

            setErrors((prevErrors) => ({
                // Delete the error for the field being changed
                ...prevErrors,
                [name]: false,
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        requiredFields.forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = true; // Field is empty
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // True if no errors
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return; // Stop submission if validation fails
        }
        const payload = {
            inventoryNumber: String(formData.inventoryNumber),
            equipmentName: String(formData.equipmentName),
            equipmentBrand: String(formData.equipmentBrand),
            equipmentModel: String(formData.equipmentModel),
            equipmentSerialNumber: String(formData.equipmentSerialNumber),
            equipmentSupplier: String(formData.equipmentSupplier),
            equipmentImage: String(formData.equipmentImage),
            invoiceNumber: String(formData.invoiceNumber),
            dateOfReception: formData.dateOfReception
                ? new Date(formData.dateOfReception).toISOString()
                : null,
            SICPatRegistered: String(formData.SICPatRegistered),
            vinculatedStrategicProject: String(
                formData.vinculatedStrategicProject
            ),
            barcode: String(formData.barcode),
            reservationType: String(formData.reservationType),
            location: String(formData.location),
            observations: String(formData.observations),
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
                const errorData = await response.json();
                console.error("Error:", errorData);
                throw new Error("Error al agregar el equipo");
            }
            // If product was added successfully, set confirmation
            setModalConfirming(false);
            setShowConfirmation(true);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/v1/equipment/${formData._id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Error al eliminar el equipo");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            {showConfirmation && (
                <ModalConfirmation
                    onClose={onClose}
                    onDelete={handleDelete}
                    isConfirming={modalConfirming}
                />
            )}

            <div className="flex flex-col gap-4 text-sm text-black font-montserrat bg-white rounded-xl">
                {/* Columns Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-x divide-primary-blue">
                    {/* Column 1 - Información general */}
                    <fieldset className="space-y-2 p-4">
                        <h2 className="font-poppins font-bold text-base text-center mt-2 mb-2">
                            Información general
                        </h2>
                        <label className="flex flex-col font-montserrat font-semibold">
                            Número de inventario
                            <Input
                                name="inventoryNumber"
                                value={formData.inventoryNumber}
                                onChange={handleChange}
                                placeholder="Ingrese el número de inventario"
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        {[
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
                                <span>
                                    {label}{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                                <Input
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    placeholder={placeholder}
                                    required
                                    showError={errors[name]}
                                    errorMessage={"Este campo es obligatorio"}
                                    className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                                />
                            </label>
                        ))}
                        <label className="flex flex-col font-montserrat font-semibold">
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
                                name="dateOfReception"
                                value={formData.dateOfReception}
                                onChange={handleChange}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        <label className="flex flex-col font-montserrat font-semibold">
                            Registro en SICPat
                            <Input
                                name="SICPatRegistered"
                                value={formData.SICPatRegistered}
                                onChange={handleChange}
                                placeholder="Ingrese el registro"
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        {[
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
                                <span>
                                    {label}{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                                <Input
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    placeholder={placeholder}
                                    required
                                    showError={errors[name]}
                                    errorMessage={"Este campo es obligatorio"}
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
                        <span>
                            Duración de la reserva <span className="text-red-500">*</span>
                        </span>
                        <select
                            name="reservationType"
                            value={formData.reservationType}
                            onChange={handleChange}
                            required
                            className={cn(
                                "w-full h-8 mt-1 rounded-md border px-2 font-montserrat font-normal text-xs",
                                errors.reservationType
                                    ? "border-red-500"
                                    : "border-gray-500",
                                formData.reservationType === ""
                                    ? "text-placeholder-text"
                                    : "text-black"
                            )}
                        >
                                <option value="">
                                    Seleccione la duración de uso
                                </option>
                            <option value="N">Corta</option>
                            <option value="H">Media</option>
                            <option value="D">Larga</option>
                        </select>
                        {errors.reservationType && (
                            <span className="text-red-500 text-xs mt-1">
                                Este campo es obligatorio
                            </span>
                        )}
                    </label>
                        <label className="flex flex-col font-montserrat font-semibold">
                            <span>
                                Ubicación{" "}
                                <span className="text-red-500">*</span>
                            </span>
                            <Input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Ingrese la ubicación"
                                required
                                showError={errors.location}
                                errorMessage={"Este campo es obligatorio"}
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
                            onClick={() => {
                                setModalConfirming(true);
                                setShowConfirmation(true);
                            }}
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
