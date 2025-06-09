import { useEffect, useState, useRef } from "react";
import ChatServices from "../services/ChatServices";
import TextChat from "./TextChat";

const ChatArea = ({ selectedChat }) => {
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [contenidoPorChat, setContenidoPorChat] = useState({});
  const [socket, setSocket] = useState(null);
  const [conectado, setConectado] = useState(false);
  const [token, setToken] = useState(null);
  const scrollRef = useRef(null);

  const usuarioId = JSON.parse(localStorage.getItem("user"))?.usuario?.id_usuario;

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem("user"));
    if (storedToken) {
      setToken(storedToken.token);
    }
  }, []);

  useEffect(() => {
    if (!selectedChat) {
      setMessages([]);
      return;
    }

    setChat(selectedChat);
    setMessages([]); // Limpiar mensajes viejos inmediatamente
    ChatServices.getAllMesajesFromChat(selectedChat.id_chat)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error al cargar mensajes:", err));
  }, [selectedChat]);

  useEffect(() => {
    if (!selectedChat || !token) return;
    const ws = new WebSocket(
      `wss://chatterbox-production-a64a.up.railway.app/ws?token=${token}&chatId=${selectedChat.id_chat}`
    );

    ws.onopen = () => {
      setConectado(true);
    };

    ws.onmessage = (event) => {
      const nuevoMensaje = JSON.parse(event.data);
      setMessages((prev) => [...prev, nuevoMensaje]);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    ws.onclose = () => {
      setConectado(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
      setSocket(null);
    };
  }, [selectedChat, token]);

  // Obtener el contenido pendiente del chat seleccionado, o "" si no hay
  const contenido = selectedChat ? contenidoPorChat[selectedChat.id_chat] || "" : "";

  // Actualizar el contenido para el chat actual
  const handleContenidoChange = (e) => {
    const texto = e.target.value;
    setContenidoPorChat((prev) => ({
      ...prev,
      [selectedChat.id_chat]: texto,
    }));
  };

  const enviarMensaje = () => {
    if (!contenido.trim()) {
      return;
    }

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      return;
    }

    const mensaje = {
      id_usuario: usuarioId,
      id_chat: chat.id_chat,
      contenido: contenido,
    };

    socket.send(JSON.stringify(mensaje));

   
    setContenidoPorChat((prev) => ({
      ...prev,
      [selectedChat.id_chat]: "",
    }));
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!selectedChat) {
    return (
      <div className="flex-1 relative">
        <div className="h-[calc(120vh-144px)] flex items-center justify-center">
          <p className="secondary-color">Select a chat to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative m-0 p-0 flex flex-col h-full">
      <header className="bg-gray-800 px-4 py-5 m-0">
        <h1 className="text-2xl font-semibold secondary-color m-0">
          {selectedChat.nombre_chat}
        </h1>
      </header>
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto px-4 py-2 background-primary m-0"
      >
        {messages.map((message, index) => (
          <TextChat
            key={message.id_mensaje || index}
            contenido={message.contenido}
            hora={message.hora_envio}
            id_user={message.id_usuario}
          />
        ))}
      </div>
      <footer className="bg-gray-800 px-4 py-4 w-full m-0">
        <div className="flex items-center m-0">
          <textarea
            rows={1}
            style={{ resize: "none" }}
            placeholder="Type a message..."
            className="w-full max-h-32 min-h-[48px] p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 background-terciary secondary-color placeholder-secondary-color overflow-auto"
            value={contenido}
            onChange={handleContenidoChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                enviarMensaje();
              }
            }}
          />
          <button
            onClick={enviarMensaje}
            disabled={!socket || socket.readyState !== WebSocket.OPEN}
            className={`ml-2 px-4 py-4 rounded-2xl text-white transition-colors duration-200 ${
              conectado ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatArea;
