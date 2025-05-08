import { GoBeaker } from "react-icons/go";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);

    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location]);

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="w-full flex justify-around h-24 items-center">
            <div
                className={`flex items-center p-4 justify-center cursor-pointer hover:text-dark-blue ${
                    activeItem === "/solicitud/equipo"
                        ? "text-dark-blue border-b-2 "
                        : "text-deep-blue"
                }`}
                onClick={() => handleNavigation("/solicitud/equipo")}
            >
                <Icon icon="iconoir:microscope-solid" className="text-2xl" />
                <div className="pl-4 font-poppins font-bold text-lg">
                    Solicitar equipo
                </div>
            </div>
            <div
                className={`flex items-center p-4 justify-center cursor-pointer hover:text-dark-blue ${
                    activeItem === "/solicitud/material"
                        ? "text-dark-blue border-b-2 "
                        : "text-deep-blue"
                }`}
                onClick={() => handleNavigation("/solicitud/material")}
            >
                <GoBeaker size={25} />
                <div className="pl-4 font-poppins font-bold text-lg">
                    Solicitar reactivos y materiales
                </div>
            </div>
            <div
                className={`flex items-center p-4 justify-center cursor-pointer hover:text-dark-blue ${
                    activeItem === "/solicitud/apoyo"
                        ? "text-dark-blue border-b-2 "
                        : "text-deep-blue"
                }`}
                onClick={() => handleNavigation("/solicitud/apoyo")}
            >
                <Icon icon="mdi:account-help" className="text-3xl" />
                <div className="pl-4 font-poppins font-bold text-lg">Apoyo técnico</div>
            </div>
        </div>
    );
};

export default Navbar;
