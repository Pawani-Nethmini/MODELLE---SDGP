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

const Printers = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState('Automotive');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(1500);
  const [selectedMaterials, setSelectedMaterials] = useState(['PLA (Polylactic Acid)']);
  const [selectedTechs, setSelectedTechs] = useState(['FDM']);
  const [sortBy, setSortBy] = useState('recommended');

  const toggleMaterial = (mat) => {
    setSelectedMaterials(prev =>
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
  };

  const toggleTech = (tech) => {
    setSelectedTechs(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const resetFilters = () => {
    setSelectedIndustry('Automotive');
    setSearchTerm('');
    setPriceRange(1500);
    setSelectedMaterials(['PLA (Polylactic Acid)']);
    setSelectedTechs(['FDM']);
    setSortBy('recommended');
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

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0d0d0d',
      color: '#ffffff',
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', display: 'flex', gap: '24px' }}>

        {/* Sidebar */}
        <div style={{ width: '220px', flexShrink: 0 }}>
          <div style={{ backgroundColor: '#1a1a2e', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ color: '#3b82f6', marginBottom: '16px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Questionnaire</h3>

            <label style={{ fontSize: '0.75rem', color: '#888', display: 'block', marginBottom: '6px' }}>INDUSTRY</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {['Automotive', 'Jewelry', 'Medical', 'Prototyping'].map(tag => (
                <span key={tag} onClick={() => setSelectedIndustry(tag)} style={{
                  backgroundColor: selectedIndustry === tag ? '#3b82f6' : '#2a2a3e',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}>{tag}</span>
              ))}
            </div>

            <label style={{ fontSize: '0.75rem', color: '#888', display: 'block', marginBottom: '6px' }}>PRIMARY PURPOSE?</label>
            <select style={{ width: '100%', backgroundColor: '#2a2a3e', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', marginBottom: '20px' }}>
              <option>Select purpose</option>
            </select>

            <h3 style={{ color: '#3b82f6', marginBottom: '12px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Manual Filters</h3>

            <input
              placeholder="Search service name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', backgroundColor: '#2a2a3e', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', marginBottom: '16px', boxSizing: 'border-box' }}
            />

            <label style={{ fontSize: '0.75rem', color: '#888', display: 'block', marginBottom: '6px' }}>PRICE RANGE: $0 – ${priceRange}</label>
            <input
              type="range" min="0" max="1500"
              value={priceRange}
              onChange={e => setPriceRange(e.target.value)}
              style={{ width: '100%', marginBottom: '16px', accentColor: '#3b82f6' }}
            />

            <label style={{ fontSize: '0.75rem', color: '#888', display: 'block', marginBottom: '8px' }}>MATERIALS</label>
            {['PLA (Polylactic Acid)', 'ABS', 'Resin (Photopolymer)', 'PETG'].map(mat => (
              <label key={mat} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedMaterials.includes(mat)}
                  onChange={() => toggleMaterial(mat)}
                  style={{ accentColor: '#3b82f6' }}
                />
                {mat}
              </label>
            ))}

            <label style={{ fontSize: '0.75rem', color: '#888', display: 'block', margin: '16px 0 8px' }}>TECHNOLOGY</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {['FDM', 'SLA', 'SLS', 'MJF'].map(tech => (
                <span key={tech} onClick={() => toggleTech(tech)} style={{
                  backgroundColor: selectedTechs.includes(tech) ? '#3b82f6' : '#2a2a3e',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}>{tech}</span>
              ))}
            </div>

            <button onClick={resetFilters} style={{
              width: '100%',
              padding: '10px',
              backgroundColor: 'transparent',
              border: '1px solid #3b82f6',
              color: '#3b82f6',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              letterSpacing: '1px'
            }}>⟳ RESET ALL FILTERS</button>
          </div>
        </div>

        {/* Main */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
            Find the Perfect <span style={{ color: '#3b82f6' }}>3D Printing Service</span>
          </h1>
          <p style={{ color: '#aaa', marginTop: '8px' }}>
            Connect with top-tier additive manufacturing partners worldwide.
          </p>

          {/* Results header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', marginBottom: '16px' }}>
            <p style={{ color: '#888', fontSize: '0.85rem' }}>
              Showing <strong style={{ color: '#fff' }}>{filteredPrinters.length}</strong> printing services
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#888' }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{ backgroundColor: '#1a1a2e', color: '#fff', border: '1px solid #2a2a3e', padding: '6px 10px', borderRadius: '8px', fontSize: '0.8rem' }}
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Top Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Grid placeholder */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px'
          }}>
            {filteredPrinters.map(p => (
              <div key={p.id} style={{ backgroundColor: '#1a1a2e', borderRadius: '12px', padding: '16px', color: '#aaa', fontSize: '0.85rem' }}>
                {p.name} — ${p.startingPrice}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Printers;