import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./CustomCursor.css";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia(FINE_POINTER).matches
  );
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const query = window.matchMedia(FINE_POINTER);
    const handleChange = (e) => setEnabled(e.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const updateMousePosition = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("pointermove", updateMousePosition);
    return () => window.removeEventListener("pointermove", updateMousePosition);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      className="custom-triangle-cursor"
      animate={{ x: mousePosition.x, y: mousePosition.y }}
      transition={{ type: "tween", ease: "linear", duration: 0 }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M4.5 3V19.5L9.8 14.2H18.5L4.5 3Z" 
          fill="#FFFFFF" 
        />
      </svg>
    </motion.div>
  );
}
