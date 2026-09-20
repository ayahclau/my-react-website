import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.body.className = dark ? "dark" : "light";
  }, [dark]);

  return (
    <div 
      className={`theme-switch ${dark ? "dark" : "light"}`} 
      onClick={() => setDark(!dark)}
    >
      <div className="switch-track">
        {/* Background icons */}
        <FaMoon className="icon-moon" size={14} />
        <FaSun className="icon-sun" size={14} />
        
        {/* The sliding circle */}
        <div className="switch-thumb"></div>
      </div>
    </div>
  );
}