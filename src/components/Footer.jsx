import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white/10 backdrop-blur-lg text-white mt-10">
      <div className="max-w-7xl mx-auto px-5 py-8 sm:py-12 flex flex-col sm:flex-row justify-between items-center gap-6">

        {/* Left Section - App Info */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold">WeatherApp</h2>
          <p className="text-gray-300 mt-1 text-sm">
            Stay updated with the latest weather information.
          </p>
        </div>

        {/* Middle Section - Newsletter / Contact */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-full w-64 sm:w-auto text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-5 py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 font-semibold text-white">
            Subscribe
          </button>
        </div>

        {/* Right Section - Social Links */}
        <div className="flex gap-4 mt-4 sm:mt-0">
          <a href="https://github.com/SrijanSahu05" className="hover:text-blue-400 transition-colors duration-300">GitHub</a>
          <a href="#" className="hover:text-blue-400 transition-colors duration-300">LinkedIn</a>
          <a href="#" className="hover:text-blue-400 transition-colors duration-300">Instagram</a>
        </div>

      </div>

      <div className="border-t border-white/20 mt-6 text-center text-gray-400 text-sm py-4">
        &copy; {new Date().getFullYear()} WeatherApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
