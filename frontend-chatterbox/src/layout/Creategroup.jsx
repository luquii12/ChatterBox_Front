import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import { ImagePlus, Lock, FileText } from "lucide-react";
import GroupServices from "../services/GroupServices";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("groupPageReloaded")) {
      localStorage.setItem("groupPageReloaded", "true");
      window.location.reload();
    } else {
      localStorage.removeItem("groupPageReloaded");
    }
  }, []);


  const [form, setForm] = useState({
    id_usuario: "",
    name: "",
    image: null,
    isPrivate: false,
    description: "",
  });

  useEffect(() => {
    if (user && user.usuario && user.usuario.id_usuario) {
      setForm((prev) => ({
        ...prev,
        id_usuario: user.usuario.id_usuario,
      }));
    }
  }, [user]);

  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [imageError, setImageError] = useState(""); // Nuevo estado para error de imagen

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
      setImageError(""); // Limpiar error si selecciona imagen
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validar que la imagen sea obligatoria
    if (!form.image) {
      setImageError("La imagen del grupo es obligatoria.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("id_usuario_creador", form.id_usuario);
    formData.append("nombre_grupo", form.name);
    formData.append("descripcion", form.description);
    formData.append("es_privado", form.isPrivate ? 1 : 0);
    formData.append("foto_grupo", form.image);

    try {
      const response = await GroupServices.createGroup(formData);
      // Suponiendo que el backend devuelve el id del grupo en response.data.id_grupo
      const newGroupId = response.data?.id_grupo;
      setSubmitStatus("success");
      setForm({
        id_usuario: user.usuario.id_usuario,
        name: "",
        image: null,
        isPrivate: false,
        description: "",
      });
      setImagePreview(null);

      if (newGroupId) {
        setTimeout(() => {
          navigate(`/group/${newGroupId}`);
        }, 500);
      }
    } catch (error) {
      console.error("Error al crear grupo:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen background-primary flex items-center justify-center px-3 py-5">
      <div className="background-secondary border primary-color rounded-lg p-10 w-[1000px] text-white shadow-[0_1px_10px_rgba(0,0,0,0.05)] shadow-yellow-100">
        <h2 className="text-5xl primary-color font-semibold text-center mb-10">
          Create Group
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Group Name */}
          <div className="relative">
            <label className="block mb-2 text-lg">
              Group Name <span className="text-red-400">*</span>
            </label>
            <FileText className="absolute left-3 top-2/3 -translate-y-1/2 w-5 h-5 primary-color" />
            <input
              type="text"
              name="name"
              placeholder="Enter group name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-10 py-3 rounded background-terciary border border-gray-600"
            />
          </div>

          {/* Image Upload */}
          <div className="relative">
            <label className="block mb-2 text-lg">
              Group Image <span className="text-red-400">*</span>
            </label>
            <ImagePlus className="absolute left-3 top-2/3 -translate-y-1/2 w-5 h-5 primary-color" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-10 py-3 rounded background-terciary border border-gray-600"
              required
            />
            {imagePreview && (
              <div className="mt-3">
                <p className="text-sm text-gray-400">Image selected:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 mt-2 rounded object-cover border border-gray-600"
                />
              </div>
            )}
            {imageError && <p className="text-red-400 mt-2">{imageError}</p>}
          </div>

          {/* Privacy */}
          <div className="flex items-center gap-3">
            <Lock className="primary-color" />
            <label className="text-lg">Private Group</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isPrivate"
                className="sr-only peer"
                checked={form.isPrivate}
                onChange={handleChange}
              />
              <div className="w-11 h-6 bg-gray-400 rounded-full peer peer-checked:bg-yellow-400 transition duration-300"></div>
            </label>
          </div>

          {/* Description */}
          <div className="relative">
            <label className="block mb-2 text-lg">Description</label>
            <textarea
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
              placeholder="Group description"
              className="w-full px-4 py-3 rounded background-terciary border border-gray-600"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="cursor-pointer w-[400px] mt-4 border-1 text-white py-4 rounded hover:bg-[#FFEBA7] background-terciary disabled:opacity-50"
              style={{ borderColor: "#FFEBA7" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Group..." : "Create Group"}
            </button>
          </div>

          {/* Feedback Message */}
          {submitStatus === "success" && (
            <p className="text-green-400 text-center mt-4">
              Group created successfully!
            </p>
          )}

          {submitStatus === "error" && (
            <p className="text-red-400 text-center mt-4">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
