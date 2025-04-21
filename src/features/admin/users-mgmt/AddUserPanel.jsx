import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Icon } from "@iconify/react";
import ModalUserConfirmation from "@/components/ModalUserConfirmation";
import SelectInput from "@/components/ui/SelectInput";

export default function AddUserPanel({
  onClose,
  initialData = {},
  isEditing = false,
}) {
  const [modalConfirming, setModalConfirming] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
  };

  const handleSubmit = async () => {
    const payload = {
      name: String(formData.name),
      matricula: String(formData.registrationNumber), // Backend expects "matricula" instead of "registrationNumber"
      email: String(formData.email),
      password: String(formData.password),
      role: String(formData.role),
    };

    try {
      const response = await fetch(`http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        throw new Error("Error al agregar usuario");
      }
      // If product was added successfully, set confirmation
      setModalConfirming(false);
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = async () => {
    const payload = {
      name: String(formData.name),
      matricula: String(formData.registrationNumber), // Backend expects "matricula" instead of "registrationNumber"
      email: String(formData.email),
      password: String(formData.password),
      role: String(formData.role),
    };

    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/v1/user/${formData.registrationNumber}`,
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
      }
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
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar usuario");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {showConfirmation && (
        <ModalUserConfirmation
          onClose={onClose}
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
                Nombre
                <Input
                  name={"name"}
                  value={formData["name"]}
                  onChange={handleChange}
                  placeholder={"Ingrese el nombre"}
                  className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                />
              </label>
              <label className="font-montserrat font-semibold">
                Rol
                <SelectInput
                  name="role"
                  onChange={handleChange}
                  value={formData.role}
                  placeholder="Seleccione el tipo de rol"
                  options={[
                    { value: "user", label: "Usuario" },
                    { value: "Tech", label: "Técnico" },
                    { value: "Administrator", label: "Administrador" },
                  ]}
                />
              </label>
              <label
                key={"password"}
                className="flex flex-col font-montserrat font-semibold"
              >
                Contraseña
                <div className="relative mt-1">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name={"password"}
                    value={formData["password"]}
                    onChange={handleChange}
                    placeholder={"Ingrese la contraseña"}
                    className="pr-10 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                  >
                    <Icon
                      icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                      className="text-lg"
                    />
                  </button>
                </div>
              </label>

              <label
                key={"registrationNumber"}
                className="flex flex-col font-montserrat font-semibold"
              >
                Clave de usuario
                <Input
                  name={"registrationNumber"}
                  value={formData["registrationNumber"]}
                  onChange={handleChange}
                  placeholder={"Ingrese la clave de usuario"}
                  className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                />
              </label>
              <label
                key={"email"}
                className="flex flex-col font-montserrat font-semibold"
              >
                Correo electrónico
                <Input
                  name={"email"}
                  value={formData["email"]}
                  onChange={handleChange}
                  placeholder={"Ingrese el correo electrónico"}
                  className="mt-1 placeholder:text-xs placeholder:font-montserrat placeholder:font-normal font-normal h-8"
                />
              </label>
            </div>
          </fieldset>
        </div>
      </div>

      {/* Buttons */}
      {isEditing ? (
        <div className="flex justify-between pt-4 mb-4">
          <div className="flex ml-4">
            <Button
              className="bg-delete-btn hover:bg-delete-btn-hover text-white text-base font-poppins font-semibold py-2 px-4 rounded-xl transition inline-flex items-center cursor-pointer"
              onClick={() => {
                setModalConfirming(true);
                setShowConfirmation(true);
              }}
            >
              <Icon icon="ix:trashcan-filled" className="mr-2 text-xl" />
              Eliminar usuario
            </Button>
          </div>
          <div className="flex gap-4 mr-4">
            <Button
              onClick={onClose}
              className="w-40 bg-reject-btn hover:bg-reject-btn-hover text-white text-base font-poppins font-semibold py-2 px-4 rounded-xl transition inline-flex items-center cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => handleEdit()}
              className="w-40 bg-approve-btn hover:bg-approve-btn-hover text-white text-base font-poppins font-semibold py-2 px-4 rounded-xl transition inline-flex items-center cursor-pointer"
            >
              Aplicar cambios
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center gap-4 pt-4 mb-4">
          <Button
            onClick={onClose}
            className="w-40 bg-reject-btn hover:bg-reject-btn-hover text-white font-poppins font-semibold text-lg"
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
