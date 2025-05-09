import React, { useState, useEffect } from "react";

const ChatComponent = ({ chatId, usuarioId }) => {
  const [messages, setMessages] = useState([]);
  const [contenido, setContenido] = useState("");
  const [socket, setSocket] = useState(null);
  const [conectado, setConectado] = useState(false);
  const [token, setToken] = useState(null);

  // Obtener el token de localStorage o de donde lo tengas guardado
  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.warn("Token no encontrado en localStorage");
    }
  }, []);

  // Configuración del WebSocket
  useEffect(() => {
    if (!token || !chatId) return;

    const socket = new WebSocket(
      `wss://localhost:8443/ws?token=${token}&chatId=${chatId}`
    ); // Conexión WebSocket

    socket.onopen = () => {
      console.log("Conectado al WebSocket");
      setConectado(true);
    };

    socket.onmessage = (event) => {
      const mensaje = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, mensaje]);
    };

    socket.onclose = () => {
      console.log("Desconectado del WebSocket");
      setConectado(false);
      setSocket(null);
    };

    setSocket(socket);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [token, chatId]);

  const enviarMensaje = () => {
    if (contenido.trim() && socket?.readyState === WebSocket.OPEN) {
      const mensaje = {
        id_usuario: usuarioId,
        id_chat: chatId,
        contenido: contenido,
      };

      socket.send(JSON.stringify(mensaje)); // Enviar mensaje por WebSocket
      setContenido("");
    } else {
      console.warn("WebSocket no está conectado todavía o mensaje vacío");
    }
  };

  return (
    <div>
      <div>
        <h2>Chat {chatId}</h2>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.id_usuario}:</strong> {msg.contenido}{" "}
              <em>{msg.hora_envio}</em>
            </div>
          ))}
        </div>
      </div>

      <input
        type="text"
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        placeholder="Escribe un mensaje..."
      />
      <button
        onClick={enviarMensaje}
        disabled={!conectado || !contenido.trim()}
      >
        Enviar
      </button>
    </div>
  );
};

export default ChatComponent;
