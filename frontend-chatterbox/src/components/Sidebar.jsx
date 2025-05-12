import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router";
import GroupServices from "../services/GroupServices";
import SidebarElement from "./SidebarElement";
import Chat from "./ChatArea";
import ChatArea from "./ChatArea";

const Sidebar = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const changeChat = (chat) => {
    setSelectedChat(chat);
  }
  const { id } = useParams();
  useEffect(() => {
    GroupServices.getChatsFromGroup(id)
      .then((response) => {
        console.log(response.data);
        setChats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });
  }, [id]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className="w-64 h-screen bg-gray-50 dark:bg-gray-800"
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

      {/* Main content */}
      <div className="flex-1 p-4">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          {/*contenido */}
          <ChatArea selectedChat={selectedChat}/>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
