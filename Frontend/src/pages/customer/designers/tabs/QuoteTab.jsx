import { useState } from "react";
import { AvatarCircle } from "../DesignerShared";
import { MOCK_QUOTES } from "../designerConstants";

const QuoteTab = ({ designer, onTabSwitch }) => {
  const initQuote = MOCK_QUOTES[designer.id] || { status: "none" };
  const [quote,      setQuote]      = useState(initQuote);
  const [requesting, setRequesting] = useState(false);
  const [requested,  setRequested]  = useState(false);

  const accentGrad = `linear-gradient(135deg,${designer.accentColor},${designer.accentColor}aa)`;

  const requestQuote = () => {
    setRequesting(true);
    setTimeout(() => { setRequesting(false); setRequested(true); }, 1200);
  };

  const respond = (action) => setQuote(q => ({ ...q, status: action }));

  //No quote
  if (quote.status === "none") return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "24px 0" }}>
      {!requested ? (
        <>
          <div style={{ textAlign: "center", opacity: 0.6, marginBottom: "8px" }}>
            <div style={{ fontSize: "3rem", marginBottom: "10px" }}>📋</div>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#94a3b8" }}>No quote received yet.</p>
            <p style={{ margin: "6px 0 0", fontSize: "0.8rem", color: "#475569" }}>
              First share your idea in the Customize tab, then request a quote — {designer.name} will send a detailed breakdown.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            <button onClick={() => onTabSwitch("customize")} style={{
              flex: 1, padding: "0.85rem", borderRadius: "12px",
              border: `1px solid ${designer.accentColor}40`,
              background: `${designer.accentColor}0d`, color: designer.accentColor,
              cursor: "pointer", fontWeight: 700, fontSize: "0.85rem", fontFamily: "inherit",
            }}>✏️ Describe My Idea First</button>
            <button onClick={requestQuote} disabled={requesting} style={{
              flex: 1, padding: "0.85rem", borderRadius: "12px", border: "none",
              background: accentGrad, color: "white",
              cursor: "pointer", fontWeight: 700, fontSize: "0.85rem", fontFamily: "inherit",
              boxShadow: `0 6px 20px ${designer.accentColor}40`, opacity: requesting ? 0.7 : 1,
            }}>{requesting ? "Sending…" : "Request a Quote"}</button>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <div style={{ fontSize: "3rem", marginBottom: "10px" }}>✉️</div>
          <h3 style={{ color: "white", margin: "0 0 8px" }}>Quote Requested!</h3>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
            {designer.name} will review your project and send a quote soon. You'll see it right here.
          </p>
        </div>
      )}
    </div>
  );

  //Quote received
  if (quote.status === "received") return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <AvatarCircle initials={designer.avatar} color={designer.accentColor} size={36} />
        <div>
          <div style={{ fontWeight: 700, color: "white", fontSize: "0.9rem" }}>{designer.name} sent a quote</div>
          <div style={{ fontSize: "0.7rem", color: "#475569" }}>{quote.sentAt}</div>
        </div>
        <div style={{
          marginLeft: "auto", padding: "4px 12px", borderRadius: "20px",
          background: "rgba(245,200,66,0.12)", border: "1px solid rgba(245,200,66,0.3)",
          fontSize: "0.72rem", color: "#f5c842", fontWeight: 700,
        }}>⏳ Awaiting Response</div>
      </div>

      /*Line items*/
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", overflow: "hidden", marginBottom: "14px" }}>
        {quote.items.map((item, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "12px 16px",
            borderBottom: i < quote.items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
          }}>
            <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{item.label}</span>
            <span style={{ color: "white", fontWeight: 700, fontSize: "0.9rem" }}>${item.amount}</span>
          </div>
        ))}
        /*Total row*/
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 16px", background: `${designer.accentColor}0d`,
          borderTop: `1px solid ${designer.accentColor}25`,
        }}>
          <span style={{ color: "white", fontWeight: 800, fontSize: "0.95rem" }}>Total</span>
          <span style={{ color: designer.accentColor, fontWeight: 900, fontSize: "1.3rem" }}>${quote.total}</span>
        </div>
      </div>

      /*Designer note*/
      <div style={{ padding: "12px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", marginBottom: "20px" }}>
        <div style={{ fontSize: "0.65rem", color: "#334155", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: "6px" }}>Designer's Note</div>
        <p style={{ margin: 0, fontSize: "0.83rem", color: "#94a3b8", lineHeight: 1.6 }}>{quote.note}</p>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => respond("rejected")} style={{
          flex: 1, padding: "0.85rem", borderRadius: "12px",
          border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.07)",
          color: "#f87171", cursor: "pointer", fontWeight: 700, fontSize: "0.88rem", fontFamily: "inherit",
        }}>✕ Decline</button>
        <button onClick={() => respond("accepted")} style={{
          flex: 2, padding: "0.85rem", borderRadius: "12px", border: "none",
          background: accentGrad, color: "white", cursor: "pointer",
          fontWeight: 800, fontSize: "0.88rem", fontFamily: "inherit",
          boxShadow: `0 8px 24px ${designer.accentColor}40`,
        }}>✓ Accept Quote — ${quote.total}</button>
      </div>
    </div>
  );

  //Accepted
  if (quote.status === "accepted") return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <div style={{ fontSize: "3.5rem", marginBottom: "14px" }}>🎉</div>
      <h3 style={{ color: "white", margin: "0 0 8px", fontSize: "1.25rem" }}>Quote Accepted!</h3>
      <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "20px" }}>
        {designer.name} has been notified. Your project is now active.
      </p>
      <div style={{ background: `${designer.accentColor}0d`, border: `1px solid ${designer.accentColor}25`, borderRadius: "12px", padding: "16px", textAlign: "left", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Agreed amount</span>
          <span style={{ color: designer.accentColor, fontWeight: 900, fontSize: "1.1rem" }}>${quote.total}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Estimated delivery</span>
          <span style={{ color: "white", fontWeight: 700, fontSize: "0.85rem" }}>{designer.turnaround}</span>
        </div>
      </div>
      <button onClick={() => respond("received")} style={{
        padding: "10px 24px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)",
        background: "transparent", color: "#475569", cursor: "pointer", fontSize: "0.82rem", fontFamily: "inherit",
      }}>← View Quote Again</button>
    </div>
  );

  //Rejected
  if (quote.status === "rejected") return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <div style={{ fontSize: "3.5rem", marginBottom: "14px" }}>🙁</div>
      <h3 style={{ color: "white", margin: "0 0 8px", fontSize: "1.25rem" }}>Quote Declined</h3>
      <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "20px" }}>
        You've declined this quote. You can message {designer.name} to negotiate or request a revised quote.
      </p>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={() => respond("received")} style={{
          padding: "10px 20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)",
          background: "transparent", color: "#64748b", cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: "0.85rem",
        }}>← Back to Quote</button>
        <button onClick={() => onTabSwitch("messages")} style={{
          padding: "10px 20px", borderRadius: "12px", border: "none",
          background: accentGrad, color: "white", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: "0.85rem",
          boxShadow: `0 6px 18px ${designer.accentColor}40`,
        }}>💬 Message Designer</button>
      </div>
    </div>
  );

  return null;
};

export default QuoteTab;
