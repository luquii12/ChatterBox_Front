import React from "react";
import ChatComponent from "./ChatComponent"; // Importa el componente de chat

const App = () => {
  // Aquí defines manualmente el chatId, usuarioId y token para probar
  const chatId = 1; // Este sería el ID del chat en el que estás
  const usuarioId = 1; // Este es el ID del usuario que está logueado

  return (
    <div>
      <h1>Aplicación de Chat</h1>
      {/* Pasa los props al ChatComponent */}
      <ChatComponent chatId={chatId} usuarioId={usuarioId} />
    </div>
  );
};

export default App;
