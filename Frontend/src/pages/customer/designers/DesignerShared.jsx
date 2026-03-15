// Shared tiny UI components used across multiple designer files

export const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars.push("★");
    else if (i - rating < 1)    stars.push("½");
    else                         stars.push("☆");
  }
  return (
    <span style={{ color: "#f5c842", fontSize: "0.85rem", letterSpacing: "1px" }}>
      {stars.join("")}
    </span>
  );
};

export const AvatarCircle = ({ initials, color, size = 44 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%", flexShrink: 0,
    background: `${color}22`, border: `2px solid ${color}55`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 800, fontSize: size * 0.32, color, letterSpacing: "0.02em",
  }}>
    {initials}
  </div>
);

export const Divider = () => (
  <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: "0 0 20px" }} />
);

// Shared input / label styles used inside tabs
export const inputStyle = {
  width: "100%", boxSizing: "border-box",
  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px", padding: "10px 14px", color: "white", fontSize: "0.85rem",
  outline: "none", resize: "none", fontFamily: "inherit",
};

export const labelStyle = {
  fontSize: "0.68rem", color: "#475569", textTransform: "uppercase",
  letterSpacing: "0.08em", display: "block", marginBottom: "6px", fontWeight: 700,
};
