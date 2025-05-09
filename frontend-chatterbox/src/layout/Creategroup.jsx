import React, { useState } from "react";
import "../styles/LoginSingIn.css";

const Creategroup = () => {
  const [form, setForm] = useState({
    name: "",
    image: null,
    isPrivate: false,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    setForm((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("description", form.description);
  formData.append("isPrivate", form.isPrivate);
  if (form.image) {
    formData.append("image", form.image);
  }

  try {
    const response = await fetch("/grupos", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error creating group");
    }

    const result = await response.json();
    console.log("Group created successfully:", result);
    window.location.reload();
  } catch (error) {
    console.error("Failed to create group:", error);
  }
};


  return (
    <div className="min-h-screen bg-[#0D1321] flex items-center justify-center p-6">
      <div className="bg-[#1E1E2F] text-white p-8 rounded-lg border border-yellow-300 shadow-xl w-full max-w-md">
        <h2 className="text-center text-3xl font-bold text-[#F5D67B] mb-8 tracking-wide">
          Create Group
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-1">Group Name</label>
            <input
              type="text"
              name="name"
              className="w-full bg-[#2C2C3C] p-3 rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter group name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Group Image (optional)</label>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center bg-[#0F1624] rounded border border-white text-lg">
                ⬆️
              </div>
              <label className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-700 transition cursor-pointer">
                <input type="file" className="hidden" onChange={handleImageUpload} />
                Upload
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Privacy</label>
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isPrivate"
                  className="sr-only peer"
                  checked={form.isPrivate}
                  onChange={handleChange}
                />
                <div className="w-11 h-6 bg-gray-400 rounded-full peer peer-checked:bg-yellow-400 peer-focus:ring-2 peer-focus:ring-yellow-400 transition duration-300"></div>
              </label>
              <span className="text-sm">Private group</span>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Description (optional)</label>
            <input
              type="text"
              name="description"
              className="w-full bg-[#2C2C3C] p-3 rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Group description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2C2C3C] text-white font-semibold py-3 rounded hover:bg-yellow-400 hover:text-black transition"
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default Creategroup;
