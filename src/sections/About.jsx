import { motion } from "framer-motion";
import paperCutout from "../assets/paper_cutout.png"; // 👈 Update path to your photo
import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCoffee,
  FaLightbulb,
  FaCheckCircle
} from "react-icons/fa";
import "./About.css";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="about" className="about-section">
      <motion.div
        className="about-bento-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        
        {/* CARD 1: Creative ID / Photo Poster */}
        <motion.div className="bento-card visual-id-card" variants={cardVariants}>
          {/* Paper Cutout Visual Showcase Container */}
          <div className="paper-cutout-stage">
            {/* Ambient backlight behind the cutout */}
            <div className="cutout-glow-backlight"></div>

            {/* Paper Cutout Image */}
            <img
              src={paperCutout}
              alt="Aiah Clare Paper Cutout"
              className="paper-cutout-img"
            />

            {/* Floating glow sparkles hugging the cutout's silhouette */}
            <span className="photo-sparkle sparkle-1"></span>
            <span className="photo-sparkle sparkle-2"></span>
            <span className="photo-sparkle sparkle-3"></span>
            <span className="photo-sparkle sparkle-4"></span>
            <span className="photo-sparkle sparkle-5"></span>
            <span className="photo-sparkle sparkle-6"></span>
            <span className="photo-sparkle sparkle-7"></span>
            <span className="photo-sparkle sparkle-8"></span>
          </div>

          <div className="id-card-caption">
            <div className="id-profile-info">
              <h3>Aiah Clare</h3>
              <p>Front-End Engineer & Digital Artist</p>
            </div>
            <div className="verified-badge" title="Verified Creative">
              <FaCheckCircle />
            </div>
          </div>
        </motion.div>

        {/* CARD 2: Bio Statement */}
        <motion.div className="bento-card bio-card" variants={cardVariants}>
          <span className="bio-quote-mark">&ldquo;</span>

          <h2 className="bio-heading">
            Driven by curiosity, <br />
            engineered for <span className="text-gradient">perfection.</span>
          </h2>

          <p className="bio-text">
            I'm a Computer Science graduate who views code as a creative canvas. I specialize in turning complex logic into seamless, fluid user interfaces that feel clean, modern, and effortless to navigate.
          </p>
        </motion.div>

        {/* CARD 3: Beyond The Code */}
        <motion.div className="bento-card traits-card" variants={cardVariants}>
          <div className="card-header-flex">
            <FaLightbulb className="card-icon" />
            <h3>Beyond The Code</h3>
          </div>

          <div className="traits-grid">
            <div className="trait-item">Problem Solver</div>
            <div className="trait-item">Detail-Oriented</div>
            <div className="trait-item">Fast Learner</div>
            <div className="trait-item">Team Player</div>
            <div className="trait-item">Self-Taught</div>
            <div className="trait-item">User-Focused</div>
          </div>
        </motion.div>

        {/* CARD 4: Quick Facts Grid (Location & Degree) */}
        <motion.div className="bento-card info-card" variants={cardVariants}>
          <div className="info-row">
            <div className="info-box">
              <FaGraduationCap className="info-icon" />
              <div>
                <span className="info-label">Degree</span>
                <p className="info-value">BS Computer Science</p>
              </div>
            </div>

            <div className="info-divider"></div>

            <div className="info-box">
              <FaMapMarkerAlt className="info-icon" />
              <div>
                <span className="info-label">Location</span>
                <p className="info-value">Philippines</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CARD 5: Current Fuel / Vibe Widget */}
        <motion.div className="bento-card fuel-card" variants={cardVariants}>
          <div className="fuel-content">
            <div className="coffee-icon-glow">
              <FaCoffee />
            </div>
            <div>
              <span className="fuel-label">Current Vibe</span>
              <p className="fuel-text">Building interactive web apps & brewing dark roast ☕</p>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}