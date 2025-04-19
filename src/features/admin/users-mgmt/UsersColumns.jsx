import { Icon } from "@iconify/react";

export const UsersColumns = (handleEdit, selectedUser) => [
  { header: "Nombre", accessorKey: "name" },
  { header: "Clave de usuario", accessorKey: "registrationNumber" },
  { header: "Rol", accessorKey: "role" },
  { header: "Correo electrónico", accessorKey: "email" },
  {
    header: "",
    id: "actions",
    cell: ({ row }) => {
      const isSelected =
        selectedUser?.registrationNumber === row.original.registrationNumber;
      return (
        <button
          onClick={() => handleEdit(row.original)}
          className={`text-black p-1 cursor-pointer transition-transform duration-200 ease-in-out ${
            isSelected
              ? "text-popup-background scale-115"
              : "hover:text-popup-background hover:scale-115"
          }`}
          title="Editar usuario"
        >
          <Icon icon="mdi:edit-circle-outline" className="text-2xl" />
        </button>
      );
    },
  },
];
