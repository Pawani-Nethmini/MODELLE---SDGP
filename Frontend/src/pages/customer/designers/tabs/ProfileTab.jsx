import { BADGE_CONFIG } from "../designerConstants";

const ProfileTab = ({ designer, onTabSwitch }) => (
  <>
    <p style={{
      color: "#94a3b8", fontSize: "0.88rem", lineHeight: 1.65, margin: "0 0 20px",
      background: "rgba(255,255,255,0.02)", padding: "14px", borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.05)",
    }}>
      {designer.bio}
    </p>

    {/* Stats grid */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "20px" }}>
      {[
        { label: "Rating",     value: `${designer.rating}/5`         },
        { label: "Reviews",    value: designer.reviews                },
        { label: "Projects",   value: designer.completedProjects      },
        { label: "Turnaround", value: designer.turnaround             },
        { label: "From",       value: `$${designer.startingPrice}`    },
        { label: "Status",     value: designer.available ? "Available" : "Busy" },
      ].map(({ label, value }) => (
        <div key={label} style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "12px", padding: "12px",
        }}>
          <div style={{ fontSize: "0.6rem", color: "#334155", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>{label}</div>
          <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#e2e8f0" }}>{value}</div>
        </div>
      ))}
    </div>

    {/* Specialties */}
    <div style={{ marginBottom: "16px" }}>
      <div style={{ fontSize: "0.68rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: "8px" }}>Specialties</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {designer.specialties.map(s => (
          <span key={s} style={{
            fontSize: "0.75rem", padding: "4px 12px", borderRadius: "20px",
            background: `${designer.accentColor}15`, border: `1px solid ${designer.accentColor}35`,
            color: designer.accentColor,
          }}>{s}</span>
        ))}
      </div>
    </div>

    {/* Software */}
    <div style={{ marginBottom: "20px" }}>
      <div style={{ fontSize: "0.68rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: "8px" }}>Software</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {designer.software.map(s => (
          <span key={s} style={{
            fontSize: "0.75rem", padding: "4px 12px", borderRadius: "8px",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
            color: "#94a3b8",
          }}>{s}</span>
        ))}
      </div>
    </div>

    {/* Portfolio */}
    <div style={{ marginBottom: "24px" }}>
      <div style={{ fontSize: "0.68rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: "8px" }}>Portfolio</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px" }}>
        {designer.portfolio.map((img, i) => (
          <div key={i} style={{ borderRadius: "10px", overflow: "hidden", height: "90px", background: "#1a1a2e" }}>
            <img src={img} alt={`Portfolio ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.8)" }} />
          </div>
        ))}
      </div>
    </div>

    <button
      onClick={() => onTabSwitch("customize")}
      style={{
        width: "100%", padding: "0.9rem", borderRadius: "12px", border: "none", fontFamily: "inherit",
        background: `linear-gradient(135deg,${designer.accentColor},${designer.accentColor}aa)`,
        color: "white", cursor: "pointer", fontWeight: 800, fontSize: "0.9rem",
        boxShadow: `0 8px 24px ${designer.accentColor}40`,
      }}
    >
      Start a Custom Project →
    </button>
  </>
);

export default ProfileTab;
