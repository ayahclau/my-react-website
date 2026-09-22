import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaImage, FaExternalLinkAlt } from "react-icons/fa";
import univents1 from "../assets/univents1.png";
import univents2 from "../assets/univents2.png";
import univents3 from "../assets/univents3.png";
import dost1 from "../assets/dost1.png";
import dost2 from "../assets/dost2.png";
import dost3 from "../assets/dost3.png";
import dost4 from "../assets/dost4.png";
import dost5 from "../assets/dost5.png";
import dost6 from "../assets/dost6.png";
import bean1 from "../assets/bean1.png";
import bean2 from "../assets/bean2.png";
import bean3 from "../assets/bean3.png";
import bean4 from "../assets/bean4.png";
import bean5 from "../assets/bean5.png";
import agreville1 from "../assets/agreville1.png";
import agreville2 from "../assets/agreville2.png";
import agreville3 from "../assets/agreville3.png";
import agreville4 from "../assets/agreville4.png";
import avw1 from "../assets/avw1.png";
import avw2 from "../assets/avw2.png";
import avw3 from "../assets/avw3.png";
import avw4 from "../assets/avw4.png";
import "./Projects.css";

const projects = [
  {
    id: "univents",
    title: "UniVents: Admin Web Portal for Ateneo de Davao University",
    role: "Full-Stack Developer",
    fileLabel: "univents_admin.dart",
    description:
      "A web and mobile application developed for Ateneo de Davao University using Flutter and Dart, backed by Supabase. It allows authorized admins to manage organizations, events, and attendees, features dynamic data fetching, and a responsive UI.",
    tags: ["Flutter", "Dart", "Supabase", "Mobile & Web"],
    images: [univents1, univents2, univents3],
  },
  {
    id: "bean-xpress",
    title: "Bean Xpress Cafe: UX/HCI Redesign",
    role: "UI/UX Researcher & Designer",
    fileLabel: "bean_xpress_redesign.fig",
    description:
      "Redesigned the Bean Xpress web interface using Figma as part of a UX/HCI project. The redesign focused on improving usability and visual consistency across key pages, including the homepage, cart, products, inventory, and sales report.",
    tags: ["Figma", "UX Research", "UI Redesign"],
    images: [bean1, bean2, bean3, bean4, bean5],
  },
  {
    id: "dimt",
    title: "DOST Indicators Management Tool (DIMT): Platform Redesign & Frontend Development",
    role: "Lead Designer & Frontend Developer",
    fileLabel: "dimt_platform.jsx",
    description:
      "Executed a complete top-to-bottom redesign of the entire web platform, modernizing the user interface and experience while strictly preserving all existing elements, workflows, and core functionalities. Co-developed the frontend architecture that is now currently deployed and used by the Department of Science and Technology (DOST).",
    tags: ["Frontend Development", "UI/UX Redesign", "Web Platform"],
    images: [dost1, dost2, dost3, dost4, dost5, dost6],
  },
  {
    id: "agreville-billing",
    title: "Agreville Realty Corporation: Billing and Collection System",
    role: "Lead Developer",
    fileLabel: "agreville_billing.js",
    description:
      "A web application developed for CSA Residences, Koronadal City using MERN stack that streamlines contract management, billing, payment tracking, tenancy oversight, and maintenance tracking through automation and a centralized database.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    images: [agreville1, agreville2, agreville3, agreville4],
  },
  {
    id: "avw-space",
    title: "AVW-Space: Comparative Evaluation of Large Language Models for Active Video Learning",
    role: "Research Publication",
    fileLabel: "avw_space_research.pdf",
    description:
      "This research evaluates the application of Large Language Models (LLMs) within the Active Video Watching (AVW-Space) platform at the University of Canterbury to deliver automated, context-aware feedback for Video-Based Learning (VBL). The framework leverages a multi-model approach: a fine-tuned DeBERTa-v3-base model is deployed to analyze comment quality, while engineered prompts guide Qwen2.5-7B-Instruct and Llama-3.1-8B-Instruct to generate a formative feedback.",
    tags: ["Large Language Models", "DeBERTa-v3", "Qwen2.5", "Llama-3.1", "Video-Based Learning"],
    images: [avw1, avw2, avw3, avw4],
  },
];

const FRAME_RATIOS = { portrait: "3 / 4", tall: "9 / 16" };

