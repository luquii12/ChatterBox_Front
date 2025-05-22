import React, { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Image as ImageIcon,
  CheckCircle,
  Pencil,
} from 'lucide-react';

export default function AccountSettings() {
  const [formData, setFormData] = useState({
    nickname: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
  };

  return (
    <div className="min-h-screen background-primary flex flex-col items-center justify-center px-4 py-10">
      <h2 className="text-6xl primary-color font-semibold mb-10">Account Settings</h2>

      <form
        onSubmit={handleSubmit}
        className="background-secondary border primary-color rounded-lg p-10 w-[1500px] min-h-[700px] grid grid-cols-1 md:grid-cols-2 gap-22 text-white shadow-[0_1px_10px_rgba(0,0,0,0.05)] shadow-yellow-100"
      >
       
        <div className="relative">
          <label className="block mb-2">Nickname</label>
          <User className="absolute left-3 top-2/3 -translate-y-1/2 w-6 h-6 primary-color" />
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="Enter your nickname"
            className="w-full px-12 py-3 rounded background-terciary border border-gray-600"
          />
        </div>

        
        <div className="relative">
          <label className="block mb-2">Full Name</label>
          <Pencil className="absolute left-3 top-2/3 -translate-y-1/2 w-6 h-6 primary-color" />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full px-12 py-3 rounded background-terciary border border-gray-600"
          />
        </div>

        <div className="relative">
          <label className="block mb-2">Email</label>
          <Mail className="absolute left-3 top-2/3  -translate-y-1/2 w-6 h-6 primary-color" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-12 py-3 rounded background-terciary border border-gray-600"
          />
        </div>

       
        <div className="relative">
          <label className="block mb-2">Password</label>
          <Lock className="absolute left-3 top-2/3 -translate-y-1/2 w-6 h-6 primary-color" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-12 py-3 rounded background-terciary border border-gray-600"
          />
        </div>

      
        <div>
          <label className="block mb-2">Profile Image</label>
          <div className="flex items-center gap-3">
            <ImageIcon className="w-6 h-6 primary-color" />
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-500"
            />
          </div>
        </div>

       
        <div className="relative">
          <label className="block mb-2">Confirm Password</label>
          <CheckCircle className="absolute left-3 top-2/3  -translate-y-1/2 w-6 h-6 primary-color" />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            className="w-full px-12 py-3 rounded background-terciary border border-gray-600"
          />
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
                type="submit"
                className="w-[600px] mt-6 border-1 text-white py-5 rounded hover:bg-[#FFEBA7] background-terciary"
                style={{ borderColor: '#FFEBA7' }}
            >
                Save Changes
            </button>
        </div>

      </form>
    </div>
  );
}
