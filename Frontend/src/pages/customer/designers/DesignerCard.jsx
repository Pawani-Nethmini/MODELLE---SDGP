import { useState } from "react";
import { StarRating } from "./DesignerShared";
import { BADGE_CONFIG } from "./designerConstants";

const DesignerCard = ({ designer, onClick, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "20px", overflow: "hidden", cursor: "pointer",
        border: `1px solid ${hovered ? designer.accentColor + "60" : "rgba(255,255,255,0.07)"}`,
        transform: hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${designer.accentColor}30`
          : "0 4px 20px rgba(0,0,0,0.3)",
        position: "relative", background: "linear-gradient(145deg,#13131f,#0e0e18)",
        animation: "cardFadeIn 0.5s ease both",
        animationDelay: `${index * 0.07}s`,
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px", zIndex: 2,
        background: hovered
          ? `linear-gradient(90deg,transparent,${designer.accentColor},transparent)`
          : "transparent",
        transition: "all 0.3s ease",
      }} />

      {/* Image */}
      <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
        <img
          src={designer.image} alt={designer.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover", objectPosition: "top",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.5s ease",
            filter: hovered ? "brightness(0.85)" : "brightness(0.7)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,#0e0e18 0%,transparent 50%)" }} />

        {/* Badges */}
        <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", gap: "5px", flexWrap: "wrap", zIndex: 2 }}>
          {designer.badges.map(badge => (
            <span key={badge} style={{
              backgroundColor: BADGE_CONFIG[badge]?.bg,
              color: BADGE_CONFIG[badge]?.color,
              border: `1px solid ${BADGE_CONFIG[badge]?.color}40`,
              fontSize: "0.6rem", fontWeight: 700, padding: "3px 8px",
              borderRadius: "20px", letterSpacing: "0.5px", backdropFilter: "blur(4px)",
            }}>
              {BADGE_CONFIG[badge]?.icon} {badge}
            </span>
          ))}
        </div>

        {/* Availability */}
        <div style={{
          position: "absolute", top: "12px", right: "12px",
          background: designer.available ? "rgba(16,185,129,0.2)" : "rgba(100,116,139,0.2)",
          backdropFilter: "blur(6px)",
          border: `1px solid ${designer.available ? "rgba(16,185,129,0.4)" : "rgba(100,116,139,0.3)"}`,
          borderRadius: "20px", padding: "4px 10px", fontSize: "0.62rem", fontWeight: 700,
          color: designer.available ? "#34d399" : "#64748b",
        }}>
          {designer.available ? "● Available" : "● Busy"}
        </div>

        {/* Rating */}
        <div style={{
          position: "absolute", bottom: "12px", right: "12px",
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
          borderRadius: "20px", padding: "5px 12px",
          display: "flex", alignItems: "center", gap: "5px",
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
          <span style={{ color: "#f5c842", fontSize: "0.8rem" }}>★</span>
          <span style={{ color: "white", fontWeight: 700, fontSize: "0.85rem" }}>{designer.rating}</span>
          <span style={{ color: "#666", fontSize: "0.72rem" }}>({designer.reviews})</span>
        </div>

        {/* Verified */}
        {designer.verified && (
          <div style={{
            position: "absolute", bottom: "12px", left: "12px",
            background: "rgba(139,92,246,0.2)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(139,92,246,0.4)", borderRadius: "20px",
            padding: "4px 10px", fontSize: "0.65rem", color: "#a78bfa", fontWeight: 700,
          }}>✓ VERIFIED</div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: "white" }}>{designer.name}</h3>
            <p style={{ margin: "3px 0 0", fontSize: "0.75rem", color: "#64748b" }}>
              <span style={{ color: designer.accentColor, fontSize: "0.7rem" }}>●</span> {designer.location}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.6rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em" }}>from</div>
            <div style={{ fontSize: "1.2rem", fontWeight: 900, color: designer.accentColor, lineHeight: 1 }}>${designer.startingPrice}</div>
          </div>
        </div>

        <p style={{ margin: "0 0 8px", fontSize: "0.72rem", color: "#64748b", fontStyle: "italic" }}>{designer.title}</p>
        <StarRating rating={designer.rating} />

        <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: "12px 0" }} />

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "10px" }}>
          <div>
            <div style={{ color: "#334155", fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "3px" }}>Turnaround</div>
            <div style={{ color: "#94a3b8", fontWeight: 500 }}>{designer.turnaround}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#334155", fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "3px" }}>Completed</div>
            <div style={{ color: "#94a3b8", fontWeight: 500 }}>{designer.completedProjects} projects</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {designer.specialties.map(s => (
            <span key={s} style={{
              fontSize: "0.62rem", padding: "2px 8px", borderRadius: "20px",
              background: `${designer.accentColor}12`, border: `1px solid ${designer.accentColor}30`,
              color: designer.accentColor,
            }}>{s}</span>
          ))}
        </div>

        <button style={{
          marginTop: "14px", width: "100%", padding: "10px",
          background: hovered ? `linear-gradient(135deg,${designer.accentColor},${designer.accentColor}cc)` : "rgba(255,255,255,0.04)",
          border: `1px solid ${hovered ? designer.accentColor : "rgba(255,255,255,0.08)"}`,
          color: hovered ? "white" : "#64748b",
          borderRadius: "10px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700,
          transition: "all 0.25s ease", fontFamily: "inherit",
        }}>
          View Profile →
        </button>
      </div>
    </div>
  );
};

export default DesignerCard;
