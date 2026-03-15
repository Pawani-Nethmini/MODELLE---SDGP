import { useState, useRef, useEffect } from "react";
import { AvatarCircle } from "../DesignerShared";
import { MOCK_CHAT } from "../designerConstants";

const MessagesTab = ({ designer }) => {
  const initMsgs = MOCK_CHAT[designer.id] || [];
  const [messages, setMessages] = useState(initMsgs);
  const [input,    setInput]    = useState("");
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), from: "user", text: input.trim(), time: "just now" };
    setMessages(m => [...m, newMsg]);
    setInput("");
    // Simulate designer reply
    setTimeout(() => {
      setMessages(m => [...m, {
        id: Date.now() + 1, from: "designer",
        text: "Thanks for reaching out! I'll get back to you with more details shortly.",
        time: "just now",
      }]);
    }, 1800);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "420px" }}>

      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "0 0 14px", borderBottom: "1px solid rgba(255,255,255,0.06)",
        marginBottom: "14px", flexShrink: 0,
      }}>
        <AvatarCircle initials={designer.avatar} color={designer.accentColor} size={36} />
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "white" }}>{designer.name}</div>
          <div style={{ fontSize: "0.7rem", color: designer.available ? "#34d399" : "#64748b" }}>
            {designer.available ? "● Online now" : "● Usually replies within 24h"}
          </div>
        </div>
      </div>

      {/* Message list */}
      <div style={{
        flex: 1, overflowY: "auto", display: "flex", flexDirection: "column",
        gap: "10px", paddingRight: "4px",
        scrollbarWidth: "thin", scrollbarColor: "#1e1e30 transparent",
      }}>
        {messages.length === 0 && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", opacity: 0.5 }}>
            <div style={{ fontSize: "2.5rem" }}>💬</div>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#475569", textAlign: "center" }}>
              No messages yet. Say hello or send your idea brief first!
            </p>
          </div>
        )}

        {messages.map(msg => {
          const isUser = msg.from === "user";
          return (
            <div key={msg.id} style={{
              display: "flex", justifyContent: isUser ? "flex-end" : "flex-start",
              gap: "8px", alignItems: "flex-end",
            }}>
              {!isUser && <AvatarCircle initials={designer.avatar} color={designer.accentColor} size={28} />}
              <div style={{ maxWidth: "72%" }}>
                <div style={{
                  padding: "10px 14px",
                  borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: isUser
                    ? `linear-gradient(135deg,${designer.accentColor},${designer.accentColor}aa)`
                    : "rgba(255,255,255,0.06)",
                  color: "white", fontSize: "0.85rem", lineHeight: 1.5,
                  border: isUser ? "none" : "1px solid rgba(255,255,255,0.08)",
                }}>
                  {msg.text}
                </div>
                <div style={{ fontSize: "0.65rem", color: "#334155", marginTop: "4px", textAlign: isUser ? "right" : "left" }}>
                  {msg.time}
                </div>
              </div>
              {isUser && (
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  background: "rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.7rem", color: "#94a3b8", fontWeight: 700,
                }}>You</div>
              )}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div style={{
        display: "flex", gap: "8px", marginTop: "14px",
        paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0,
      }}>
        <input
          type="text"
          placeholder="Type a message…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          style={{
            flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px", padding: "10px 14px", color: "white", fontSize: "0.85rem",
            outline: "none", fontFamily: "inherit",
          }}
        />
        <button onClick={send} style={{
          padding: "10px 18px", borderRadius: "12px", border: "none", fontFamily: "inherit",
          background: `linear-gradient(135deg,${designer.accentColor},${designer.accentColor}aa)`,
          color: "white", cursor: "pointer", fontWeight: 700, fontSize: "0.85rem",
          boxShadow: `0 4px 14px ${designer.accentColor}40`, flexShrink: 0,
        }}>Send</button>
      </div>
    </div>
  );
};

export default MessagesTab;
