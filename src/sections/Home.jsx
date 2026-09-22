import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import "./Home.css";

// Navigation here goes through the app's own section-slider state (the
// same event Navbar.jsx dispatches) instead of native scrollIntoView —
// this app doesn't actually scroll (html/body/app-viewport-wrapper are all
// overflow:hidden and sections are positioned via a framer-motion
// translateY driven by React state in App.jsx). Calling scrollIntoView
// still silently moves that hidden container's native scroll position,
// which fights with the transform-based slider and leaves the app's
// `currentSection` state out of sync — that's what broke scrolling back
// up and made the navbar's Home button stop working afterwards.
const goToSection = (id) => {
  window.dispatchEvent(new CustomEvent("navbarNavigate", { detail: id }));
};

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="home-section" id="home">
      <motion.div
        className="home-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* LEFT SIDE: Clean, Impactful Hero Content */}
        <div className="hero-text-block">
          <motion.h1 className="hero-main-title" variants={itemVariants}>
            Turning Complex <br />
            Ideas Into <span className="gradient-text glow-text">Reality.</span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            Hi, I'm <strong className="highlight-name">Aiah</strong>. I am a web developer and designer and I enjoy building web applications with various programming languages that are not only functional but also visually appealing. 
          </motion.p>

          <motion.div className="hero-cta-group" variants={itemVariants}>
            <button
              className="cta-primary"
              onClick={() => goToSection("projects")}
            >
              <div className="shimmer-sweep"></div>
              <span>Explore My Work</span>
              <FaArrowRight className="cta-icon" />
            </button>
            <button
              className="cta-secondary"
              onClick={() => goToSection("contact")}
            >
              Let's Talk
            </button>
          </motion.div>
        </div>

        {/* RIGHT SIDE: Interactive 3D Glass Layered Deck */}
        <motion.div className="hero-visual-block" variants={itemVariants}>
          <div className="three-d-scene-perspective">
            <div className="interactive-3d-card">

              {/* Layer 1: Glass Card Container */}
              <div className="card-layer base-glass">
                <div className="window-bar">
                  <div className="window-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <span className="window-title">aiah_developer.tsx</span>
                </div>
              </div>

              {/* Layer 2: Floating Syntax Code Box */}
              <div className="card-layer floating-code-box">
                <pre className="code-body">
                  <code>
                    <span className="code-keyword">const</span> <span className="code-var">aiah</span> = &#123;<br />
                    &nbsp;&nbsp;<span className="code-key">role</span>: <span className="code-string">"Full-Stack Developer & Artist"</span>,<br />
                    &nbsp;&nbsp;<span className="code-key">degree</span>: <span className="code-string">"BS Computer Science"</span>,<br />
                    &nbsp;&nbsp;<span className="code-key">status</span>: <span className="code-string">"Open to work"</span><br />
                    &#125;;
                  </code>
                </pre>
              </div>

              {/* Layer 3: Floating Status Badge */}
              <div className="card-layer floating-tag-box">
                <div className="pulse-indicator">
                  <span className="pulse-dot"></span>
                  <span className="pulse-ring"></span>
                </div>
                <p>Available for freelance & full-time roles</p>
              </div>

              {/* Layer 4: Floating Tech Stack Chips */}
              <div className="card-layer floating-chips-box">
                <span className="chip">React</span>
                <span className="chip accent">Node.js</span>
                <span className="chip">Flutter</span>
              </div>

              {/* Decorative Glass Glow Rings */}
              <div className="decorative-ring ring-1"></div>
              <div className="decorative-ring ring-2"></div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}