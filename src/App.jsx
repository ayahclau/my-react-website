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
  const [appHeight, setAppHeight] = useState(() => window.innerHeight);
  const isScrollingRef = useRef(false);

  // 🌟 Your active sections array mapped exactly to index positions
  const sections = ["home", "about", "tech", "projects", "contact"]; //include "projects" if you want to add it to the scrollable sections

  useEffect(() => {
    if (!document.body.className) {
      document.body.className = "dark";
    }
  }, []);

  // Real visible height of the screen. `100vh` on a phone is the height with
  // the browser toolbars hidden, so every section (sized 100vh) ran taller
  // than what's actually on screen and its bottom got cut off. Exposed as
  // --app-h for the CSS and used for the slide distance below, so the two
  // always agree.
  useEffect(() => {
    const update = () => {
      const h = window.innerHeight;
      document.documentElement.style.setProperty("--app-h", `${h}px`);
      setAppHeight(h);
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
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

    // 🌟 Touch screens never fire "wheel", so on a phone the sections
    // couldn't be scrolled at all — a vertical swipe now does what the
    // wheel does. A swipe that starts inside something that scrolls on its
    // own (a long description, say) scrolls that instead, and only moves
    // to the next section once that content is at its end.
    let touch = null;

    const scrollableAncestor = (el) => {
      while (el && el !== document.body && el !== document.documentElement) {
        if (el.scrollHeight > el.clientHeight + 1) {
          const overflowY = getComputedStyle(el).overflowY;
          if (overflowY === "auto" || overflowY === "scroll") return el;
        }
        el = el.parentElement;
      }
      return null;
    };

    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) {
        touch = null;
        return;
      }
      const t = e.touches[0];
      const scroller = scrollableAncestor(e.target);
      touch = {
        x: t.clientX,
        y: t.clientY,
        scroller,
        scrollTop: scroller ? scroller.scrollTop : 0,
      };
    };

    const handleTouchEnd = (e) => {
      if (!touch) return;
      const t = e.changedTouches[0];
      const dy = touch.y - t.clientY; // > 0: finger moved up (go down a section)
      const dx = touch.x - t.clientX;
      const { scroller, scrollTop } = touch;
      touch = null;

      if (Math.abs(dy) < 50 || Math.abs(dy) < Math.abs(dx) * 1.2) return;
      if (isScrollingRef.current) return;
      if (scroller && scroller.scrollTop !== scrollTop) return;

      if (dy > 0 && currentSection < sections.length - 1) {
        isScrollingRef.current = true;
        setCurrentSection((prev) => prev + 1);
        setTimeout(() => { isScrollingRef.current = false; }, 800);
      } else if (dy < 0 && currentSection > 0) {
        isScrollingRef.current = true;
        setCurrentSection((prev) => prev - 1);
        setTimeout(() => { isScrollingRef.current = false; }, 800);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("navbarNavigate", handleNavbarScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("navbarNavigate", handleNavbarScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
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
              animate={{ y: -currentSection * appHeight }} // Shifts by exactly one screen height per section (px, from the real visible height)
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
