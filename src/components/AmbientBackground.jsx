import "./AmbientBackground.css";

export default function AmbientBackground() {
  return (
    <div className="ambient-bg-container">
      {/* The grainy texture layer */}
      <div className="noise-overlay"></div>
      
      {/* The slow-moving background lights */}
      <div className="ambient-blob blob-1"></div>
      <div className="ambient-blob blob-2"></div>
    </div>
  );
}
