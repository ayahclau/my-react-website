import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaArrowRight, FaUser, FaCommentDots } from "react-icons/fa";
import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">

        {/* LEFT SIDE: Header & Connections */}
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="contact-title">
            Let's build something <span className="text-gradient">great together.</span>
          </h1>

          <p className="contact-subtitle">
            Have an exciting project, a job opportunity, or just want to say hello? Drop a message and let's create something memorable.
          </p>

          <a href="mailto:aiahclare@example.com" className="contact-email-card">
            <div className="contact-icon-wrapper">
              <FaEnvelope />
            </div>
            <div className="email-text">
              <span className="email-label">Email me directly</span>
              <span className="email-value">aclfilipinas.work@gmail.com</span>
            </div>
            <FaArrowRight className="email-arrow" />
          </a>

          <div className="contact-socials-row">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-pill">
              <FaGithub /> <span>GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-pill">
              <FaLinkedin /> <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Glass Form Deck */}
        <motion.div
          className="contact-form-deck"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          <div className="form-glass-shine"></div>

          <div className="form-header">
            <h3>Send a message</h3>
            <p>I typically respond within a day or two.</p>
          </div>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="input-group textarea-group">
              <FaCommentDots className="input-icon" />
              <textarea placeholder="Tell me about your project..." rows="5" required></textarea>
            </div>

            <button type="submit" className="contact-submit-btn">
              <span>Send Message</span>
              <FaArrowRight className="arrow-icon" />
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
