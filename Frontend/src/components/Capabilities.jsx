import "../styles/Capabilities.css";
import SpotlightCard from "./SpotlightCard";

export default function PlatformCapabilities() {
  const capabilities = [
    {
      icon: "🧠",
      title: "Automated STL Intelligence",
      description:
        "Deep geometry analysis that detects structural issues, scale errors, wall thickness problems, and printability risks with clear insights.",
      spotlightColor: "rgba(0, 229, 255, 0.2)", // Cyan
    },
    {
      icon: "💰",
      title: "Smart Cost Awareness",
      description:
        "Understand how material, size, and complexity impact cost before printing, helping you optimize designs early.",
      spotlightColor: "rgba(139, 92, 246, 0.2)", // Purple
    },
    {
      icon: "🔗",
      title: "Connected Creator Ecosystem",
      description:
        "Designers and printers work on pre-validated STL files, reducing revisions, failures, and communication gaps.",
      spotlightColor: "rgba(0, 229, 255, 0.2)", // Cyan
    },
    {
      icon: "⭐",
      title: "Quality & Trust System",
      description:
        "Transparent ratings and reviews ensure confidence when choosing designers and printing providers.",
      spotlightColor: "rgba(139, 92, 246, 0.2)", // Purple
    },
    {
      icon: "🎯",
      title: "Trend & Inspiration Layer",
      description:
        "Explore trending models and community creations to spark ideas and discover what's possible.",
      spotlightColor: "rgba(0, 229, 255, 0.2)", // Cyan
    },
    {
      icon: "🚀",
      title: "End-to-End Workflow",
      description:
        "From upload to print, everything happens in one streamlined platform without switching tools.",
      spotlightColor: "rgba(139, 92, 246, 0.2)", // Purple
    },
  ];

  return (
    <section className="capabilities-section">
      <h2 className="capabilities-title">
        What You Can Do with Modelle
      </h2>

      <p className="capabilities-subtitle">
        Everything you need to go from idea to print-ready model in one place.
      </p>

      <div className="capabilities-grid">
        {capabilities.map((cap, idx) => (
          <SpotlightCard
            key={idx}
            className="capability-card-spotlight"
            spotlightColor={cap.spotlightColor}
          >
            <div className="capability-item">
              <span className="capability-icon">{cap.icon}</span>
              <h4>{cap.title}</h4>
              <p>{cap.description}</p>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}