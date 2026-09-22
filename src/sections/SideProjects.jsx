import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaTimes, FaPalette, FaImage } from "react-icons/fa";
import art1 from "../assets/art1.webp";
import art2 from "../assets/art2.webp";
import art3 from "../assets/art3.webp";
import art4 from "../assets/art4.webp";
import art5 from "../assets/art5.webp";
import nasa1 from "../assets/nasa1.webp";
import nasa2 from "../assets/nasa2.webp";
import nasa3 from "../assets/nasa3.webp";
import menu1 from "../assets/menu1.webp";
import menu2 from "../assets/menu2.webp";
import menu3 from "../assets/menu3.webp";
import dressed1 from "../assets/dressed1.webp";
import dressed2 from "../assets/dressed2.webp";
import "./SideProjects.css";

const sideProjects = [
  {
    id: "digital-art",
    area: "art",
    title: "Digital Paintings & Illustrations",
    role: "Digital Artist",
    description:
      "A growing collection of personal digital paintings — a redraw of another artist's character reimagined in my own style, alongside original character concepts, made outside of client work and coursework just for the love of making something from scratch.",
    tags: ["Digital Painting", "Illustration", "Procreate"],
    colorA: "#a855f7",
    colorB: "#7c3aed",
    icon: FaPalette,
    images: [art1, art2, art3, art4, art5],
  },
  {
    id: "nasa-space-apps",
    area: "nasa",
    title: "NASA Space Apps — Pubmats",
    role: "Creative Team, Graphic Designer",
    description:
      "Promotional graphics created as part of the creatives team for NASA Space Apps Davao — including the poster for the workshop's program overflow and an overview poster introducing “Asteroid Destroyer,” the team's 2024 Global Connection Category-winning project — each designed to carry the challenge's space-tech identity across social media.",
    tags: ["Graphic Design", "Pubmats", "NASA Space Apps Davao"],
    colorA: "#3b5bdb",
    colorB: "#1e3a8a",
    images: [nasa1, nasa2, nasa3],
  },
  {
    id: "dressed-to-the-nines",
    area: "dressed",
    title: "Dressed to the Nines",
    role: "Pubmat Editor",
    description:
      "Event graphics for “Dressed to the Nines,” a flea market hosted at Nikko's Brew, Kidapawan City. The direction leaned into a playful Y2K, scrapbook-inspired look — denim pockets, lip gloss, disposable cameras — to match the event's thrifted-fashion theme.",
    tags: ["Graphic Design", "Event Pubmats", "Y2K / Scrapbook Style"],
    colorA: "#ec4899",
    colorB: "#be185d",
    images: [dressed1, dressed2],
  },
  {
    id: "mhyz-cafe-menu",
    area: "menu",
    title: "Mhyz Cafe Menu Design",
    role: "Menu Designer",
    description:
      "A full food and drinks menu designed for Mhyz Cafe in Lapu-Lapu City, Cebu — hand-lettered branding, illustrated dishes, and a warm, cozy layout built to match the cafe's dine-in atmosphere, from the price list to the final print-ready file.",
    tags: ["Menu Design", "Illustration", "Branding"],
    colorA: "#fb923c",
    colorB: "#c2410c",
    images: [menu1, menu2, menu3],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const tileVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function SideProjects() {
  const [openId, setOpenId] = useState(null);
  const [shotIndex, setShotIndex] = useState(0);

  const active = sideProjects.find((p) => p.id === openId) || null;
  const activeShot = active ? active.images[shotIndex] : null;

  useEffect(() => {
    if (!active || active.images.length <= 1) return;
    const timer = setTimeout(() => {
      setShotIndex((i) => (i + 1) % active.images.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [active, shotIndex]);

  useEffect(() => {
    if (!active) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    active.images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [active]);

  const openProject = (id) => {
    setOpenId(id);
    setShotIndex(0);
  };

  const closeProject = () => setOpenId(null);

  const goToShot = (index) => {
    if (!active) return;
    const len = active.images.length;
    setShotIndex((index + len) % len);
  };

  return (
    <section className="side-section" id="side-work">
      <div className="side-wrapper">
        <div className="side-header">
          <h2 className="side-title">
            Work on the <span className="text-gradient">side.</span>
          </h2>
          <p className="side-subtitle">
            Pubmats, menus, and personal art — the creative work I take on outside of development.
          </p>
        </div>

        <motion.div
          className="side-mosaic"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
        >
          {sideProjects.map((project) => {
            const cover = project.images[0];
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                className={`side-tile side-tile--${project.area}`}
                variants={tileVariants}
                style={{ "--card-a": project.colorA, "--card-b": project.colorB }}
              >
                <button
                  className="side-tile-shell"
                  onClick={() => openProject(project.id)}
                >
                  {cover ? (
                    <img src={cover} alt={project.title} className="side-tile-img" />
                  ) : (
                    <div className="side-tile-placeholder">
                      <Icon className="side-tile-placeholder-icon" />
                    </div>
                  )}
                  <span className="side-tile-scrim"></span>
                  <span className="side-tile-shine"></span>
                  <span className="side-tile-caption">
                    <span className="side-tile-role">{project.role}</span>
                    <span className="side-tile-title">{project.title}</span>
                  </span>
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {createPortal(
        <AnimatePresence>
          {active && (
            <div className="side-modal-root">
              <motion.div
                className="side-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={closeProject}
              />

              <div className="side-modal-center">
                <motion.div
                  className={`side-modal side-modal--${active.area}`}
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 16 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  style={{ "--card-a": active.colorA, "--card-b": active.colorB }}
                >
                  <button className="side-modal-close" onClick={closeProject} aria-label="Close">
                    <FaTimes />
                  </button>

                  <motion.div
                    className="side-modal-content"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.35, ease: "easeOut" }}
                  >
                    <div className="side-modal-media-col">
                      <div className="side-modal-frame-row">
                        {active.images.length > 1 && (
                          <button
                            className="side-modal-nav prev"
                            onClick={() => goToShot(shotIndex - 1)}
                            aria-label="Previous image"
                          >
                            <FaChevronLeft />
                          </button>
                        )}

                        <div className="side-modal-screen">
                          {activeShot ? (
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={`${active.id}-${shotIndex}`}
                                className="side-modal-media"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                              >
                                <img src={activeShot} alt={active.title} className="side-modal-img" />
                              </motion.div>
                            </AnimatePresence>
                          ) : (
                            <div className="side-modal-placeholder">
                              <FaImage className="side-modal-placeholder-icon" />
                              <span>More pieces coming soon</span>
                            </div>
                          )}
                        </div>

                        {active.images.length > 1 && (
                          <button
                            className="side-modal-nav next"
                            onClick={() => goToShot(shotIndex + 1)}
                            aria-label="Next image"
                          >
                            <FaChevronRight />
                          </button>
                        )}
                      </div>

                      {active.images.length > 1 && (
                        <div className="side-modal-dots">
                          {active.images.map((_, i) => (
                            <button
                              key={i}
                              className={`side-modal-dot ${i === shotIndex ? "active" : ""}`}
                              onClick={() => setShotIndex(i)}
                              aria-label={`Show image ${i + 1}`}
                            ></button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="side-modal-info-col">
                      <h3 className="side-modal-title">{active.title}</h3>
                      <p className="side-modal-role">{active.role}</p>
                      <p className="side-modal-description">{active.description}</p>

                      <div className="side-modal-tags">
                        {active.tags.map((tag) => (
                          <span className="side-modal-tag" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
