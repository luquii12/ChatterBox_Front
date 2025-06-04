import { useEffect, useState } from "react";
import UserServices from "../services/UserServices";
import { useAuth } from "../auth/AuthProvider";
import Linkify from "react-linkify";

const TextChat = ({ contenido, hora, id_user }) => {
  const { user: myUser } = useAuth();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userPicture, setUserPicture] = useState("https://www.gravatar.com/avatar/");
  const decorateLink = (href, text, key) => (
    <a
      href={href}
      key={key}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 underline hover:text-blue-700 break-words"
    >
      {text}
    </a>
  );

  useEffect(() => {
    UserServices.getUserById(id_user)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user:", error));
    UserServices.getUserPicture(id_user)
      .then((response) => {
        
        setUserPicture(URL.createObjectURL(response.data));
      })
      .catch((error) => console.error("Error fetching user Picture:", error));
  }, [id_user]);

  const isOwnMessage = id_user === myUser.usuario.id_usuario;

  return (
    <div
      className={`flex items-start gap-1.5 mb-4 ${
        isOwnMessage ? "ml-auto flex-row-reverse" : ""
      }`}
    >
      <img
        className="w-10 h-10 rounded-full object-cover"
        src={userPicture}
        alt="User avatar"
      />

      <div className="flex flex-col gap-1 w-fit max-w-[60%] relative">
        {/* Header: nombre y hora */}
        <div
          className={`flex items-center justify-between gap-10 text-2xs ${
            isOwnMessage ? "text-right" : "text-left"
          }`}
        >
          <span className="font-semibold">{user?.apodo}</span>
          <span className="text-gray-400">
            {hora?.split(" ")[1]?.split(":").slice(0, 2).join(":")}
          </span>
        </div>

        {/* Bubble */}
        <div
          className={`relative p-3 rounded-xl text-sm shadow break-words whitespace-pre-wrap ${
            isOwnMessage
              ? "bg-gray-700 text-white rounded-br-none"
              : "bg-gray-600 text-white rounded-bl-none"
          }`}
        >
          <Linkify componentDecorator={decorateLink}>{contenido}</Linkify>
        </div>
      </div>
    </div>
  );
};

export default TextChat;
