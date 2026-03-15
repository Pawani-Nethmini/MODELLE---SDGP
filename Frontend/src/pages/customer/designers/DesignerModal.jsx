import { useState } from "react";
import { AvatarCircle } from "./DesignerShared";
import { BADGE_CONFIG, MODAL_TABS, MOCK_QUOTES } from "./designerConstants";
import ProfileTab   from "./tabs/ProfileTab";
import CustomizeTab from "./tabs/CustomizeTab";
import MessagesTab  from "./tabs/MessagesTab";
import QuoteTab     from "./tabs/QuoteTab";

const DesignerModal = ({ designer, onClose }) => {
  const [tab, setTab] = useState("profile");

  if (!designer) return null;

  const quoteData  = MOCK_QUOTES[designer.id] || { status: "none" };
  const quoteBadge = quoteData.status === "received";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(14px)", zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.2rem", animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "linear-gradient(145deg,#13131f,#0d0d17)",
          border: `1px solid ${designer.accentColor}40`,
          borderRadius: "28px", maxWidth: "640px", width: "100%",
          maxHeight: "92vh", display: "flex", flexDirection: "column",
          boxShadow: `0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px ${designer.accentColor}15`,
          animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          overflow: "hidden",
        }}
      >
        /*Accent line*/
        <div style={{ height: "3px", flexShrink: 0, background: `linear-gradient(90deg,transparent,${designer.accentColor},transparent)` }} />

        /*Hero image*/
        <div style={{ position: "relative", height: "160px", flexShrink: 0 }}>
          <img src={designer.image} alt={designer.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,#0d0d17 0%,transparent 55%)" }} />
          <button onClick={onClose} style={{
            position: "absolute", top: "12px", right: "12px",
            background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px",
            color: "white", width: "34px", height: "34px", cursor: "pointer",
            fontSize: "1.1rem", lineHeight: 1,
          }}>×</button>
        </div>

        /*Designer header*/
        <div style={{ padding: "0 1.5rem", flexShrink: 0 }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-end", marginTop: "-18px", marginBottom: "14px", position: "relative", zIndex: 1 }}>
            <AvatarCircle initials={designer.avatar} color={designer.accentColor} size={50} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "4px" }}>
                {designer.badges.map(b => (
                  <span key={b} style={{
                    background: BADGE_CONFIG[b]?.bg, color: BADGE_CONFIG[b]?.color,
                    border: `1px solid ${BADGE_CONFIG[b]?.color}40`,
                    fontSize: "0.58rem", fontWeight: 700, padding: "2px 7px", borderRadius: "20px",
                  }}>{BADGE_CONFIG[b]?.icon} {b}</span>
                ))}
              </div>
              <h2 style={{ margin: 0, fontSize: "1.25rem", color: "white", fontWeight: 900, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {designer.name}
              </h2>
              <p style={{ margin: 0, color: "#64748b", fontSize: "0.78rem" }}>
                {designer.title} · 📍 {designer.location}
              </p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: "0.52rem", color: "#334155", textTransform: "uppercase", letterSpacing: "0.1em" }}>from</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 900, color: designer.accentColor, lineHeight: 1 }}>${designer.startingPrice}</div>
            </div>
          </div>

          /*Tab bar*/
          <div style={{ display: "flex", gap: "4px", background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "4px" }}>
            {MODAL_TABS.map(({ id, icon, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                style={{
                  flex: 1, padding: "8px 4px", border: "none", cursor: "pointer", fontFamily: "inherit",
                  position: "relative",
                  background: tab === id ? `linear-gradient(135deg,${designer.accentColor}22,${designer.accentColor}10)` : "transparent",
                  color: tab === id ? designer.accentColor : "#475569",
                  borderRadius: "9px", fontWeight: tab === id ? 800 : 500, fontSize: "0.75rem",
                  border: tab === id ? `1px solid ${designer.accentColor}30` : "1px solid transparent",
                  transition: "all 0.2s",
                }}
              >
                {icon} {label}
                {id === "quote" && quoteBadge && (
                  <span style={{
                    position: "absolute", top: "4px", right: "4px",
                    width: "8px", height: "8px", borderRadius: "50%",
                    background: "#f5c842", display: "block",
                  }} />
                )}
              </button>
            ))}
          </div>
        </div>

        /*Scrollable content*/
        <div style={{
          flex: 1, overflowY: "auto", padding: "16px 1.5rem 1.5rem",
          scrollbarWidth: "thin", scrollbarColor: "#1e1e30 transparent",
        }}>
          {tab === "profile"   && <ProfileTab   designer={designer} onTabSwitch={setTab} />}
          {tab === "customize" && <CustomizeTab designer={designer} onTabSwitch={setTab} />}
          {tab === "messages"  && <MessagesTab  designer={designer} />}
          {tab === "quote"     && <QuoteTab     designer={designer} onTabSwitch={setTab} />}
        </div>
      </div>
    </div>
  );
};

export default DesignerModal;
