import { RiMicroscopeLine } from "react-icons/ri";
import { GoBeaker } from "react-icons/go";
import { RiCustomerService2Line } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

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
    <div className="w-full flex justify-around h-24 bg-neutral-100 items-center">
      <div
        className={`flex items-center p-4 justify-center cursor-pointer ${
          activeItem === "/request/equipment"
            ? "text-dark-blue border-b-2 "
            : "text-deep-blue"
        }`}
        onClick={() => handleNavigation("/request/equipment")}
      >
        <RiMicroscopeLine size={25} />
        <div className="pl-4">Solicitar equipo</div>
      </div>
      <div
        className={`flex items-center p-4 justify-center cursor-pointer ${
          activeItem === "/request/materials"
            ? "text-dark-blue border-b-2 "
            : "text-deep-blue"
        }`}
        onClick={() => handleNavigation("/request/materials")}
      >
        <GoBeaker size={25} />
        <div className="pl-4">Solicitar reactivos y materiales</div>
      </div>
      <div
        className={`flex items-center p-4 justify-center cursor-pointer ${
          activeItem === "/request/support"
            ? "text-dark-blue border-b-2 "
            : "text-deep-blue"
        }`}
        onClick={() => handleNavigation("/request/support")}
      >
        <RiCustomerService2Line size={25} />
        <div className="pl-4">Apoyo técnico</div>
      </div>
    </div>
  );
};

export default Navbar;
