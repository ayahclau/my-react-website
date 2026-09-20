import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaFingerprint } from "react-icons/fa";
import "./LoginScreen.css";

export default function LoginScreen({ onLogin }) {
  const [isUnlocking, setIsUnlocking] = useState(false);

  // 🌟 FIX: Wrapped in useCallback to resolve React Hook dependency warnings
  const handleUnlock = useCallback(() => {
    if (isUnlocking) return;
    setIsUnlocking(true);
    setTimeout(() => {
      onLogin();
    }, 900);
  }, [isUnlocking, onLogin]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === "Enter" || e.key === " ") && !isUnlocking) {
        handleUnlock();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isUnlocking, handleUnlock]);

  return (
    <div className="portal-container">
      {/* Background Grid & Ambient Glows */}
      <div className="portal-grid"></div>
      <div className="portal-blob blob-1"></div>
      <div className="portal-blob blob-2"></div>

      {/* 🌟 Lowercase, Italicized, Giant "hello" Text — reveals left to
          right on load like it's being handwritten */}
      <motion.h1
        className="portal-bg-text"
        initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.6, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
      >
        hello
      </motion.h1>

      {/* Main Glass Center Card Assembly */}
      <div className="portal-card-wrapper">
        {/* Central Glass Card */}
        <motion.div
          className={`portal-card ${isUnlocking ? "is-unlocking" : ""}`}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={
            isUnlocking
              ? { opacity: 0, scale: 1.8, filter: "blur(20px)" }
              : { opacity: 1, scale: 1, y: 0 }
          }
          transition={{ duration: isUnlocking ? 0.9 : 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* 🎨 Redesigned Artsy Dual-Layer Pulse Avatar Frame */}
          <div className="portal-avatar-box">
            <div className="avatar-art-ring ring-glow"></div>
            <div className="avatar-art-ring ring-dashed"></div>
            <span className="avatar-sparkle avatar-sparkle-1"></span>
            <span className="avatar-sparkle avatar-sparkle-2"></span>
            <span className="avatar-sparkle avatar-sparkle-3"></span>
            <img
              src="./src/assets/pink_photo.png"
              alt="Aiah Clare Filipinas"
              className="portal-avatar"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";
              }}
            />
          </div>

          {/* Header Titles */}
          <div className="portal-meta">
            <h1 className="portal-name">Aiah Clare Filipinas</h1>
            <p className="portal-role">Full-Stack Developer & Designer</p>
          </div>

          {/* Unlock Button */}
          <button className="portal-enter-btn" onClick={handleUnlock}>
            <div className="shimmer-sweep"></div>
            <FaFingerprint className="btn-icon-fingerprint" />
            <span>Enter Space</span>
            <FaArrowRight className="btn-icon-arrow" />
          </button>

          <p className="portal-hotkey">
            Press <kbd>ENTER</kbd> or <kbd>SPACE</kbd> to launch
          </p>
        </motion.div>
      </div>
    </div>
  );
}