import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./CustomCursor.css";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <motion.div
      className="custom-triangle-cursor"
      animate={{ x: mousePosition.x, y: mousePosition.y }}
      transition={{ type: "tween", ease: "linear", duration: 0 }} // Pure real-time tracking
    >
      {/* Pristine modern SVG vector triangle arrow */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M4.5 3V19.5L9.8 14.2H18.5L4.5 3Z" 
          fill="#FFFFFF" 
        />
      </svg>
    </motion.div>
  );
}