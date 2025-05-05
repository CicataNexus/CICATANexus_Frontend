import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Icon } from "@iconify/react";
import { showToast } from '@/utils/toastUtils';
import ModalUserConfirmation from "@/components/ModalUserConfirmation";
import SelectInput from "@/components/ui/SelectInput";

export default function AddUserPanel({
    onClose,
    initialData = {},
    isEditing = false,
    setReload,
}) {
    const [modalConfirming, setModalConfirming] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const requiredFields = [
        "name",
        "registrationNumber",
        "email",
        "password",
        "role",
    ];

    const [formData, setFormData] = useState({
        name: "",
        registrationNumber: "",
        email: "",
        password: "",
        role: "",
        workArea: "",
        ...initialData,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prevErrors) => ({
            // Delete the error for the field being changed
            ...prevErrors,
            [name]: false,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        requiredFields.forEach((field) => {
          if (!formData[field]) {
              newErrors[field] = "Este campo es obligatorio";
          }
      });
  
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Correo electrónico no válido";
      }
  
      if (formData.password && formData.password.length < 6) {
          newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // True if no errors
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        const cleanedRegistrationNumber = formData.registrationNumber.replace(
            /\s+/g,
            ""
        );

        const payload = {
            name: String(formData.name),
            registrationNumber: String(cleanedRegistrationNumber),
            email: String(formData.email),
            password: String(formData.password),
            role: String(formData.role),
        };

        if (formData.role === "tech") {
            payload.workArea = String(formData.workArea);
        }
        try {
            const response = await fetch(
                `http://${import.meta.env.VITE_SERVER_IP}:${
                    import.meta.env.VITE_SERVER_PORT
                }/v1/user`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.error === "registrationNumber already exists") {
                    showToast("La clave de usuario ya existe", "error");
                }
                else if (errorData.error === "Email already in use") {
                    showToast("El correo electrónico ya existe", "error");
                }
                else {
                    showToast("Error al agregar usuario", "error");
                }
                throw new Error("Error al agregar usuario");
            }
            setReload((prev) => !prev);
            setModalConfirming(false);
            setShowConfirmation(true);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleEdit = async () => {
        if (!validateForm()) {
            return;
        }

        const cleanedRegistrationNumber = formData.registrationNumber.replace(
            /\s+/g,
            ""
        );

        const payload = {
            name: String(formData.name),
            registrationNumber: String(cleanedRegistrationNumber),
            email: String(formData.email),
            password: String(formData.password),
            role: String(formData.role),
        };

        if (formData.role === "tech") {
            payload.workArea = String(formData.workArea);
        }

        try {
            const response = await fetch(
                `http://${import.meta.env.VITE_SERVER_IP}:${
                    import.meta.env.VITE_SERVER_PORT
                }/v1/user/${cleanedRegistrationNumber}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                throw new Error("Error al editar usuario");
            } else {
                showToast("Usuario editado correctamente", "success");
                onClose();
                setTimeout(() => {
                    setReload(prev => !prev);
                }, 0);
            }
            setReload((prev) => !prev);
            onClose();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(
                `http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/v1/user/${formData.registrationNumber}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Error al eliminar usuario");
            } else {
                showToast("Usuario eliminado exitosamente", "success");
                onClose();
                setTimeout(() => {
                    setReload(prev => !prev);
                }, 0);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            {showConfirmation && (
                <ModalUserConfirmation
                    onClose={() => setShowConfirmation(false)}
                    onDelete={handleDelete}
                    isConfirming={modalConfirming}
                />
            )}

            <div className="flex flex-col gap-4 text-sm text-black font-montserrat bg-white rounded-xl">
                {/* Columns Grid */}
                <div className=" divide-x divide-primary-blue">
                    {/* Column 1 - Información general */}
                    <fieldset className="space-y-2 p-4">
                        <h2 className="font-poppins font-bold text-base text-center mt-2 mb-2">
                            Datos del usuario
                        </h2>
                        <div className="grid grid-cols-3 gap-2">
                            <label
                                key={"name"}
                                className="flex flex-col font-montserrat font-semibold"
                            >
                                <span>
                                    Nombre{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                                <Input
                                    name={"name"}
                                    value={formData["name"]}
                                    onChange={handleChange}
                                    placeholder={"Ingrese el nombre"}
                                    required
                                    showError={errors.name}
                                    errorMessage={"Este campo es obligatorio"}
                                    className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                                />
                            </label>
                            <label className="font-montserrat font-semibold">
                                <span>
                                    Rol <span className="text-red-500">*</span>
                                </span>
                                <SelectInput
                                    name="role"
                                    onChange={handleChange}
                                    value={formData.role}
                                    placeholder="Seleccione el tipo de rol"
                                    required
                                    showError={errors.role}
                                    errorMessage={"Este campo es obligatorio"}
                                    className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal font-montserrat h-8 focus:text-sm"
                                    options={[
                                        { value: "user", label: "Usuario" },
                                        { value: "tech", label: "Técnico" },
                                        {
                                            value: "Administrator",
                                            label: "Administrador",
                                        },
                                    ]}
                                />
                            </label>
                            <label
                                key={"password"}
                                className="flex flex-col font-montserrat font-semibold"
                            >
                                <span>
                                    Contraseña{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                                <div className="relative mt-1">
                                    <Input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name={"password"}
                                        value={formData["password"]}
                                        onChange={handleChange}
                                        placeholder={"Ingrese la contraseña"}
                                        required
                                        className={`w-full placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8 ${errors.password ? "border-red-500" : "border-gray-500"}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
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
                                    <span className="text-red-500 text-xs mt-0.5">{errors.password}</span>
                                )}
                            </label>

                            <label
                                key={"registrationNumber"}
                                className="flex flex-col font-montserrat font-semibold"
                            >
                                {isEditing ? (
                                    <>
                                        <span>Clave de usuario</span>
                                        <p className="font-montserrat font-normal">
                                            {formData.registrationNumber}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <span>
                                            Clave de usuario{" "}
                                            <span className="text-red-500">*</span>
                                        </span>
                                        <Input
                                            name={"registrationNumber"}
                                            value={formData["registrationNumber"]}
                                            onChange={handleChange}
                                            placeholder={"Ingrese la clave de usuario"}
                                            required
                                            showError={errors.registrationNumber}
                                            errorMessage={"Este campo es obligatorio"}
                                            className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                                        />
                                    </>
                                )}
                            </label>
                            <label
                                key={"email"}
                                className="flex flex-col font-montserrat font-semibold"
                            >
                                <span>
                                    Correo electrónico{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                                <Input
                                    type="email"
                                    name={"email"}
                                    value={formData["email"]}
                                    onChange={handleChange}
                                    placeholder={
                                        "Ingrese el correo electrónico"
                                    }
                                    required
                                    showError={errors.email}
                                    errorMessage={errors.email}
                                    className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                                />
                            </label>
                            {formData.role === "tech" && (
                                <label
                                    key="workArea"
                                    className="flex flex-col font-montserrat font-semibold"
                                >
                                    <span>
                                        Área de trabajo{" "}
                                        <span className="text-red-500">*</span>
                                    </span>
                                    <SelectInput
                                        name="workArea"
                                        value={formData["workArea"]}
                                        onChange={handleChange}
                                        placeholder="Ingrese el área de trabajo"
                                        options={[
                                            {
                                                value: "Laboratorio de Biología Molecular",
                                                label: "Laboratorio de Biología Molecular",
                                            },
                                            {
                                                value: "Laboratorio de Cultivo Celular y Microscopía",
                                                label: "Laboratorio de Cultivo Celular y Microscopía",
                                            },
                                            {
                                                value: "Anexo de Cultivo Celular",
                                                label: "Anexo de Cultivo Celular",
                                            },
                                            {
                                                value: "Laboratorio de Microbiología",
                                                label: "Laboratorio de Microbiología",
                                            },
                                            {
                                                value: "Laboratorio de Cromatografía y Espectrofotometría",
                                                label: "Laboratorio de Cromatografia y Espectrofotometría",
                                            },
                                            {
                                                value: "Laboratorio de Bioprocesos",
                                                label: "Laboratorio de Bioprocesos",
                                            },
                                            {
                                                value: "Laboratorio de Acondicionamiento",
                                                label: "Laboratorio de Acondicionamiento",
                                            },
                                            {
                                                value: "Cámara Fría",
                                                label: "Cámara Fría",
                                            },
                                            {
                                                value: "Bioterio",
                                                label: "Bioterio",
                                            },
                                        ]}
                                        required
                                        showError={errors.name}
                                        errorMessage={
                                            "Este campo es obligatorio"
                                        }
                                        className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                                    />
                                </label>
                            )}
                        </div>
                    </fieldset>
                </div>
            </div>

            {/* Buttons */}
            {isEditing ? (
                <div className="flex justify-between pt-4 mb-4">
                    <div className="flex ml-4">
                        <Button
                            className="bg-delete-btn hover:bg-delete-btn-hover text-white text-base font-poppins font-semibold py-2 px-4 transition inline-flex items-center cursor-pointer"
                            onClick={() => {
                                setModalConfirming(true);
                                setShowConfirmation(true);
                            }}
                        >
                            <Icon
                                icon="ix:trashcan-filled"
                                className="mr-2 text-xl"
                            />
                            Eliminar usuario
                        </Button>
                    </div>
                    <div className="flex gap-4 mr-4">
                        <Button
                            onClick={onClose}
                            className="w-40 bg-gray-300 text-gray-600 hover:opacity-85 font-poppins font-semibold text-base"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => handleEdit()}
                            className="w-40 bg-sidebar hover:bg-dim-blue-background text-white text-base font-poppins font-semibold py-2 transition cursor-pointer text-center"
                        >
                            Aplicar cambios
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center gap-4 pt-4 mb-4">
                    <Button
                        onClick={onClose}
                        className="w-40 bg-gray-300 text-gray-600 hover:opacity-85 font-poppins font-semibold text-lg"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="w-40 bg-sidebar hover:bg-dim-blue-background text-white font-poppins font-semibold text-lg"
                    >
                        Agregar
                    </Button>
                </div>
            )}
        </>
    );
}
