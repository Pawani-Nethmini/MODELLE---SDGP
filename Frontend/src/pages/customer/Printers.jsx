import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const MOCK_PRINTERS = [
  {
    id: 1,
    name: "ProtoFab SF",
    location: "San Francisco, CA",
    rating: 4.9,
    reviews: 124,
    startingPrice: 45,
    delivery: "2-3 Business Days",
    tech: ["FDM", "SLA", "SLS"],
    materials: ["PLA", "Resin", "PETG"],
    badges: ["FAST TURNAROUND", "LOCAL PICKUP"],
    certified: false,
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&q=80",
    accentColor: "#3b82f6",
  },
  {
    id: 2,
    name: "Precision Resin Labs",
    location: "Oakland, CA",
    rating: 4.7,
    reviews: 89,
    startingPrice: 78,
    delivery: "1 Business Day",
    tech: ["MJF", "PolyJet"],
    materials: ["Resin", "ABS"],
    badges: ["CERTIFIED LAB"],
    certified: true,
    image: "https://images.unsplash.com/photo-1631544822062-4b7e3cee1aba?w=600&q=80",
    accentColor: "#8b5cf6",
  },
  {
    id: 3,
    name: "Bay Area Additive",
    location: "San Jose, CA",
    rating: 5.0,
    reviews: 202,
    startingPrice: 32,
    delivery: "4-5 Business Days",
    tech: ["FDM", "SLS"],
    materials: ["PLA", "PETG", "ABS"],
    badges: ["VOLUME SPECIALIST"],
    certified: false,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
    accentColor: "#f59e0b",
  },
  {
    id: 4,
    name: "NorCal Makers",
    location: "Sacramento, CA",
    rating: 4.5,
    reviews: 61,
    startingPrice: 28,
    delivery: "3-4 Business Days",
    tech: ["FDM"],
    materials: ["PLA", "PETG"],
    badges: [],
    certified: false,
    image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=600&q=80",
    accentColor: "#10b981",
  },
  {
    id: 5,
    name: "ResinCraft Studio",
    location: "Berkeley, CA",
    rating: 4.8,
    reviews: 147,
    startingPrice: 95,
    delivery: "2 Business Days",
    tech: ["SLA", "PolyJet"],
    materials: ["Resin"],
    badges: ["CERTIFIED LAB", "LOCAL PICKUP"],
    certified: true,
    image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600&q=80",
    accentColor: "#8b5cf6",
  },
  {
    id: 6,
    name: "MetalForm Pro",
    location: "Fremont, CA",
    rating: 4.6,
    reviews: 33,
    startingPrice: 120,
    delivery: "5-7 Business Days",
    tech: ["SLS", "MJF"],
    materials: ["ABS", "PETG"],
    badges: ["VOLUME SPECIALIST"],
    certified: false,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    accentColor: "#f59e0b",
  },
  {
    id: 7,
    name: "FormCraft Pro",
    location: "Seattle, WA",
    rating: 4.8,
    reviews: 155,
    startingPrice: 90,
    delivery: "1-2 Business Days",
    tech: ["SLA", "FDM"],
    materials: ["Resin", "PLA"],
    badges: ["FAST TURNAROUND", "CERTIFIED LAB"],
    certified: true,
    image: "https://images.unsplash.com/photo-1565087168882-b4f8c3bf3d28?w=600&q=80",
    accentColor: "#3b82f6",
  },
  {
    id: 8,
    name: "PrintHive Collective",
    location: "Austin, TX",
    rating: 4.3,
    reviews: 44,
    startingPrice: 28,
    delivery: "5-7 Business Days",
    tech: ["FDM"],
    materials: ["PLA", "ABS"],
    badges: [],
    certified: false,
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80",
    accentColor: "#10b981",
  },
  {
    id: 9,
    name: "NexLayer Studio",
    location: "Los Angeles, CA",
    rating: 4.5,
    reviews: 61,
    startingPrice: 55,
    delivery: "3-4 Business Days",
    tech: ["FDM", "SLA"],
    materials: ["ABS", "PETG", "Resin"],
    badges: ["LOCAL PICKUP"],
    certified: false,
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
    accentColor: "#f59e0b",
  },
  {
    id: 10,
    name: "VoxelWorks Elite",
    location: "Denver, CO",
    rating: 4.9,
    reviews: 310,
    startingPrice: 65,
    delivery: "1 Business Day",
    tech: ["MJF", "SLS", "FDM"],
    materials: ["PLA", "ABS", "PETG", "Resin"],
    badges: ["FAST TURNAROUND", "VOLUME SPECIALIST", "CERTIFIED LAB"],
    certified: true,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80",
    accentColor: "#8b5cf6",
  },
];