const stopWheelIfScrollable = (e) => {
  const el = e.currentTarget;
  const canScrollDown = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
  const canScrollUp = el.scrollTop > 0;
  if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) {
    e.stopPropagation();
  }
};

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const [detected, setDetected] = useState({});
  const railRef = useRef(null);
  const thumbRefs = useRef([]);
  const dragState = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  const active = projects[activeIndex];
  const activeScreenshot = active.images[screenshotIndex];

  useEffect(() => {
    let cancelled = false;
    projects.forEach((project) => {
      const src = project.images[0];
      if (project.orientation || !src) return;
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        const ratio = img.naturalHeight / img.naturalWidth;
        const shape = ratio > 1.6 ? "tall" : ratio > 1.1 ? "portrait" : "landscape";
        setDetected((prev) => ({ ...prev, [project.id]: shape }));
      };
      img.src = src;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const orientation = active.orientation || detected[active.id] || "landscape";
  const isFramed = orientation === "portrait" || orientation === "tall";

  useEffect(() => {
    if (active.images.length <= 1) return;
    const timer = setTimeout(() => {
      setScreenshotIndex((i) => (i + 1) % active.images.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [activeIndex, screenshotIndex, active.images.length]);

  const goTo = (index) => {
    const next = (index + projects.length) % projects.length;
    setActiveIndex(next);
    setScreenshotIndex(0);
    const rail = railRef.current;
    const el = thumbRefs.current[next];
    if (rail && el) {
      rail.scrollTo({
        left: el.offsetLeft - (rail.clientWidth - el.offsetWidth) / 2,
        behavior: "smooth",
      });
    }
  };

  const goToScreenshot = (index) => {
    const len = active.images.length;
    setScreenshotIndex((index + len) % len);
  };

  const handlePointerDown = (e) => {
    const rail = railRef.current;
    if (!rail) return;
    dragState.current = { down: true, startX: e.clientX, startScroll: rail.scrollLeft, moved: false };
  };

  const handlePointerMove = (e) => {
    const rail = railRef.current;
    if (!rail || !dragState.current.down) return;
    const delta = e.clientX - dragState.current.startX;
    if (Math.abs(delta) > 4) dragState.current.moved = true;
    rail.scrollLeft = dragState.current.startScroll - delta;
  };

  const stopDrag = () => {
    dragState.current.down = false;
  };

  const handleThumbClick = (index) => {
    if (dragState.current.moved) return;
    goTo(index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
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

  const screenBody = (
    <div className="frame-body">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${active.id}-${screenshotIndex}`}
          className="frame-media"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {activeScreenshot ? (
            <img src={activeScreenshot} alt={active.title} className="frame-img" />
          ) : (
            <div className="frame-placeholder">
              <FaImage className="placeholder-icon" />
              <span>
                Screenshot {screenshotIndex + 1} of {active.images.length}
              </span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {active.images.length > 1 && (
        <>
          <button
            className="frame-nav-btn prev"
            onClick={() => goToScreenshot(screenshotIndex - 1)}
            aria-label="Previous screenshot"
          >
            <FaChevronLeft />
          </button>
          <button
            className="frame-nav-btn next"
            onClick={() => goToScreenshot(screenshotIndex + 1)}
            aria-label="Next screenshot"
          >
            <FaChevronRight />
          </button>
        </>
      )}
    </div>
  );

  return (
    <section id="projects" className="projects-section">
      <motion.div
        className="projects-wrapper"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-80px" }}
      >
        <motion.div className="projects-header" variants={itemVariants}>
          <h2 className="projects-title">
            A closer look at what I've <span className="text-gradient">built.</span>
          </h2>
          <p className="projects-subtitle">
            Real projects built for real organizations — spanning full-stack development, UX research, platform redesign, and LLM research.
          </p>
        </motion.div>

        <motion.div
          className={`showcase-stage ${isFramed ? "is-framed" : ""}`}
          variants={itemVariants}
        >
          <div className="media-cell">
            {isFramed ? (
              <div className="portrait-mockup">
                <div
                  className="portrait-frame"
                  style={{ aspectRatio: FRAME_RATIOS[orientation] }}
                >
                  {screenBody}
                </div>
              </div>
            ) : (
              <div className="laptop-mockup">
                <div className="laptop-screen">
                  <div className="stage-frame">
                    <div className="frame-chrome">
                      <div className="frame-dots">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                      </div>
                      <span className="frame-filename">{active.fileLabel}</span>
                    </div>

                    {screenBody}
                  </div>
                </div>

                <div className="laptop-base">
                  <span className="laptop-notch"></span>
                </div>
              </div>
            )}

            <div className="screenshot-dots">
              {active.images.length > 1 &&
                active.images.map((_, i) => (
                  <button
                    key={i}
                    className={`screenshot-dot ${i === screenshotIndex ? "active" : ""}`}
                    onClick={() => setScreenshotIndex(i)}
                    aria-label={`Show screenshot ${i + 1}`}
                  ></button>
                ))}
            </div>
          </div>

          {/* Title, description and tags for the active project */}
          <div className="stage-info" onWheel={stopWheelIfScrollable}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active.id}-info`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h3 className="info-title">{active.title}</h3>
                <p className="info-role">{active.role}</p>
                <p className="info-description">{active.description}</p>
                {active.link && (
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noreferrer"
                    className="info-link"
                  >
                    <span>{active.linkLabel || "View Link"}</span>
                    <FaExternalLinkAlt className="info-link-icon" />
                  </a>
                )}
                <div className="info-tags">
                  {active.tags.map((tag) => (
                    <span className="info-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Thumbnail rail — click, drag, or the side arrows switch projects */}
        <div className="thumbnail-row">
          <button
            className="rail-nav-btn prev"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous project"
          >
            <FaChevronLeft />
          </button>

          <motion.div
            className="thumbnail-rail"
            ref={railRef}
            variants={itemVariants}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDrag}
            onPointerLeave={stopDrag}
          >
            {projects.map((project, index) => (
              <button
                key={project.id}
                ref={(el) => (thumbRefs.current[index] = el)}
                className={`thumb-item ${index === activeIndex ? "active" : ""}`}
                onClick={() => handleThumbClick(index)}
              >
                <span className="thumb-media">
                  {project.images[0] ? (
                    <img src={project.images[0]} alt={project.title} />
                  ) : (
                    <FaImage className="thumb-icon" />
                  )}
                </span>
                <span className="thumb-label">{project.title}</span>
              </button>
            ))}
          </motion.div>

          <span className="project-counter">
            {activeIndex + 1} / {projects.length}
          </span>

          <button
            className="rail-nav-btn next"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next project"
          >
            <FaChevronRight />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
