import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { showToast } from '@/utils/toastUtils';
import { ROLES } from "@/constants/roles";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        registrationNumber: "",
        email: "",
        password: "",
        role: ROLES.USER,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [globalError, setGlobalError] = useState("");


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({ ...prev, [name]: false }));
    };

    const handleRegister = async () => {
        setGlobalError(""); // Limpiar el error

        // Validaciones previas
        // if (!formData.name || !formData.registrationNumber || !formData.email || !formData.password) {
        //     setError("Todos los campos son requeridos.");
        //     return;
        // }
        // if (formData.password.length < 6) {
        //     setError("La contraseña debe tener al menos 6 caracteres.");
        //     return;
        // }
        // if (!/\S+@\S+\.\S+/.test(formData.email)) {
        //     setError("Por favor ingresa un correo electrónico válido.");
        //     return;
        // }

        const newErrors = {
            name: !formData.name.trim(),
            registrationNumber: !formData.registrationNumber.trim(),
            email: (() => {
                if (formData.email.trim() === "") return "Este campo es obligatorio";
                if (!/\S+@\S+\.\S+/.test(formData.email)) return "Correo no válido: example@ipn.mx";
                return "";
            })(),
            password: !formData.password.trim()
                ? "Este campo es obligatorio"
                : formData.password.length < 6
                ? "La contraseña debe tener al menos 6 caracteres"
                : "",
        };
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((error) => error);
        if (hasErrors) return;

        try {
            const response = await fetch(
                `http://${import.meta.env.VITE_SERVER_IP}:${
                    import.meta.env.VITE_SERVER_PORT
                }/v1/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            if (response.ok) {
                navigate("/");
                showToast("Usuario registrado correctamente", "success");
            } else {
                const errorData = await response.json();
                if (errorData.error === "Failed to create user: registrationNumber already exists") {
                    showToast("La clave de usuario ya existe", "error");
                }
                else if (errorData.error === "Failed to create user: Email already in use") {
                    showToast("El correo electrónico ya existe", "error");
                }
                else {
                    showToast("Error al agregar usuario", "error");
                }
                throw new Error("Error al agregar usuario");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
        <div className="w-full min-h-screen bg-gradient-to-b from-blue-bg-gradient to-dim-blue-background flex flex-col items-center">
            <header className="w-full flex items-center justify-between px-15 py-3 z-50">
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

                <div className="rounded-2xl w-full max-w-[42vw] bg-white my-10 shadow-md">
                    <div className="flex flex-col w-full h-full items-center justify-center text-center p-15 gap-10 bg-white rounded-2xl">
                        <h1 className="text-3xl text-black font-semibold font-poppins">
                            Crear una cuenta
                        </h1>
                        <div className="flex flex-col items-center justify-center text-center gap-3 flex-grow">
                            <div className="flex flex-col min-w-[30vw] max-w-[40vw] text-1xl text-left gap-1 font-montserrat">
                                <span className="font-semibold">
                                    Nombre completo{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="rounded-md p-1 border-2 border-gray-200 outline-none focus:border-input-focus focus:bg-input-background placeholder:text-sm placeholder:text-placeholder-text"
                                    placeholder="Ingrese su nombre completo"
                                />
                                {errors.name && (
                                    <span className="font-montserrat font-semibold text-red-500 text-sm">Este campo es obligatorio</span>
                                )}
                            </div>
                            <div className="flex flex-col min-w-[30vw] max-w-[40vw] text-1xl text-left gap-1 font-montserrat">
                                <span className="font-semibold">
                                    Clave de usuario{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                                <input
                                    type="text"
                                    name="registrationNumber"
                                    value={formData.registrationNumber}
                                    onChange={handleChange}
                                    className="rounded-md p-1 border-2 border-gray-200 outline-none focus:border-input-focus focus:bg-input-background placeholder:text-sm placeholder:text-placeholder-text"
                                    placeholder="Ingrese su clave de usuario"
                                />
                                {errors.registrationNumber && (
                                    <span className="font-montserrat font-semibold text-red-500 text-sm">Este campo es obligatorio</span>
                                )}
                            </div>
                            <div className="flex flex-col min-w-[30vw] max-w-[40vw] text-1xl text-left gap-1 font-montserrat">
                                <span className="font-semibold">
                                    Correo electrónico{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="rounded-md p-1 border-2 border-gray-200 outline-none focus:border-input-focus focus:bg-input-background placeholder:text-sm placeholder:text-placeholder-text"
                                    placeholder="Ingrese su correo electrónico"
                                />
                                {errors.email && (
                                    <span className="font-montserrat font-semibold text-red-500 text-sm">{errors.email}</span>
                                )}
                            </div>
                            <div className="flex flex-col min-w-[30vw] max-w-[40vw] text-1xl text-left gap-1 font-montserrat">
                                <span className="font-semibold">
                                    Contraseña{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
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
                                {errors.password && (
                                    <span className="font-montserrat font-semibold text-red-500 text-sm">{errors.password}</span>
                                )}
                                <span className="mt-1 text-[15px] font-montserrat font-medium">
                                    ¿Ya tiene una cuenta?{" "}
                                    <button
                                        className="cursor-pointer text-dark-blue font-semibold hover:underline"
                                        onClick={() => {
                                            navigate("/");
                                        }}
                                    >
                                        Entrar
                                    </button>
                                </span>
                                {/* Mensaje de error */}
                                {globalError && (
                                    <span className="font-montserrat font-semibold text-red-500 text-sm mt-1 text-center">
                                        {globalError}
                                    </span>
                                )}
                            </div>
                            <button
                                className="rounded-md p-2 min-w-[30vw] max-w-[40vw] items-center justify-center bg-primary-green text-white text-lg font-semibold font-poppins transition-all duration-200 hover:bg-login-btn-hover hover:scale-102 active:scale-95 cursor-pointer"
                                onClick={handleRegister}
                            >
                                Crear cuenta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
