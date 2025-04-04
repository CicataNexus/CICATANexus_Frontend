import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileInput from "@/components/ui/FileInput";
import DateInput from "@/components/ui/DateInput";
import { cn } from "@/lib/utils";

export default function AddReagentPanel({
    onClose,
    initialData = {},
    isEditing = false,
}) {
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
        safetyDataSheet: false,
        sdsLink: "",
        verified: false,
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
            reagentCode: formData.reagentCode,
            reagentName: formData.reagentName,
            reagentPresentation: formData.reagentPresentation,
            reagentWeightVolume: formData.reagentWeightVolume,
            reagentBrand: formData.reagentBrand,
            reagentCatalog: formData.reagentCatalog,
            reagentSupplier: formData.reagentSupplier,
            reagentImage: formData.reagentImage,
            reagentLot: formData.reagentLot,
            dateOfReception: formData.dateOfReception,
            receivingTemperature: formData.receivingTemperature,
            dateOpened: formData.dateOpened,
            dateFinished: formData.dateFinished,
            expirationDate: formData.expirationDate,
            invoiceNumber: formData.invoiceNumber,
            vinculatedStrategicProject: formData.vinculatedStrategicProject,
            barcode: formData.barcode,
            nfpaName: formData.nfpaName,
            storageClass: formData.storageClass,
            casNumber: formData.casNumber,
            safetyDataSheet: formData.safetyDataSheet,
            sdsLink: formData.sdsLink,
            verified: formData.verified,
            pictogramImage: formData.pictogramImage,
            explosive: formData.explosive,
            oxidizing: formData.oxidizing,
            flammable: formData.flammable,
            corrosive: formData.corrosive,
            toxic: formData.toxic,
            mutagenicOrCarcinogenic: formData.mutagenicOrCarcinogenic,
            irritation: formData.irritation,
            compressedGases: formData.compressedGases,
            healthHazard: formData.healthHazard,
            flammability: formData.flammability,
            reactivity: formData.reactivity,
            contact: formData.contact,
            location: formData.location,
            reagentSticker: formData.reagentSticker,
            observations: formData.observations,
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
                throw new Error("Error al agregar el reactivo");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
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
                                className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
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
                                    placeholder={placeholder}
                                    onChange={handleChange}
                                    className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                                />
                            </label>
                        ))}
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
                        {[
                            ["explosive", "Explosivo", "Ingrese el riesgo"],
                            [
                                "oxidizing",
                                "Comburente/Oxidante",
                                "Ingrese el riesgo",
                            ],
                            ["flammable", "Inflamable", "Ingrese el riesgo"],
                            ["corrosive", "Corrosivo", "Ingrese el riesgo"],
                            ["toxic", "Tóxico", "Ingrese el riesgo"],
                            [
                                "mutagenicOrCarcinogenic",
                                "Mutagénico cancerígeno",
                                "Ingrese el riesgo",
                            ],
                            [
                                "irritation",
                                "Irritación cutánea",
                                "Ingrese el riesgo",
                            ],
                            [
                                "compressedGases",
                                "Gases comprimidos",
                                "Ingrese el riesgo",
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
                        <label className="flex flex-col font-montserrat font-semibold text-health-field">
                            Salud
                            <Input
                                name="healthHazard"
                                value={formData.healthHazard}
                                placeholder="Ingrese el riesgo"
                                onChange={handleChange}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        <label className="flex flex-col font-montserrat font-semibold text-flammable-field">
                            Flamable
                            <Input
                                name="flammability"
                                value={formData.flammability}
                                placeholder="Ingrese el riesgo"
                                onChange={handleChange}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        <label className="flex flex-col font-montserrat font-semibold text-reactivity-field">
                            Reactividad
                        </label>
                        <Input
                            name="reactivity"
                            value={formData.reactivity}
                            placeholder="Ingrese el riesgo"
                            onChange={handleChange}
                            className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                        />
                        <label className="font-montserrat font-semibold">
                            Contacto
                            <Input
                                name="contact"
                                value={formData.contact}
                                placeholder="Ingrese el riesgo"
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
                                <option value="Verde">Verde</option>
                                <option value="Rojo">Rojo</option>
                                <option value="Azul">Azul</option>
                                <option value="Amarillo">Amarillo</option>
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
