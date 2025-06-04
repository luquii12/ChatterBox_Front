import { useState } from "react";
import { Menu, User } from "lucide-react";

export default function Header({ groupName = "HTML", chatName = "Introductions", onLeave }) {
  const [showModal, setShowModal] = useState(false);

  const handleConfirmLeave = () => {
    setShowModal(false);
    if (onLeave) onLeave(); // Llama al callback para salir del grupo
  };

  return (
    <>
      <header className="flex items-center justify-between px-4 py-2 bg-gray-900 text-white shadow-md">
        <div className="flex items-center space-x-4">
          {/* User */}
          <div className="flex items-center space-x-2 border border-yellow-400 rounded-full px-3 py-">
            <User className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">User</span>
          </div>

          {/* Menu */}
          <Menu className="w-5 h-12" />

          {/* Group */}
          <div className="flex items-center space-x-1 bg-gray-800 px-2 py-1 rounded-full">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"
              alt="HTML"
              className="w-5 h-5"
            />
            <span className="text-sm">{groupName}</span>
          </div>

          {/* Chat name */}
          <span className="ml-4 text-sm text-gray-300 flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>{chatName}</span>
          </span>
        </div>

        {/* Leave group button */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-300 text-black font-semibold px-3 py-1 rounded hover:bg-yellow-400 transition"
        >
          LEAVE GROUP
        </button>
      </header>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">¿Salir del grupo?</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              ¿Estás seguro de que quieres salir del grupo <strong>{groupName}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmLeave}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
