import { useEffect, useState } from 'react';
import supabase from './supabaseClient';  // Asegúrate de tener configurado tu cliente Supabase
import "./index.css"
function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("User1");
  const [newUser,setNewUser]=useState("")

  useEffect(() => {
    // Cargar mensajes iniciales
    const fetchMessages = async () => {
      let { data } = await supabase.from("messages").select("*").order("created_at", { ascending: true });
      setMessages(data);
    };
    fetchMessages();

    // Escuchar nuevos mensajes en tiempo real
    const subscription = supabase
      .channel("realtime-messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const sendMessage = async () => {
    if (message.trim() === "") return;
    await supabase.from("messages").insert([{ content: message, user_name: userName }]);
    setMessage("");
  };

  return (
    <div className="chat-container">
    <h2 className="title">Chat en Tiempo Real</h2>
    <div className="chat-box">
      {messages.map((msg) => {
        const isMyMessage = msg.user_name === userName;
        return (
          <div key={msg.id} className={`message-container ${isMyMessage ? "my-message" : "other-message"}`}>
            <p className="message">
              <strong>{msg.user_name}: </strong> {msg.content}
            </p>
          </div>
        );
      })}
    </div>
    <div className="input-container">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
        className="input"
      />
      <button onClick={sendMessage} className="button">Enviar</button>
    </div>
    <input
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
        placeholder="Cambiar usuario"
        className="input"
      />    <button onClick={()=>{setUserName(newUser)}} className="button">Cambiar Usuario</button>

  </div>
);
}


export default App;
