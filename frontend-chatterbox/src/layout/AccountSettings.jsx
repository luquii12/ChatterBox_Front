import React, { useState } from "react";
import { User, Mail, Lock, Image as ImageIcon, Pencil } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import UserServices from "../services/UserServices";

export default function AccountSettings() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nickname: user?.usuario?.apodo || "",
    fullName: user?.usuario?.nombre_usuario || "",
    email: user?.usuario?.email || "",
    password: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
      if (files[0]) setImagePreview(URL.createObjectURL(files[0]));
      else setImagePreview(null);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDatas = new FormData();
    formDatas.append("apodo", formData.nickname);
    formDatas.append("nombre_usuario", formData.fullName);
    formDatas.append("email", formData.email);
    formDatas.append("password", formData.password);
    if (formData.image)
      formDatas.append("foto_perfil", formData.image);

    UserServices.updateUser(user.usuario.id_usuario, formDatas)
      .then((response) => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        console.error("Error updating user", error);
        // Handle error appropriately, e.g., show a notification
      });
  };

  return (
    <div className="min-h-screen background-primary flex flex-col items-center justify-center px-2 py-8">
      <h2 className="text-4xl md:text-6xl primary-color font-semibold mb-8 md:mb-10 text-center">
        Account Settings
      </h2>

      {success && (
        <div className="mb-4 px-4 py-3 rounded bg-green-500 text-white text-center font-semibold shadow">
          Changes saved successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="background-secondary border primary-color rounded-lg p-4 md:p-10 w-full max-w-2xl md:max-w-4xl min-h-[500px] md:min-h-[700px] grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 text-white shadow-[0_1px_10px_rgba(0,0,0,0.05)] shadow-yellow-100"
      >
        {/* Nickname */}
        <div className="relative flex flex-col items-start">
          <label
            htmlFor="nickname"
            className="mb-1 text-sm md:text-base font-semibold text-yellow-200"
          >
            Nickname
          </label>
          <div className="w-full flex items-center relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
              <User className="w-5 h-5 md:w-6 md:h-6 primary-color" />
            </span>
            <input
              id="nickname"
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="Enter your nickname"
              className="w-full pl-11 md:pl-14 py-3 rounded background-terciary border border-gray-600 focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>
        </div>

        {/* Full Name */}
        <div className="relative flex flex-col items-start">
          <label
            htmlFor="fullName"
            className="mb-1 text-sm md:text-base font-semibold text-yellow-200"
          >
            Full Name
          </label>
          <div className="w-full flex items-center relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
              <Pencil className="w-5 h-5 md:w-6 md:h-6 primary-color" />
            </span>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full pl-11 md:pl-14 py-3 rounded background-terciary border border-gray-600 focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>
        </div>

        {/* Email */}
        <div className="relative flex flex-col items-start">
          <label
            htmlFor="email"
            className="mb-1 text-sm md:text-base font-semibold text-yellow-200"
          >
            Email
          </label>
          <div className="w-full flex items-center relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
              <Mail className="w-5 h-5 md:w-6 md:h-6 primary-color" />
            </span>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full pl-11 md:pl-14 py-3 rounded background-terciary border border-gray-600 focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>
        </div>

        {/* Password */}
        <div className="relative flex flex-col items-start">
          <label
            htmlFor="password"
            className="mb-1 text-sm md:text-base font-semibold text-yellow-200"
          >
            Password
          </label>
          <div className="w-full flex items-center relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
              <Lock className="w-5 h-5 md:w-6 md:h-6 primary-color" />
            </span>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full pl-11 md:pl-14 py-3 rounded background-terciary border border-gray-600 focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>
        </div>

        {/* Profile Image */}
        <div className="col-span-1 flex flex-col gap-2">
          <label className="block mb-2 text-base md:text-lg font-semibold text-yellow-200">
            Profile Image
          </label>
          <div className="flex items-center gap-3">
            <ImageIcon className="w-5 h-5 md:w-6 md:h-6 primary-color" />
            <input
              type="file"
              name="image"
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

        {/* Save Button */}
        <div className="col-span-1 md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="w-full md:w-[400px] mt-6 border-1 text-white py-4 rounded background-terciary transition cursor-pointer
              hover:bg-yellow-400 hover:text-yellow-100 hover:shadow-lg hover:scale-105"
            style={{ borderColor: "#FFEBA7" }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
