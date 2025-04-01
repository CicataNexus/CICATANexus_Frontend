import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/components/Layout";
import Login from "../src/pages/Login";
import Dashboard from "../src/pages/Dashboard";
import Solicitudes from "../src/pages/RequestsManagement";
import InventarioGenerico from "../src/pages/GenericInventory";
import Usuarios from "../src/pages/UsersManagement";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />

                {/* Routes with Layout (Header and Footer) */}
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/gestion/solicitudes" element={<Solicitudes />} />
                    <Route path="/inventario/:type" element={<InventarioGenerico />} />
                    <Route path="/gestion/usuarios" element={<Usuarios />} />
                </Route>
            </Routes>
        </Router>
    );
}
