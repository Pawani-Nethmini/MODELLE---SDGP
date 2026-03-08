import { useState, useMemo } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_ORDERS = [
  {
    id: "MOD-2024-0091",
    fileName: "dragon_figurine_v3.stl",
    printerName: "PrintHub Colombo",
    printerRating: 4.8,
    price: 3450,
    date: "2025-02-18",
    status: "Ongoing",
    progress: 65,
    eta: "Feb 25, 2025",
    material: "PLA",
    technology: "FDM",
  },
  {
    id: "MOD-2024-0090",
    fileName: "mechanical_arm_joint.stl",
    printerName: "3D Factory Galle",
    printerRating: 4.5,
    price: 8200,
    date: "2025-02-10",
    status: "Completed",
    progress: 100,
    eta: "Delivered",
    material: "ABS",
    technology: "FDM",
  },
  {
    id: "MOD-2024-0089",
    fileName: "desk_organizer_final.stl",
    printerName: "MakerSpace Kandy",
    printerRating: 4.9,
    price: 2100,
    date: "2025-02-05",
    status: "Completed",
    progress: 100,
    eta: "Delivered",
    material: "PETG",
    technology: "FDM",
  },
  {
    id: "MOD-2024-0088",
    fileName: "custom_ring_size7.stl",
    printerName: "ResinPro Studio",
    printerRating: 5.0,
    price: 4800,
    date: "2025-01-28",
    status: "Cancelled",
    progress: 0,
    eta: "—",
    material: "RESIN",
    technology: "SLA",
  },
  {
    id: "MOD-2024-0087",
    fileName: "architectural_model.stl",
    printerName: "PrintHub Colombo",
    printerRating: 4.8,
    price: 15600,
    date: "2025-01-20",
    status: "Completed",
    progress: 100,
    eta: "Delivered",
    material: "PLA",
    technology: "FDM",
  },
  {
    id: "MOD-2024-0086",
    fileName: "phone_stand_v2.stl",
    printerName: "QuickPrint Negombo",
    printerRating: 4.2,
    price: 980,
    date: "2025-02-20",
    status: "Pending",
    progress: 5,
    eta: "Awaiting acceptance",
    material: "PLA",
    technology: "FDM",
  },
  {
    id: "MOD-2024-0085",
    fileName: "gear_assembly_complex.stl",
    printerName: "3D Factory Galle",
    printerRating: 4.5,
    price: 6300,
    date: "2025-02-19",
    status: "Accepted",
    progress: 15,
    eta: "Mar 1, 2025",
    material: "ABS",
    technology: "SLS",
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  Pending:   { color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.3)",  dot: "#f59e0b" },
  Accepted:  { color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.3)",  dot: "#3b82f6" },
  Ongoing:   { color: "#00f5ff", bg: "rgba(0,245,255,0.10)",   border: "rgba(0,245,255,0.3)",   dot: "#00f5ff" },
  Completed: { color: "#10b981", bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.3)",  dot: "#10b981" },
  Cancelled: { color: "#6b7280", bg: "rgba(107,114,128,0.10)", border: "rgba(107,114,128,0.25)", dot: "#6b7280" },
};

const PROGRESS_COLOR = {
  Pending:   "linear-gradient(90deg, #f59e0b, #fbbf24)",
  Accepted:  "linear-gradient(90deg, #3b82f6, #60a5fa)",
  Ongoing:   "linear-gradient(90deg, #00f5ff, #7d98f3)",
  Completed: "linear-gradient(90deg, #10b981, #34d399)",
  Cancelled: "linear-gradient(90deg, #374151, #4b5563)",
};

const TECH_ICON = { FDM: "⚙️", SLA: "💎", SLS: "🌐" };

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ fontSize: 11, letterSpacing: 0 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{
          color: i < full ? "#f59e0b" : half && i === full ? "#f59e0b" : "#374151",
          opacity: half && i === full ? 0.6 : 1,
        }}>★</span>
      ))}
      <span style={{ color: "#6b7280", marginLeft: 4, fontSize: 11 }}>{rating}</span>
    </span>
  );
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "4px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
      color: cfg.color, background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      whiteSpace: "nowrap",
      fontFamily: "'DM Mono', monospace",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.dot, flexShrink: 0,
        boxShadow: status === "Ongoing" ? `0 0 6px ${cfg.dot}` : "none",
        animation: status === "Ongoing" ? "pulse 2s infinite" : "none",
      }} />
      {status.toUpperCase()}
    </span>
  );
}

