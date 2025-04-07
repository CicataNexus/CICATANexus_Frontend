import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [matricula, setMatricula] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");

        // Usuario temporal para no prender la api
        if (matricula === "ana" && password === "123") {
            localStorage.setItem("token", "simulatedToken");
            navigate("/dashboard");
            return;
        }
        if (!matricula && !password) {
            setError("Por favor, ingrese su clave de usuario y contraseña");
            return;
        }
        else if (!matricula) {
            setError("Por favor, ingrese su clave de usuario");
            return;
        }
        else if (!password) {
            setError("Por favor, ingrese su contraseña");
            return;
        }

        // Validar credenciales con el back
        try {
            const response = await fetch("http://localhost:3000/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ matricula, password })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                localStorage.setItem("token", data.token);
                navigate("/dashboard");
            }
            else {
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
                                    value={matricula}
                                    onChange={ (e) => setMatricula(e.target.value) }
                                    className="rounded-md p-1 border-2 border-gray-200 outline-none focus:border-input-focus focus:bg-input-background placeholder:text-sm placeholder:text-placeholder-text"
                                    placeholder="Ingrese su clave de usuario"
                                ></input>
                            </div>
                            <div className="flex flex-col min-w-[30vw] max-w-[40vw] text-1xl text-left gap-1 font-montserrat">
                                <span className="font-semibold">Contraseña</span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError(""); // Limpiar error si el usuario empieza a escribir
                                    }}
                                    className="rounded-md p-1 border-2 border-gray-200 outline-none focus:border-input-focus focus:bg-input-background placeholder:text-sm placeholder:text-placeholder-text"
                                    placeholder="Ingrese su contraseña"
                                />
                                {/* Mensaje de error */}
                                {error && <span className="font-montserrat text-red-500 text-sm mt-1 text-center">{error}</span>}
                            </div>
                            <button
                                className="rounded-md p-2 min-w-[30vw] max-w-[40vw] items-center justify-center bg-primary-green text-white text-lg font-bold font-poppins transition-all duration-200 hover:bg-login-btn-hover hover:scale-102 active:scale-95"
                                onClick={handleLogin}
                            >
                                Ingresar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;