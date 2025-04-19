import { useEffect, useState } from "react";
import { FaRegListAlt } from "react-icons/fa";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { Logout } from "@/components/LogoutFooter";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  useEffect(() => {
    navigate(activeItem);
  }, [activeItem]);

  const handleNavigation = () => {
    if (activeItem.startsWith("/request")) {
      setActiveItem("/myRequests");
    } else {
      setActiveItem("/request/equipment");
    }
  };

  return (
    <div className="flex h-fit items-center justify-between bg-gradient-to-r from-blue-bg-gradient to-dim-blue-background px-6">
      <div className="flex">
        {" "}
        <img src="/SepWhite.png" alt="Logo SEP" className="h-12 w-auto m-4" />
        <img src="/IpnWhite.png" alt="Logo IPN" className="h-14 w-auto m-4" />
        <img
          src="/CicataWhite.png"
          alt="Logo CICATA"
          className="h-12 w-auto m-4"
        />
      </div>
      <div className="flex items-center text-white">
        <div className="m-4 flex" onClick={() => handleNavigation()}>
          {activeItem.startsWith("/request") ? (
            <div className="flex">
              {" "}
              <FaRegListAlt size={25} />
              <p className="ml-2 font-poppins font-bold">Mis Solicitudes</p>
            </div>
          ) : (
            <div className="flex">
              {" "}
              <MdFormatListBulletedAdd size={25} />
              <p className="ml-2 font-poppins font-bold">Nueva Solicitud</p>
            </div>
          )}
        </div>

        <div className="flex items-center m-4">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Header;