function ProgressBar({ progress, status }) {
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 10, color: "#6b7280", fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em" }}>
          PRINT PROGRESS
        </span>
        <span style={{ fontSize: 10, color: "#9ca3af", fontFamily: "'DM Mono', monospace" }}>
          {progress}%
        </span>
      </div>
      <div style={{ height: 4, borderRadius: 2, background: "#1a1a2e", overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${progress}%`,
          background: PROGRESS_COLOR[status] || PROGRESS_COLOR.Pending,
          borderRadius: 2,
          transition: "width 0.6s ease",
          boxShadow: status === "Ongoing" ? "0 0 8px rgba(0,245,255,0.5)" : "none",
        }} />
      </div>
    </div>
  );
}

function SummaryCard({ label, value, sub, accent, icon }) {
  return (
    <div className="summary-card" style={{
      background: "rgba(255,255,255,0.025)",
      border: `1px solid rgba(255,255,255,0.07)`,
      borderRadius: 14,
      padding: "20px 22px",
      position: "relative",
      overflow: "hidden",
      transition: "transform 0.2s, box-shadow 0.2s",
    }}>
      <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: "#fff", fontFamily: "'Sora', sans-serif", lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: 12, color: "#6b7280", marginTop: 5, fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {label}
      </div>
      {sub && (
        <div style={{ fontSize: 11, color: accent || "#10b981", marginTop: 4 }}>
          {sub}
        </div>
      )}
      <div style={{
        position: "absolute", bottom: -15, right: -15,
        width: 70, height: 70, borderRadius: "50%",
        background: accent ? `${accent}15` : "rgba(0,245,255,0.06)",
      }} />
    </div>
  );
}

function OrderCard({ order }) {
  const [hovered, setHovered] = useState(false);
  const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.Pending;
  const dateFormatted = new Date(order.date).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.025)",
        border: hovered ? `1px solid rgba(0,245,255,0.2)` : "1px solid rgba(255,255,255,0.07)",
        borderRadius: 14,
        padding: "20px 22px",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,245,255,0.08)" : "0 2px 8px rgba(0,0,0,0.2)",
        cursor: "default",
      }}
    >
      {/* Top Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Order ID + tech badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#4b5563", letterSpacing: "0.05em" }}>
              {order.id}
            </span>
            <span style={{
              fontSize: 10, padding: "1px 7px", borderRadius: 4,
              background: "rgba(255,255,255,0.05)", color: "#6b7280",
              border: "1px solid rgba(255,255,255,0.08)",
              fontFamily: "'DM Mono', monospace",
            }}>
              {TECH_ICON[order.technology]} {order.technology}
            </span>
          </div>

          {/* File name */}
          <div style={{
            fontSize: 15, fontWeight: 600, color: "#e5e7eb",
            fontFamily: "'Sora', sans-serif",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            maxWidth: "90%",
          }}>
            📄 {order.fileName}
          </div>

          {/* Printer */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 5 }}>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>🖨️ {order.printerName}</span>
            <span style={{ color: "#374151" }}>·</span>
            <StarRating rating={order.printerRating} />
          </div>
        </div>

        {/* Status badge */}
        <div style={{ flexShrink: 0 }}>
          <StatusBadge status={order.status} />
        </div>
      </div>

      {/* Progress */}
      {order.status !== "Cancelled" && (
        <ProgressBar progress={order.progress} status={order.status} />
      )}

      {/* Bottom Row */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginTop: 14, paddingTop: 14,
        borderTop: "1px solid rgba(255,255,255,0.05)",
        flexWrap: "wrap", gap: 10,
      }}>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {/* Price */}
          <div>
            <div style={{ fontSize: 10, color: "#6b7280", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", marginBottom: 2 }}>PRICE</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#00f5ff", fontFamily: "'Sora', sans-serif" }}>
              LKR {order.price.toLocaleString()}
            </div>
          </div>
          {/* Date */}
          <div>
            <div style={{ fontSize: 10, color: "#6b7280", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", marginBottom: 2 }}>ORDERED</div>
            <div style={{ fontSize: 13, color: "#9ca3af" }}>{dateFormatted}</div>
          </div>
          {/* ETA */}
          <div>
            <div style={{ fontSize: 10, color: "#6b7280", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", marginBottom: 2 }}>ETA</div>
            <div style={{ fontSize: 13, color: order.status === "Completed" ? "#10b981" : "#9ca3af" }}>{order.eta}</div>
          </div>
          {/* Material */}
          <div>
            <div style={{ fontSize: 10, color: "#6b7280", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", marginBottom: 2 }}>MATERIAL</div>
            <div style={{ fontSize: 13, color: "#9ca3af" }}>{order.material}</div>
          </div>
        </div>

        {/* View Details button */}
        <button
          style={{
            padding: "8px 18px",
            borderRadius: 8,
            border: "1px solid rgba(0,245,255,0.25)",
            background: hovered ? "rgba(0,245,255,0.08)" : "transparent",
            color: "#00f5ff",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.05em",
            fontFamily: "'DM Mono', monospace",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(0,245,255,0.15)";
            e.currentTarget.style.borderColor = "rgba(0,245,255,0.5)";
            e.currentTarget.style.boxShadow = "0 0 12px rgba(0,245,255,0.2)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = hovered ? "rgba(0,245,255,0.08)" : "transparent";
            e.currentTarget.style.borderColor = "rgba(0,245,255,0.25)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          VIEW DETAILS →
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function MyOrders() {
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("All");
  const [sort, setSort]       = useState("newest");

  const summary = useMemo(() => ({
    total:     MOCK_ORDERS.length,
    ongoing:   MOCK_ORDERS.filter(o => ["Ongoing","Pending","Accepted"].includes(o.status)).length,
    completed: MOCK_ORDERS.filter(o => o.status === "Completed").length,
    spent:     MOCK_ORDERS.filter(o => o.status !== "Cancelled").reduce((s, o) => s + o.price, 0),
  }), []);

  const filtered = useMemo(() => {
    let list = [...MOCK_ORDERS];

    if (filter !== "All") {
      if (filter === "Ongoing") {
        list = list.filter(o => ["Ongoing","Pending","Accepted"].includes(o.status));
      } else {
        list = list.filter(o => o.status === filter);
      }
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.fileName.toLowerCase().includes(q) ||
        o.printerName.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) =>
      sort === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

    return list;
  }, [search, filter, sort]);

  const selectStyle = {
    padding: "9px 14px",
    borderRadius: 9,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)",
    color: "#9ca3af",
    fontSize: 13,
    cursor: "pointer",
    outline: "none",
    fontFamily: "inherit",
    appearance: "none",
    paddingRight: 32,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
  };

  return (
    <>
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap');

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }

        .summary-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        }

        .search-input::placeholder { color: #4b5563; }
        .search-input:focus { border-color: rgba(0,245,255,0.4) !important; box-shadow: 0 0 0 3px rgba(0,245,255,0.08) !important; }

        select option { background: #0f0f1a; color: #e5e7eb; }

        @media (max-width: 768px) {
          .orders-grid { grid-template-columns: 1fr !important; }
          .summary-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .filter-bar { flex-direction: column !important; gap: 10px !important; }
        }
        @media (max-width: 480px) {
          .summary-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "transparent",
        padding: "2rem 1.5rem 4rem",
        maxWidth: 920,
        margin: "0 auto",
        fontFamily: "'Sora', sans-serif",
        color: "#e5e7eb",
      }}>

        {/* ── Header ─────────────────────────────────────────── */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{
              width: 6, height: 28, borderRadius: 3,
              background: "linear-gradient(180deg, #00f5ff, #8b5cf6)",
            }} />
            <h1 style={{
              fontSize: 28, fontWeight: 700, margin: 0,
              background: "linear-gradient(90deg, #fff 40%, #9ca3af)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              My Orders
            </h1>
          </div>
          <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 0 16px", fontFamily: "'DM Mono', monospace" }}>
            Track and manage your 3D printing orders
          </p>
        </div>

        {/* ── Summary Cards ──────────────────────────────────── */}
        <div className="summary-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14, marginBottom: 28,
        }}>
          <SummaryCard icon="📦" label="Total Orders"     value={summary.total}     accent="#00f5ff" sub="All time" />
          <SummaryCard icon="⚡" label="Ongoing Orders"   value={summary.ongoing}   accent="#3b82f6" sub="In progress" />
          <SummaryCard icon="✅" label="Completed"        value={summary.completed} accent="#10b981" sub="Successfully printed" />
          <SummaryCard icon="💳" label="Total Spent"      value={`LKR ${summary.spent.toLocaleString()}`} accent="#8b5cf6" sub="Excl. cancelled" />
        </div>

        {/* ── Filter Bar ─────────────────────────────────────── */}
        <div className="filter-bar" style={{
          display: "flex", alignItems: "center", gap: 12,
          marginBottom: 24, flexWrap: "wrap",
        }}>
          {/* Search */}
          <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
            <span style={{
              position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
              fontSize: 14, color: "#4b5563", pointerEvents: "none",
            }}>🔍</span>
            <input
              className="search-input"
              placeholder="Search by order ID, file name, or printer..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "9px 14px 9px 36px",
                borderRadius: 9,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                color: "#e5e7eb", fontSize: 13,
                outline: "none", boxSizing: "border-box",
                fontFamily: "inherit",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            />
          </div>

          {/* Filter */}
          <div style={{ position: "relative" }}>
            <select value={filter} onChange={e => setFilter(e.target.value)} style={selectStyle}>
              {["All", "Ongoing", "Completed", "Cancelled"].map(f => (
                <option key={f} value={f}>{f === "All" ? "All Orders" : f}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div style={{ position: "relative" }}>
            <select value={sort} onChange={e => setSort(e.target.value)} style={selectStyle}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          {/* Count pill */}
          <div style={{
            padding: "6px 14px", borderRadius: 20,
            background: "rgba(0,245,255,0.07)",
            border: "1px solid rgba(0,245,255,0.15)",
            fontSize: 12, color: "#00f5ff",
            fontFamily: "'DM Mono', monospace",
            whiteSpace: "nowrap", flexShrink: 0,
          }}>
            {filtered.length} {filtered.length === 1 ? "order" : "orders"}
          </div>
        </div>

        {/* ── Orders List ────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <div className="orders-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
            {filtered.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: "center", padding: "60px 20px",
            border: "1px dashed rgba(255,255,255,0.08)",
            borderRadius: 14,
            color: "#4b5563",
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
            <div style={{ fontSize: 15, color: "#6b7280" }}>No orders found</div>
            <div style={{ fontSize: 12, color: "#374151", marginTop: 6, fontFamily: "'DM Mono', monospace" }}>
              Try adjusting your filters or search query
            </div>
          </div>
        )}
      </div>
    </>
  );
}