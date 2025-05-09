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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Group Created:", form);
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1321]">
      <div className="section">
        <div className="max-w-md mx-auto px-4">
          <div className="section pb-5 pt-5 text-center">
            <h6 className="mb-0 pb-3">
              <span>Create Group</span>
            </h6>

            <div className="card-3d-wrap mx-auto">
              <div className="card-3d-wrapper">
                <div className="card-front">
                  <div className="center-wrap">
                    <div className="section text-center">
                      <h4 className="text-2xl font-bold mb-6 pb-3 text-[#F5D67B]">
                        Create Group
                      </h4>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group mb-4 text-left">
                          <label className="block text-sm mb-1">GROUP NAME</label>
                          <input
                            type="text"
                            name="name"
                            className="form-style"
                            placeholder="Enter group name"
                            value={form.name}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-group mb-4 text-left">
                          <label className="block text-sm mb-1">GROUP IMAGE (OPTIONAL)</label>
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-12 flex items-center justify-center bg-[#0F1624] rounded border border-white">
                              ⬆️
                            </div>
                            <label className="bg-black text-white text-xs px-3 py-1 rounded hover:bg-gray-700 cursor-pointer">
                              <input type="file" className="hidden" onChange={handleImageUpload} />
                              UPLOAD IMAGE
                            </label>
                          </div>
                        </div>

                        <div className="form-group mb-4 text-left">
                          <label className="block text-sm mb-1">GROUP PRIVACY</label>
                          <div className="flex items-center gap-2">
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
                            <span className="text-sm">PRIVATE</span>
                          </div>
                        </div>

                        <div className="form-group mb-6 text-left">
                          <label className="block text-sm mb-1">DESCRIPTION (Optional)</label>
                          <input
                            type="text"
                            name="description"
                            className="form-style"
                            placeholder="Short group description"
                            value={form.description}
                            onChange={handleChange}
                          />
                        </div>

                        <button type="submit" className="btn w-full">
                          Create Group
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creategroup;
