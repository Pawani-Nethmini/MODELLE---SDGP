// src/pages/Printers.jsx

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Printers = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState('Automotive');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(1500);
  const [selectedMaterials, setSelectedMaterials] = useState(['PLA (Polylactic Acid)']);
  const [selectedTechs, setSelectedTechs] = useState(['FDM']);

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
  };

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
        </div>

      </div>
    </div>
  );
};

export default Printers;