const badgeConfig = {
  "FAST TURNAROUND": { color: "#f59e0b", bg: "rgba(245,158,11,0.15)", icon: "⚡" },
  "LOCAL PICKUP":    { color: "#10b981", bg: "rgba(16,185,129,0.15)", icon: "📍" },
  "CERTIFIED LAB":   { color: "#8b5cf6", bg: "rgba(139,92,246,0.15)", icon: "✓" },
  "VOLUME SPECIALIST": { color: "#3b82f6", bg: "rgba(59,130,246,0.15)", icon: "📦" },
};

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars.push("★");
    else if (i - rating < 1) stars.push("½");
    else stars.push("☆");
  }
  return (
    <span style={{ color: "#f5c842", fontSize: "0.85rem", letterSpacing: "1px" }}>
      {stars.join("")}
    </span>
  );
};

// ------ Printer Card ----
const PrinterCard = ({ printer, onClick, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        border: `1px solid ${hovered ? printer.accentColor + '60' : 'rgba(255,255,255,0.07)'}`,
        transform: hovered ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${printer.accentColor}30` : '0 4px 20px rgba(0,0,0,0.3)',
        position: 'relative',
        background: 'linear-gradient(145deg, #13131f, #0e0e18)',
        animation: `cardFadeIn 0.5s ease both`,
        animationDelay: `${index * 0.07}s`,
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px', zIndex: 2,
        background: hovered
          ? `linear-gradient(90deg, transparent, ${printer.accentColor}, transparent)`
          : 'transparent',
        transition: 'all 0.3s ease',
      }} />

      {/* Image section */}
      <div style={{ position: 'relative', height: '185px', overflow: 'hidden' }}>
        <img
          src={printer.image}
          alt={printer.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.5s ease',
            filter: hovered ? 'brightness(0.9)' : 'brightness(0.75)',
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to top, #0e0e18 0%, transparent 50%, rgba(0,0,0,0.2) 100%)`,
        }} />

        {/* Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '5px', flexWrap: 'wrap', zIndex: 2 }}>
          {printer.badges.map(badge => (
            <span key={badge} style={{
              backgroundColor: badgeConfig[badge]?.bg || 'rgba(59,130,246,0.15)',
              color: badgeConfig[badge]?.color || '#3b82f6',
              border: `1px solid ${badgeConfig[badge]?.color || '#3b82f6'}40`,
              fontSize: '0.6rem', fontWeight: 700, padding: '3px 8px',
              borderRadius: '20px', letterSpacing: '0.5px',
              backdropFilter: 'blur(4px)',
            }}>
              {badgeConfig[badge]?.icon} {badge}
            </span>
          ))}
        </div>

        {/* Rating pill */}
        <div style={{
          position: 'absolute', bottom: '12px', right: '12px',
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
          borderRadius: '20px', padding: '5px 12px',
          display: 'flex', alignItems: 'center', gap: '5px',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <span style={{ color: '#f5c842', fontSize: '0.8rem' }}>★</span>
          <span style={{ color: 'white', fontWeight: 700, fontSize: '0.85rem' }}>{printer.rating}</span>
          <span style={{ color: '#666', fontSize: '0.72rem' }}>({printer.reviews})</span>
        </div>

        {/* Certified badge */}
        {printer.certified && (
          <div style={{
            position: 'absolute', bottom: '12px', left: '12px',
            background: 'rgba(139,92,246,0.2)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(139,92,246,0.4)',
            borderRadius: '20px', padding: '4px 10px',
            fontSize: '0.65rem', color: '#a78bfa', fontWeight: 700,
          }}>✓ CERTIFIED</div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '16px 18px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'white', letterSpacing: '-0.01em' }}>{printer.name}</h3>
            <p style={{ margin: '3px 0 0', fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span style={{ color: printer.accentColor, fontSize: '0.7rem' }}>●</span> {printer.location}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.6rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>starts at</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: printer.accentColor, lineHeight: 1 }}>${printer.startingPrice}</div>
          </div>
        </div>

        <StarRating rating={printer.rating} />

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '12px 0' }} />

        {/* Delivery + Tech row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
          <div>
            <div style={{ color: '#334155', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>Delivery</div>
            <div style={{ color: '#94a3b8', fontWeight: 500 }}>{printer.delivery}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#334155', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>Technologies</div>
            <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              {printer.tech.map(t => (
                <span key={t} style={{
                  fontSize: '0.65rem', padding: '2px 7px', borderRadius: '5px',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                  color: '#94a3b8',
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Materials */}
        <div style={{ marginTop: '10px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {printer.materials.map(m => (
            <span key={m} style={{
              fontSize: '0.62rem', padding: '2px 8px', borderRadius: '20px',
              background: `${printer.accentColor}12`,
              border: `1px solid ${printer.accentColor}30`,
              color: printer.accentColor,
            }}>{m}</span>
          ))}
        </div>

        {/* CTA Button */}
        <button
          style={{
            marginTop: '14px', width: '100%', padding: '10px',
            background: hovered
              ? `linear-gradient(135deg, ${printer.accentColor}, ${printer.accentColor}cc)`
              : 'rgba(255,255,255,0.04)',
            border: `1px solid ${hovered ? printer.accentColor : 'rgba(255,255,255,0.08)'}`,
            color: hovered ? 'white' : '#64748b',
            borderRadius: '10px', cursor: 'pointer',
            fontSize: '0.82rem', fontWeight: 700,
            transition: 'all 0.25s ease',
            letterSpacing: '0.02em',
          }}
        >
          View Details →
        </button>
      </div>
    </div>
  );
};

