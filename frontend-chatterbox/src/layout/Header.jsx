import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthProvider";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuth();
  const [fotoPerfilUrl, setFotoPerfilUrl] = useState(null);

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest("#menu-button")
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    useEffect(() => {
    if (!user) return;

    axios
      .get(
        `https://localhost:8443/usuarios/${user.usuario.id_usuario}/foto-perfil`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
          responseType: "blob",
        }
      )
      .then((res) => {
        const url = URL.createObjectURL(res.data);
        setFotoPerfilUrl(url);
      })
      .catch((err) => {
        console.error("Error al obtener foto perfil:", err);
        setFotoPerfilUrl(null);
      });
  }, [user]);

  return (
    <>
      <header className="flex justify-between items-center background-secondary text-white h-20 px-0 shadow-md relative">
        
        <div className="flex items-center h-full  background-terciary pl-4 pr-8 gap-20 w-[280px]">
         
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointery"
          >
            <div className="cursor-pointer w-10 h-10 rounded-full border-2 border-yellow-300 flex items-center justify-center">
              <img src={fotoPerfilUrl} alt="" />
              {/* <span className="text-xl">👤</span> */}
            </div>
            <span className="cursor-pointer text-base text-yellow-200 font-medium truncate max-w-[100px]">
              {user.usuario.apodo}
            </span>
          </div>

        
          <button
            id="menu-button"
            onClick={() => setDropdownOpen(true)}
            className="text-3xl hover:text-yellow-300 transition cursor-pointer"
          >
            ☰
          </button>
        </div>

        {/* Botones de la derecha */}
        <div className="flex items-center gap-4 pr-6 ">
          <button onClick={()=>{
            navigate("/joinGroup");
          }} className="background-terciary primary-color px-4 py-2 rounded hover:bg-white hover:text-black transition cursor-pointer">
            JOIN GROUP
          </button>
          <button
            className="bg-[#F5D67B] text-black font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition cursor-pointer"
            onClick={() => navigate("/create")}
          >
            NEW GROUP
          </button>
        </div>
      </header>

      {/* Sidebar lateral animada */}
      <div
        ref={dropdownRef}
        className={`fixed top-0 left-0 h-full w-64 bg-[#2A2A2A] shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          dropdownOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 gap-4 text-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-yellow-300">Menú</h2>
            <button
              onClick={() => setDropdownOpen(false)}
              className="text-xl text-gray-400 hover:text-white "
            >
              ✕
            </button>
          </div>

          <ul className="space-y-2 text-sm font-medium">
            <li
              className="hover:bg-yellow-500 hover:text-black px-4 py-2 rounded cursor-pointer transition"
              onClick={() => {
                
                navigate("/"); 
                setDropdownOpen(false);
              }}
            >
              👥 Groups
            </li>
             <li
              className="hover:bg-yellow-500 hover:text-black px-4 py-2 rounded cursor-pointer transition"
              onClick={() => {
                
                navigate("/publicGroups"); 
                setDropdownOpen(false);
              }}
            >
              🌐 Public Groups
            </li>
            <li
              className="hover:bg-yellow-500 hover:text-black px-4 py-2 rounded cursor-pointer transition"
              onClick={() => {
                
                navigate("/"); 
                setDropdownOpen(false);
              }}
            >
              🧑 Perfil
            </li>
            <li
              className="hover:bg-yellow-500 hover:text-black px-4 py-2 rounded cursor-pointer transition"
              onClick={() => {
                
                navigate("/accountSettings"); 
                setDropdownOpen(false);
              }}
            >
              ⚙️ Ajustes
            </li>

             <li
              className="hover:bg-yellow-500 hover:text-black px-4 py-2 rounded cursor-pointer transition"
              onClick={() => {
                
                navigate("/help"); //Hihcam perro ponle aqui donde quieres navegar 
                setDropdownOpen(false);
              }}
            >
              🆘 Help Center
            </li>
            
            <li
              className="hover:bg-red-500 hover:text-white px-4 py-2 rounded cursor-pointer transition"
              onClick={() => {
               
                console.log("Cerrar sesión");
                setDropdownOpen(false);
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              🚪 Cerrar sesión
            </li>
          </ul>

          <div className="mt-auto text-xs text-gray-400">
            © 2025 ChatterBox
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;