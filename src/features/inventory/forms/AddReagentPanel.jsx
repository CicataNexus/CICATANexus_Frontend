import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileInput from "@/components/ui/FileInput";
import DateInput from "@/components/ui/DateInput";
import { cn } from "@/lib/utils";

export default function PanelAgregarReactivo({ onClose }) {
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
        console.log("Nuevo reactivo:", formData);
        onClose();
    };

    return (
        <div className="flex flex-col gap-4 text-sm text-black font-montserrat">
            <div className="grid grid-cols-5 divide-x divide-primary-blue">
                {/* Column 1 Información general */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Información general
                    </h3>
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
                        ["reagentCatalog", "Catálogo", "Ingrese el catálogo"],
                        [
                            "reagentSupplier",
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
                                placeholder={placeholder}
                                onChange={handleChange}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                            />
                        </div>
                    ))}
                    <h4 className="font-montserrat font-semibold">Imagen</h4>
                    <FileInput name="reagentImage" onChange={handleChange} />
                </div>

                {/* Column 2 Trazabilidad */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Trazabilidad
                    </h3>
                    <h4 className="font-montserrat font-semibold">Lote</h4>
                    <Input
                        name="reagentLot"
                        value={formData.reagentLot}
                        onChange={handleChange}
                        placeholder="Ingrese el lote"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                    <h4 className="font-montserrat font-semibold">
                        Fecha de llegada
                    </h4>
                    <DateInput
                        name="dateOfReception"
                        value={formData.dateOfReception}
                        onChange={handleChange}
                        placeholder="Ingrese la fecha de llegada dd-mm-aaaa"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                    <h4 className="font-montserrat font-semibold">
                        Temperatura de recepción
                    </h4>
                    <Input
                        name="receivingTemperature"
                        value={formData.receivingTemperature}
                        onChange={handleChange}
                        placeholder="Ingrese la temperatura"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
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
                        <div key={name}>
                            <h4 className="font-montserrat font-semibold">
                                {label}
                            </h4>
                            <DateInput
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                placeholder={placeholder}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                            />
                        </div>
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
                        <div key={name}>
                            <h4 className="font-montserrat font-semibold">
                                {label}
                            </h4>
                            <Input
                                name={name}
                                value={formData[name]}
                                placeholder={placeholder}
                                onChange={handleChange}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                            />
                        </div>
                    ))}
                </div>

                {/* Column 3 Clasificación NFPA */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Clasificación NFPA
                    </h3>
                    {[
                        ["nfpaName", "Nombre NFPA", "Ingrese el nombre NFPA"],
                        [
                            "storageClass",
                            "Clase de almacenamiento",
                            "Ingrese la clase (TRGS 510)",
                        ],
                        ["casNumber", "Número CAS", "Ingrese el número CAS"],
                    ].map(([name, label, placeholder]) => (
                        <div key={name}>
                            <h4 className="font-montserrat font-semibold">
                                {label}
                            </h4>
                            <Input
                                name={name}
                                placeholder={placeholder}
                                onChange={handleChange}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                            />
                        </div>
                    ))}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="safetyDataSheet"
                            checked={formData.safetyDataSheet}
                            onChange={handleChange}
                            className="h-4 w-4"
                        />
                        <label className="font-montserrat font-semibold">
                            Hoja de seguridad
                        </label>
                    </div>

                    <h4 className="font-montserrat font-semibold">
                        Enlace de hoja
                    </h4>
                    <Input
                        name="sdsLink"
                        placeholder="Ingrese el enlace"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="verified"
                            checked={formData.verified}
                            onChange={handleChange}
                            className="h-4 w-4"
                        />
                        <label className="font-montserrat font-semibold">
                            Verificado
                        </label>
                    </div>

                    <h4 className="font-montserrat font-semibold">
                        Pictograma
                    </h4>
                    <FileInput name="pictogramImage" onChange={handleChange} />
                </div>

                {/* Column 4 Seguridad y riesgos */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Seguridad y riesgos
                    </h3>
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
                        <div key={name}>
                            <h4 className="font-montserrat font-semibold">
                                {label}
                            </h4>
                            <Input
                                name={name}
                                placeholder={placeholder}
                                onChange={handleChange}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                            />
                        </div>
                    ))}

                    <h4 className="font-montserrat font-semibold text-health-field">
                        Salud
                    </h4>
                    <Input
                        name="healthHazard"
                        placeholder="Ingrese el riesgo"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold text-flammable-field">
                        Flamable
                    </h4>
                    <Input
                        name="flammability"
                        placeholder="Ingrese el riesgo"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold text-reactivity-field">
                        Reactividad
                    </h4>
                    <Input
                        name="reactivity"
                        placeholder="Ingrese el riesgo"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold">Contacto</h4>
                    <Input
                        name="contact"
                        placeholder="Ingrese el riesgo"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                </div>

                {/* Column 5 Estado y uso */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Estado y uso
                    </h3>

                    <h4 className="font-montserrat font-semibold">Ubicación</h4>
                    <Input
                        name="location"
                        placeholder="Ingrese la ubicación"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold">Sticker</h4>
                    <select
                        name="reagentSticker"
                        onChange={handleChange}
                        className={cn(
                            "w-full h-8 rounded-md border border-gray-500 px-2 font-montserrat text-xs -mt-1",
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

                    <h4 className="font-montserrat font-semibold">
                        Observaciones
                    </h4>
                    <textarea
                        name="observations"
                        value={formData.observations}
                        onChange={handleChange}
                        placeholder="Ingrese observaciones sobre el reactivo"
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
