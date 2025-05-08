import { useEffect, useState } from "react";
import TableToolbar from "../components/ui/TableToolbar";
import UsersTable from "@/features/admin/users-mgmt/UsersTable";
import { UsersColumns } from "@/features/admin/users-mgmt/UsersColumns";
import AddUserModalPanel from "@/features/admin/users-mgmt/AddUserModalPanel";

export default function UsersManagement() {
    const [search, setSearch] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isAddingMode, setIsAddingMode] = useState(false);
    const [reload, setReload] = useState(false);

const [search, setSearch] = useState("");
const [data, setData] = useState(null);
const [error, setError] = useState(null);
const [reload, setReload] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);
const [isAddingMode, setIsAddingMode] = useState(false);

// Pagination
const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(5);
const [totalItems, setTotalItems] = useState(0);

useEffect(() => { setPage(1); }, []);

const handleEdit = (user) => {
  if (selectedUser?.registrationNumber === user.registrationNumber) {
    setSelectedUser(null);
  } else {
    setSelectedUser(user);
    setIsAddingMode(false);
  }
};

const columns = UsersColumns(handleEdit, selectedUser);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/v1/user?page=${page}&limit=${pageSize}`
      );
      if (!response.ok) {
        throw new Error("Error fetching users data");
      }
      const result = await response.json();
      setData(result.users);
      setTotalItems(result.total);
    } catch (err) {
      setError(err);
    }
  };

  if (!isAddingMode && !selectedUser) {
    fetchData();
  }
}, [page, pageSize, reload, isAddingMode, selectedUser]);

if (!data) {
  return <p className="p-4 text-red-600 font-poppins">Cargando datos de usuarios</p>;
}

const normalizeText = (text) =>
  text
    ?.normalize("NFD")
    .replace(/[\u0301\u0300\u0302\u0308\u0304\u0307]/g, "")
    .toLowerCase();

const searchedItem = normalizeText(search);

const filteredData = data.filter((user) => {
  if (!searchedItem) return true;
  return (
    normalizeText(user.name).includes(searchedItem) ||
    normalizeText(user.registrationNumber).includes(searchedItem) ||
    normalizeText(user.email).includes(searchedItem)
  );
});


    return (
        <div className="p-4 -mt-1 w-full max-w-full overflow-x-hidden">
            <h2 className="text-poppins text-2xl font-bold mb-2">
                Gestión de usuarios
            </h2>
            <h3 className="text-montserrat text-base font-regular mb-4">
                Administre los usuarios: cree nuevos, edite información o
                elimínelos según sea necesario.
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
            {Array.isArray(data) && data.length === 0 ? (
                <div className="flex items-center justify-center h-[60vh] text-gray-500 font-montserrat text-4xl font-semibold text-center">
                    No hay usuarios registrados
                </div>
            ) : filteredData.length === 0 ? (
                <div className="flex items-center justify-center h-[60vh] text-gray-500 font-montserrat text-4xl font-semibold text-center">
                    No se encontraron usuarios para "{search}"
                </div>
            ) : (
                <UsersTable
                    data={filteredData}
                    columns={columns}
                    selectedUser={selectedUser}
                    onCloseEdit={() => setSelectedUser(null)}
                    setReload={setReload}
                    page={page}
                    setPage={setPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    totalItems={totalItems}
                />
            )}
            {isAddingMode && (
                <AddUserModalPanel
                    onClose={() => setIsAddingMode(false)}
                    isEditing={false}
                    setReload={setReload}
                />
            )}
        </div>
    );
}
