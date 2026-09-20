import "./ResumeButton.css";

export default function ResumeButton() {
  return (
    <a
      href="/Aiah_Resume.pdf"
      download="Aiah_Filipinas_Resume.pdf"
      className="resume-floating-btn"
    >
      <div className="shimmer-sweep"></div>
      <span className="resume-text">Resume </span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
    </a>
  );
}
