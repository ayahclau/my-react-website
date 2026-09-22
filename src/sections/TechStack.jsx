import { motion } from "framer-motion";
import { FaTools, FaCode, FaServer, FaPaintBrush, FaTerminal } from "react-icons/fa";
import "./TechStack.css";

const techItems = [
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },
  { name: "Canva", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" },
  { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "NetBeans", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netbeans/netbeans-original.svg" },
];

const innerRing = techItems.slice(0, 5);
const middleRing = techItems.slice(5, 11);
const outerRing = techItems.slice(11, 18);

const categories = [
  { label: "Frontend & Mobile", icon: FaCode, count: 6 },
  { label: "Backend", icon: FaServer, count: 5 },
  { label: "Design", icon: FaPaintBrush, count: 3 },
  { label: "Dev Tools", icon: FaTerminal, count: 4 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const orbitVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function TechStack() {
  return (
    <section className="tech-section" id="tech">
      <motion.div
        className="tech-wrapper"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-80px" }}
      >
        <motion.div className="tech-side" variants={itemVariants}>
          <h2 className="tech-title">
            Tools that shape <span className="text-gradient">my craft.</span>
          </h2>

          <p className="tech-subtitle">
            Eighteen languages, frameworks, and design tools I reach for to take an idea from sketch to shipped product.
          </p>

          <div className="tech-categories">
            {categories.map(({ label, icon: Icon, count }) => (
              <div className="category-card" key={label}>
                <Icon className="category-icon" />
                <span className="category-label">{label}</span>
                <span className="category-count">{count} tools</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="orbit-system" variants={orbitVariants}>
          {/* Central Glowing Core */}
          <div className="orbit-center">
            <div className="center-glow"></div>
            <FaTools className="center-icon" />
          </div>

          {/* Inner Orbit Ring */}
          <div className="orbit-ring orbit-inner">
            {innerRing.map((tech, i) => {
              const angle = (360 / innerRing.length) * i;
              return (
                <div key={tech.name} className="orbit-item" style={{ "--angle": `${angle}deg` }}>
                  <div className="counter-rotate inner-counter">
                    <div className="tech-card">
                      <div className="glass-glow-effect"></div>
                      <img src={tech.icon} alt={tech.name} className="tech-img" />
                      <span className="tech-name">{tech.name}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Middle Orbit Ring (Reverse Spin) */}
          <div className="orbit-ring orbit-middle">
            {middleRing.map((tech, i) => {
              const angle = (360 / middleRing.length) * i;
              return (
                <div key={tech.name} className="orbit-item" style={{ "--angle": `${angle}deg` }}>
                  <div className="counter-rotate middle-counter">
                    <div className="tech-card">
                      <div className="glass-glow-effect"></div>
                      <img src={tech.icon} alt={tech.name} className="tech-img" />
                      <span className="tech-name">{tech.name}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Outer Orbit Ring */}
          <div className="orbit-ring orbit-outer">
            {outerRing.map((tech, i) => {
              const angle = (360 / outerRing.length) * i;
              return (
                <div key={tech.name} className="orbit-item" style={{ "--angle": `${angle}deg` }}>
                  <div className="counter-rotate outer-counter">
                    <div className="tech-card">
                      <div className="glass-glow-effect"></div>
                      <img src={tech.icon} alt={tech.name} className="tech-img" />
                      <span className="tech-name">{tech.name}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
