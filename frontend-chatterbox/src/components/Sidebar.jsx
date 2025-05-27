import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router";
import GroupServices from "../services/GroupServices";
import SidebarElement from "./SidebarElement";
import ChatArea from "./ChatArea";
import { Menu } from "lucide-react"; // Ícono hamburguesa

const Sidebar = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [nuevoChatNombre, setNuevoChatNombre] = useState(""); // Estado para el input

  const changeChat = (chat) => {
    setSelectedChat(chats.find((c) => c.id_chat === chat));
    setSidebarOpen(false);
  };

  const crearChat = () => {
    if (!nuevoChatNombre.trim()) return; // evitar crear chats vacíos

    GroupServices.createChat();

    // Demo: agregar localmente con un id simulado
    const nuevoChat = {
      id_chat: Date.now(), // id temporal único
      nombre_chat: nuevoChatNombre.trim(),
    };
    setChats([...chats, nuevoChat]);
    setNuevoChatNombre(""); // limpiar input
  };

  const { id } = useParams();

  useEffect(() => {
    GroupServices.getChatsFromGroup(id)
      .then((response) => {
        setChats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });
  }, [id]);

  return (
    <div className="flex h-screen">
      {/* botón hamburguesa etc ... */}

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-full background-primary transition-transform transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:flex-shrink-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          {/* Logo y título */}
          <Link to={"/"} className="flex items-center ps-2.5 mb-5">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 me-3 sm:h-7"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap secondary-color">
              ChaterrBox
            </span>
          </Link>

          {/* Lista de chats */}
          <ul className="space-y-2 font-medium">
            {chats.map((chat) => (
              <SidebarElement
                key={chat.id_chat}
                id={chat.id_chat}
                name={chat.nombre_chat}
                changeChat={changeChat}
              />
            ))}

            {/* Input para añadir chat */}
            <li>
              <input
                type="text"
                value={nuevoChatNombre}
                onChange={(e) => setNuevoChatNombre(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    crearChat();
                  }
                }}
                placeholder="+ Añadir chat"
                className="w-full p-2 rounded-lg border border-background-secondary background-terciary secondary-color focus:outline-none focus:ring-2 focus:ring-highlight-text"
              />
            </li>
          </ul>
        </div>
      </aside>

      {/* Overlay móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-4 overflow-hidden background-terciary">
        <div className="p-4 border-2 border-background-secondary rounded-lg h-full">
          <ChatArea selectedChat={selectedChat} />
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
