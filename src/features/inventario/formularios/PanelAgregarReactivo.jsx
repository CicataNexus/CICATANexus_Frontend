import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputArchivo from "@/components/ui/input-archivo";
import InputFecha from "@/components/ui/input-fecha";

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
        <div className="flex flex-col p-6 gap-4 text-sm text-black font-montserrat">
            <div className="grid grid-cols-5 gap-4 divide-x divide-primary-blue">
                {/* Columna 1 */}
                <div className="space-y-2 pr-4">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Información general
                    </h3>

                    <h4 className="font-montserrat font-semibold">Código</h4>
                    <Input
                        name="codigo"
                        placeholder="Ingrese el código"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold">Nombre</h4>
                    <Input
                        name="nombre"
                        placeholder="Ingrese el nombre"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold">
                        Presentación
                    </h4>
                    <Input
                        name="presentacion"
                        placeholder="Ingrese la presentación"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold">
                        Peso/Volumen
                    </h4>
                    <Input
                        name="peso_volumen"
                        placeholder="Ingrese el peso o volumen"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold">Marca</h4>
                    <Input
                        name="marca"
                        placeholder="Ingrese la marca"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold">Catálogo</h4>
                    <Input
                        name="catalogo"
                        placeholder="Ingrese el catálogo"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold">Proveedor</h4>
                    <Input
                        name="proveedor"
                        placeholder="Ingrese el proveedor"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold">Imagen</h4>
                    <InputArchivo name="imagen" onChange={handleChange} />
                </div>

                {/* Columna 2 */}
                <div className="space-y-2 px-4">
                    <h3 className="font-bold text-base text-center mb-2">
                        Trazabilidad
                    </h3>

                    <h4 className="font-montserrat font-semibold">Lote</h4>
                    <Input
                        name="lote"
                        placeholder="Ingrese el lote"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold">
                        Fecha de llegada
                    </h4>
                    <InputFecha
                        name="llegada"
                        value={formData.llegada}
                        placeholder="Ingrese la fecha de llegada"
                        onChange={handleChange}
                    />

                    <h4 className="font-montserrat font-semibold">
                        Temperatura de recepción
                    </h4>
                    <Input
                        name="temperatura"
                        placeholder="Ingrese la temperatura"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold">
                        Fecha de apertura
                    </h4>
                    <InputFecha
                        name="apertura"
                        value={formData.apertura}
                        placeholder="Ingrese la fecha de apertura"
                        onChange={handleChange}
                    />

                    <h4 className="font-montserrat font-semibold">
                        Fecha de término
                    </h4>
                    <InputFecha
                        name="termino"
                        value={formData.termino}
                        placeholder="Ingrese la fecha de término"
                        onChange={handleChange}
                    />

                    <h4 className="font-montserrat font-semibold">
                        Fecha de caducidad
                    </h4>
                    <InputFecha
                        name="caducidad"
                        value={formData.caducidad}
                        placeholder="Ingrese la fecha de caducidad"
                        onChange={handleChange}
                    />

                    <h4 className="font-montserrat font-semibold">
                        Número de factura
                    </h4>
                    <Input
                        name="factura"
                        placeholder="Ingrese el número de factura"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold">
                        Proyecto estratégico vinculado
                    </h4>
                    <Input
                        name="proyecto"
                        placeholder="Ingrese el proyecto vinculado"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold">
                        Escanear código de barras
                    </h4>
                    <Input
                        name="codigo_barras"
                        placeholder="Haca click y escanee"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                </div>

                {/* Columna 3 */}
                <div className="space-y-2 px-4">
                    <h3 className="font-bold text-base text-center mb-2">
                        Clasificación NFPA
                    </h3>

                    <h4 className="font-montserrat font-semibold">
                        Nombre NFPA
                    </h4>
                    <Input
                        name="nombre_nfpa"
                        placeholder="Ingrese el nombre NFPA"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold">
                        Clase de almacenamiento
                    </h4>
                    <Input
                        name="clase_almacenamiento"
                        placeholder="Ingrese la clase (TRGS 510)"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                    <h4 className="font-montserrat font-semibold">
                        Número CAS
                    </h4>
                    <Input
                        name="cas"
                        placeholder="Ingrese el número CAS"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

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
                    <InputArchivo name="pictograma" onChange={handleChange} />
                </div>

                {/* Columna 4 */}
                <div className="space-y-2 px-4">
                    <h4 className="font-bold text-base text-center mb-2">
                        Seguridad y riesgos
                    </h4>
                    {[
                        ["explosivo", "Explosivo", "Ingrese el riesgo"],
                        [
                            "comburente",
                            "Comburente/Oxidante",
                            "Ingrese el riesgo",
                        ],
                        ["inflamable", "Inflamable", "Ingrese el riesgo"],
                        ["corrosivo", "Corrosivo", "Ingrese el riesgo"],
                        ["toxico", "Tóxico", "Ingrese el riesgo"],
                        [
                            "mutagenico",
                            "Mutagénico cancerígeno",
                            "Ingrese el riesgo",
                        ],
                        [
                            "irritacion",
                            "Irritación cutánea",
                            "Ingrese el riesgo",
                        ],
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

                    <h4 className="font-montserrat font-semibold">
                        Contacto
                    </h4>
                    <Input
                        name="cas"
                        placeholder="Ingrese el número CAS"
                        onChange={handleChange}
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />

                </div>

                {/* Columna 5 */}
                <div className="space-y-2 pl-4">
                    <h3 className="font-bold text-base text-center mb-2">
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
                        className="w-full h-8 rounded-md border border-gray-300 px-2 text-sm"
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
            <div className="flex justify-center gap-4 pt-4">
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