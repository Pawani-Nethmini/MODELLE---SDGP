import { useState, useMemo } from "react";
import { MOCK_DESIGNERS, ALL_SPECIALTIES, ALL_SOFTWARE } from "./designerConstants";
import { Divider } from "./DesignerShared";
import DesignerCard  from "./DesignerCard";
import DesignerModal from "./DesignerModal";

// ─── Empty state ──────────────────────────────────────────────────────────────
const EmptyState = ({ onReset }) => (
  <div style={{
    gridColumn: "span 3", textAlign: "center", padding: "80px 20px",
    background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.07)", borderRadius: "20px",
  }}>
    <div style={{ fontSize: "4rem", marginBottom: "16px", opacity: 0.4 }}>🎨</div>
    <h3 style={{ color: "#94a3b8", marginBottom: "8px", fontSize: "1.2rem" }}>No designers match your criteria</h3>
    <p style={{ color: "#475569", fontSize: "0.9rem", marginBottom: "24px" }}>Try adjusting your filters to find more designers.</p>
    <button onClick={onReset} style={{
      padding: "10px 28px", background: "rgba(0,245,255,0.08)",
      border: "1px solid rgba(0,245,255,0.25)", color: "#00f5ff",
      borderRadius: "10px", cursor: "pointer", fontWeight: 700,
    }}>Reset Filters</button>
  </div>
);

