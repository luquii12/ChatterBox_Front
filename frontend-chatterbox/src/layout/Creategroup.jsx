import React, { use, useState } from "react";
import "../styles/LoginSingIn.css";
import { useAuth } from "../auth/AuthProvider";
import UserServices from "../services/UserServices";


const Creategroup = () => {
  const { user } = useAuth();
  console.log("Usuariooo:", user);


  
  const [form, setForm] = useState({
    id_usuario: user.usuario.id_usuario,
    name: "",
    image: null,
    isPrivate: false,
    description: "",
  });

console.log( user.usuario.id_usuario)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    setForm((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    id_usuario_creador: form.id_usuario,
    nombre_grupo: form.name,
    descripcion: form.description,
    es_privado: form.isPrivate,
    foto_grupo: null, 
  };

    UserServices.creteGroup(payload)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("error")
       
      });
};


  return (
    <div className="min-h-screen bg-[#0D1321] flex items-center justify-center p-6">
      <div className="bg-[#1E1E2F] text-white p-8 rounded-lg border border-yellow-300 shadow-xl w-full max-w-md">
        <h2 className="text-center text-3xl font-bold text-[#F5D67B] mb-8 tracking-wide">
          Create Group
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-1">Group Name</label>
            <input
              type="text"
              name="name"
              className="w-full bg-[#2C2C3C] p-3 rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter group name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Group Image (optional)</label>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center bg-[#0F1624] rounded border border-white text-lg">
                ⬆️
              </div>
              <label className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-700 transition cursor-pointer">
                <input type="file" className="hidden" onChange={handleImageUpload} />
                Upload
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Privacy</label>
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isPrivate"
                  className="sr-only peer"
                  checked={form.isPrivate}
                  onChange={handleChange}
                />
                <div className="w-11 h-6 bg-gray-400 rounded-full peer peer-checked:bg-yellow-400 peer-focus:ring-2 peer-focus:ring-yellow-400 transition duration-300"></div>
              </label>
              <span className="text-sm">Private group</span>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Description (optional)</label>
            <input
              type="text"
              name="description"
              className="w-full bg-[#2C2C3C] p-3 rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Group description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2C2C3C] text-white font-semibold py-3 rounded hover:bg-yellow-400 hover:text-black transition"
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default Creategroup;