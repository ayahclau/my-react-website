import { FaHome, FaUser, FaTools, FaProjectDiagram, FaEnvelope } from "react-icons/fa";
import "./Navbar.css";

const navItems = [
  { id: "home", icon: <FaHome />, label: "Home" },
  { id: "about", icon: <FaUser />, label: "About" },
  { id: "tech", icon: <FaTools />, label: "Tech Stack" },
  { id: "projects", icon: <FaProjectDiagram />, label: "Projects" },
  { id: "contact", icon: <FaEnvelope />, label: "Contact" },
];

export default function Navbar() {
  
  const scrollToSection = (id) => {
      const event = new CustomEvent("navbarNavigate", { detail: id });
      window.dispatchEvent(event);
    };

  return (
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
  );
}