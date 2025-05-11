import React from "react";
import { useNavigate } from "react-router-dom"; 



const Header = () => {
  const navigate = useNavigate();
  return (
  <header className="flex items-center justify-between background-secondary text-white p-4">
 
  <div className="flex items-center gap-4">
    <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
      <span className="text-xl">👤</span> 
    </div>
    <button className="text-2xl">
      ☰
    </button>
  </div>

  <div className="flex items-center gap-4">
    <button className="bg-transparent text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition" >
      JOIN GROUP
    </button>
    <button className="bg-[#F5D67B] text-black font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition"  onClick={() => navigate("/create")}>
      NEW GROUP
    </button>
  </div>
</header>

  );
};

export default Header;
