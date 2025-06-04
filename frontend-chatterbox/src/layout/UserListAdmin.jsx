import  { useState, useEffect } from "react";
import { User, Trash2, ShieldCheck, ShieldOff } from "lucide-react";
import UserServices from "../services/UserServices";
import { useNavigate } from "react-router";

function ConfirmModal({ open, onClose, onConfirm, message }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center "
   style={{ background: "rgba(0, 0, 0, 0.3)" }}>
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-xs w-full">
        <p className="mb-6 text-gray-800">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-black"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UserListAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
const navigate = useNavigate()
  const fetchUsers = () => {
    setLoading(true);
    UserServices.getAllUsers({
      search: "",
      page: page,
      size: 5,
    })
      .then((response) => {
        setUsers(response.data.content || []);
        setTotalPages(response.data.totalPages || 1);
      })
      .catch((error) => {
        console.log(error.response.status=="403");
        
        if(error.response.status=="403"){
            navigate("/")
        }
        setUsers([]);
        setTotalPages(1);
        console.error("Error fetching users:", error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const openModal = (action, user) => {
    setModalAction(action);
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalAction(null);
    setSelectedUser(null);
  };

  const handleModalConfirm = async () => {
    if (!selectedUser) return;
    try {
      if (modalAction === "delete") {
        await UserServices.deleteUser(selectedUser.id_usuario);
      } else if (modalAction === "make-admin") {
        await UserServices.makeUserAdmin(selectedUser.id_usuario);
      } else if (modalAction === "remove-admin") {
        await UserServices.removeUserAdmin(selectedUser.id_usuario);
      }
      fetchUsers();
    } catch (error) {
      console.error("Error performing action:", error);
    }
    closeModal();
  };

  return (
    <div className="min-h-screen background-primary flex flex-col items-center justify-center px-2 py-8">
      <h2 className="text-4xl md:text-6xl primary-color font-semibold mb-8 md:mb-10 text-center">
        User Management
      </h2>

      <div className="background-secondary border primary-color rounded-lg p-6 w-full max-w-4xl shadow-[0_1px_10px_rgba(0,0,0,0.05)] shadow-yellow-100">

        {loading && (
          <div className="text-center text-yellow-200 mb-4">
            Loading users...
          </div>
        )}

        {!loading && users.length === 0 && (
          <div className="text-center text-gray-400">No users found.</div>
        )}

        {users.length > 0 && (
          <div className="space-y-4 mb-6">
            {users.map((user) => (
              <div
                key={user.id_usuario}
                className="background-terciary border border-yellow-400 p-4 rounded flex items-center space-x-4 justify-between"
              >
                <div className="flex items-center space-x-4">
                  <User className="w-10 h-10 text-yellow-400" />
                  <div>
                    <p className="text-lg font-semibold">{user.nombre_usuario}</p>
                    <p className="text-gray-300">{user.email}</p>
                    <p className="text-gray-400 text-sm">Nickname: {user.apodo}</p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => openModal("delete", user)}
                    className="cursor-pointer px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded flex items-center space-x-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>

                  {user.es_admin_general === false ? (
                    <button
                      onClick={() => openModal("make-admin", user)}
                      className="cursor-pointer px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center space-x-1"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Make Admin</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => openModal("remove-admin", user)}
                      className="cursor-pointer px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded flex items-center space-x-1"
                    >
                      <ShieldOff className="w-4 h-4" />
                      <span>Remove Admin</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <button
              disabled={page === 0}
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              className="cursor-pointer px-3 py-1 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-1 text-white">
              Page {page + 1} of {totalPages}
            </span>
            <button
              disabled={page + 1 >= totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
              className="cursor-pointer px-3 py-1 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modal de confirmación */}
      <ConfirmModal
        open={modalOpen}
        onClose={closeModal}
        onConfirm={handleModalConfirm}
        message={
          modalAction === "delete"
            ? `Are you sure you want to delete user "${selectedUser?.nombre_usuario}"?`
            : modalAction === "make-admin"
            ? `Are you sure you want to make "${selectedUser?.nombre_usuario}" an admin?`
            : modalAction === "remove-admin"
            ? `Are you sure you want to remove admin rights from "${selectedUser?.nombre_usuario}"?`
            : ""
        }
      />
    </div>
  );
}
