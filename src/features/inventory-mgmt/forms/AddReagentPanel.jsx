import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import ModalConfirmation from "@/components/ModalConfirmation";
import FileInput from "@/components/ui/FileInput";
import DateInput from "@/components/ui/DateInput";

export default function AddReagentPanel({
    onClose,
    initialData = {},
    isEditing = false,
}) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [formData, setFormData] = useState({
        reagentCode: "",
        reagentName: "",
        reagentPresentation: "",
        reagentWeightVolume: "",
        reagentBrand: "",
        reagentCatalog: "",
        reagentSupplier: "",
        reagentImage: null,
        reagentLot: "",
        dateOfReception: "",
        receivingTemperature: "",
        dateOpened: "",
        dateFinished: "",
        expirationDate: "",
        invoiceNumber: "",
        vinculatedStrategicProject: "",
        barcode: "",
        nfpaName: "",
        storageClass: "",
        casNumber: "",
        safetyDataSheet: "",
        sdsLink: "",
        verified: "",
        pictogramImage: null,
        explosive: "",
        oxidizing: "",
        flammable: "",
        corrosive: "",
        toxic: "",
        mutagenicOrCarcinogenic: "",
        irritation: "",
        compressedGases: "",
        healthHazard: "",
        flammability: "",
        reactivity: "",
        contact: "",
        location: "",
        reagentSticker: "",
        observations: "",
        ...initialData,
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

    const handleSubmit = async () => {
        const payload = {
            reagentCode: String(formData.reagentCode),
            reagentName: String(formData.reagentName),
            reagentPresentation: String(formData.reagentPresentation),
            reagentWeightVolume: String(formData.reagentWeightVolume),
            reagentBrand: String(formData.reagentBrand),
            reagentCatalog: String(formData.reagentCatalog),
            reagentSupplier: String(formData.reagentSupplier),
            reagentImage: String(formData.reagentImage),
            reagentLot: String(formData.reagentLot),
            dateOfReception: String(formData.dateOfReception),
            receivingTemperature: String(formData.receivingTemperature),
            dateOpened: String(formData.dateOpened),
            dateFinished: String(formData.dateFinished),
            expirationDate: String(formData.expirationDate),
            invoiceNumber: String(formData.invoiceNumber),
            vinculatedStrategicProject: String(formData.vinculatedStrategicProject),
            barcode: parseInt(formData.barcode, 10),
            nfpaName: String(formData.nfpaName),
            storageClass: String(formData.storageClass),
            casNumber: String(formData.casNumber),
            safetyDataSheet: Boolean(formData.safetyDataSheet),
            sdsLink: String(formData.sdsLink),
            verified: Boolean(formData.verified),
            pictogramImage: String(formData.pictogramImage),
            explosive: parseInt(formData.explosive, 10),
            oxidizing: parseInt(formData.oxidizing, 10),
            flammable: parseInt(formData.flammable, 10),
            corrosive: parseInt(formData.corrosive, 10),
            toxic: parseInt(formData.toxic, 10),
            mutagenicOrCarcinogenic: parseInt(formData.mutagenicOrCarcinogenic, 10),
            irritation: parseInt(formData.irritation, 10),
            compressedGases: parseInt(formData.compressedGases, 10),
            healthHazard: parseInt(formData.healthHazard, 10),
            flammability: parseInt(formData.flammability, 10),
            reactivity: parseInt(formData.reactivity, 10),
            contact: parseInt(formData.contact, 10),
            location: String(formData.location),
            reagentSticker: parseInt(formData.reagentSticker, 10),
            observations: String(formData.observations),
        };

        try {
            const response = await fetch("http://localhost:3000/v1/reagent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error:", errorData);
                throw new Error("Error al agregar el reactivo");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/v1/reagent/${formData._id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Error al eliminar el reactivo");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <>
            {showConfirmation && (
                <ModalConfirmation
                    onClose={onClose}
                    onDelete={handleDelete}
                    isConfirming={true}
                />
            )}

            <div className="flex flex-col gap-4 text-sm text-black font-montserrat bg-white rounded-xl">
                {/* Columns Grid */}
                <div className="grid grid-cols-5 divide-x divide-primary-blue">
                    {/* Column 1 Información general */}
                    <fieldset className="space-y-2 p-4">
                        <h2 className="font-poppins font-bold text-base text-center mt-2 mb-2">
                            Información general
                        </h2>
                        {[
                            ["reagentCode", "Código", "Ingrese el código"],
                            ["reagentName", "Nombre", "Ingrese el nombre"],
                            [
                                "reagentPresentation",
                                "Presentación",
                                "Ingrese la presentación",
                            ],
                            [
                                "reagentWeightVolume",
                                "Peso/Volumen",
                                "Ingrese el peso o volumen",
                            ],
                            ["reagentBrand", "Marca", "Ingrese la marca"],
                            [
                                "reagentCatalog",
                                "Catálogo",
                                "Ingrese el catálogo",
                            ],
                            [
                                "reagentSupplier",
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
                        <label className="flex flex-col font-montserrat font-semibold">
                            Imagen
                            <FileInput
                                name="reagentImage"
                                value={formData.reagentImage}
                                onChange={handleChange}
                                className="placeholder:text-xs placeholder:font-montserrat placeholder:font-normal h-8"
                            />
                        </label>
                    </fieldset>

                    {/* Column 2 Trazabilidad */}
                    <fieldset className="space-y-2 p-4">
                        <h2 className="font-poppins font-bold text-base text-center mt-2 mb-2">
                            Trazabilidad
                        </h2>
                        <label className="flex flex-col font-montserrat font-semibold">
                            Lote
                            <Input
                                name="reagentLot"
                                value={formData.reagentLot}
                                onChange={handleChange}
                                placeholder="Ingrese el lote"
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
                        <label className="flex flex-col font-montserrat font-semibold">
                            Temperatura de recepción
                            <Input
                                name="receivingTemperature"
                                value={formData.receivingTemperature}
                                onChange={handleChange}
                                placeholder="Ingrese la temperatura"
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        {[
                            [
                                "dateOpened",
                                "Fecha de apertura",
                                "Ingrese la fecha de apertura",
                            ],
                            [
                                "dateFinished",
                                "Fecha de término",
                                "Ingrese la fecha de término",
                            ],
                            [
                                "expirationDate",
                                "Fecha de caducidad",
                                "Ingrese la fecha de caducidad",
                            ],
                        ].map(([name, label, placeholder]) => (
                            <label
                                key={name}
                                className="flex flex-col font-montserrat font-semibold"
                            >
                                {label}
                                <DateInput
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    placeholder={placeholder}
                                    className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                                />
                            </label>
                        ))}
                        {[
                            [
                                "invoiceNumber",
                                "Número de factura",
                                "Ingrese el número de factura",
                            ],
                            [
                                "vinculatedStrategicProject",
                                "Proyecto estratégico vinculado",
                                "Ingrese el proyecto vinculado",
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
                                    placeholder={placeholder}
                                    onChange={handleChange}
                                    className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                                />
                            </label>
                        ))}
                        <label className="flex flex-col font-montserrat font-semibold">
                        Escanear código de barras
                            <Input
                                type="number"
                                name="barcode"
                                value={formData.barcode}
                                onChange={handleChange}
                                placeholder="Haga clic y escanee"
                                min="0"
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                    </fieldset>

                    {/* Column 3 Clasificación NFPA */}
                    <fieldset className="space-y-2 p-4">
                        <h2 className="font-poppins font-bold text-base text-center mt-2 mb-2">
                            Clasificación NFPA
                        </h2>
                        {[
                            [
                                "nfpaName",
                                "Nombre NFPA",
                                "Ingrese el nombre NFPA",
                            ],
                            [
                                "storageClass",
                                "Clase de almacenamiento",
                                "Ingrese la clase (TRGS 510)",
                            ],
                            [
                                "casNumber",
                                "Número CAS",
                                "Ingrese el número CAS",
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
                                    placeholder={placeholder}
                                    onChange={handleChange}
                                    className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                                />
                            </label>
                        ))}
                        <label className="flex items-center font-montserrat font-semibold gap-2">
                            Hoja de seguridad
                            <input
                                type="checkbox"
                                name="safetyDataSheet"
                                checked={formData.safetyDataSheet}
                                onChange={handleChange}
                                className="h-4 w-4"
                            />
                        </label>
                        <label className="flex flex-col font-montserrat font-semibold">
                            Enlace de hoja
                            <Input
                                name="sdsLink"
                                value={formData.sdsLink}
                                placeholder="Ingrese el enlace"
                                onChange={handleChange}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
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
                        <label className="font-montserrat font-semibold">
                            Pictograma
                            <FileInput
                                name="pictogramImage"
                                value={formData.pictogramImage}
                                onChange={handleChange}
                                className="placeholder:text-xs placeholder:font-montserrat placeholder:font-normal h-8"
                            />
                        </label>
                    </fieldset>

                    {/* Column 4 Seguridad y riesgos */}
                    <fieldset className="space-y-2 p-4">
                        <h2 className="font-poppins font-bold text-base text-center mt-2 mb-2">
                            Seguridad y riesgos
                        </h2>
                        <label className="flex flex-col font-montserrat font-semibold">
                            Explosivo
                            <Input
                                type="number"
                                name="explosive"
                                value={formData.explosive}
                                onChange={handleChange}
                                placeholder="Ingrese el riesgo"
                                min="0"
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                            </label>
                            <label className="flex flex-col font-montserrat font-semibold">
                            Comburente/Oxidante
                            <Input
                                type="number"
                                name="oxidizing"
                                value={formData.oxidizing}
                                onChange={handleChange}
                                placeholder="Ingrese el riesgo"
                                min="0"
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                            </label>
                            <label className="flex flex-col font-montserrat font-semibold">
                            Inflamable
                            <Input
                                type="number"
                                name="flammable"
                                value={formData.flammable}
                                onChange={handleChange}
                                placeholder="Ingrese el riesgo"
                                min="0"
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                            </label>
                            <label className="flex flex-col font-montserrat font-semibold">
                            Corrosivo
                            <Input
                                type="number"
                                name="corrosive"
                                value={formData.corrosive}
                                onChange={handleChange}
                                placeholder="Ingrese el riesgo"
                                min="0"
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                            </label>
                            <label className="flex flex-col font-montserrat font-semibold">
                            Tóxico
                            <Input
                                type="number"
                                name="toxic"
                                value={formData.toxic}
                                onChange={handleChange}
                                placeholder="Ingrese el riesgo"
                                min="0"
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                            </label>
                            <label className="flex flex-col font-montserrat font-semibold">
                            Mutagénico cancerígeno
                            <Input
                                type="number"
                                name="mutagenicOrCarcinogenic"
                                value={formData.mutagenicOrCarcinogenic}
                                onChange={handleChange}
                                placeholder="Ingrese el riesgo"
                                min="0"
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                            </label>
                            <label className="flex flex-col font-montserrat font-semibold">
                            Irritación cutánea
                            <Input
                                type="number"
                                name="irritation"
                                value={formData.irritation}
                                onChange={handleChange}
                                placeholder="Ingrese el riesgo"
                                min="0"
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                            </label>
                            <label className="flex flex-col font-montserrat font-semibold">
                            Gases comprimidos
                            <Input
                                type="number"
                                name="compressedGases"
                                value={formData.compressedGases}
                                onChange={handleChange}
                                placeholder="Ingrese el riesgo"
                                min="0"
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                            </label>
                        <label className="flex flex-col font-montserrat font-semibold text-health-field">
                            Salud
                            <Input
                                type="number"
                                name="healthHazard"
                                value={formData.healthHazard}
                                placeholder="Ingrese el riesgo"
                                min="0"
                                onChange={handleChange}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        <label className="flex flex-col font-montserrat font-semibold text-flammable-field">
                            Flamable
                            <Input
                                type="number"
                                name="flammability"
                                value={formData.flammability}
                                placeholder="Ingrese el riesgo"
                                min="0"
                                onChange={handleChange}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        <label className="flex flex-col font-montserrat font-semibold text-reactivity-field">
                            Reactividad
                        </label>
                        <Input
                            type="number"
                            name="reactivity"
                            value={formData.reactivity}
                            placeholder="Ingrese el riesgo"
                            min="0"
                            onChange={handleChange}
                            className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                        />
                        <label className="font-montserrat font-semibold">
                            Contacto
                            <Input
                                type="number"
                                name="contact"
                                value={formData.contact}
                                placeholder="Ingrese el riesgo"
                                min="0"
                                onChange={handleChange}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                    </fieldset>

                    {/* Column 5 Estado y uso */}
                    <fieldset className="space-y-2 p-4">
                        <h2 className="font-poppins font-bold text-base text-center mt-2 mb-2">
                            Estado y uso
                        </h2>
                        <label className="flex flex-col font-montserrat font-semibold">
                            Ubicación
                            <Input
                                name="location"
                                value={formData.location}
                                placeholder="Ingrese la ubicación"
                                onChange={handleChange}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        <label className="font-montserrat font-semibold">
                            Sticker
                            <select
                                name="reagentSticker"
                                onChange={handleChange}
                                className={cn(
                                    "w-full h-8 mt-1 rounded-md border border-gray-500 px-2 font-montserrat font-normal text-xs",
                                    formData.reagentSticker === ""
                                        ? "text-placeholder-text"
                                        : "text-black"
                                )}
                            >
                                <option value="">Seleccione el color</option>
                                <option value="3">Verde</option>
                                <option value="2">Azul</option>
                                <option value="1">Amarillo</option>
                                <option value="4">Rojo</option>
                            </select>
                        </label>
                        <lable className="font-montserrat font-semibold">
                            Observaciones
                            <textarea
                                name="observations"
                                value={formData.observations}
                                onChange={handleChange}
                                placeholder="Ingrese observaciones sobre el reactivo"
                                className="w-full h-24 rounded-md border border-gray-500 p-2 mt-1 placeholder:text-xs placeholder:font-montserrat font-normal"
                            />
                        </lable>
                    </fieldset>
                </div>
            </div>

            {/* Buttons */}
            {isEditing ? (
                <div className="flex justify-between pt-4 mb-4">
                    <div className="flex ml-4">
                        <Button
                            className="bg-delete-btn hover:bg-delete-btn-hover text-white text-base font-poppins font-semibold py-2 px-4 rounded-xl transition inline-flex items-center cursor-pointer"
                            onClick={() => setShowConfirmation(true)}
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
