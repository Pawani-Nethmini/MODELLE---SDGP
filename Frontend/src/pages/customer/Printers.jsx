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
    materials: ["PLA (Polylactic Acid)", "Resin (Photopolymer)"],
    badges: ["FAST TURNAROUND", "LOCAL PICKUP"],
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&q=80",
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
    materials: ["Resin (Photopolymer)", "ABS"],
    badges: ["CERTIFIED LAB"],
    image: "https://images.unsplash.com/photo-1631544822062-4b7e3cee1aba?w=400&q=80",
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
    materials: ["PLA (Polylactic Acid)", "PETG", "ABS"],
    badges: ["VOLUME SPECIALIST"],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80",
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
    materials: ["PLA (Polylactic Acid)", "PETG"],
    badges: [],
    image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=400&q=80",
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
    materials: ["Resin (Photopolymer)"],
    badges: ["CERTIFIED LAB", "LOCAL PICKUP"],
    image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=400&q=80",
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
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
  },
];

const badgeColors = {
  "FAST TURNAROUND": "#f59e0b",
  "LOCAL PICKUP": "#10b981",
  "CERTIFIED LAB": "#8b5cf6",
  "VOLUME SPECIALIST": "#3b82f6",
};

const PrinterCard = ({ printer, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#1a1a2e',
        borderRadius: '14px',
        overflow: 'hidden',
        cursor: 'pointer',
        border: `1px solid ${hovered ? '#3b82f6' : '#2a2a3e'}`,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.2s, border-color 0.2s',
      }}
    >
      <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
        <img
          src={printer.image}
          alt={printer.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.4s ease',
          }}
        />
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {printer.badges.map(badge => (
            <span key={badge} style={{ backgroundColor: badgeColors[badge] || '#3b82f6', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>{badge}</span>
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'rgba(0,0,0,0.75)', borderRadius: '20px', padding: '4px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
          ⭐ {printer.rating} <span style={{ color: '#888' }}>({printer.reviews})</span>
        </div>
      </div>
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{printer.name}</h3>
            <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#888' }}>📍 {printer.location}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.65rem', color: '#888' }}>STARTS AT</span>
            <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#3b82f6' }}>${printer.startingPrice}.00</p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.75rem', color: '#aaa' }}>
          <div>
            <span style={{ color: '#666', display: 'block', fontSize: '0.65rem', marginBottom: '2px' }}>DELIVERY</span>
            {printer.delivery}
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ color: '#666', display: 'block', fontSize: '0.65rem', marginBottom: '2px' }}>TECH</span>
            {printer.tech.join(', ')}
          </div>
        </div>
        <button style={{ marginTop: '14px', width: '100%', padding: '9px', backgroundColor: hovered ? '#3b82f6' : 'transparent', border: '1px solid #3b82f6', color: '#fff', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, transition: 'background-color 0.2s' }}>
          View Details →
        </button>
      </div>
    </div>
  );
};

const EmptyState = ({ onReset }) => (
  <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '60px 20px', backgroundColor: '#1a1a2e', borderRadius: '14px', border: '1px dashed #2a2a3e' }}>
    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
    <h3 style={{ color: '#fff', marginBottom: '8px' }}>No services match your criteria</h3>
    <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '20px' }}>Try adjusting your filters or search terms to find more results.</p>
    <button onClick={onReset} style={{ padding: '10px 24px', backgroundColor: '#3b82f6', border: 'none', color: '#fff', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Reset Filters</button>
  </div>
);

const Printers = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState('Automotive');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(1500);
  const [selectedMaterials, setSelectedMaterials] = useState(['PLA (Polylactic Acid)']);
  const [selectedTechs, setSelectedTechs] = useState(['FDM']);
  const [sortBy, setSortBy] = useState('recommended');
  const [visibleCount, setVisibleCount] = useState(4);

  const toggleMaterial = (mat) => setSelectedMaterials(prev => prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]);
  const toggleTech = (tech) => setSelectedTechs(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]);
  const resetFilters = () => {
    setSelectedIndustry('Automotive'); setSearchTerm(''); setPriceRange(1500);
    setSelectedMaterials(['PLA (Polylactic Acid)']); setSelectedTechs(['FDM']);
    setSortBy('recommended'); setVisibleCount(4);
  };

  const filteredPrinters = useMemo(() => {
    let results = MOCK_PRINTERS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = p.startingPrice <= priceRange;
      const matchesMaterial = selectedMaterials.length === 0 || p.materials.some(m => selectedMaterials.includes(m));
      const matchesTech = selectedTechs.length === 0 || p.tech.some(t => selectedTechs.includes(t));
      return matchesSearch && matchesPrice && matchesMaterial && matchesTech;
    });
    if (sortBy === 'price_asc') results = [...results].sort((a, b) => a.startingPrice - b.startingPrice);
    if (sortBy === 'price_desc') results = [...results].sort((a, b) => b.startingPrice - a.startingPrice);
    if (sortBy === 'rating') results = [...results].sort((a, b) => b.rating - a.rating);
    return results;
  }, [searchTerm, priceRange, selectedMaterials, selectedTechs, sortBy]);

  const visiblePrinters = filteredPrinters.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPrinters.length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0d0d', color: '#ffffff', fontFamily: "'Segoe UI', sans-serif" }}>
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div style={{ background: 'linear-gradient(135deg, #0d0d1a 0%, #1a1a3e 50%, #0d0d0d 100%)', borderBottom: '1px solid #1e1e3e', padding: '48px 20px 36px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 900, margin: 0, lineHeight: 1.2 }}>
          Find the Perfect{' '}
          <span style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'gradientShift 3s ease infinite' }}>
            3D Printing Service
          </span>
        </h1>
        <p style={{ color: '#aaa', marginTop: '14px', fontSize: '1rem', maxWidth: '500px', margin: '14px auto 0' }}>
          Connect with top-tier additive manufacturing partners worldwide. Filter by technology, material, and lead time.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px', display: 'flex', gap: '24px' }}>
        <div style={{ width: '220px', flexShrink: 0 }}>
          <div style={{ backgroundColor: '#1a1a2e', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ color: '#3b82f6', marginBottom: '16px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Questionnaire</h3>
            <label style={{ fontSize: '0.75rem', color: '#888', display: 'block', marginBottom: '6px' }}>INDUSTRY</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {['Automotive', 'Jewelry', 'Medical', 'Prototyping'].map(tag => (
                <span key={tag} onClick={() => setSelectedIndustry(tag)} style={{ backgroundColor: selectedIndustry === tag ? '#3b82f6' : '#2a2a3e', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', cursor: 'pointer' }}>{tag}</span>
              ))}
            </div>
            <label style={{ fontSize: '0.75rem', color: '#888', display: 'block', marginBottom: '6px' }}>PRIMARY PURPOSE?</label>
            <select style={{ width: '100%', backgroundColor: '#2a2a3e', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', marginBottom: '20px' }}>
              <option>Select purpose</option>
            </select>
            <h3 style={{ color: '#3b82f6', marginBottom: '12px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Manual Filters</h3>
            <input placeholder="Search service name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ width: '100%', backgroundColor: '#2a2a3e', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', marginBottom: '16px', boxSizing: 'border-box' }} />
            <label style={{ fontSize: '0.75rem', color: '#888', display: 'block', marginBottom: '6px' }}>PRICE RANGE: $0 – ${priceRange}</label>
            <input type="range" min="0" max="1500" value={priceRange} onChange={e => setPriceRange(e.target.value)} style={{ width: '100%', marginBottom: '16px', accentColor: '#3b82f6' }} />
            <label style={{ fontSize: '0.75rem', color: '#888', display: 'block', marginBottom: '8px' }}>MATERIALS</label>
            {['PLA (Polylactic Acid)', 'ABS', 'Resin (Photopolymer)', 'PETG'].map(mat => (
              <label key={mat} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={selectedMaterials.includes(mat)} onChange={() => toggleMaterial(mat)} style={{ accentColor: '#3b82f6' }} />
                {mat}
              </label>
            ))}
            <label style={{ fontSize: '0.75rem', color: '#888', display: 'block', margin: '16px 0 8px' }}>TECHNOLOGY</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {['FDM', 'SLA', 'SLS', 'MJF'].map(tech => (
                <span key={tech} onClick={() => toggleTech(tech)} style={{ backgroundColor: selectedTechs.includes(tech) ? '#3b82f6' : '#2a2a3e', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', cursor: 'pointer' }}>{tech}</span>
              ))}
            </div>
            <button onClick={resetFilters} style={{ width: '100%', padding: '10px', backgroundColor: 'transparent', border: '1px solid #3b82f6', color: '#3b82f6', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '1px' }}>⟳ RESET ALL FILTERS</button>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <p style={{ color: '#888', fontSize: '0.85rem' }}>Showing <strong style={{ color: '#fff' }}>{filteredPrinters.length}</strong> printing services</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#888' }}>Sort by:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ backgroundColor: '#1a1a2e', color: '#fff', border: '1px solid #2a2a3e', padding: '6px 10px', borderRadius: '8px', fontSize: '0.8rem' }}>
                <option value="recommended">Recommended</option>
                <option value="rating">Top Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {filteredPrinters.length === 0
              ? <EmptyState onReset={resetFilters} />
              : visiblePrinters.map(p => <PrinterCard key={p.id} printer={p} onClick={() => navigate(`/printers/${p.id}`)} />)
            }
          </div>
          {hasMore && (
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <button onClick={() => setVisibleCount(prev => prev + 4)} style={{ padding: '12px 36px', backgroundColor: 'transparent', border: '1px solid #3b82f6', color: '#3b82f6', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>
                ↓ Load More Services
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Printers;