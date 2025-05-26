import React, { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { ROLES } from "@/constants/roles";

function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const { role } = jwtDecode(token);
                const roleHomeRoutes = {
                    [ROLES.ADMIN]: "/dashboard",
                    [ROLES.TECH]: "/gestion/solicitudes",
                    [ROLES.USER]: "/solicitud/equipo",
                };
                navigate(roleHomeRoutes[role] || "/", { replace: true });
            } catch (error) {
                console.error("Token inválido:", error);
                localStorage.removeItem("token");
            }
        }
    }, []);
    const [matricula, setMatricula] = useState("");
    const matriculaRef = useRef(null);
    const passwordRef = useRef(null);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");

        // Usuarios temporales para no prender la api
        if (matricula === "ana" && password === "123") {
            const token = import.meta.env.VITE_ADMIN_TOKEN;
            localStorage.setItem("token", token);
            navigate("/dashboard");
            return;
        }
        if (matricula === "pepe" && password === "123") {
            const token = import.meta.env.VITE_TECH_TOKEN;
            localStorage.setItem("token", token);
            navigate("/gestion/solicitudes");
            return;
        }
        if (matricula === "juan" && password === "123") {
            const token = import.meta.env.VITE_USER_TOKEN;
            localStorage.setItem("token", token);
            navigate("/solicitud/equipo");
            return;
        }

        if (!matricula || !password) {
            if (!matricula && !password) {
                setError("Por favor, ingrese su clave de usuario y contraseña");
                matriculaRef.current?.focus();
            } else if (!matricula) {
                setError("Por favor, ingrese su clave de usuario");
                matriculaRef.current?.focus();
            } else if (!password) {
                setError("Por favor, ingrese su contraseña");
                passwordRef.current?.focus();
            }
            return;
        }

        // Validar credenciales con el back
        try {
            const response = await fetch(
                `http://${import.meta.env.VITE_SERVER_IP}:${
                    import.meta.env.VITE_SERVER_PORT
                }/v1/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ matricula, password }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                const token = data.token;
                localStorage.setItem("token", token);
                localStorage.setItem("matricula", matricula);
                const decoded = jwtDecode(token);
                console.log(decoded);
                const role = decoded.role;

                // Dependiendo del rol, se envía al usuario a su ruts
                switch (role) {
                    case ROLES.ADMIN:
                        navigate("/dashboard");
                        break;
                    case ROLES.TECH:
                        navigate("/gestion/solicitudes");
                        break;
                    case ROLES.USER:
                        navigate("/solicitud/equipo");
                        break;
                    default:
                        setError("Usuario con rol no reconocido");
                        break;
                }
            } else {
                setError("Datos incorrectos, intente nuevamente");
            }
        } catch (error) {
            setError(data.error);
        }
    };

    return (
        <>
            <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-blue-bg-gradient to-dim-blue-background overflow-hidden">
                <header className="fixed top-0 w-full flex items-center justify-between px-15 py-3">
                    <img
                        src="/SepWhite.png"
                        alt="Logo SEP"
                        className="h-12 w-auto"
                    />
                    <img
                        src="/IpnWhite.png"
                        alt="Logo IPN"
                        className="h-14 w-auto"
                    />
                    <img
                        src="/CicataWhite.png"
                        alt="Logo CICATA"
                        className="h-12 w-auto"
                    />
                </header>

                {/* Spheres for background */}
                <div className="fixed bottom-20 left-3 w-65 h-65 bg-sphere-blue opacity-50 blur-[100px] rounded-full"></div>
                <div className="fixed top-10 right-3 w-65 h-65 bg-sphere-blue opacity-50 blur-[100px] rounded-full"></div>

                <div className="fixed rounded-2xl min-w-[42vw] max-w-[42vw] min-h-[40vh] max-h-[45vh]">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}
                    >
                        <div className="flex flex-col w-full h-full items-center justify-center text-center p-15 gap-10 bg-white rounded-2xl">
                            <h1 className="text-3xl text-black font-semibold font-poppins">
                                Iniciar Sesión
                            </h1>
                            <div className="flex flex-col items-center justify-center text-center gap-5 flex-grow">
                                <div className="flex flex-col min-w-[30vw] max-w-[40vw] text-1xl text-left gap-1 font-montserrat">
                                    <span className="font-semibold">
                                        Clave de usuario
                                    </span>
                                    <input
                                        type="text"
                                        ref={matriculaRef}
                                        value={matricula}
                                        onChange={(e) =>
                                            setMatricula(e.target.value)
                                        }
                                        className="rounded-md p-1 border-2 border-gray-200 outline-none focus:border-input-focus focus:bg-input-background placeholder:text-sm placeholder:text-placeholder-text"
                                        placeholder="Ingrese su clave de usuario"
                                    ></input>
                                </div>
                                <div className="flex flex-col min-w-[30vw] max-w-[40vw] text-1xl text-left gap-1 font-montserrat">
                                    <span className="font-semibold">
                                        Contraseña
                                    </span>
                                    <div className="relative">
                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            ref={passwordRef}
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                setError("");
                                            }}
                                            className="w-full rounded-md p-1 pr-10 border-2 border-gray-200 outline-none focus:border-input-focus focus:bg-input-background placeholder:text-sm placeholder:text-placeholder-text"
                                            placeholder="Ingrese su contraseña"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none cursor-pointer"
                                        >
                                            <Icon
                                                icon={
                                                    showPassword
                                                        ? "mdi:eye-off-outline"
                                                        : "mdi:eye-outline"
                                                }
                                                className="text-lg"
                                            />
                                            <span className="sr-only">
                                                Mostrar u ocultar contraseña
                                            </span>
                                        </button>
                                    </div>
                                    <span className="mt-1 text-[15px] font-montserrat font-medium">
                                        ¿No tiene una cuenta?{" "}
                                        <button
                                            type="button"
                                            className="cursor-pointer text-dark-blue font-semibold hover:underline"
                                            onClick={() => {
                                                navigate("/registro");
                                            }}
                                        >
                                            Regístrese
                                        </button>
                                    </span>
                                    {/* Mensaje de error */}
                                    {error && (
                                        <span className="font-montserrat font-semibold text-red-500 text-sm mt-1 text-center">
                                            {error}
                                        </span>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="rounded-md p-2 min-w-[30vw] max-w-[40vw] items-center justify-center bg-primary-green text-white text-lg font-semibold font-poppins transition-all duration-200 hover:bg-login-btn-hover hover:scale-102 active:scale-95 cursor-pointer"
                                >
                                    Ingresar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
