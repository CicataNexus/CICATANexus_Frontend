import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputArchivo from "@/components/ui/input-archivo";
import InputFecha from "@/components/ui/input-fecha";

export default function PanelAgregarMaterial({ onClose }) {
    const [formData, setFormData] = useState({
        categoria: "",
        descripcion: "",
        presentacion: "",
        marca: "",
        proveedor: "",
        catalogo: "",
        cantidad: "",
        imagen: null,
        almacen: "",
        laboratorio: "",
        cf: "",
        temp: "",
        l1: "",
        l2: "",
        l3: "",
        l4: "",
        l5: "",
        l6: "",
        lote: "",
        factura: "",
        llegada: "",
        caducidad: "",
        temperatura: "",
        codigo_barras: "",
        ubicacion: "",
        observaciones: "",
        obs_usuarios: "",
        verificado: false,
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
        console.log("Nuevo material:", formData);
        onClose();
    };

    return (
        <div className="flex flex-col gap-4 text-sm text-black font-montserrat w-full">
            {/* Grid de columnas */}
            <div className="grid grid-cols-4 divide-x divide-primary-blue w-full">
                {/* Columna 1 - Información general */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Información general
                    </h3>
                    {[
                        ["categoria", "Categoría", "Ingrese la categoría"],
                        ["descripcion", "Descripción", "Ingrese la descripción"],
                        ["presentacion", "Presentación", "Ingrese la presentación"],
                        ["marca", "Marca", "Ingrese la marca"],
                        ["proveedor", "Proveedor", "Ingrese el proveedor"],
                        ["catalogo", "Catálogo", "Ingrese el catálogo"],
                        ["cantidad", "Cantidad", "Ingrese la cantidad"],
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
                    <InputArchivo
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                imagen: e.target.files[0],
                            }))
                        }
                    />
                </div>

                {/* Columna 2 - Localización específica */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Localización específica
                    </h3>
                    {[
                        ["almacen", "Unidades en almacén", "Ingrese las unidades en almacén"],
                        ["laboratorio", "Unidades en laboratorio", "Ingrese las unidades en laboratorio"],
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
                    <div className="grid grid-cols-3 gap-2">
                        {["L1", "L2", "L3", "L4", "L5", "L6"].map((label) => (
                            <div key={label}>
                                <h4 className="font-montserrat font-semibold">
                                    {label}
                                </h4>
                                <Input
                                    name={label.toLowerCase()}
                                    value={formData[label.toLowerCase()]}
                                    onChange={handleChange}
                                    placeholder="Ingrese"
                                    className="mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                                />
                            </div>
                        ))}
                    </div>
                    {[
                        ["cf", "CF", "Ingrese el CF"],
                        ["temp", "Almacén temporal", "Ingrese el almacén temporal"],
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

                {/* Columna 3 - Trazabilidad */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Trazabilidad
                    </h3>
                    {[
                        ["lote", "Lote", "Ingrese el lote"],
                        ["factura", "Número de factura", "Ingrese el número de factura"],
                        ["llegada", "Fecha de llegada"],
                        ["caducidad", "Fecha de caducidad"],
                        ["temperatura", "Temperatura de recepción", "Ingrese la temperatura"],
                        ["codigo_barras", "Escanear código de barras", "Haga clic y escanee"]
                    ].map(([name, label, placeholder]) =>
                        name === "llegada" || name === "caducidad" ? (
                            <div key={name}>
                                <h4 className="font-montserrat font-semibold">
                                    {label}
                                </h4>
                                <InputFecha
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    placeholder={`Ingrese ${label.toLowerCase()}`}
                                    className="mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                                />
                            </div>
                        ) : (
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
                        )
                    )}
                </div>

                {/* Columna 4 - Estado y verificación */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Estado y verificación
                    </h3>
                    <h4 className="font-montserrat font-semibold">Ubicación</h4>
                    <Input
                        name="ubicacion"
                        value={formData.ubicacion}
                        onChange={handleChange}
                        placeholder="Ingrese la ubicación"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                    <h4 className="font-montserrat font-semibold">
                        Observaciones
                    </h4>
                    <textarea
                        name="observaciones"
                        value={formData.observaciones}
                        onChange={handleChange}
                        placeholder="Ingrese las observaciones"
                        className="w-full h-20 rounded-md border border-gray-500 p-2 -mt-1 placeholder:text-xs placeholder:font-montserrat"
                    />
                    <h4 className="font-montserrat font-semibold">
                        Observaciones para usuarios
                    </h4>
                    <textarea
                        name="obs_usuarios"
                        value={formData.obs_usuarios}
                        onChange={handleChange}
                        placeholder="Ingrese las observaciones para los usuarios"
                        className="w-full h-20 rounded-md border border-gray-500 p-2 -mt-1 placeholder:text-xs placeholder:font-montserrat"
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
