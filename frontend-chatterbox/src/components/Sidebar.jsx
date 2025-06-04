import { use, useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router";
import GroupServices from "../services/GroupServices";
import SidebarElement from "./SidebarElement";
import ChatArea from "./ChatArea";
import { Menu, Settings } from "lucide-react";
import { AuthProvider, useAuth } from "../auth/AuthProvider";

const Sidebar = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useAuth();
  const { id } = useParams();
 const navigate = useNavigate();
  const changeChat = (chat) => {
    setSelectedChat(chats.find((c) => c.id_chat === chat));
    setSidebarOpen(false);
  };
  const [nuevoChatNombre, setNuevoChatNombre] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);

  const crearChat = () => {
    if (!nuevoChatNombre.trim()) return;

    GroupServices.createChat({
      id_grupo: parseInt(id),
      nombre_chat: nuevoChatNombre.trim(),
    });
    window.location.reload();

    const nuevoChat = {
      id_chat: Date.now(),
      nombre_chat: nuevoChatNombre.trim(),
    };
    setChats([...chats, nuevoChat]);
    setNuevoChatNombre("");
  };
  const [groupInfo, setGroupInfo] = useState(null);

  useEffect(() => {
    GroupServices.getGroupById(id)
      .then((res) => setGroupInfo(res.data))
      .catch(() => setGroupInfo(null));
    GroupServices.getImagenGrupo(id)
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
          foto_grupo: "https://via.placeholder.com/150",
        }));
      });
  }, []);

  useEffect(() => {
    GroupServices.getChatsFromGroup(id)
      .then((response) => {
        setChats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });
    GroupServices.getAllGroups(user.usuario.id_usuario)
      .then((response) => {
        const userGroups = response.data.filter(
          (group) => group.id_grupo === parseInt(id)
        );

        if (userGroups.length > 0) {
          setIsAdmin(userGroups[0].es_admin_grupo);
        }
      })
      .catch((error) => {
        console.error("Error fetching user groups:", error);
      });
  }, [id]);

  return (
    <div className="flex h-screen m-0 p-0 ">
      {!sidebarOpen && (
        <button
          className="md:hidden absolute top-28 right-8 z-50 bg-white p-2 rounded-md shadow"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6 text-gray-800" />
        </button>
      )}

      <aside
        id="logo-sidebar"
        className={`p-3 fixed top-0 left-0 z-40 w-64 h-full bg-gray-50 dark:bg-gray-800 transition-transform transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:flex-shrink-0 m-0 p-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-0 py-0 overflow-y-auto m-0">
          {groupInfo && (
            <div className="flex items-center gap-3 mb-5 px-4 relative">
              <img
                src={groupInfo.foto_grupo}
                alt={groupInfo.nombre_grupo}
                className="w-10 h-10 rounded-full border-2 border-yellow-300 object-cover"
              />
              <span className="text-yellow-200 font-semibold text-base truncate max-w-[120px]">
                {groupInfo.nombre_grupo}
              </span>
              {isAdmin && (
                <Settings
                  className="w-6 h-6 text-yellow-400 cursor-pointer absolute right-0 hover:text-yellow-200 hover:scale-110 transition"
                  title="Ajustes del grupo"
                  onClick={() => navigate(`/group/${id}/settings`)}
                />
              )}
            </div>
          )}
          <ul className="cursor-pointer space-y-2 font-medium m-0 p-0">
            {chats.map((chat) => (
              <li
                key={chat.id_chat}
                className="group flex items-center justify-between m-0 p-0"
              >
                <div
                  className="flex-1 flex items-center px-3 py-1 rounded-md cursor-pointer transition group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
                  onClick={() => changeChat(chat.id_chat)}
                >
                  <SidebarElement
                    id={chat.id_chat}
                    name={chat.nombre_chat}
                    changeChat={changeChat}
                  />
                </div>
                {isAdmin && (
                  <button
                    onClick={() => {
                      setChatToDelete(chat);
                      setShowDeleteModal(true);
                    }}
                    className="cursor-pointer ml-2 text-red-500 opacity-0 group-hover:opacity-100 transition hover:bg-red-200 rounded"
                    title="Eliminar chat"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </li>
            ))}

            {isAdmin && (
              <li className="mt-4 m-0 p-0">
                <input
                  type="text"
                  value={nuevoChatNombre}
                  onChange={(e) => setNuevoChatNombre(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      crearChat();
                    }
                  }}
                  maxLength={13}
                  placeholder="+ Añadir chat"
                  className="w-full p-2 rounded-lg border border-background-secondary background-terciary secondary-color focus:outline-none focus:ring-2 focus:ring-highlight-text m-0"
                />
              </li>
            )}
          </ul>
        </div>
      </aside>

      {showDeleteModal && (
        <div
          className="cursor-pointer fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(179, 166, 92, 0.05)" }}
        >
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-sm text-center border border-gray-200 dark:border-gray-700">
            <h2 className="primary-color text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">
              Eliminar Chat
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
              ¿Estás seguro de que deseas eliminar este chat? Esta acción no se
              puede deshacer.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setChats(
                    chats.filter((c) => c.id_chat !== chatToDelete.id_chat)
                  );
                  GroupServices.deleteChat(chatToDelete.id_chat);
                  setShowDeleteModal(false);
                }}
                className="cursor-pointer px-5 py-2 rounded-lg font-semibold text-white bg-red-600 shadow hover:bg-red-700 transition"
              >
                Eliminar
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="cursor-pointer px-5 py-2 rounded-lg font-semibold text-gray-800 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 p-2 overflow-hidden">
        <div className="p-2 h-full m-0 rounded-lg dark:border-gray-700">
          <ChatArea selectedChat={selectedChat} />
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
