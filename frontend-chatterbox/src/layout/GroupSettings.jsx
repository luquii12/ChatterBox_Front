import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GroupServices from "../services/GroupServices";
import { FileText, Image as ImageIcon, Lock, Unlock, UserMinus, Users, Settings, UserPlus, X } from "lucide-react";

const PAGE_SIZE = 10;

const GroupSettings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    nombre: "",
    descripcion: "",
    privado: false,
    imagen: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState("info");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Modal state for adding users
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchPage, setSearchPage] = useState(0);
  const [searchTotalPages, setSearchTotalPages] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    GroupServices.getGroupById(id).then((res) => {
      setDataForm({
        nombre: res.data.nombre_grupo || "",
        descripcion: res.data.descripcion || "",
        privado: res.data.es_privado || false,
        imagen: null,
      });
    });
    fetchUsers(page);
    // eslint-disable-next-line
  }, [id, page]);

  const fetchUsers = (pageNumber) => {
    GroupServices.getGroupUsers(id, pageNumber, PAGE_SIZE).then((res) => {
      setUsers(res.data.content || []);
      setTotalPages(res.data.totalPages || 1);
    });
  };

  // Buscar usuarios para añadir
  const handleSearchUsers = (pageNumber = 0) => {
    setSearchLoading(true);
    GroupServices.searchUsers(id, searchUser)
      .then((res) => {
        setSearchResults(res.data.content || []);
        setSearchTotalPages(res.data.totalPages || 1);
        setSearchPage(pageNumber);
      })
      .catch(() => {
        setSearchResults([]);
        setSearchTotalPages(1);
        setSearchPage(0);
      })
      .finally(() => {
        setSearchLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setDataForm({ ...dataForm, imagen: files[0] });
      setImagePreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else if (type === "checkbox") {
      setDataForm({ ...dataForm, privado: checked });
    } else {
      setDataForm({ ...dataForm, [name]: value });
    }
  };

  const handleTogglePrivado = () => {
    setDataForm((prev) => ({ ...prev, privado: !prev.privado }));
  };

  const handleRemoveUser = (userId) => {
    GroupServices.removeUserFromGroup(id, userId).then(() => {
      if (users.length === 1 && page > 0) {        
        setPage(page - 1);
      } else {
        fetchUsers(page);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre_grupo", dataForm.nombre);
    formData.append("descripcion", dataForm.descripcion);
    formData.append("es_privado", dataForm.privado);
    if (dataForm.imagen) formData.append("foto_grupo", dataForm.imagen);

    GroupServices.updateGroup(id, formData)
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate(`/group/${id}`);
        }, 800);
      })
      .catch((error) => {
        console.error("Error updating group:", error);
      });
  };

  // Añadir usuario al grupo desde el modal
  const handleAddUserToGroup = (userId) => {
    GroupServices.addUserToGroup(id, userId).then(() => {
      fetchUsers(page);
      setShowAddUserModal(false);
      setSearchUser("");
      setSearchResults([]);
      setSearchPage(0);
    });
  };

  const handleToggleAdmin = (userId, makeAdmin) => {
    if (makeAdmin) {
      GroupServices.setUserAdmin(id, userId, true).then(() => {
        fetchUsers(page);
      });
    } else {
      GroupServices.deleteUserAdmin(id, userId).then(() => {
        fetchUsers(page);
      });
    }
  };

  return (
    <div className="min-h-screen background-primary flex flex-col items-center justify-center px-2 py-8">
      <h2 className="text-4xl md:text-5xl primary-color font-semibold mb-8 text-center">
        Group Settings
      </h2>
      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          className={`flex items-center gap-2 px-5 py-2 rounded-t-lg font-semibold transition cursor-pointer ${
            tab === "info"
              ? "bg-yellow-400 text-black shadow"
              : "bg-gray-700 text-yellow-200 hover:bg-yellow-400 hover:text-black"
          }`}
          onClick={() => setTab("info")}
        >
          <Settings className="w-5 h-5" />
          Group Info
        </button>
        <button
          className={`flex items-center gap-2 px-5 py-2 rounded-t-lg font-semibold transition cursor-pointer ${
            tab === "users"
              ? "bg-yellow-400 text-black shadow"
              : "bg-gray-700 text-yellow-200 hover:bg-yellow-400 hover:text-black"
          }`}
          onClick={() => setTab("users")}
        >
          <Users className="w-5 h-5" />
          Manage Users
        </button>
      </div>

      {/* Mensaje de éxito */}
      {success && (
        <div className="mb-4 px-4 py-3 rounded bg-green-500 text-white text-center font-semibold shadow">
          Group updated successfully!
        </div>
      )}

      {/* Contenido de pestañas */}
      {tab === "info" && (
        <form
          onSubmit={handleSubmit}
          className="background-secondary border primary-color rounded-lg p-6 md:p-10 w-full max-w-xl grid gap-6 text-white shadow"
        >
          {/* Nombre */}
          <div className="flex flex-col items-start">
            <label className="mb-1 text-base font-semibold text-yellow-200">
              Group Name <span className="text-red-400">*</span>
            </label>
            <div className="w-full flex items-center relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 primary-color" />
              <input
                type="text"
                name="nombre"
                value={dataForm.nombre}
                onChange={handleChange}
                placeholder="Enter group name"
                className="w-full pl-11 py-3 rounded background-terciary border border-gray-600 focus:ring-2 focus:ring-yellow-400 transition"
                required
              />
            </div>
          </div>

          {/* Imagen */}
          <div className="flex flex-col items-start">
            <label className="mb-1 text-base font-semibold text-yellow-200">
              Group Image <span className="text-red-400">*</span>
            </label>
            <div className="flex items-center gap-3 w-full">
              <ImageIcon className="w-5 h-5 primary-color" />
              <input
                type="file"
                name="imagen"
                accept="image/*"
                onChange={handleChange}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-500"
              />
            </div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 mt-2 rounded-full object-cover border border-yellow-400 shadow"
              />
            )}
          </div>

          {/* Privado */}
          <div className="flex flex-col items-start">
            <label className="mb-1 text-base font-semibold text-yellow-200 flex items-center gap-2">
              {dataForm.privado ? (
                <>
                  <Lock className="w-5 h-5 text-yellow-400" />
                  Private Group
                </>
              ) : (
                <>
                  <Unlock className="w-5 h-5 text-yellow-400" />
                  Public Group
                </>
              )}
            </label>
            <button
              type="button"
              onClick={handleTogglePrivado}
              className={`mt-2 px-4 py-2 rounded transition font-semibold cursor-pointer ${
                dataForm.privado
                  ? "bg-yellow-400 text-black hover:bg-yellow-500"
                  : "bg-gray-600 text-white hover:bg-yellow-400 hover:text-black"
              }`}
            >
              {dataForm.privado ? "Set as Public" : "Set as Private"}
            </button>
          </div>

          {/* Descripción */}
          <div className="flex flex-col items-start">
            <label className="mb-1 text-base font-semibold text-yellow-200">
              Description
            </label>
            <textarea
              name="descripcion"
              value={dataForm.descripcion}
              onChange={handleChange}
              placeholder="Enter group description"
              className="w-full min-h-[80px] rounded background-terciary border border-gray-600 focus:ring-2 focus:ring-yellow-400 transition p-3"
            />
          </div>

          {/* Botón guardar */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full mt-4 border-1 text-white py-3 rounded background-terciary transition cursor-pointer
                hover:bg-yellow-400 hover:text-yellow-100 hover:shadow-lg hover:scale-105"
              style={{ borderColor: "#FFEBA7" }}
            >
              Save Changes
            </button>
          </div>
        </form>
      )}

      {tab === "users" && (
        <div className="w-full max-w-4xl background-secondary rounded-lg p-6 shadow">
          <h3 className="text-2xl font-semibold mb-4 text-yellow-200">Manage Users</h3>
          {/* Botón para añadir usuario */}
          <div className="flex justify-end mb-4">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition cursor-pointer"
              onClick={() => setShowAddUserModal(true)}
            >
              <UserPlus className="w-5 h-5" />
              Add User
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Nickname</th>
                  <th className="px-4 py-2 text-left">Full Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                  <th className="px-4 py-2 text-center">Admin</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-400">
                      No users in this group.
                    </td>
                  </tr>
                )}
                {users.map((user) => (
                  <tr key={user.id_usuario} className="border-b border-gray-700">
                    <td className="px-4 py-2">{user.apodo}</td>
                    <td className="px-4 py-2">{user.nombre_usuario}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      <button
                        className="flex items-center gap-1 px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white font-semibold transition cursor-pointer"
                        onClick={() => handleRemoveUser(user.id_usuario)}
                        title="Remove user"
                      >
                        <UserMinus className="w-4 h-4" />
                        Remove
                      </button>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleToggleAdmin(user.id_usuario, !user.es_admin_grupo)}
                        className={`px-3 py-1 rounded font-semibold transition cursor-pointer
                          ${user.es_admin_grupo
                            ? "bg-yellow-400 text-black hover:bg-yellow-500"
                            : "bg-gray-700 text-yellow-200 hover:bg-yellow-400 hover:text-black"
                          }`}
                        title={user.es_admin_grupo ? "Remove admin" : "Make admin"}
                      >
                        {user.es_admin_grupo ? "Admin" : "Make Admin"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="px-3 py-1 rounded bg-gray-700 text-yellow-200 font-semibold hover:bg-yellow-400 hover:text-black transition cursor-pointer disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              Previous
            </button>
            <span className="text-yellow-200 font-semibold">
              Page {page + 1} of {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded bg-gray-700 text-yellow-200 font-semibold hover:bg-yellow-400 hover:text-black transition cursor-pointer disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page + 1 >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal para añadir usuario */}
      {showAddUserModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-3xl relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-yellow-400 transition cursor-pointer"
              onClick={() => setShowAddUserModal(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h4 className="text-xl font-semibold mb-4 text-yellow-200">Add User to Group</h4>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={searchUser}
                onChange={e => setSearchUser(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") handleSearchUsers(); }}
                placeholder="Search by email or nickname"
                className="flex-1 px-4 py-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                className="px-4 py-2 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition cursor-pointer"
                onClick={() => handleSearchUsers(0)}
                disabled={searchLoading}
              >
                Search
              </button>
            </div>
            <div className="overflow-x-auto max-h-60">
              <table className="min-w-full text-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Nickname</th>
                    <th className="px-4 py-2 text-left">Full Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {searchLoading && (
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-gray-400">
                        Searching...
                      </td>
                    </tr>
                  )}
                  {!searchLoading && searchResults.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-gray-400">
                        No users found.
                      </td>
                    </tr>
                  )}
                  {searchResults.map((user) => (
                    <tr key={user.id_usuario} className="border-b border-gray-700">
                      <td className="px-4 py-2">{user.apodo}</td>
                      <td className="px-4 py-2">{user.nombre_usuario}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">
                        <button
                          className="flex items-center gap-1 px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white font-semibold transition cursor-pointer"
                          onClick={() => handleAddUserToGroup(user.id_usuario)}
                        >
                          <UserPlus className="w-4 h-4" />
                          Add
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Paginación del modal */}
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                className="px-3 py-1 rounded bg-gray-700 text-yellow-200 font-semibold hover:bg-yellow-400 hover:text-black transition cursor-pointer disabled:opacity-50"
                onClick={() => {
                  if (searchPage > 0) {
                    setSearchPage(searchPage - 1);
                    handleSearchUsers(searchPage - 1);
                  }
                }}
                disabled={searchPage === 0}
              >
                Previous
              </button>
              <span className="text-yellow-200 font-semibold">
                Page {searchPage + 1} of {searchTotalPages}
              </span>
              <button
                className="px-3 py-1 rounded bg-gray-700 text-yellow-200 font-semibold hover:bg-yellow-400 hover:text-black transition cursor-pointer disabled:opacity-50"
                onClick={() => {
                  if (searchPage + 1 < searchTotalPages) {
                    setSearchPage(searchPage + 1);
                    handleSearchUsers(searchPage + 1);
                  }
                }}
                disabled={searchPage + 1 >= searchTotalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupSettings;