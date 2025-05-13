import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { showToast } from '@/utils/toastUtils';
import ModalProductConfirmation from "@/components/ModalProductConfirmation";
import FileInput from "@/components/ui/FileInput";
import DateInput from "@/components/ui/DateInput";

export default function AddMaterialPanel({
    onClose,
    initialData = {},
    isEditing = false,
    setReload,
}) {
    const [modalConfirming, setModalConfirming] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [errors, setErrors] = useState({});
    const requiredFields = [
        "materialCategory",
        "materialDescription",
        "materialBrand",
        "materialSupplier",
        "materialCatalog",
        "materialQuantity",
        "materialImage",
        "warehouseUnits",
        "labUnits",
        "l1",
        "l2",
        "l3",
        "l4",
        "l5",
        "l6",
        "cf",
        "tempWarehouseUnits",
        "materialLot",
        "barcode",
        "location",
    ];

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
        verified: "",
        ...initialData,
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox") {
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else if (type === "file") {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            const newValue = name === "barcode" ? value.replace(/\s/g, "") : value;
            
            setFormData((prev) => ({ ...prev, [name]: newValue }));

            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: false,
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        requiredFields.forEach((field) => {
            const value = formData[field];

            const isEmpty = // To make sure that 0 is not considered as empty
                value === "" || value === null || value === undefined;

            if (isEmpty) {
                newErrors[field] = true;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return; // Stop submission if validation fails
        }
        const materialData = {
            materialCategory: String(formData.materialCategory),
            materialDescription: String(formData.materialDescription),
            materialPresentation: String(formData.materialPresentation),
            materialBrand: String(formData.materialBrand),
            materialSupplier: String(formData.materialSupplier),
            materialCatalog: String(formData.materialCatalog),
            materialQuantity: Number(formData.materialQuantity),
            warehouseUnits: Number(formData.warehouseUnits),
            labUnits: Number(formData.labUnits),
            l1: Number(formData.l1),
            l2: Number(formData.l2),
            l3: Number(formData.l3),
            l4: Number(formData.l4),
            l5: Number(formData.l5),
            l6: Number(formData.l6),
            cf: Number(formData.cf),
            tempWarehouseUnits: Number(formData.tempWarehouseUnits),
            materialLot: Number(formData.materialLot), // should be String
            invoiceNumber: String(formData.invoiceNumber),
            dateOfReception: formData.dateOfReception
                ? new Date(formData.dateOfReception).toISOString()
                : null,
            expirationDate: formData.expirationDate
                ? new Date(formData.expirationDate).toISOString()
                : null,
            receivingTemperature: String(formData.receivingTemperature),
            barcode: String(formData.barcode), // should be String
            location: String(formData.location),
            observations: String(formData.observations),
            obsForUsers: String(formData.obsForUsers),
            verified: Boolean(formData.verified),
        };

        const materialFormData = new FormData();
        materialFormData.append("body", JSON.stringify(materialData));
        if (formData.materialImage) {
            materialFormData.append("thumbnail", formData.materialImage);
        }

        try {
            const response = await fetch(
                `http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/v1/materials`,
                {
                    method: "POST",
                    body: materialFormData,
                }
            );

            if (!response.ok) {
                showToast("El código de barras ya está registrado, inténtelo de nuevo", "error");
                throw new Error("Error al agregar el material");
            }
            // If product was added successfully, set confirmation
            setModalConfirming(false);
            setShowConfirmation(true);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleEdit = async () => {
        if (!validateForm()) {
            return;
        }

        const payload = {
            materialCategory: String(formData.materialCategory),
            materialDescription: String(formData.materialDescription),
            materialPresentation: String(formData.materialPresentation),
            materialBrand: String(formData.materialBrand),
            materialSupplier: String(formData.materialSupplier),
            materialCatalog: String(formData.materialCatalog),
            materialQuantity: Number(formData.materialQuantity),
            materialImage: String(formData.materialImage),
            warehouseUnits: Number(formData.warehouseUnits),
            labUnits: Number(formData.labUnits),
            l1: Number(formData.l1),
            l2: Number(formData.l2),
            l3: Number(formData.l3),
            l4: Number(formData.l4),
            l5: Number(formData.l5),
            l6: Number(formData.l6),
            cf: Number(formData.cf),
            tempWarehouseUnits: Number(formData.tempWarehouseUnits),
            materialLot: Number(formData.materialLot),
            invoiceNumber: String(formData.invoiceNumber),
            dateOfReception: formData.dateOfReception
                ? new Date(formData.dateOfReception).toISOString()
                : null,
            expirationDate: formData.expirationDate
                ? new Date(formData.expirationDate).toISOString()
                : null,
            receivingTemperature: String(formData.receivingTemperature),
            barcode: String(formData.barcode),
            location: String(formData.location),
            observations: String(formData.observations),
            obsForUsers: String(formData.obsForUsers),
            verified: Boolean(formData.verified),
        };

        try {
            const response = await fetch(
                `http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/v1/materials/${formData.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error:", errorData);
                throw new Error("Error al editar el material");
            } else {
                showToast("Material editado exitosamente", "success");
                onClose();
                setTimeout(() => {
                    setReload(prev => !prev);
                }, 0);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(
                `http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/v1/materials/${formData.barcode}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Error al eliminar el material");
            } else {
                showToast("Material eliminado exitosamente", "success");
                onClose();
                setTimeout(() => {
                    setReload(prev => !prev);
                }, 0);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            {showConfirmation && (
                <ModalProductConfirmation
                    onClose={() => setShowConfirmation(false)}
                    onDelete={handleDelete}
                    isConfirming={modalConfirming}
                />
            )}

            <div
                className={cn(
                    "flex flex-col gap-4 text-sm text-black font-montserrat bg-white rounded-xl",
                    isEditing && "shadow-sm"
                )}
            >
                {/* Grid de columnas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 divide-x divide-primary-blue">
                    {/* Column 1 - Información general */}
                    <fieldset className="space-y-2 p-4">
                        <h2 className="font-poppins font-bold text-base text-center mt-2 mb-2">
                            Información general
                        </h2>
                        {[
                            [
                                "materialCategory",
                                "Categoría",
                                "Ingrese la categoría",
                            ],
                            [
                                "materialDescription",
                                "Descripción",
                                "Ingrese la descripción",
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
                            Presentación
                            <Input
                                type="text"
                                name="materialPresentation"
                                value={formData.materialPresentation}
                                onChange={handleChange}
                                placeholder="Ingrese la presentación"
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        {[
                            ["materialBrand", "Marca", "Ingrese la marca"],
                            [
                                "materialSupplier",
                                "Proveedor",
                                "Ingrese el proveedor",
                            ],
                            [
                                "materialCatalog",
                                "Catálogo",
                                "Ingrese el catálogo",
                            ],
                            [
                                "materialQuantity",
                                "Cantidad",
                                "Ingrese la cantidad",
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
                                    type={
                                        name === "materialQuantity"
                                            ? "number"
                                            : "text"
                                    }
                                    min={
                                        name === "materialQuantity"
                                            ? 0
                                            : undefined
                                    }
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
                            <span>
                                Imagen <span className="text-red-500">*</span>
                            </span>
                            {isEditing && initialData.photoId ? (
                                <>
                                    <FileInput
                                        name="materialImage"
                                        value={formData.materialImage}
                                        onChange={handleChange}
                                        required
                                        showError={errors.materialImage}
                                        errorMessage={"Este campo es obligatorio"}
                                        className="placeholder:text-xs placeholder:font-montserrat placeholder:font-normal h-8"
                                    />
                                    <img
                                        src={`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/v1/photo/${initialData.photoId}`}
                                        alt="Imagen del material"
                                        className="mt-2 mx-auto w-[50%] h-40 object-cover"
                                    />
                                </>
                            ) : (
                                <FileInput
                                    name="materialImage"
                                    value={formData.materialImage}
                                    onChange={handleChange}
                                    required
                                    showError={errors.materialImage}
                                    errorMessage={"Este campo es obligatorio"}
                                    className="placeholder:text-xs placeholder:font-montserrat placeholder:font-normal h-8"
                                />
                            )}
                        </label>
                    </fieldset>

                    {/* Column 2 - Localización específica */}
                    <fieldset className="space-y-2 p-4">
                        <h2 className="font-poppins font-bold text-base text-center mt-2 mb-2">
                            Localización específica
                        </h2>
                        {[
                            [
                                "warehouseUnits",
                                "Unidades en almacén",
                                "Ingrese las unidades en almacén",
                            ],
                            [
                                "labUnits",
                                "Unidades en laboratorio",
                                "Ingrese las unidades en laboratorio",
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
                                    type="number"
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
                        <div className="grid grid-cols-3 gap-2">
                            {["L1", "L2", "L3", "L4", "L5", "L6"].map(
                                (label) => (
                                    <label key={label}>
                                        <label className="font-montserrat font-semibold">
                                            <span>
                                                {label}{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </span>
                                        </label>
                                        <Input
                                            type="number"
                                            min={0}
                                            name={label.toLowerCase()}
                                            value={
                                                formData[label.toLowerCase()]
                                            }
                                            onChange={handleChange}
                                            placeholder="Ingrese"
                                            required
                                            showError={
                                                errors[label.toLowerCase()]
                                            }
                                            errorMessage={
                                                "Este campo es obligatorio"
                                            }
                                            className="mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                                        />
                                    </label>
                                )
                            )}
                        </div>
                        {[
                            ["cf", "CF", "Ingrese las unidades en CF"],
                            [
                                "tempWarehouseUnits",
                                "Almacén temporal",
                                "Ingrese las unidades en almacén temporal",
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
                                    type="number"
                                    min={0}
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

                    {/* Column 3 - Trazabilidad */}
                    <fieldset className="space-y-2 p-4">
                        <h2 className="font-poppins font-bold text-base text-center  mt-2 mb-2">
                            Trazabilidad
                        </h2>
                        <label className="flex flex-col font-montserrat font-semibold">
                            <span>
                                Lote <span className="text-red-500">*</span>
                            </span>
                            <Input
                                type="number"
                                name="materialLot"
                                value={formData.materialLot}
                                onChange={handleChange}
                                placeholder="Ingrese el lote"
                                required
                                showError={errors.materialLot}
                                errorMessage={"Este campo es obligatorio"}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        {[
                            [
                                "invoiceNumber",
                                "Número de factura",
                                "Ingrese el número de factura",
                            ],
                            ["dateOfReception", "Fecha de llegada"],
                            ["expirationDate", "Fecha de caducidad"],
                            [
                                "receivingTemperature",
                                "Temperatura de recepción",
                                "Ingrese la temperatura",
                            ],
                        ].map(([name, label, placeholder]) =>
                            name === "dateOfReception" ||
                            name === "expirationDate" ? (
                                <label
                                    key={name}
                                    className="flex flex-col font-montserrat font-semibold"
                                >
                                    {label}
                                    <DateInput
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        placeholder={`Ingrese ${label.toLowerCase()}`}
                                        className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                                    />
                                </label>
                            ) : (
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
                            )
                        )}
                        <label className="flex flex-col font-montserrat font-semibold">
                            {isEditing ? (
                                <>
                                    <span>Código de barras</span>
                                    <p className="font-montserrat font-normal">
                                        {formData.barcode}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <span>
                                        Escanear código de barras{" "}
                                        <span className="text-red-500">*</span>
                                    </span>
                                    <Input
                                        name="barcode"
                                        value={formData.barcode}
                                        onChange={handleChange}
                                        placeholder="Haga clic y escanee"
                                        required
                                        showError={errors.barcode}
                                        errorMessage={"Este campo es obligatorio"}
                                        className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                                    />
                                </>
                            )}
                        </label>
                    </fieldset>

                    {/* Column 4 - Estado y verificación */}
                    <fieldset className="space-y-2 p-4">
                        <h2 className="font-poppins font-bold text-base text-center mt-2 mb-2">
                            Estado y verificación
                        </h2>
                        <label className="flex flex-col font-montserrat font-semibold">
                            <span>
                                Ubicación{" "}
                                <span className="text-red-500">*</span>
                            </span>
                            <Input
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
                                placeholder="Ingrese las observaciones"
                                className="w-full h-20 rounded-md border border-gray-500 p-2 mt-1 font-normal placeholder:text-xs placeholder:font-montserrat placeholder:font-normal placeholder:text-placeholder-text focus:outline-none focus:ring-1 focus:ring-primary-blue focus:border-transparent focus:bg-input-background"
                            />
                        </label>
                        <label className="flex flex-col font-montserrat font-semibold">
                            Observaciones para usuarios
                            <textarea
                                name="obsForUsers"
                                value={formData.obsForUsers}
                                onChange={handleChange}
                                placeholder="Ingrese las observaciones para los usuarios"
                                className="w-full h-20 rounded-md border border-gray-500 p-2 mt-1 font-normal placeholder:text-xs placeholder:font-montserrat placeholder:font-normal placeholder:text-placeholder-text focus:outline-none focus:ring-1 focus:ring-primary-blue focus:border-transparent focus:bg-input-background"
                            />
                        </label>
                        <label className="flex items-center font-montserrat font-semibold gap-2">
                            Verificado
                            <input
                                type="checkbox"
                                name="verified"
                                checked={formData.verified}
                                onChange={handleChange}
                                className="h-4 w-4"
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
                            className="bg-delete-btn hover:bg-delete-btn-hover text-white text-base font-poppins font-semibold py-2 px-4 transition inline-flex items-center cursor-pointer"
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
                            className="w-40 bg-gray-300 text-gray-600 hover:opacity-85 font-poppins font-semibold text-base"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => handleEdit()}
                            className="w-40 bg-sidebar hover:bg-dim-blue-background text-white text-base font-poppins font-semibold py-2 transition cursor-pointer text-center"
                        >
                            Aplicar cambios
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center gap-4 pt-4 mb-4">
                    <Button
                        onClick={onClose}
                        className="w-40 bg-gray-300 text-gray-600 hover:opacity-85 font-poppins font-semibold text-lg"
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
