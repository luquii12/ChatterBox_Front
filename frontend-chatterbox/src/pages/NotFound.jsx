import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Texto a la izquierda */}
      <div className="flex-1 flex flex-col items-center md:items-end justify-center px-4">
        <h1 className="text-7xl font-extrabold primary-color mb-1 leading-tight">
          Oops!...
        </h1>
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-1 leading-tight">
          Well, this is unexpected...
        </h2>
        <p className="text-2xl text-gray-700 dark:text-gray-300 mb-1 leading-tight">
          Error Code:{" "}
          <span className="font-bold">404</span>
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 text-center md:text-right leading-snug">
          An error has occurred and we're working to fix the problem! We'll be up
          and running shortly.
          <br />
          If you need immediate help from our customer service team about an
          ongoing reservation, please call us.
          <br />
          If it isn't an urgent matter, please visit our Help Center for
          additional information. Thanks for your patience!
        </p>
        <button
          onClick={() => navigate(user ? "/" : "/login")}
          className="px-8 py-3 rounded bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg transition"
        >
          {user ? "Go to Home" : "Go to Login"}
        </button>
      </div>
      {/* Imagen a la derecha */}
      <div className="flex-1 flex justify-center md:justify-start items-center">
        <img
          src="/images/notFound.png"
          alt="Not found"
          className="w-[28rem] h-[28rem] max-w-full object-contain"
        />
      </div>
    </div>
  );
};

export default NotFound;