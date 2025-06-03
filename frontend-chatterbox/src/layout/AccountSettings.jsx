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

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
      if (files[0]) setImagePreview(URL.createObjectURL(files[0]));
      else setImagePreview(null);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle saving the data
    console.log('Form submitted', formData);
  };

  return (
    <div className="min-h-screen background-primary flex flex-col items-center justify-center px-2 py-8">
      <h2 className="text-4xl md:text-6xl primary-color font-semibold mb-8 md:mb-10 text-center">
        Account Settings
      </h2>

      <form
        onSubmit={handleSubmit}
        className="background-secondary border primary-color rounded-lg p-4 md:p-10 w-full max-w-2xl md:max-w-4xl min-h-[500px] md:min-h-[700px] grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 text-white shadow-[0_1px_10px_rgba(0,0,0,0.05)] shadow-yellow-100"
      >
        {/* Nickname */}
        <div className="relative flex items-center">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
            <User className="w-5 h-5 md:w-6 md:h-6 primary-color" />
          </span>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="Enter your nickname"
            className="w-full pl-11 md:pl-14 py-3 rounded background-terciary border border-gray-600 focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>

        {/* Full Name */}
        <div className="relative flex items-center">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
            <Pencil className="w-5 h-5 md:w-6 md:h-6 primary-color" />
          </span>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full pl-11 md:pl-14 py-3 rounded background-terciary border border-gray-600 focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>

        {/* Email */}
        <div className="relative flex items-center">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
            <Mail className="w-5 h-5 md:w-6 md:h-6 primary-color" />
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full pl-11 md:pl-14 py-3 rounded background-terciary border border-gray-600 focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>

        {/* Password */}
        <div className="relative flex items-center">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
            <Lock className="w-5 h-5 md:w-6 md:h-6 primary-color" />
          </span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full pl-11 md:pl-14 py-3 rounded background-terciary border border-gray-600 focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>

        {/* Profile Image */}
        <div className="col-span-1 flex flex-col gap-2">
          <label className="block mb-2 text-base md:text-lg">Profile Image</label>
          <div className="flex items-center gap-3">
            <ImageIcon className="w-5 h-5 md:w-6 md:h-6 primary-color" />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-500"
            />
          </div>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 mt-2 rounded-full object-cover border border-yellow-400 shadow"
            />
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative flex items-center">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
            <CheckCircle className="w-5 h-5 md:w-6 md:h-6 primary-color" />
          </span>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            className="w-full pl-11 md:pl-14 py-3 rounded background-terciary border border-gray-600 focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>

        {/* Save Button */}
        <div className="col-span-1 md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="w-full md:w-[400px] mt-6 border-1 text-white py-4 rounded background-terciary transition cursor-pointer
              hover:bg-yellow-400 hover:text-yellow-100 hover:shadow-lg hover:scale-105"
            style={{ borderColor: '#FFEBA7' }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
