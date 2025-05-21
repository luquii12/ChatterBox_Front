import React, { useState, useEffect } from "react";
import axios from "axios";

const PruebaImg = ({ usuarioId }) => {
  const [usuario, setUsuario] = useState({
    apodo: "lucasDev",
    nombre_usuario: "Lucas",
    email: "lucas@example.com",
    password: "",
    foto_perfil: null,
  });

  const [fotoPerfilUrl, setFotoPerfilUrl] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [token, setToken] = useState(null);

  // Obtener el token de localStorage o de donde lo tengas guardado
  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.warn("Token no encontrado en localStorage");
    }
  }, []);

  // Cargar foto de perfil cuando el token esté disponible
  useEffect(() => {
    if (!token) return;

    axios
      .get("https://localhost:8443/usuarios/foto-perfil", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      })
      .then((res) => {
        const url = URL.createObjectURL(res.data);
        setFotoPerfilUrl(url);
      })
      .catch((err) => {
        console.error("Error al obtener foto perfil:", err);
        setFotoPerfilUrl(null);
      });
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setUsuario((prev) => ({ ...prev, foto_perfil: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.warn("Token no disponible");
      setMensaje("Token no disponible");
      return;
    }

    const formData = new FormData();
    formData.append("apodo", usuario.apodo);
    formData.append("nombre_usuario", usuario.nombre_usuario);
    formData.append("email", usuario.email);
    if (usuario.password) formData.append("password", usuario.password);
    if (usuario.foto_perfil)
      formData.append("foto_perfil", usuario.foto_perfil);

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.put(
        `https://localhost:8443/usuarios/${usuarioId}`,
        formData,
        axiosConfig
      );
      setMensaje("Usuario actualizado correctamente");

      if (usuario.foto_perfil) {
        const fotoRes = await axios.get(
          "https://localhost:8443/usuarios/foto-perfil",
          {
            headers: { Authorization: `Bearer ${token}` },
            responseType: "blob",
          }
        );
        const url = URL.createObjectURL(fotoRes.data);
        setFotoPerfilUrl(url);
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error al actualizar usuario");
    }
  };

  return (
    <div>
      <h2>Editar Usuario</h2>
      {fotoPerfilUrl && (
        <img src={fotoPerfilUrl} alt="Foto de perfil" width={150} />
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Apodo: </label>
          <input
            name="apodo"
            value={usuario.apodo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Nombre usuario: </label>
          <input
            name="nombre_usuario"
            value={usuario.nombre_usuario}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password (si quieres cambiar): </label>
          <input
            type="password"
            name="password"
            value={usuario.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Foto perfil: </label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <button type="submit">Guardar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default PruebaImg;
