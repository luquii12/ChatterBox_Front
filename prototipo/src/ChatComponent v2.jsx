import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs"; // Para manejar WebSockets con STOMP
import SockJS from "sockjs-client"; // Cliente para WebSocket

const ChatComponent = ({ chatId, usuarioId }) => {
  // Asegúrate de recibir el token como prop
  const [messages, setMessages] = useState([]);
  const [contenido, setContenido] = useState("");
  const [client, setClient] = useState(null);
  const [conectado, setConectado] = useState(false);
  const [token, setToken] = useState(null);

  // Obtener el token de localStorage o de donde lo tengas guardado --> Repasar
  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      console.log(token);
      setToken(storedToken);
    } else {
      console.warn("Token no encontrado en localStorage");
    }
  }, []);

  // Configuración del WebSocket
  useEffect(() => {
    if (!token) {
      console.warn("Token aún no disponible, esperando...");
      return;
    }

    const stompClient = new Client({
      webSocketFactory: () => {
        const sockJs = new SockJS("https://localhost:8443/ws");

        //console.log(sockJs);
        return sockJs;
      },
      connectHeaders: {
        Authorization: `Bearer ${token}`, // Aquí agregas el token en los headers
      },
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("Conectado al WebSocket");

        // Ahora ya está conectado, puedes guardarlo
        setClient(stompClient);
        setConectado(true);

        stompClient.subscribe(`/topic/chat.${chatId}`, (message) => {
          const mensaje = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, mensaje]);
        });
      },
      onDisconnect: () => {
        console.log("Desconectado del WebSocket");
      },
    });

    stompClient.activate();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [chatId, token]);

  const enviarMensaje = () => {
    if (contenido.trim() && client?.connected) {
      const mensaje = {
        id_usuario: usuarioId,
        id_chat: chatId,
        contenido: contenido,
      };

      client.publish({
        destination: "/app/chat.enviar",
        body: JSON.stringify(mensaje),
      });

      setContenido("");
    } else {
      console.warn("STOMP no está conectado todavía o mensaje vacío");
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
