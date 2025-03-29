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
        <div className="flex flex-col p-6 gap-4 text-sm text-black font-montserrat">
            {/* Grid de columnas */}
            <div className="grid grid-cols-3 gap-4 divide-x divide-primary-blue">
                {/* Columna 1 - Información general */}
                <div className="space-y-2 pr-4">
                    <h3 className="font-poppins font-bold text-base mb-2 text-center">
                        Información general
                    </h3>
                    <h4 className="font-montserrat font-semibold">
                        Número de inventario
                    </h4>
                    <Input
                        name="no_inventario"
                        value={formData.no_inventario}
                        onChange={handleChange}
                        placeholder="Ingrese el número de inventario"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                    <h4 className="font-montserrat font-semibold">
                        Nombre del equipo
                    </h4>
                    <Input
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Ingrese el nombre del equipo"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                    <h4 className="font-montserrat font-semibold">Marca</h4>
                    <Input
                        name="marca"
                        value={formData.marca}
                        onChange={handleChange}
                        placeholder="Marca"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                    <h4 className="font-montserrat font-semibold">Modelo</h4>
                    <Input
                        name="modelo"
                        value={formData.modelo}
                        onChange={handleChange}
                        placeholder="Modelo"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                    <h4 className="font-montserrat font-semibold">
                        Número de serie
                    </h4>
                    <Input
                        name="no_serie"
                        value={formData.no_serie}
                        onChange={handleChange}
                        placeholder="Número de serie"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                    <h4 className="font-montserrat font-semibold">Proveedor</h4>
                    <Input
                        name="proveedor"
                        value={formData.proveedor}
                        onChange={handleChange}
                        placeholder="Proveedor"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                    <h4 className="font-montserrat font-semibold">Imagen</h4>
                    <InputArchivo
                        onChange={(e) => console.log(e.target.files[0])}
                    />
                </div>

                {/* Columna 2 - Trazabilidad */}
                <div className="space-y-2 px-4">
                    <h3 className="font-bold text-base text-center mb-2">
                        Trazabilidad
                    </h3>
                    <h4 className="font-montserrat font-semibold">
                        Número de factura
                    </h4>
                    <Input
                        name="factura"
                        value={formData.factura}
                        onChange={handleChange}
                        placeholder="Ingrese el número de factura"
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
                    />
                    <h4 className="font-montserrat font-semibold">
                        Registro en SICPat
                    </h4>
                    <Input
                        name="sicpat"
                        value={formData.sicpat}
                        onChange={handleChange}
                        placeholder="Ingrese el registro"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                    <h4 className="font-montserrat font-semibold">
                        Proyecto estratégico vinculado
                    </h4>
                    <Input
                        name="proyecto"
                        value={formData.proyecto}
                        onChange={handleChange}
                        placeholder="Ingrese el proyecto vinculado"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                    <h4 className="font-montserrat font-semibold">
                        Escanear código de barras
                    </h4>
                    <Input
                        name="codigo_barras"
                        value={formData.codigo_barras}
                        onChange={handleChange}
                        placeholder="Haga clic y escanee"
                        className="-mt-1 placeholder:text-xs placeholder:font-montserrat h-8"
                    />
                </div>

                {/* Columna 3 - Estado y uso */}
                <div className="space-y-2 pl-4">
                    <h3 className="font-bold text-base text-center mb-2">Estado y uso</h3>
                    <h4 className="font-montserrat font-semibold">
                        Ubicación
                    </h4>
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