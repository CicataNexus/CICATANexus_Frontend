import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/components/layout";
import Login from "../src/pages/Login";
import Dashboard from "../src/pages/Dashboard";
import Solicitudes from "../src/pages/GestionSolicitudes";
import InventarioGenerico from "../src/pages/InventarioGenerico";
import Usuarios from "../src/pages/GestionUsuarios";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />

                {/* Rutas del sistema con Layout (Sidebar y Header) */}
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/gestion/solicitudes" element={<Solicitudes />} />
                    <Route path="/inventario/:tipo" element={<InventarioGenerico />} />
                    <Route path="/gestion/usuarios" element={<Usuarios />} />
                </Route>
            </Routes>
        </Router>
    );
}
