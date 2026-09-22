import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaArrowRight, FaUser, FaCommentDots } from "react-icons/fa";
import "./Contact.css";

const CONTACT_EMAIL = "aclfilipinas.work@gmail.com";

// The form posts to Web3Forms, which emails each submission straight to
// CONTACT_EMAIL — no backend of our own, and no mail app needed on the
// visitor's side. This key is public by design (it ships in the client
// bundle no matter what); it only lets people submit to this one form.
const WEB3FORMS_ACCESS_KEY = "540022a0-4a59-497c-93c4-636c1817bdc1";

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);

    // Honeypot: hidden from people, but bots fill in every field they
    // find. Pretend it worked so the bot doesn't retry.
    if (data.get("botcheck")) {
      setStatus("sent");
      formRef.current.reset();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio inquiry from ${data.get("name")}`,
          from_name: "Portfolio Contact Form",
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      setStatus("sent");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  };

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

          {/* Plain info card, not a mailto: link — mailto depends on the
              visitor having a mail app set up and often just does nothing.
              The form on the right is the reliable way to reach out. */}
          <div className="contact-email-card">
            <div className="contact-icon-wrapper">
              <FaEnvelope />
            </div>
            <div className="email-text">
              <span className="email-label">My email</span>
              <span className="email-value">{CONTACT_EMAIL}</span>
            </div>
          </div>

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

          <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
            <input
              type="checkbox"
              name="botcheck"
              className="form-honeypot"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />
            <div className="input-group">
              <FaUser className="input-icon" />
              <input name="name" type="text" placeholder="Your Name" required />
            </div>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input name="email" type="email" placeholder="Your Email" required />
            </div>
            <div className="input-group textarea-group">
              <FaCommentDots className="input-icon" />
              <textarea name="message" placeholder="Tell me about your project..." rows="5" required></textarea>
            </div>

            <button
              type="submit"
              className="contact-submit-btn"
              disabled={status === "sending"}
            >
              <div className="shimmer-sweep"></div>
              <span>{status === "sending" ? "Sending..." : "Send Message"}</span>
              <FaArrowRight className="arrow-icon" />
            </button>

            {status === "sent" && (
              <p className="form-status-note">
                Thanks! Your message was sent — I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="form-status-note is-error">
                Something went wrong sending that. Please email me directly at{" "}
                <strong>{CONTACT_EMAIL}</strong>.
              </p>
            )}
          </form>
        </motion.div>

      </div>
    </section>
  );
}
