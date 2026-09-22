import { useEffect, useState } from "react";
import "./BackgroundGlow.css";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

export default function BackgroundGlow() {
  const [enabled, setEnabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia(FINE_POINTER).matches
  );
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const query = window.matchMedia(FINE_POINTER);
    const handleChange = (e) => setEnabled(e.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handlePointerMove = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="glow-orb"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    ></div>
  );
}
