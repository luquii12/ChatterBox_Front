
const ChatArea = ({selectedChat}) => {

if(!selectedChat) {
  return (
    <div className="flex-1 relative">
      <div className="h-[calc(100vh-144px)] flex items-center justify-center">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    </div>
  )}

  return (
    <div className="flex-1 relative">
      {/* Chat Header */}
      <header className="bg-white p-4 text-gray-700 border-b border-gray-300">
        <h1 className="text-2xl font-semibold">Alice</h1>
      </header>

      {/* Chat Messages */}
      <div className="h-[calc(100vh-144px)] overflow-y-auto p-4 pb-36">
        {/* Incoming */}
        <div className="flex mb-4">
          <div className="w-9 h-9 rounded-full mr-2">
            <img
              src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="Alice Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div className="bg-white rounded-lg p-3 max-w-[24rem] shadow border text-gray-700">
            <p>Hey Bob, how's it going?</p>
          </div>
        </div>

        {/* Outgoing */}
        <div className="flex justify-end mb-4">
          <div className="bg-indigo-500 text-white rounded-lg p-3 max-w-[24rem] shadow">
            <p>Hi Alice! I'm good, just finished a great book. How about you?</p>
          </div>
          <div className="w-9 h-9 rounded-full ml-2">
            <img
              src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="My Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>

        {/* Repetir más mensajes aquí como arriba, si lo necesitas */}
        {/* Usa el mismo patrón para incoming/outgoing */}
      </div>

      {/* Chat Input */}
      <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500"
          />
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md ml-2">
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatArea;
