import { useState, useEffect, useRef } from 'react'; 
import { motion } from 'framer-motion'; 

import './App.css';
import Navbar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";
import AmbientBackground from "./components/AmbientBackground";
import BackgroundGlow from "./components/BackgroundGlow";
import CustomCursor from "./components/CustomCursor";
import ResumeButton from "./components/ResumeButton";
import Home from "./sections/Home"; 
import About from "./sections/About";
import TechStack from "./sections/TechStack";
import Projects from './sections/Projects';
import Contact from "./sections/Contact";
import './styles/global.css'; 
import LoginScreen from "./components/LoginScreen";

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const isScrollingRef = useRef(false);

  // 🌟 Your active sections array mapped exactly to index positions
  const sections = ["home", "about", "tech", "projects", "contact"]; //include "projects" if you want to add it to the scrollable sections

  useEffect(() => {
    if (!document.body.className) {
      document.body.className = "dark";
    }
  }, []);

  // 🌟 Tracks wheel tracks and custom navbar click triggers
  useEffect(() => {
    if (!hasEntered) return;

    const handleWheel = (e) => {
      e.preventDefault(); // Stop native jumpy browsing shifts
      if (isScrollingRef.current) return;

      if (e.deltaY > 25) {
        // Scrolling Down
        if (currentSection < sections.length - 1) {
          isScrollingRef.current = true;
          setCurrentSection((prev) => prev + 1);
          setTimeout(() => { isScrollingRef.current = false; }, 800); // Transition cooldown
        }
      } else if (e.deltaY < -25) {
        // Scrolling Up
        if (currentSection > 0) {
          isScrollingRef.current = true;
          setCurrentSection((prev) => prev - 1);
          setTimeout(() => { isScrollingRef.current = false; }, 800);
        }
      }
    };

    // 🌟 Listens for navigation messages broadcast from the Navbar
    const handleNavbarScroll = (e) => {
      const targetIndex = sections.indexOf(e.detail);
      if (targetIndex !== -1) {
        setCurrentSection(targetIndex);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("navbarNavigate", handleNavbarScroll);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("navbarNavigate", handleNavbarScroll);
    };
  }, [hasEntered, currentSection, sections]); // Added sections dependency for stability

  return (
    <>
      <CustomCursor />
      <AmbientBackground />
      <BackgroundGlow />
      
      {!hasEntered ? (
        <LoginScreen onLogin={() => setHasEntered(true)} />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
        >
          <Navbar />
          <ThemeToggle />
          <ResumeButton />
          
          {/* 🌟 THE HIGH-PERFORMANCE SLIDING PANEL WRAPPER */}
          <div className="app-viewport-wrapper">
            <motion.div
              style={{ width: "100%", height: "100%" }}
              animate={{ y: `-${currentSection * 100}vh` }} // Shifts views perfectly via exact multipliers
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }} // Elegant cinematic glide curve
            >
              <div className="snap-section-view" id="home"><Home /></div>
              <div className="snap-section-view" id="about"><About /></div>   
              <div className="snap-section-view" id="tech"><TechStack /></div>
              <div className="snap-section-view" id="projects"><Projects /></div>
              <div className="snap-section-view" id="contact"><Contact /></div>
            </motion.div>
          </div>

        </motion.div>  
      )}
    </>
  );
}

export default App;
