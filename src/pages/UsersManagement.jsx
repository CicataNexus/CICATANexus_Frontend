import { useEffect, useState } from "react";
import TableToolbar from "../components/ui/TableToolbar";
import UsersTable from "@/features/users-mgmt/UsersTable";
import { UsersColumns } from "@/features/users-mgmt/UsersColumns";
import AddUserModalPanel from "@/features/users-mgmt/AddUserModalPanel";

export default function UsersManagement() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddingMode, setIsAddingMode] = useState(false);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsAddingMode(false);
  };

  const columns = UsersColumns(handleEdit, selectedUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/v1/user");
        if (!response.ok) {
          throw new Error("Error fetching users data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <p className="p-4 text-red-600">Cargando datos de usuarios...</p>;
  }

  return (
    <div className="p-4 -mt-1 w-full max-w-full overflow-x-hidden">
      <h2 className="text-poppins text-2xl font-bold mb-2">
        Gestión de usuarios
      </h2>
      <h3 className="text-montserrat text-base font-regular mb-4">
        Administre los usuarios: cree nuevos, edite información o elimínelos
        según sea necesario.
      </h3>
      <TableToolbar
        type="users"
        searchTerm={search}
        onSearchChange={setSearch}
        onAddClick={() => {
          setIsAddingMode(true);
          setSelectedUser(null);
        }}
      />
      <UsersTable
        data={data}
        columns={columns}
        selectedUser={selectedUser}
        onCloseEdit={() => setSelectedUser(null)}
      />
      {isAddingMode && (
        <AddUserModalPanel
          onClose={() => setIsAddingMode(false)}
          isEditing={false}
        />
      )}
    </div>
  );
}
