import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputArchivo from "@/components/ui/input-archivo";
import InputFecha from "@/components/ui/input-fecha";
import { cn } from "@/lib/utils";


export default function PanelAgregarReactivo({ onClose }) {
    const [formData, setFormData] = useState({
        codigo: "",
        nombre: "",
        presentacion: "",
        peso_volumen: "",
        marca: "",
        catalogo: "",
        proveedor: "",
        imagen: null,
        lote: "",
        llegada: "",
        temperatura: "",
        apertura: "",
        termino: "",
        caducidad: "",
        factura: "",
        proyecto: "",
        codigo_barras: "",
        nombre_nfpa: "",
        clase_almacenamiento: "",
        cas: "",
        hoja_seguridad: false,
        enlace_hoja: "",
        verificado: false,
        pictograma: null,
        explosivo: "",
        comburente: "",
        inflamable: "",
        corrosivo: "",
        toxico: "",
        mutagenico: "",
        irritacion: "",
        gases: "",
        salud: "",
        inflamabilidad: "",
        reactividad: "",
        contacto: "",
        ubicacion: "",
        sticker: "",
        observaciones: "",
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
                {/* Columna 1 Información general */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Información general
                    </h3>
                    {[
                        ["codigo", "Código", "Ingrese el código"],
                        ["nombre", "Nombre", "Ingrese el nombre"],
                        ["presentacion", "Presentación", "Ingrese la presentación"],
                        ["peso_volumen", "Peso/Volumen", "Ingrese el peso o volumen"],
                        ["marca", "Marca", "Ingrese la marca"],
                        ["catalogo", "Catálogo", "Ingrese el catálogo"],
                        ["proveedor", "Proveedor", "Ingrese el proveedor"],
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
                    <InputArchivo
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                imagen: e.target.files[0],
                            }))
                        }
                    />
                </div>

                {/* Columna 2 Trazabilidad */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Trazabilidad
                    </h3>
                    <h4 className="font-montserrat font-semibold">
                        Lote
                    </h4>
                    <Input
                        name="lote"
                        value={formData.factura}
                        onChange={handleChange}
                        placeholder="Ingrese el lote"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                    <h4 className="font-montserrat font-semibold">
                        Fecha de llegada
                    </h4>
                    <InputFecha
                        name="llegada"
                        value={formData.llegada}
                        onChange={handleChange}
                        placeholder="Ingrese la fecha de llegada dd-mm-aaaa"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                    <h4 className="font-montserrat font-semibold">
                        Temperatura de recepción
                    </h4>
                    <Input
                        name="temperatura"
                        value={formData.temperatura}
                        onChange={handleChange}
                        placeholder="Ingrese la temperatura"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                    {[
                        ["apertura", "Fecha de apertura", "Ingrese la fecha de apertura"],
                        ["termino", "Fecha de término", "Ingrese la fecha de término"],
                        ["caducidad", "Fecha de caducidad", "Ingrese la fecha de caducidad"],
                    ].map(([name, label, placeholder]) => (
                        <div key={name}>
                            <h4 className="font-montserrat font-semibold">
                                {label}
                            </h4>
                            <InputFecha
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                placeholder={placeholder}
                                className="mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                            />
                        </div>
                    ))}
                    {[
                        ["factura", "Número de factura", "Ingrese el número de factura"],
                        ["proyecto", "Proyecto estratégico vinculado", "Ingrese el proyecto vinculado"],
                        ["codigo_barras", "Escanear código de barras", "Haga clic y escanee"],
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
                </div>

                {/* Columna 3 Clasificación NFPA */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Clasificación NFPA
                    </h3>
                    {[
                        ["nombre_nfpa", "Nombre NFPA", "Ingrese el nombre NFPA"],
                        ["clase_almacenamiento", "Clase de almacenamiento", "Ingrese la clase (TRGS 510)"],
                        ["cas", "Número CAS", "Ingrese el número CAS"],
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
                            name="hoja_seguridad"
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
                        name="enlace_hoja"
                        placeholder="Ingrese el enlace"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="verificado"
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
                    <InputArchivo
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                pictograma: e.target.files[0],
                            }))
                        }
                    />
                </div>

                {/* Columna 4 Seguridad y riesgos */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Seguridad y riesgos
                    </h3>
                    {[
                        ["explosivo", "Explosivo", "Ingrese el riesgo"],
                        ["comburente", "Comburente/Oxidante", "Ingrese el riesgo"],
                        ["inflamable", "Inflamable", "Ingrese el riesgo"],
                        ["corrosivo", "Corrosivo", "Ingrese el riesgo"],
                        ["toxico", "Tóxico", "Ingrese el riesgo"],
                        ["mutagenico", "Mutagénico cancerígeno", "Ingrese el riesgo"],
                        ["irritacion", "Irritación cutánea", "Ingrese el riesgo"],
                        ["gases", "Gases comprimidos", "Ingrese el riesgo"],
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
                        name="cas"
                        placeholder="Ingrese el riesgo"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold text-flammable-field">
                        Flamable
                    </h4>
                    <Input
                        name="cas"
                        placeholder="Ingrese el número CAS"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold text-reactivity-field">
                        Reactividad
                    </h4>
                    <Input
                        name="cas"
                        placeholder="Ingrese el número CAS"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold">Contacto</h4>
                    <Input
                        name="cas"
                        placeholder="Ingrese el número CAS"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                </div>

                {/* Columna 5 Estado y uso */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Estado y uso
                    </h3>

                    <h4 className="font-montserrat font-semibold">Ubicación</h4>
                    <Input
                        name="ubicacion"
                        placeholder="Ingrese la ubicación"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold">Sticker</h4>
                    <select
                        name="sticker"
                        onChange={handleChange}
                        className={cn(
                            "w-full h-8 rounded-md border border-gray-500 px-2 font-montserrat text-xs -mt-1",
                            formData.sticker === "" ? "text-placeholder-text" : "text-black"
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
                        name="observaciones"
                        value={formData.observaciones}
                        onChange={handleChange}
                        placeholder="Ingrese observaciones sobre el reactivo"
                        className="w-full h-24 rounded-md border border-gray-500 p-2 -mt-1 placeholder:text-xs placeholder:font-montserrat"
                    />
                </div>
            </div>

            {/* Botones */}
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