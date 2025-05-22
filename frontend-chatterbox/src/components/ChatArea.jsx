import { useEffect, useState, useRef } from "react";
import ChatServices from "../services/ChatServices";
import TextChat from "./TextChat";

const ChatArea = ({ selectedChat }) => {
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [contenido, setContenido] = useState("");
  const [socket, setSocket] = useState(null);
  const [conectado, setConectado] = useState(false);
  const [token, setToken] = useState(null);
  const scrollRef = useRef(null);

  const usuarioId = JSON.parse(localStorage.getItem("user"))?.usuario?.id_usuario;

  // Obtener token
  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem("user"));
    if (storedToken) {
      setToken(storedToken.token);
    } else {
      console.warn("Token no encontrado");
    }
  }, []);

  // Cargar historial
  useEffect(() => {
    if (!selectedChat) return;

    setChat(selectedChat);
    ChatServices.getAllMesajesFromChat(selectedChat.id_chat)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error al cargar mensajes:", err));
  }, [selectedChat]);

  // Conexión WebSocket
  useEffect(() => {
    if (!selectedChat || !token) return;

    console.log("Conectando a WebSocket...");

    const ws = new WebSocket(
      `wss://localhost:8443/ws?token=${token}&chatId=${selectedChat.id_chat}`
    );

    ws.onopen = () => {
      console.log("Conectado WebSocket");
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
      console.log("WebSocket cerrado");
      setConectado(false);
    };

    setSocket(ws);

    return () => {
      console.log("Cerrando WebSocket anterior");
      ws.close();
      setSocket(null);
    };
  }, [selectedChat, token]);

  // Enviar mensaje
  const enviarMensaje = () => {
    if (!contenido.trim()) {
      console.warn("Mensaje vacío");
      return;
    }

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.warn("WebSocket no está listo para enviar");
      return;
    }

    const mensaje = {
      id_usuario: usuarioId,
      id_chat: chat.id_chat,
      contenido: contenido,
    };

    socket.send(JSON.stringify(mensaje));
    setContenido("");
  };

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Sin chat seleccionado
  if (!selectedChat) {
    return (
      <div className="flex-1 relative">
        <div className="h-[calc(100vh-144px)] flex items-center justify-center">
          <p className="text-gray-500">Select a chat to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative">
      <header className="bg-white p-4 text-gray-700 border-b border-gray-300">
        <h1 className="text-2xl font-semibold">{selectedChat.nombre_chat}</h1>
      </header>

      {/* Chat Messages */}
      <div
        ref={scrollRef}
        className="h-[calc(100vh-144px)] overflow-y-auto p-4 pb-36"
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

      {/* Chat Input */}
      <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 text-gray-700 placeholder-gray-400"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
          />
          <button
            onClick={enviarMensaje}
            disabled={!socket || socket.readyState !== WebSocket.OPEN}
            className={`${
              conectado
                ? "bg-indigo-500 hover:bg-indigo-600"
                : "bg-gray-300 cursor-not-allowed"
            } text-white px-4 py-2 rounded-2xl ml-2 transition-colors duration-200`}
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatArea;
