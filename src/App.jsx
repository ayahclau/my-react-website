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
import SideProjects from './sections/SideProjects';
import Contact from "./sections/Contact";
import './styles/global.css'; 
import LoginScreen from "./components/LoginScreen";

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [appHeight, setAppHeight] = useState(() => window.innerHeight);
  const isScrollingRef = useRef(false);

  const sections = ["home", "about", "tech", "projects", "side-work", "contact"];

  useEffect(() => {
    if (!document.body.className) {
      document.body.className = "dark";
    }
  }, []);

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

  useEffect(() => {
    if (!hasEntered) return;

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

    const handleWheel = (e) => {
      const scroller = scrollableAncestor(e.target);
      if (scroller) {
        const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
        const atTop = scroller.scrollTop <= 0;
        if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
          return;
        }
      }

      e.preventDefault();
      if (isScrollingRef.current) return;

      if (e.deltaY > 25) {
        if (currentSection < sections.length - 1) {
          isScrollingRef.current = true;
          setCurrentSection((prev) => prev + 1);
          setTimeout(() => { isScrollingRef.current = false; }, 800);
        }
      } else if (e.deltaY < -25) {
        if (currentSection > 0) {
          isScrollingRef.current = true;
          setCurrentSection((prev) => prev - 1);
          setTimeout(() => { isScrollingRef.current = false; }, 800);
        }
      }
    };

    const handleNavbarScroll = (e) => {
      const targetIndex = sections.indexOf(e.detail);
      if (targetIndex !== -1) {
        setCurrentSection(targetIndex);
      }
    };

    let touch = null;

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
      const dy = touch.y - t.clientY;
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
  }, [hasEntered, currentSection, sections]);

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
              animate={{ y: -currentSection * appHeight }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="snap-section-view" id="home"><Home /></div>
              <div className="snap-section-view" id="about"><About /></div>   
              <div className="snap-section-view" id="tech"><TechStack /></div>
              <div className="snap-section-view" id="projects"><Projects /></div>
              <div className="snap-section-view" id="side-work"><SideProjects /></div>
              <div className="snap-section-view" id="contact"><Contact /></div>
            </motion.div>
          </div>

        </motion.div>  
      )}
    </>
  );
}

export default App;
