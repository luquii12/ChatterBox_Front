import React from "react";
import ChatComponent from "./ChatComponent"; // Importa el componente de chat
import PruebaImgUsuario from "./PruebaImgUsuario";
import PruebaImgGrupo from "./PruebaImgGrupo";

const App = () => {
  return (
    <div>
      <h1>Aplicación de Chat</h1>
      {/* Pasa los props al ChatComponent */}
      {/* <ChatComponent chatId={chatId} usuarioId={usuarioId} /> */}
      <PruebaImgUsuario />
      <PruebaImgGrupo />
    </div>
  );
};

export default App;
