import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputArchivo from "@/components/ui/input-archivo";
import InputFecha from "@/components/ui/input-fecha";

export default function PanelAgregarEquipo({ onClose }) {
    const [formData, setFormData] = useState({
        no_inventario: "",
        nombre: "",
        marca: "",
        modelo: "",
        no_serie: "",
        proveedor: "",
        imagen: null,
        factura: "",
        llegada: "",
        sicpat: "",
        proyecto: "",
        codigo_barras: "",
        ubicacion: "",
        observaciones: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        console.log("Nuevo producto:", formData);
        onClose();
    };

    return (
        <div className="flex flex-col gap-4 text-sm text-black font-montserrat">
            {/* Grid de columnas */}
            <div className="grid grid-cols-3 divide-x divide-primary-blue">
                {/* Columna 1 - Información general */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Información general
                    </h3>
                    {[
                        ["no_inventario", "Número de inventario", "Ingrese el número de inventario"],
                        ["nombre", "Nombre del equipo", "Ingrese el nombre del equipo"],
                        ["marca", "Marca", "Marca"],
                        ["modelo", "Modelo", "Modelo"],
                        ["no_serie", "Número de serie", "Número de serie"],
                        ["proveedor", "Proveedor", "Proveedor"],
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
                        onChange={(e) => console.log(e.target.files[0])}
                    />
                </div>

                {/* Columna 2 - Trazabilidad */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Trazabilidad
                    </h3>
                    <h4 className="font-montserrat font-semibold">Número de factura</h4>
                    <Input
                        name="factura"
                        value={formData.factura}
                        onChange={handleChange}
                        placeholder="Ingrese el número de factura"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                    <h4 className="font-montserrat font-semibold">Fecha de llegada</h4>
                    <InputFecha
                        name="llegada"
                        value={formData.llegada}
                        onChange={handleChange}
                        placeholder="Ingrese la fecha de llegada dd-mm-aaaa"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                    {[
                        ["sicpat", "Registro en SICPat", "Ingrese el registro"],
                        ["proyecto", "Proyecto estratégico vinculado", "Ingrese el proyecto vinculado"],
                        ["codigo_barras", "Escanear código de barras", "Haga clic y escanee"],
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

                {/* Columna 3 - Estado y uso */}
                <div className="space-y-2 p-4 mt-2">
                    <h3 className="font-poppins font-bold text-base text-center mb-2">
                        Estado y uso
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
                        placeholder="Ingrese observaciones sobre el equipo"
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
