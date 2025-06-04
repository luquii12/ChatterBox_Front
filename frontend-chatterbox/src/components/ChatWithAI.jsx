import { useState, useRef, useEffect } from "react";
import { CreateMLCEngine } from "@mlc-ai/web-llm";

const MODELS = [
  { id: "gemma-2-2b-it-q4f16_1-MLC", name: "Gemma 2B (1.9GB)" },
  { id: "phi-2-q4f16_1-MLC", name: "Phi-2 (3.1GB)" },
  { id: "Llama-3.2-1B-Instruct-q4f16_1-MLC", name: "Llama 3.2 1B (879MB)" },
  { id: "Llama-3.2-3B-Instruct-q4f16_1-MLC", name: "Llama 3.2 3B (2.3GB)" },
  { id: "Qwen3-0.6B-q4f16_1-MLC", name: "Qwen3 0.6B (1.4GB)" },
  { id: "Qwen3-1.7B-q4f16_1-MLC", name: "Qwen3 1.7B (2.0GB)" },
  { id: "Qwen3-4B-q4f16_1-MLC", name: "Qwen3 4B (3.4GB)" },
  { id: "SmolLM2-1.7B-Instruct-q4f16_1-MLC", name: "SmolLM2 1.7B (1.8GB)" },
  { id: "TinyLlama-1.1B-Chat-v1.0-q4f16_1-MLC", name: "TinyLlama 1.1B (700MB)" },
];

const ChatWithAI = () => {
  const [selectedModel, setSelectedModel] = useState("");
  const [engine, setEngine] = useState(null);
  const [loadingModel, setLoadingModel] = useState(false);
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful AI assistant." }
  ]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [streamedReply, setStreamedReply] = useState("");
  const engineRef = useRef(null);
  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (selectedModel && !engine) {
      const load = async () => {
        setLoadingModel(true);
        setProgress(0);
        const engineInstance = await CreateMLCEngine(
          selectedModel,
          {
            initProgressCallback: (p) => setProgress(p.progress || 0)
          }
        );
        setEngine(engineInstance);
        engineRef.current = engineInstance;
        setLoadingModel(false);
      };
      load();
    }
  }, [selectedModel]);

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!engine) return;
    setChatLoading(true);
    setStreamedReply("");
    const newMessages = [
      ...messages,
      { role: "user", content: input }
    ];
    setMessages(newMessages);
    setInput("");
    try {
      let reply = "";
      const chunks = await engineRef.current.chat.completions.create({
        messages: newMessages,
        stream: true
      });
      for await (const chunk of chunks) {
        reply += chunk.choices[0]?.delta?.content || "";
        setStreamedReply(reply);
        scrollToBottom();
      }
      setMessages([
        ...newMessages,
        { role: "assistant", content: reply }
      ]);
      setStreamedReply("");
      setTimeout(scrollToBottom, 100);
    } catch (err) {
      setStreamedReply("Error: " + err.message);
    }
    setChatLoading(false);
  };

  if (!selectedModel) {
    return (
      <div className="flex flex-col items-center justify-center h-screen min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-bold text-yellow-300 mb-6">Selecciona un modelo de IA</h2>
          <select
            className="mb-6 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={selectedModel}
            onChange={e => setSelectedModel(e.target.value)}
          >
            <option value="">Selecciona un modelo...</option>
            {MODELS.map(model => (
              <option key={model.id} value={model.id}>{model.name}</option>
            ))}
          </select>
          <span className="text-gray-400 text-sm">Podrás cambiar de modelo recargando la página.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative m-0 p-0 flex flex-col h-screen min-h-screen">
      <header className="bg-gray-800 px-4 py-5 m-0">
        <h1 className="text-2xl font-semibold secondary-color m-0">
          Chat IA
        </h1>
      </header>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-2 background-primary m-0 flex flex-col"
        style={{ maxHeight: "calc(100vh - 180px)" }}
      >
        {messages
          .filter(m => m.role !== "system")
          .map((msg, idx, arr) => {
            if (
              idx === arr.length - 1 &&
              msg.role === "assistant" &&
              chatLoading &&
              streamedReply
            ) {
              return (
                <div
                  key={idx}
                  className="flex mb-4"
                >
                  <div className="p-3 rounded-xl bg-yellow-400 text-black max-w-[70%] shadow self-start">
                    <span className="font-semibold">AI:</span> {streamedReply}
                  </div>
                </div>
              );
            }
            return (
              <div
                key={idx}
                className={`flex mb-4 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                <div
                  className={`p-3 rounded-xl text-sm shadow break-words whitespace-pre-wrap max-w-[70%] ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-yellow-400 text-black rounded-bl-none"
                  }`}
                >
                  <span className="font-semibold">
                    {msg.role === "user" ? "You" : "AI"}:
                  </span>{" "}
                  {msg.content}
                </div>
              </div>
            );
          })}

        {loadingModel && (
          <div className="flex justify-center items-center my-8">
            <div className="bg-yellow-400 text-black px-6 py-3 rounded-xl shadow font-semibold flex items-center gap-2 animate-pulse">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Loading model... {Math.round(progress * 100)}%
            </div>
          </div>
        )}

        {chatLoading && !streamedReply && (
          <div className="flex justify-center items-center my-8">
            <div className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow font-semibold flex items-center gap-2 animate-pulse">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              AI is typing...
            </div>
          </div>
        )}

        {chatLoading && streamedReply && (
          <div className="flex mb-4">
            <div className="p-3 rounded-xl bg-yellow-400 text-black max-w-[70%] shadow self-start">
              <span className="font-semibold">AI:</span> {streamedReply}
            </div>
          </div>
        )}
      </div>
      <footer className="bg-gray-800 px-4 py-4 w-full m-0">
        <div className="flex items-center m-0">
          <textarea
            rows={1}
            style={{ resize: "none" }}
            placeholder="Type a message..."
            className="w-full max-h-32 min-h-[48px] p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 background-terciary secondary-color placeholder-secondary-color overflow-auto"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={loadingModel || chatLoading}
          />
          <button
            onClick={handleSend}
            disabled={loadingModel || chatLoading}
            className={`ml-2 px-4 py-4 rounded-2xl text-white transition-colors duration-200 ${
              !loadingModel && !chatLoading
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatWithAI;