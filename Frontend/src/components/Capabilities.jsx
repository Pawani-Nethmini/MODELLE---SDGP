import "../styles/Capabilities.css";

export default function PlatformCapabilities() {
  const capabilities = [
    {
      icon: "🧠",
      title: "Automated STL Intelligence",
      description:
        "Deep geometry analysis that detects structural issues, scale errors, wall thickness problems, and printability risks with clear insights.",
    },
    {
      icon: "💰",
      title: "Smart Cost Awareness",
      description:
        "Understand how material, size, and complexity impact cost before printing, helping you optimize designs early.",
    },
    {
      icon: "🔗",
      title: "Connected Creator Ecosystem",
      description:
        "Designers and printers work on pre-validated STL files, reducing revisions, failures, and communication gaps.",
    },
    {
      icon: "⭐",
      title: "Quality & Trust System",
      description:
        "Transparent ratings and reviews ensure confidence when choosing designers and printing providers.",
    },
    {
      icon: "🎯",
      title: "Trend & Inspiration Layer",
      description:
        "Explore trending models and community creations to spark ideas and discover what’s possible.",
    },
    {
      icon: "🚀",
      title: "End-to-End Workflow",
      description:
        "From upload to print, everything happens in one streamlined platform without switching tools.",
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
          <div className="capability-item" key={idx}>
            <span className="capability-icon">{cap.icon}</span>
            <h4>{cap.title}</h4>
            <p>{cap.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
