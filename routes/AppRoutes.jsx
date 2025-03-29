import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/components/layout";
import Login from "../src/pages/Login";
import Dashboard from "../src/pages/Dashboard";
import Solicitudes from "../src/pages/GestionSolicitudes";
import InventarioEquipos from "../src/pages/InventarioEquipos";
import InventarioMateriales from "../src/pages/InventarioMateriales";
import InventarioReactivos from "../src/pages/InventarioReactivos";
import Usuarios from "../src/pages/GestionUsuarios";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />

                {/* Rutas del sistema con Layout (Sidebar y Header), se agrupan para que todas tengan el Layout */}
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/gestion/solicitudes" element={<Solicitudes />} />
                    <Route path="/inventario/equipos" element={<InventarioEquipos />} />
                    <Route path="/inventario/materiales" element={<InventarioMateriales />} />
                    <Route path="/inventario/reactivos" element={<InventarioReactivos />} />
                    <Route path="/gestion/usuarios" element={<Usuarios />} />
                </Route>
            </Routes>
        </Router>
    );
}
