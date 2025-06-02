import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import GroupServices from "../services/GroupServices";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuth();

  // Detecta si estás en un grupo
  const isGroup = location.pathname.startsWith("/group/") && params.id;

  // Estado para datos del grupo
  const [groupInfo, setGroupInfo] = useState(null);

  useEffect(() => {
    if (isGroup) {
      GroupServices.getGroupById(params.id)
        .then((res) => setGroupInfo(res.data))
        .catch(() => setGroupInfo(null));
      GroupServices.getImagenGrupo(params.id)
        .then((response) => {
          const imageUrl = URL.createObjectURL(response.data);
          setGroupInfo((prev) => ({
            ...prev,
            foto_grupo: imageUrl,
          }));
        })
        .catch((error) => {
          console.error("Error fetching group image:", error);
          setGroupInfo((prev) => ({
            ...prev,
            foto_grupo: "https://via.placeholder.com/150", // Placeholder image
          }));
        });
    } else {
      setGroupInfo(null);
    }
  }, [isGroup, params.id]);

  const leaveGroup = () => {
    GroupServices.leaveGroup(params.id);
  };
  console.log(groupInfo);

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

  return (
    <>
      <header className="flex justify-between items-center background-secondary text-white h-20 px-0 shadow-md relative">
        <div className="flex items-center h-full background-terciary pl-4 pr-8 gap-15 w-[240px]">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointery"
          >
            <div className="cursor-pointer w-10 h-10 rounded-full border-2 border-yellow-300 flex items-center justify-center">
              <span className="text-xl">👤</span>
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
          {isGroup && groupInfo && (
            <div className="flex items-center gap-3 mr-4">
              <img
                src={groupInfo.foto_grupo}
                alt={groupInfo.nombre_grupo}
                className="w-10 h-10 rounded-full border-2 border-yellow-300 object-cover"
              />
              <span className="text-yellow-200 font-semibold text-base truncate max-w-[120px]">
                {groupInfo.nombre_grupo}
              </span>
            </div>
          )}
          {isGroup && (
            <button
              onClick={leaveGroup}
              className="background-terciary primary-color px-4 py-2 rounded hover:bg-white hover:text-black transition cursor-pointer"
            >
              LEAVE GROUP
            </button>
          )}

          {!isGroup && (
            <>
              <button
                onClick={() => {
                  navigate("/joinGroup");
                }}
                className="background-terciary primary-color px-4 py-2 rounded hover:bg-white hover:text-black transition cursor-pointer"
              >
                JOIN GROUP
              </button>
              <button
                className="bg-[#F5D67B] text-black font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition cursor-pointer"
                onClick={() => navigate("/create")}
              >
                NEW GROUP
              </button>
            </>
          )}
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
                navigate("/acc");
                setDropdownOpen(false);
              }}
            >
              ⚙️ Ajustes
            </li>

            <li
              className="hover:bg-yellow-500 hover:text-black px-4 py-2 rounded cursor-pointer transition"
              onClick={() => {
                navigate("/help");
                setDropdownOpen(false);
              }}
            >
              🆘 Help Center
            </li>

            <li
              className="hover:bg-red-500 hover:text-white px-4 py-2 rounded cursor-pointer transition"
              onClick={() => {
                localStorage.removeItem("user");
                setDropdownOpen(false);
                navigate("/login");
              }}
            >
              🚪 Cerrar sesión
            </li>
          </ul>

          <div className="mt-auto text-xs text-gray-400">© 2025 ChatterBox</div>
        </div>
      </div>
    </>
  );
};

export default Header;
