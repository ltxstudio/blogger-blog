import React from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md transition-all">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-2xl font-bold text-blue-500 dark:text-blue-300">
          MyBlog
        </Link>
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
            Home
          </Link>
          <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
            About
          </Link>
          <DarkModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