// ─── Main page ────────────────────────────────────────────────────────────────
const Designers = () => {
  const [searchTerm,          setSearchTerm]          = useState("");
  const [priceRange,          setPriceRange]          = useState(150);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [selectedSoftware,    setSelectedSoftware]    = useState([]);
  const [sortBy,              setSortBy]              = useState("recommended");
  const [availableOnly,       setAvailableOnly]       = useState(false);
  const [verifiedOnly,        setVerifiedOnly]        = useState(false);
  const [visibleCount,        setVisibleCount]        = useState(6);
  const [selectedDesigner,    setSelectedDesigner]    = useState(null);

  const toggleSpecialty = s => setSelectedSpecialties(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
  const toggleSoftware  = s => setSelectedSoftware(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  const resetFilters = () => {
    setSearchTerm(""); setPriceRange(150); setSelectedSpecialties([]);
    setSelectedSoftware([]); setSortBy("recommended");
    setAvailableOnly(false); setVerifiedOnly(false); setVisibleCount(6);
  };

  const filteredDesigners = useMemo(() => {
    let results = MOCK_DESIGNERS.filter(d => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = !q
        || d.name.toLowerCase().includes(q)
        || d.title.toLowerCase().includes(q)
        || d.location.toLowerCase().includes(q)
        || d.specialties.some(s => s.toLowerCase().includes(q))
        || d.software.some(s => s.toLowerCase().includes(q));
      const matchesPrice = d.startingPrice <= priceRange;
      const matchesSpec  = selectedSpecialties.length === 0 || d.specialties.some(s => selectedSpecialties.includes(s));
      const matchesSoft  = selectedSoftware.length === 0 || d.software.some(s => selectedSoftware.includes(s));
      const matchesAvail = !availableOnly || d.available;
      const matchesVerif = !verifiedOnly  || d.verified;
      return matchesSearch && matchesPrice && matchesSpec && matchesSoft && matchesAvail && matchesVerif;
    });
    if (sortBy === "price_asc")  results = [...results].sort((a, b) => a.startingPrice - b.startingPrice);
    if (sortBy === "price_desc") results = [...results].sort((a, b) => b.startingPrice - a.startingPrice);
    if (sortBy === "rating")     results = [...results].sort((a, b) => b.rating - a.rating);
    if (sortBy === "projects")   results = [...results].sort((a, b) => b.completedProjects - a.completedProjects);
    return results;
  }, [searchTerm, priceRange, selectedSpecialties, selectedSoftware, sortBy, availableOnly, verifiedOnly]);

  const visibleDesigners = filteredDesigners.slice(0, visibleCount);
  const hasMore    = visibleCount < filteredDesigners.length;
  const avgRating  = (MOCK_DESIGNERS.reduce((s, d) => s + d.rating, 0) / MOCK_DESIGNERS.length).toFixed(1);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg,#09090f 0%,#050508 100%)", color: "#fff", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes cardFadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#1e1e30;border-radius:4px}
        select option{background:#13131f}
        input[type=date]::-webkit-calendar-picker-indicator{filter:invert(0.5)}
      `}</style>

      {/* ── Hero ── */}
      <div style={{ position: "relative", padding: "60px 40px 0", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)", width: "700px", height: "400px", background: "radial-gradient(ellipse,rgba(0,245,255,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", borderRadius: "20px", padding: "5px 14px", marginBottom: "20px", fontSize: "0.75rem", color: "#00f5ff" }}>
          <span style={{ width: "6px", height: "6px", background: "#00f5ff", borderRadius: "50%", animation: "pulse 2s infinite", display: "inline-block" }} />
          {MOCK_DESIGNERS.filter(d => d.available).length} Designers Available Now
        </div>

        <h1 style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
          Find Your Perfect{" "}
          <span style={{ background: "linear-gradient(90deg,#00f5ff,#8b5cf6,#ec4899,#00f5ff)", backgroundSize: "300% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradientShift 4s ease infinite" }}>
            3D Designer
          </span>
        </h1>
        <p style={{ color: "#64748b", fontSize: "1rem", maxWidth: "480px", margin: "0 auto 28px", lineHeight: 1.6 }}>
          Browse expert 3D designers. Share your idea, chat directly, and get a custom quote — all in one place.
        </p>

        {/* Search bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "16px", padding: "12px 18px", maxWidth: "580px", margin: "0 auto", backdropFilter: "blur(8px)" }}>
          <span style={{ color: "#475569", fontSize: "1rem" }}>🔍</span>
          <input
            type="text" placeholder="Search by name, specialty, software, location…"
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "white", fontSize: "0.9rem", fontFamily: "inherit" }}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: "1.2rem", lineHeight: 1 }}>×</button>
          )}
        </div>

        {/* Stats bar */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "36px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "28px" }}>
          {[
            { label: "Designers",  value: MOCK_DESIGNERS.length,                        icon: "🎨" },
            { label: "Avg Rating", value: `${avgRating}/5`,                             icon: "⭐" },
            { label: "From",       value: "$45",                                        icon: "💰" },
            { label: "Specialties",value: "12+",                                        icon: "✏️" },
            { label: "Verified",   value: MOCK_DESIGNERS.filter(d => d.verified).length, icon: "✓" },
          ].map((s, i) => (
            <div key={s.label} style={{ flex: 1, textAlign: "center", padding: "0 20px", borderRight: i < 4 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <div style={{ fontSize: "0.9rem", marginBottom: "4px" }}>{s.icon}</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "white" }}>{s.value}</div>
              <div style={{ fontSize: "0.68rem", color: "#334155", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "2px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "32px 24px", display: "flex", gap: "24px", alignItems: "flex-start" }}>

        {/* ── Sidebar filters ── */}
        <aside style={{ width: "230px", flexShrink: 0, position: "sticky", top: "20px" }}>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", padding: "20px", backdropFilter: "blur(8px)" }}>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <span>🎛️</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "white", textTransform: "uppercase", letterSpacing: "0.06em" }}>Filters</span>
            </div>

            {/* Price */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ fontSize: "0.62rem", color: "#334155", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>Max Price</div>
                <span style={{ fontSize: "0.75rem", color: "#00f5ff", fontWeight: 700 }}>${priceRange}</span>
              </div>
              <input type="range" min="40" max="150" value={priceRange} onChange={e => setPriceRange(Number(e.target.value))} style={{ width: "100%", accentColor: "#00f5ff" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "#1e293b", marginTop: "4px" }}>
                <span>$40</span><span>$150</span>
              </div>
            </div>

            <Divider />

            {/* Specialties */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "0.62rem", color: "#334155", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "10px" }}>Specialties</div>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {ALL_SPECIALTIES.map(s => (
                  <button key={s} onClick={() => toggleSpecialty(s)} style={{
                    padding: "3px 9px", borderRadius: "20px", fontSize: "0.68rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
                    border: `1px solid ${selectedSpecialties.includes(s) ? "#00f5ff" : "rgba(255,255,255,0.08)"}`,
                    background: selectedSpecialties.includes(s) ? "rgba(0,245,255,0.12)" : "transparent",
                    color: selectedSpecialties.includes(s) ? "#00f5ff" : "#475569",
                  }}>{s}</button>
                ))}
              </div>
            </div>

            <Divider />

            {/* Software */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "0.62rem", color: "#334155", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "10px" }}>Software</div>
              {ALL_SOFTWARE.map(sw => (
                <label key={sw} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", cursor: "pointer" }}>
                  <div onClick={() => toggleSoftware(sw)} style={{
                    width: "16px", height: "16px", borderRadius: "5px", flexShrink: 0,
                    border: `2px solid ${selectedSoftware.includes(sw) ? "#00f5ff" : "rgba(255,255,255,0.12)"}`,
                    background: selectedSoftware.includes(sw) ? "rgba(0,245,255,0.15)" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
                  }}>
                    {selectedSoftware.includes(sw) && <span style={{ color: "#00f5ff", fontSize: "0.65rem", fontWeight: 900 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: "0.82rem", color: selectedSoftware.includes(sw) ? "white" : "#64748b", fontWeight: selectedSoftware.includes(sw) ? 600 : 400 }}>{sw}</span>
                </label>
              ))}
            </div>

            <Divider />

            {/* Toggle checkboxes */}
            {[
              { label: "Available only", value: availableOnly, setter: setAvailableOnly, color: "#10b981" },
              { label: "Verified only",  value: verifiedOnly,  setter: setVerifiedOnly,  color: "#8b5cf6" },
            ].map(({ label, value, setter, color }) => (
              <label key={label} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", marginBottom: "16px" }}>
                <div onClick={() => setter(p => !p)} style={{
                  width: "16px", height: "16px", borderRadius: "5px", flexShrink: 0,
                  border: `2px solid ${value ? color : "rgba(255,255,255,0.12)"}`,
                  background: value ? `${color}25` : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
                }}>
                  {value && <span style={{ color, fontSize: "0.65rem", fontWeight: 900 }}>✓</span>}
                </div>
                <span style={{ fontSize: "0.82rem", color: value ? "white" : "#64748b", fontWeight: value ? 600 : 400 }}>{label}</span>
              </label>
            ))}

            <button onClick={resetFilters} style={{
              width: "100%", padding: "9px", background: "transparent",
              border: "1px solid rgba(255,255,255,0.08)", color: "#475569",
              borderRadius: "10px", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, fontFamily: "inherit",
            }}>↺ Reset All Filters</button>
          </div>
        </aside>

        {/* ── Card grid ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Results bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <span style={{ color: "#64748b", fontSize: "0.85rem" }}>Showing </span>
              <span style={{ color: "white", fontWeight: 700, fontSize: "0.85rem" }}>{filteredDesigners.length}</span>
              <span style={{ color: "#64748b", fontSize: "0.85rem" }}> designers</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "0.78rem", color: "#334155" }}>Sort:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "10px", color: "white", padding: "7px 12px", fontSize: "0.8rem",
                cursor: "pointer", outline: "none", fontFamily: "inherit",
              }}>
                <option value="recommended">Recommended</option>
                <option value="rating">Top Rated</option>
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
                <option value="projects">Most Projects</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
            {filteredDesigners.length === 0
              ? <EmptyState onReset={resetFilters} />
              : visibleDesigners.map((d, i) => (
                  <DesignerCard key={d.id} designer={d} index={i} onClick={() => setSelectedDesigner(d)} />
                ))
            }
          </div>

          {hasMore && (
            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <button
                onClick={() => setVisibleCount(p => p + 6)}
                style={{ padding: "12px 40px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#64748b", borderRadius: "30px", cursor: "pointer", fontSize: "0.88rem", fontWeight: 600, transition: "all 0.2s", fontFamily: "inherit" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#00f5ff"; e.currentTarget.style.color = "#00f5ff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#64748b"; }}
              >↓ Load More Designers</button>
            </div>
          )}

          <div style={{ marginTop: "48px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.04)", textAlign: "center" }}>
            <p style={{ color: "#1e293b", fontSize: "0.72rem" }}>© 2026 Modelle Inc. All rights reserved.</p>
          </div>
        </div>
      </div>

      {selectedDesigner && (
        <DesignerModal designer={selectedDesigner} onClose={() => setSelectedDesigner(null)} />
      )}
    </div>
  );
};

export default Designers;
