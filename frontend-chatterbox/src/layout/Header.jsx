import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import GroupServices from "../services/GroupServices";
import UserServices from "../services/UserServices";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuth();
console.log(user);

  // Modal state for leaving group
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveSuccess, setLeaveSuccess] = useState(false);

  // Imagen de perfil del usuario
  const [profileImage, setProfileImage] = useState(null);

  // Detecta si estás en un grupo
  const isGroup = location.pathname.startsWith("/group/") && params.id;
const isAdmin=user.usuario.es_admin_general
  const leaveGroup = () => {
    setShowLeaveModal(true);
  };

  const confirmLeaveGroup = () => {
    GroupServices.leaveGroup(params.id);
    setLeaveSuccess(true);
    setTimeout(() => {
      setShowLeaveModal(false);
      setLeaveSuccess(false);
      navigate("/");
    }, 500);
  };

  // Obtener imagen de perfil si existe
  useEffect(() => {
    UserServices.getUserImage(user.usuario.id_usuario)
      .then((response) => {
        const image = URL.createObjectURL(response.data);
        // Si la imagen viene como blob, crea una URL temporal
        setProfileImage(image);
      })
      .catch(() => setProfileImage(null));
  }, [user.usuario.id_usuario]);

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
          <div className="flex items-center gap-2 ">
            <div className="w-10 h-10 rounded-full border-2 border-yellow-300 flex items-center justify-center overflow-hidden bg-gray-800">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-10 h-10 object-cover rounded-full"
                />
              ) : (
                <span className="text-xl">👤</span>
              )}
            </div>
            <span className=" text-base text-yellow-200 font-medium truncate max-w-[100px]">
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
        <div className="flex items-center gap-4 pr-6">
          {isGroup && (
            <button
              onClick={leaveGroup}
              className="background-terciary primary-color px-4 py-2 rounded hover:bg-white hover:text-black transition cursor-pointer"
            >
              LEAVE GROUP
            </button>
          )}

          {/* JOIN GROUP solo visible en escritorio */}
          {!isGroup && (
            <>
              <button
                onClick={() => {
                  navigate("/joinGroup");
                }}
                className="hidden md:inline-flex background-terciary primary-color px-4 py-2 rounded hover:bg-white hover:text-black transition cursor-pointer"
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
        className={`fixed top-0 left-0 h-full w-64 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          dropdownOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#1F2029" }}
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
              👥 Home
            </li>

            {/* JOIN GROUP solo visible en móvil */}
            {!isGroup && (
              <li
                className="md:hidden hover:bg-yellow-500 hover:text-black px-4 py-2 rounded cursor-pointer transition"
                onClick={() => {
                  navigate("/joinGroup");
                  setDropdownOpen(false);
                }}
              >
                ➕ Join Group
              </li>
            )}

            <li
              className="hover:bg-yellow-500 hover:text-black px-4 py-2 rounded cursor-pointer transition"
              onClick={() => {
                navigate("/settings");
                setDropdownOpen(false);
              }}
            >
              🧑 Profile
            </li>
            <li
              className="hover:bg-blue-500 hover:text-white px-4 py-2 rounded cursor-pointer transition"
              onClick={() => {
                navigate("/chatIA");
                setDropdownOpen(false);
              }}
            >
              🤖 Chat IA
            </li>
            {isAdmin &&(<li
              className="hover:bg-blue-500 hover:text-white px-4 py-2 rounded cursor-pointer transition"
              onClick={() => {
                navigate("/admin");
                setDropdownOpen(false);
              }}
            >
              🛡️ Admin
            </li>)}
            
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

      {/* Modal leave group */}
      {showLeaveModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <div className="bg-white rounded-lg p-8 max-w-sm w-full text-center">
            {!leaveSuccess ? (
              <>
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  Are you sure you want to leave this group?
                </h3>
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    className="px-6 py-2 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition cursor-pointer"
                    onClick={confirmLeaveGroup}
                  >
                    Yes, leave
                  </button>
                  <button
                    className="px-6 py-2 rounded bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition cursor-pointer"
                    onClick={() => setShowLeaveModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  You have left the group successfully!
                </h3>
                <p className="text-gray-600">Redirecting...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
