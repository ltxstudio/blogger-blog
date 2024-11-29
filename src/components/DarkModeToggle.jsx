import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(() => localStorage.theme === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="text-gray-600 dark:text-gray-300 text-xl focus:outline-none"
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default DarkModeToggle;
