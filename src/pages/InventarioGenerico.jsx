import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TableToolbar from "../components/ui/table-toolbar";
import TablaInventario from "../features/inventario/TablaInventario";
import { columnasEquipos } from "../features/inventario/columnas/ColumnasEquipos.jsx";
import { columnasMateriales } from "../features/inventario/columnas/ColumnasMateriales.jsx";
import { columnasReactivos } from "../features/inventario/columnas/ColumnasReactivos.jsx";
import PanelAgregarEquipo from "../features/inventario/formularios/PanelAgregarEquipo";
import PanelAgregarMaterial from "../features/inventario/formularios/PanelAgregarMaterial";
import PanelAgregarReactivo from "../features/inventario/formularios/PanelAgregarReactivo";
import PanelAgregarProducto from "../features/inventario/PanelAgregarProducto";

const columnasMap = {
    equipos: columnasEquipos,
    materiales: columnasMateriales,
    reactivos: columnasReactivos,
};

// Datos simulados (mock)
const datosSimulados = {
    equipos: [
        {
            no_inventario: "P0V000I0602019959500022023",
            nombre: "Agitador orbital",
            marca: "Thermo Scientific",
            modelo: "MAXQ2000",
            ubicacion: "Microbiología",
            estado: "En uso",
        },
        {
            no_inventario: "P0V000I1502004520000012023",
            nombre: "Autoclave vertical",
            marca: "EVAR",
            modelo: "EV-36",
            ubicacion: "Acondicionamiento de material",
            estado: "Disponible",
        },
        {
            no_inventario: "P0V000I2301004523000012023",
            nombre: "Balanza analítica",
            marca: "ADAM",
            modelo: "NBL 214i",
            ubicacion: "Almacén",
            estado: "En uso",
        },
        {
            no_inventario: "P0V000I2506004923000012023",
            nombre: "Espectrofotómetro",
            marca: "Thermo Fisher",
            modelo: "GENESYS 150",
            ubicacion: "Química",
            estado: "Disponible",
        },
        {
            no_inventario: "P0V000I1101002221000012023",
            nombre: "Centrífuga refrigerada",
            marca: "Eppendorf",
            modelo: "5424 R",
            ubicacion: "Biología molecular",
            estado: "En uso",
        },
    ],

    materiales: [
        {
            codigo: "MAT001",
            descripcion: "Agitador de 6X250 mm. K-40500",
            catalogo: "K-40500",
            marca: "Labware",
            caducidad: "N/A",
            ubicacion: "L3",
            estado: "En uso",
        },
        {
            codigo: "MAT002",
            descripcion: "Guantes de nitrilo talla M",
            catalogo: "GN-100",
            marca: "Ansell",
            caducidad: "2026-12-01",
            ubicacion: "L1",
            estado: "Disponible",
        },
        {
            codigo: "MAT003",
            descripcion: "Mascarillas N95",
            catalogo: "N95-MED",
            marca: "3M",
            caducidad: "2025-06-30",
            ubicacion: "Almacén",
            estado: "En uso",
        },
        {
            codigo: "MAT004",
            descripcion: "Tubo Falcon 15ml",
            catalogo: "F15",
            marca: "Corning",
            caducidad: "N/A",
            ubicacion: "L2",
            estado: "Disponible",
        },
        {
            codigo: "MAT005",
            descripcion: "Caja Petri 90mm",
            catalogo: "PET90",
            marca: "Nunc",
            caducidad: "2026-01-01",
            ubicacion: "L4",
            estado: "Disponible",
        },
    ],

    reactivos: [
        {
            codigo: "MB1",
            nombre: "2-Metil-2-Butanol",
            presentacion: "Líquido",
            peso_volumen: "1L",
            marca: "Sigma Aldrich",
            sticker: "Verde",
            ubicacion: "Almacén",
            estado: "En uso",
        },
        {
            codigo: "HCL01",
            nombre: "Ácido Clorhídrico",
            presentacion: "Solución",
            peso_volumen: "500ml",
            marca: "J.T. Baker",
            sticker: "Rojo",
            ubicacion: "L2",
            estado: "Disponible",
        },
        {
            codigo: "NAOH01",
            nombre: "Hidróxido de sodio",
            presentacion: "Sólido",
            peso_volumen: "250g",
            marca: "Merck",
            sticker: "Amarillo",
            ubicacion: "L1",
            estado: "En uso",
        },
        {
            codigo: "ETH01",
            nombre: "Etanol",
            presentacion: "Líquido",
            peso_volumen: "1L",
            marca: "Fermont",
            sticker: "Azul",
            ubicacion: "CF",
            estado: "Disponible",
        },
        {
            codigo: "PHEN01",
            nombre: "Fenolftaleína",
            presentacion: "Polvo",
            peso_volumen: "25g",
            marca: "Sigma Aldrich",
            sticker: "Naranja",
            ubicacion: "Almacén",
            estado: "En uso",
        },
    ],
};

export default function InventarioGenerico() {
    const { tipo } = useParams();
    const columnas = columnasMap[tipo];
    const [busqueda, setBusqueda] = useState("");
    const [modoAgregar, setModoAgregar] = useState(false); // para el boton de agregar

    if (!columnas || !datosSimulados[tipo]) {
        return (
            <p className="p-4 text-red-600">
                Tipo de inventario no válido: {tipo}
            </p>
        );
    }

    const PanelAgregarMap = {
        equipos: PanelAgregarEquipo,
        materiales: PanelAgregarMaterial,
        reactivos: PanelAgregarReactivo,
    };

    const PanelAgregar = PanelAgregarMap[tipo];
    const data = datosSimulados[tipo];

    return (
        <div className="p-4 -mt-1 w-full max-w-full overflow-x-hidden">
            <h2 className="text-poppins text-2xl font-bold mb-2">
                Inventario de {tipo}
            </h2>
            <h3 className="text-montserrat text-base font-regular mb-4">
                Gestione el inventario: agregue, edite o elimine {tipo}, y
                visualice sus detalles.
            </h3>
            <TableToolbar
                tipo={tipo}
                searchTerm={busqueda}
                onSearchChange={setBusqueda}
                onAddClick={() => setModoAgregar(true)}
            />
            <TablaInventario data={data} columns={columnas} />
            {modoAgregar && (
                <PanelAgregarProducto
                    tipo={tipo}
                    onClose={() => setModoAgregar(false)}
                />
            )}
        </div>
    );
}