import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoutes({ allowedRoles }) {
    const token = localStorage.getItem("token");

    // Redirect to login if no token
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // Declare role before try
    let role = null;
    try {
        const decoded = jwtDecode(token);
        role = decoded.role;
    } catch (error) {
        console.error("Error decoding token:", error);
        return <Navigate to="/" replace />;
    }    

    const roleHomeRoutes = {
        Administrator: "/dashboard",
        tech: "/gestion/solicitudes",
        user: "/request/equipment",
    };

    // Redirects to the home route of the role if the role is not in the allowed roles
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to = {roleHomeRoutes[role] || "/"} replace />;
    }

    return <Outlet />;
}
