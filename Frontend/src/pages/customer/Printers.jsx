import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Printers = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0d0d0d',
      color: '#ffffff',
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
          Find the Perfect <span style={{ color: '#3b82f6' }}>3D Printing Service</span>
        </h1>
        <p style={{ color: '#aaa', marginTop: '12px' }}>
          Connect with top-tier additive manufacturing partners worldwide.
        </p>
      </div>
    </div>
  );
};

export default Printers;