import React from "react";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 ">
      <h1 className="text-4xl md:text-5xl font-bold primary-color mb-4 text-center">About Chatterbox</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">
        <span className="font-semibold primary-color">Chatterbox</span> is a modern, secure, and user-friendly chat platform designed to connect people and groups in a fun and productive way.
      </p>
      <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 mb-8 text-center">
        Our mission is to make communication easy, private, and enjoyable for everyone. Whether you want to chat with friends, collaborate with classmates, or join public communities, Chatterbox gives you the tools to do it safely and efficiently.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-8 mb-10">
        <div className="flex-1 bg-white dark:bg-[#1f263b] rounded-2xl p-6 shadow-lg shadow-yellow-100">
          <h2 className="text-xl font-semibold primary-color mb-2">Key Features</h2>
          <ul className="list-disc list-inside text-left text-gray-700 dark:text-gray-300 space-y-2">
            <li>Private and public group chats</li>
            <li>Modern, responsive design</li>
            <li>Profile customization</li>
            <li>Privacy and security controls</li>
            <li>Easy group management</li>
            <li>Help Center and FAQ</li>
          </ul>
        </div>
        <div className="flex-1 bg-white dark:bg-[#1f263b] rounded-2xl p-6 shadow-lg shadow-yellow-100">
          <h2 className="text-xl font-semibold primary-color mb-2">Our Values</h2>
          <ul className="list-disc list-inside text-left text-gray-700 dark:text-gray-300 space-y-2">
            <li>Respect and inclusion</li>
            <li>User privacy first</li>
            <li>Continuous improvement</li>
            <li>Open communication</li>
            <li>Community-driven development</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded font-semibold text-sm">🔒 Security</span>
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded font-semibold text-sm">💬 Community</span>
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded font-semibold text-sm">📱 Mobile Friendly</span>
      </div>
      <p className="mt-10 text-base md:text-lg text-gray-500 dark:text-gray-400 text-center">
        Thank you for being part of the Chatterbox community!
      </p>
    </div>
  );
};

export default About;