import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router";
import GroupServices from "../services/GroupServices";
import SidebarElement from "./SidebarElement";
import ChatArea from "./ChatArea";
import { Menu } from "lucide-react"; // Usa ícono hamburguesa

const Sidebar = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const changeChat = (chat) => {
    setSelectedChat(chats.find((c) => c.id_chat === chat));
    setSidebarOpen(false); // Cierra el sidebar en móvil al seleccionar un chat
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
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden absolute top-4 left-4 z-50 bg-white p-2 rounded-md shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="h-6 w-6 text-gray-800" />
      </button>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-gray-50 dark:bg-gray-800 transition-transform transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:flex-shrink-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <Link to={"/"} className="flex items-center ps-2.5 mb-5">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 me-3 sm:h-7"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              ChaterrBox
            </span>
          </Link>
          <ul className="space-y-2 font-medium">
            {chats.map((chat) => (
              <SidebarElement
                key={chat.id_chat}
                id={chat.id_chat}
                name={chat.nombre_chat}
                changeChat={changeChat}
              />
            ))}
          </ul>
        </div>
      </aside>

      {/* Overlay (only on mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-4 overflow-hidden">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 h-full">
          <ChatArea selectedChat={selectedChat} />
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
