import { Icon } from "@iconify/react";
import { useLocation, Link } from "react-router-dom";
import { Logout } from "@/components/LogoutFooter";

const Header = () => {
    const location = useLocation();
    const isRequestForm = location.pathname.startsWith("/request");

    return (
        <div className="flex h-fit items-center justify-between bg-gradient-to-r from-blue-bg-gradient to-dim-blue-background px-6">
            <div className="flex">
                {" "}
                <img
                    src="/CicataWhite.png"
                    alt="Logo CICATA"
                    className="h-12 w-auto m-4"
                />
                <img
                    src="/SepWhite.png"
                    alt="Logo SEP"
                    className="h-12 w-auto m-4"
                />
                <img
                    src="/IpnWhite.png"
                    alt="Logo IPN"
                    className="h-14 w-auto m-4"
                />
            </div>

            <div className="flex items-center text-white">
                <div className="m-4 flex">
                    {isRequestForm ? (
                        <Link
                            to="/myRequests"
                            className="flex items-center justify-center gap-2 text-white font-poppins font-semibold text-base transition-all duration-200 ease-in-out px-4 py-2 rounded-md hover:text-sidebar-accent-foreground cursor-pointer"
                        >
                            <Icon icon="fluent:form-28-regular" className="text-2xl" />
                            <span>
                                Mis Solicitudes
                            </span>
                        </Link>
                    ) : (
                        <Link
                            to="/request/equipment"
                            className="flex items-center justify-center gap-2 text-white font-poppins font-semibold text-base transition-all duration-200 ease-in-out px-4 py-2 rounded-md hover:text-sidebar-accent-foreground cursor-pointer"
                        >
                            <Icon icon="fluent:form-new-28-regular" className="text-2xl" />
                            <span>
                                Nueva Solicitud
                            </span>
                        </Link>
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
