import React, { useState, useEffect } from "react";
import axios from "axios";

const PruebaImgGrupo = () => {
  const [grupoNuevo, setGrupoNuevo] = useState({
    nombre_grupo: "",
    descripcion: "",
    es_privado: false,
    foto_grupo: null,
  });

  const [grupoEditar, setGrupoEditar] = useState({
    id_grupo: 7,
    nombre_grupo: "Grupo",
    descripcion: "Esto es un grupo",
    es_privado: true,
    foto_grupo: null,
  });

  const [fotoGrupoUrl, setFotoGrupoUrl] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.warn("Token no encontrado en localStorage");
    }
  }, []);

  const handleNuevoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGrupoNuevo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditarChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGrupoEditar((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNuevoFile = (e) => {
    setGrupoNuevo((prev) => ({
      ...prev,
      foto_grupo: e.target.files[0],
    }));
  };

  const handleEditarFile = (e) => {
    setGrupoEditar((prev) => ({
      ...prev,
      foto_grupo: e.target.files[0],
    }));
  };

  const crearGrupo = async (e) => {
    e.preventDefault();
    if (!token) return setMensaje("Token no disponible");

    const formData = new FormData();
    formData.append("nombre_grupo", grupoNuevo.nombre_grupo);
    formData.append("descripcion", grupoNuevo.descripcion);
    formData.append("es_privado", grupoNuevo.es_privado);
    if (grupoNuevo.foto_grupo)
      formData.append("foto_grupo", grupoNuevo.foto_grupo);

    try {
      const res = await axios.post("https://localhost:8443/grupos", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMensaje("Grupo creado correctamente");

      if (res.data.id_grupo) {
        const fotoRes = await axios.get(
          `https://localhost:8443/grupos/${res.data.id_grupo}/foto`,
          {
            headers: { Authorization: `Bearer ${token}` },
            responseType: "blob",
          }
        );
        const url = URL.createObjectURL(fotoRes.data);
        setFotoGrupoUrl(url);
      }
    } catch (error) {
      console.error("Error al crear grupo:", error);
      setMensaje("Error al crear grupo");
    }
  };

  const editarGrupo = async (e) => {
    e.preventDefault();
    if (!token) return setMensaje("Token no disponible");

    const formData = new FormData();
    formData.append("nombre_grupo", grupoEditar.nombre_grupo);
    formData.append("descripcion", grupoEditar.descripcion);
    formData.append("es_privado", grupoEditar.es_privado);
    if (grupoEditar.foto_grupo)
      formData.append("foto_grupo", grupoEditar.foto_grupo);

    try {
      const res = await axios.put(
        `https://localhost:8443/grupos/${grupoEditar.id_grupo}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMensaje("Grupo actualizado correctamente");

      const fotoRes = await axios.get(
        `https://localhost:8443/grupos/${grupoEditar.id_grupo}/foto`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );
      const url = URL.createObjectURL(fotoRes.data);
      setFotoGrupoUrl(url);
    } catch (error) {
      console.error("Error al actualizar grupo:", error);
      setMensaje("Error al actualizar grupo");
    }
  };

  return (
    <div>
      <h2>Crear Grupo</h2>
      <form onSubmit={crearGrupo}>
        <div>
          <label>Nombre:</label>
          <input
            name="nombre_grupo"
            value={grupoNuevo.nombre_grupo}
            onChange={handleNuevoChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            name="descripcion"
            value={grupoNuevo.descripcion}
            onChange={handleNuevoChange}
          />
        </div>
        <div>
          <label>Privado:</label>
          <input
            type="checkbox"
            name="es_privado"
            checked={grupoNuevo.es_privado}
            onChange={handleNuevoChange}
          />
        </div>
        <div>
          <label>Foto grupo:</label>
          <input type="file" accept="image/*" onChange={handleNuevoFile} />
        </div>
        <button type="submit">Crear</button>
      </form>

      <hr />

      <h2>Editar Grupo</h2>
      <form onSubmit={editarGrupo}>
        <div>
          <label>ID del grupo:</label>
          <input
            name="id_grupo"
            value={grupoEditar.id_grupo}
            onChange={handleEditarChange}
            required
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            name="nombre_grupo"
            value={grupoEditar.nombre_grupo}
            onChange={handleEditarChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            name="descripcion"
            value={grupoEditar.descripcion}
            onChange={handleEditarChange}
          />
        </div>
        <div>
          <label>Privado:</label>
          <input
            type="checkbox"
            name="es_privado"
            checked={grupoEditar.es_privado}
            onChange={handleEditarChange}
          />
        </div>
        <div>
          <label>Foto grupo:</label>
          <input type="file" accept="image/*" onChange={handleEditarFile} />
        </div>
        <button type="submit">Actualizar</button>
      </form>

      <hr />

      {fotoGrupoUrl && (
        <>
          <h3>Foto actual del grupo</h3>
          <img src={fotoGrupoUrl} alt="Foto del grupo" width={150} />
        </>
      )}

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default PruebaImgGrupo;
