import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaUser, FaTools, FaProjectDiagram, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const navItems = [
  { id: "home", icon: <FaHome />, label: "Home" },
  { id: "about", icon: <FaUser />, label: "About" },
  { id: "tech", icon: <FaTools />, label: "Tech Stack" },
  { id: "projects", icon: <FaProjectDiagram />, label: "Projects" },
  { id: "contact", icon: <FaEnvelope />, label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const event = new CustomEvent("navbarNavigate", { detail: id });
    window.dispatchEvent(event);
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop pill — hidden on small screens via CSS */}
      <div className="navbar">
        {navItems.map((item, index) => (
          <div
            className="nav-item"
            key={index}
            onClick={() => scrollToSection(item.id)}
          >
            <div className="icon">{item.icon}</div>
            <span className="tooltip">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Hamburger trigger — only shown on small screens via CSS */}
      <button
        className="navbar-burger"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="navbar-mobile-backdrop" onClick={() => setIsOpen(false)}></div>
            <motion.div
              className="navbar-mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {navItems.map((item, index) => (
                <button
                  className="navbar-mobile-item"
                  key={index}
                  onClick={() => scrollToSection(item.id)}
                >
                  <span className="navbar-mobile-icon">{item.icon}</span>
                  <span className="navbar-mobile-label">{item.label}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
