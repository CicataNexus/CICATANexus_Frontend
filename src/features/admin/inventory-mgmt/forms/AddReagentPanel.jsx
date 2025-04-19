import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import ModalProductConfirmation from "@/components/ModalProductConfirmation";
import FileInput from "@/components/ui/FileInput";
import DateInput from "@/components/ui/DateInput";
import SelectInput from "@/components/ui/SelectInput";

export default function AddReagentPanel({
    onClose,
    initialData = {},
    isEditing = false,
}) {
    const [modalConfirming, setModalConfirming] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [errors, setErrors] = useState({});
    const requiredFields = [
        "reagentCode",
        "reagentName",
        "reagentPresentation",
        "reagentWeightVolume",
        "reagentBrand",
        "reagentCatalog",
        "reagentSupplier",
        // "reagentImage", Uncomment when implementation is ready in backend
        "reagentLot",
        "dateOfReception",
        "receivingTemperature",
        // "dateOpened", check data type
        "expirationDate",
        "barcode",
        "nfpaName",
        "storageClass",
        "casNumber",
        "safetyDataSheet",
        "sdsLink",
        "verified",
        "explosive",
        "oxidizing",
        "flammable",
        "corrosive",
        "toxic",
        "mutagenicOrCarcinogenic",
        "irritation",
        "compressedGases",
        "healthHazard",
        "flammability",
        "reactivity",
        "contact",
        "location",
        "reagentSticker",
    ];

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
            const checked = e.target.checked;
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
                // If unchecked, set the field to an empty string
                ...(name === "safetyDataSheet" && !checked ? { sdsLink: "" } : {}),
            }));
        } else if (type === "file") {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));

            setErrors((prevErrors) => ({
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
            reagentCode: String(formData.reagentCode),
            reagentName: String(formData.reagentName),
            reagentPresentation: String(formData.reagentPresentation),
            reagentWeightVolume: String(formData.reagentWeightVolume),
            reagentBrand: String(formData.reagentBrand),
            reagentCatalog: String(formData.reagentCatalog),
            reagentSupplier: String(formData.reagentSupplier),
            reagentImage: String(formData.reagentImage),
            reagentLot: String(formData.reagentLot),
            dateOfReception: new Date(formData.dateOfReception).toISOString(),
            receivingTemperature: String(formData.receivingTemperature),
            dateOpened: new Date(formData.dateOpened).toISOString(),
            dateFinished: new Date(formData.dateFinished).toISOString(),
            expirationDate: new Date(formData.expirationDate).toISOString(),
            invoiceNumber: String(formData.invoiceNumber),
            vinculatedStrategicProject: String(
                formData.vinculatedStrategicProject
            ),
            barcode: parseInt(formData.barcode, 10), // should be String
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
            mutagenicOrCarcinogenic: parseInt(
                formData.mutagenicOrCarcinogenic,
                10
            ),
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 divide-x divide-primary-blue">
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
                            <span>
                                Lote <span className="text-red-500">*</span>
                            </span>
                            <Input
                                type="text"
                                name="reagentLot"
                                value={formData.reagentLot}
                                onChange={handleChange}
                                placeholder="Ingrese el lote"
                                required
                                showError={errors.reagentLot}
                                errorMessage={"Este campo es obligatorio"}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        <label className="flex flex-col font-montserrat font-semibold">
                            Fecha de llegada
                            <DateInput
                                name="dateOfReception"
                                value={formData.dateOfReception}
                                onChange={handleChange}
                                placeholder="Ingrese la fecha de llegada dd-mm-aaaa"
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        <label className="flex flex-col font-montserrat font-semibold">
                            <span>
                                Temperatura de recepción
                                <span className="text-red-500">*</span>
                            </span>
                            <Input
                                type="text"
                                name="receivingTemperature"
                                value={formData.receivingTemperature}
                                onChange={handleChange}
                                placeholder="Ingrese la temperatura"
                                required
                                showError={errors.receivingTemperature}
                                errorMessage={"Este campo es obligatorio"}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        <label className="flex flex-col font-montserrat font-semibold">
                            Fecha de apertura
                            <DateInput
                                name="dateOpened"
                                value={formData.dateOpened}
                                onChange={handleChange}
                                placeholder="Ingrese la fecha de apertura"
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        <label className="flex flex-col font-montserrat font-semibold">
                            Fecha de término
                            <DateInput
                                name="dateFinished"
                                value={formData.dateFinished}
                                onChange={handleChange}
                                placeholder="Ingrese la fecha de término"
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        <label className="flex flex-col font-montserrat font-semibold">
                            <span>
                                Fecha de caducidad{" "}
                                <span className="text-red-500">*</span>
                            </span>
                            <DateInput
                                name="expirationDate"
                                value={formData.expirationDate}
                                onChange={handleChange}
                                required
                                showError={errors.expirationDate}
                                errorMessage={"Este campo es obligatorio"}
                                placeholder="Ingrese la fecha de caducidad"
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
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
                            <span>
                                Escanear código de barras
                                <span className="text-red-500">*</span>
                            </span>
                            <Input
                                type="text"
                                name="barcode"
                                value={formData.barcode}
                                onChange={handleChange}
                                required
                                showError={errors.barcode}
                                errorMessage={"Este campo es obligatorio"}
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
                        <label className="flex items-center font-montserrat font-semibold gap-2">
                            Hoja de seguridad
                            <input
                                type="checkbox"
                                name="safetyDataSheet"
                                checked={formData.safetyDataSheet}
                                required
                                onChange={handleChange}
                                className="h-4 w-4"
                            />
                        </label>
                        {formData.safetyDataSheet && (
                            <label className="flex flex-col font-montserrat font-semibold">
                                Enlace de hoja
                                <Input
                                    name="sdsLink"
                                    type="url"
                                    value={formData.sdsLink}
                                    placeholder="Ingrese el enlace"
                                    required
                                    showError={errors.sdsLink}
                                    errorMessage={"Este campo es obligatorio"}
                                    onChange={handleChange}
                                    className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                                />
                            </label>
                        )}
                        <label className="flex items-center font-montserrat font-semibold gap-2">
                            Verificado
                            <input
                                type="checkbox"
                                name="verified"
                                checked={formData.verified}
                                required
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
                                <span>
                                    {label}{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                                <Input
                                    name={name}
                                    type="number"
                                    min="0"
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
                        <label className="flex flex-col font-montserrat font-semibold ">
                            <span className="text-health-field">
                                Salud <span className="text-red-500">*</span>
                            </span>
                            <Input
                                type="number"
                                name="healthHazard"
                                value={formData.healthHazard}
                                placeholder="Ingrese el riesgo"
                                required
                                showError={errors.healthHazard}
                                errorMessage={"Este campo es obligatorio"}
                                min="0"
                                onChange={handleChange}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        <label className="flex flex-col font-montserrat font-semibold">
                            <span className="text-flammable-field">
                                Flamable <span className="text-red-500">*</span>
                            </span>
                            <Input
                                type="number"
                                name="flammability"
                                value={formData.flammability}
                                placeholder="Ingrese el riesgo"
                                required
                                showError={errors.flammability}
                                errorMessage={"Este campo es obligatorio"}
                                min="0"
                                onChange={handleChange}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        <label className="flex flex-col font-montserrat font-semibold">
                            <span className="text-reactivity-field">
                                Reactividad{" "}
                                <span className="text-red-500">*</span>
                            </span>
                            <Input
                                type="number"
                                name="reactivity"
                                value={formData.reactivity}
                                placeholder="Ingrese el riesgo"
                                required
                                showError={errors.reactivity}
                                errorMessage={"Este campo es obligatorio"}
                                min="0"
                                onChange={handleChange}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        <label className="font-montserrat font-semibold">
                            <span>
                                Contacto <span className="text-red-500">*</span>
                            </span>
                            <Input
                                type="number"
                                name="contact"
                                value={formData.contact}
                                placeholder="Ingrese el riesgo"
                                required
                                showError={errors.reactivity}
                                errorMessage={"Este campo es obligatorio"}
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
                            <span>
                                Ubicación{" "}
                                <span className="text-red-500">*</span>
                            </span>
                            <Input
                                type="text"
                                name="location"
                                value={formData.location}
                                placeholder="Ingrese la ubicación"
                                required
                                showError={errors.location}
                                errorMessage={"Este campo es obligatorio"}
                                onChange={handleChange}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                            />
                        </label>
                        <label className="flex flex-col font-montserrat font-semibold">
                            <span>
                                Sticker <span className="text-red-500">*</span>
                            </span>
                            <SelectInput
                                name="reagentSticker"
                                onChange={handleChange}
                                placeholder="Seleccione el color"
                                options={[
                                    { label: "Verde", value: "3" },
                                    { label: "Azul", value: "2" },
                                    { label: "Amarillo", value: "1" },
                                    { label: "Rojo", value: "4" },
                                ]}
                                showError={errors.reagentSticker}
                                errorMessage="Este campo es obligatorio"
                            />
                        </label>
                        <label className="font-montserrat font-semibold">
                            Observaciones
                            <textarea
                                name="observations"
                                value={formData.observations}
                                onChange={handleChange}
                                placeholder="Ingrese observaciones sobre el reactivo"
                                className="w-full h-24 rounded-md border border-gray-500 p-2 mt-1 placeholder:text-xs placeholder:font-montserrat font-normal"
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
                            className="w-40 bg-reject-btn hover:bg-reject-btn-hover text-white text-base font-poppins font-semibold py-2 px-4 rounded-xl transition inline-flex items-center"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => console.log("Aplicar cambios")}
                            className="w-40 bg-approve-btn hover:bg-approve-btn-hover text-white text-base font-poppins font-semibold py-2 px-4 rounded-xl transition inline-flex items-center"
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