// ---- Detail Modal --------
const PrinterModal = ({ printer, onClose, onOrder }) => {
  if (!printer) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem', animation: 'fadeIn 0.2s ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'linear-gradient(145deg, #13131f, #0e0e18)',
        border: `1px solid ${printer.accentColor}40`,
        borderRadius: '28px', padding: '0',
        maxWidth: '540px', width: '100%',
        position: 'relative',
        boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px ${printer.accentColor}20`,
        animation: 'slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        overflow: 'hidden',
      }}>
        {/* Top accent */}
        <div style={{ height: '3px', background: `linear-gradient(90deg, transparent, ${printer.accentColor}, transparent)` }} />

        {/* Image */}
        <div style={{ position: 'relative', height: '200px' }}>
          <img src={printer.image} alt={printer.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0e0e18 0%, transparent 60%)' }} />
          <button onClick={onClose} style={{
            position: 'absolute', top: '12px', right: '12px',
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px', color: 'white',
            width: '34px', height: '34px', cursor: 'pointer', fontSize: '1.1rem',
          }}>×</button>
        </div>

        <div style={{ padding: '0 1.75rem 1.75rem' }}>
          {/* Badges */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px', marginTop: '-16px', position: 'relative', zIndex: 1 }}>
            {printer.badges.map(badge => (
              <span key={badge} style={{
                background: badgeConfig[badge]?.bg, color: badgeConfig[badge]?.color,
                border: `1px solid ${badgeConfig[badge]?.color}40`,
                fontSize: '0.62rem', fontWeight: 700, padding: '3px 10px', borderRadius: '20px',
                backdropFilter: 'blur(4px)',
              }}>{badgeConfig[badge]?.icon} {badge}</span>
            ))}
          </div>

          <h2 style={{ margin: '0 0 4px', fontSize: '1.5rem', color: 'white', fontWeight: 900 }}>{printer.name}</h2>
          <p style={{ margin: '0 0 10px', color: '#64748b', fontSize: '0.85rem' }}>📍 {printer.location}</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <StarRating rating={printer.rating} />
            <span style={{ color: 'white', fontWeight: 700 }}>{printer.rating}</span>
            <span style={{ color: '#475569', fontSize: '0.8rem' }}>({printer.reviews} reviews)</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1.5rem' }}>
            {[
              { label: 'Starting Price', value: `$${printer.startingPrice}.00`, highlight: true },
              { label: 'Delivery Time', value: printer.delivery },
              { label: 'Materials', value: printer.materials.join(', ') },
              { label: 'Technologies', value: printer.tech.join(', ') },
            ].map(({ label, value, highlight }) => (
              <div key={label} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px', padding: '12px',
              }}>
                <div style={{ fontSize: '0.62rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: highlight ? printer.accentColor : '#e2e8f0' }}>{value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={onClose} style={{
              flex: 1, padding: '0.8rem', borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'transparent', color: '#64748b',
              cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
            }}>Cancel</button>
            <button onClick={() => onOrder(printer)} style={{
              flex: 2, padding: '0.8rem', borderRadius: '12px', border: 'none',
              background: `linear-gradient(135deg, ${printer.accentColor}, ${printer.accentColor}aa)`,
              color: 'white', cursor: 'pointer', fontWeight: 800, fontSize: '0.9rem',
              boxShadow: `0 8px 24px ${printer.accentColor}40`,
            }}>Order with this Printer →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---- Empty State -------------
const EmptyState = ({ onReset }) => (
  <div style={{
    gridColumn: 'span 3', textAlign: 'center', padding: '80px 20px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px dashed rgba(255,255,255,0.07)', borderRadius: '20px',
  }}>
    <div style={{ fontSize: '4rem', marginBottom: '16px', opacity: 0.4 }}>🖨️</div>
    <h3 style={{ color: '#94a3b8', marginBottom: '8px', fontSize: '1.2rem' }}>No services match your criteria</h3>
    <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '24px' }}>Try adjusting your filters or search to find more results.</p>
    <button onClick={onReset} style={{
      padding: '10px 28px', background: 'rgba(59,130,246,0.1)',
      border: '1px solid rgba(59,130,246,0.3)', color: '#3b82f6',
      borderRadius: '10px', cursor: 'pointer', fontWeight: 700,
    }}>Reset Filters</button>
  </div>
);

// -----Main Page-------
const Printers = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState('Automotive');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(200);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [sortBy, setSortBy] = useState('recommended');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [certifiedOnly, setCertifiedOnly] = useState(false);

  const toggleMaterial = (mat) => setSelectedMaterials(prev => prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]);
  const toggleTech = (tech) => setSelectedTechs(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]);

  const resetFilters = () => {
    setSelectedIndustry('Automotive'); setSearchTerm('');
    setPriceRange(200); setSelectedMaterials([]); setSelectedTechs([]);
    setSortBy('recommended'); setVisibleCount(6); setCertifiedOnly(false);
  };

  const filteredPrinters = useMemo(() => {
    let results = MOCK_PRINTERS.filter(p => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.tech.some(t => t.toLowerCase().includes(q)) || p.materials.some(m => m.toLowerCase().includes(q));
      const matchesPrice = p.startingPrice <= priceRange;
      const matchesMaterial = selectedMaterials.length === 0 || p.materials.some(m => selectedMaterials.includes(m));
      const matchesTech = selectedTechs.length === 0 || p.tech.some(t => selectedTechs.includes(t));
      const matchesCertified = !certifiedOnly || p.certified;
      return matchesSearch && matchesPrice && matchesMaterial && matchesTech && matchesCertified;
    });
    if (sortBy === 'price_asc') results = [...results].sort((a, b) => a.startingPrice - b.startingPrice);
    if (sortBy === 'price_desc') results = [...results].sort((a, b) => b.startingPrice - a.startingPrice);
    if (sortBy === 'rating') results = [...results].sort((a, b) => b.rating - a.rating);
    if (sortBy === 'delivery') results = [...results].sort((a, b) => a.delivery.localeCompare(b.delivery));
    return results;
  }, [searchTerm, priceRange, selectedMaterials, selectedTechs, sortBy, certifiedOnly]);

  const visiblePrinters = filteredPrinters.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPrinters.length;
  const avgRating = (MOCK_PRINTERS.reduce((s, p) => s + p.rating, 0) / MOCK_PRINTERS.length).toFixed(1);

  const handleOrder = (printer) => {
    setSelectedPrinter(null);
    navigate('/customer/my-orders', { state: { printer } });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #09090f 0%, #050508 100%)', color: '#fff', fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{transform:translateY(40px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes cardFadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#09090f}
        ::-webkit-scrollbar-thumb{background:#1e1e30;border-radius:4px}
        ::-webkit-scrollbar-thumb:hover{background:#3b82f6}
        input[type=range]::-webkit-slider-thumb{cursor:pointer}
        select option{background:#13131f}
      `}</style>

      {/* Hero */}
      <div style={{ position: 'relative', padding: '60px 40px 0', textAlign: 'center', overflow: 'hidden' }}>
        {/* Radial glow */}
        <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '20px', padding: '5px 14px', marginBottom: '20px', fontSize: '0.75rem', color: '#60a5fa' }}>
          <span style={{ width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%', animation: 'pulse 2s infinite', display: 'inline-block' }} />
          {MOCK_PRINTERS.length} Active Services Worldwide
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
          Find the Perfect{' '}
          <span style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)', backgroundSize: '300% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'gradientShift 4s ease infinite' }}>
            3D Printing Service
          </span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 28px', lineHeight: 1.6 }}>
          Connect with top-tier additive manufacturing partners. Filter by technology, material, and lead time.
        </p>

        {/* Search bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '16px', padding: '12px 18px', maxWidth: '580px', margin: '0 auto', backdropFilter: 'blur(8px)', transition: 'border-color 0.2s' }}>
          <span style={{ color: '#475569', fontSize: '1rem' }}>🔍</span>
          <input
            type="text"
            placeholder="Search by name, location, material, tech..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '0.9rem', '::placeholder': { color: '#334155' } }}
          />
          {searchTerm && <button onClick={() => setSearchTerm('')} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1 }}>×</button>}
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0', marginTop: '36px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '28px' }}>
          {[
            { label: 'Services', value: MOCK_PRINTERS.length, icon: '🖨️' },
            { label: 'Avg Rating', value: `${avgRating}/5`, icon: '⭐' },
            { label: 'From', value: `$28`, icon: '💰' },
            { label: 'Technologies', value: '5+', icon: '⚙️' },
            { label: 'Certified', value: MOCK_PRINTERS.filter(p => p.certified).length, icon: '✓' },
          ].map((s, i) => (
            <div key={s.label} style={{ flex: 1, textAlign: 'center', padding: '0 20px', borderRight: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{s.icon}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white' }}>{s.value}</div>
              <div style={{ fontSize: '0.68rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Body  */}
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '32px 24px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>

        {/* Sidebar */}
        <aside style={{ width: '230px', flexShrink: 0, position: 'sticky', top: '20px' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '20px', backdropFilter: 'blur(8px)' }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span style={{ fontSize: '0.9rem' }}>🎛️</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'white', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Filters</span>
            </div>

            {/* Industry */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.62rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', fontWeight: 700 }}>Industry</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['Automotive', 'Jewelry', 'Medical', 'Prototyping'].map(tag => (
                  <span key={tag} onClick={() => setSelectedIndustry(tag)} style={{
                    background: selectedIndustry === tag ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${selectedIndustry === tag ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.07)'}`,
                    color: selectedIndustry === tag ? '#60a5fa' : '#475569',
                    padding: '4px 10px', borderRadius: '20px', fontSize: '0.72rem',
                    cursor: 'pointer', transition: 'all 0.15s', fontWeight: 600,
                  }}>{tag}</span>
                ))}
              </div>
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0 0 20px' }} />

            {/* Price */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ fontSize: '0.62rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Max Price</div>
                <span style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: 700 }}>${priceRange}</span>
              </div>
              <input type="range" min="20" max="200" value={priceRange} onChange={e => setPriceRange(Number(e.target.value))} style={{ width: '100%', accentColor: '#3b82f6' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#1e293b', marginTop: '4px' }}>
                <span>$20</span><span>$200</span>
              </div>
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0 0 20px' }} />

            {/* Materials */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.62rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '10px' }}>Materials</div>
              {['PLA', 'ABS', 'Resin', 'PETG'].map(mat => (
                <label key={mat} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', cursor: 'pointer' }}>
                  <div onClick={() => toggleMaterial(mat)} style={{
                    width: '16px', height: '16px', borderRadius: '5px', flexShrink: 0,
                    border: `2px solid ${selectedMaterials.includes(mat) ? '#3b82f6' : 'rgba(255,255,255,0.12)'}`,
                    background: selectedMaterials.includes(mat) ? 'rgba(59,130,246,0.2)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
                  }}>
                    {selectedMaterials.includes(mat) && <span style={{ color: '#3b82f6', fontSize: '0.65rem', fontWeight: 900 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: '0.82rem', color: selectedMaterials.includes(mat) ? 'white' : '#64748b', fontWeight: selectedMaterials.includes(mat) ? 600 : 400 }}>{mat}</span>
                </label>
              ))}
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0 0 20px' }} />

            {/* Technology */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.62rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '10px' }}>Technology</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['FDM', 'SLA', 'SLS', 'MJF', 'PolyJet'].map(tech => (
                  <button key={tech} onClick={() => toggleTech(tech)} style={{
                    padding: '4px 10px', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer',
                    border: `1px solid ${selectedTechs.includes(tech) ? '#3b82f6' : 'rgba(255,255,255,0.08)'}`,
                    background: selectedTechs.includes(tech) ? 'rgba(59,130,246,0.15)' : 'transparent',
                    color: selectedTechs.includes(tech) ? '#60a5fa' : '#475569', transition: 'all 0.15s',
                  }}>{tech}</button>
                ))}
              </div>
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0 0 20px' }} />

            {/* Certified */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '20px' }}>
              <div onClick={() => setCertifiedOnly(p => !p)} style={{
                width: '16px', height: '16px', borderRadius: '5px', flexShrink: 0,
                border: `2px solid ${certifiedOnly ? '#8b5cf6' : 'rgba(255,255,255,0.12)'}`,
                background: certifiedOnly ? 'rgba(139,92,246,0.2)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
              }}>
                {certifiedOnly && <span style={{ color: '#8b5cf6', fontSize: '0.65rem', fontWeight: 900 }}>✓</span>}
              </div>
              <span style={{ fontSize: '0.82rem', color: certifiedOnly ? '#a78bfa' : '#64748b', fontWeight: certifiedOnly ? 600 : 400 }}>Certified Labs only</span>
            </label>

            <button onClick={resetFilters} style={{
              width: '100%', padding: '9px', background: 'transparent',
              border: '1px solid rgba(255,255,255,0.08)', color: '#475569',
              borderRadius: '10px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600,
              transition: 'all 0.15s',
            }}>↺ Reset All Filters</button>
          </div>
        </aside>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Results bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Showing </span>
              <span style={{ color: 'white', fontWeight: 700, fontSize: '0.85rem' }}>{filteredPrinters.length}</span>
              <span style={{ color: '#64748b', fontSize: '0.85rem' }}> printing services</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.78rem', color: '#334155' }}>Sort:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '10px', color: 'white', padding: '7px 12px', fontSize: '0.8rem',
                cursor: 'pointer', outline: 'none',
              }}>
                <option value="recommended">Recommended</option>
                <option value="rating">Top Rated</option>
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
                <option value="delivery">Fastest Delivery</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {filteredPrinters.length === 0
              ? <EmptyState onReset={resetFilters} />
              : visiblePrinters.map((p, i) => (
                  <PrinterCard key={p.id} printer={p} index={i} onClick={() => setSelectedPrinter(p)} />
                ))
            }
          </div>

          {/* Load more */}
          {hasMore && (
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <button onClick={() => setVisibleCount(prev => prev + 6)} style={{
                padding: '12px 40px', background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)', color: '#64748b',
                borderRadius: '30px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600,
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.color = '#3b82f6'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#64748b'; }}
              >↓ Load More Services</button>
            </div>
          )}

          {/* Footer */}
          <div style={{ marginTop: '48px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}>
            <p style={{ color: '#1e293b', fontSize: '0.72rem' }}>© 2026 PrintConnect Inc. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedPrinter && (
        <PrinterModal printer={selectedPrinter} onClose={() => setSelectedPrinter(null)} onOrder={handleOrder} />
      )}
    </div>
  );
};

export default Printers;