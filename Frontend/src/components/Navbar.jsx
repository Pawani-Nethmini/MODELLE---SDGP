import { useState } from "react";
import CTA from "./CTA";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav style={styles.nav}>
        {/* Logo */}
        <div style={styles.logo}>
          <img
            src="/Modelle-logo.png"
            alt="Modelle"
            style={styles.logoImg}
          />
        </div>

        {/* Desktop Links - Liquid Glass Container */}
        <div style={styles.glassContainer} className="desktop-only">
          <a href="#hero" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About us</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        {/* Desktop Actions */}
        <div style={styles.actions} className="desktop-only">
          <CTA
            variant="login"
            style={{
              padding: "10px 24px",
              margin: 0,
              borderRadius: "25px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <CTA
            variant="getStarted"
            style={{
              padding: "10px 24px",
              margin: 0,
              borderRadius: "25px",
              border: "none",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => navigate("/customer")}
          />
        </div>

        {/* Hamburger */}
        <div
          style={styles.hamburger}
          className="mobile-only"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`mobile-only mobileMenu ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="mobileMenuContent" onClick={(e) => e.stopPropagation()}>
           <a
            href="#hero"
            className="mobileLink"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>

          <a
            href="#about"
            className="mobileLink"
            onClick={() => setMenuOpen(false)}
          >
            About us
          </a>

          <a
            href="#features"
            className="mobileLink"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </a>

          <a
            href="#contact"
            className="mobileLink"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
          <div className="mobileActions">
            <CTA
              variant="login"
              style={{
                padding: "10px 24px",
                margin: 0,
                borderRadius: "25px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => setMenuOpen(false)}
            />
            <CTA
              variant="getStarted"
              style={{
                padding: "10px 24px",
                margin: 0,
                borderRadius: "25px",
                border: "none",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                setMenuOpen(false);
                navigate("/customer");
              }}
            />
          </div>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .desktop-only {
          display: flex;
        }
        .mobile-only {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: block !important;
          }
        }

        /* Liquid Glass Navigation Links */
        .nav-link {
          color: rgba(255, 255, 255, 0.95);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 0.8rem 1.5rem;
          border-radius: 18px;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.08);
          opacity: 0;
          transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link:hover::before {
          opacity: 1;
        }

        .nav-link:hover {
          color: #ffffff;
          transform: translateY(-2px);
        }

        .nav-link:active {
          transform: translateY(0);
        }

        .nav-link.active {
          color: #00f5ff;
        }

        .nav-link.active::before {
          background: rgba(0, 245, 255, 0.12);
          opacity: 1;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0.4rem;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 2px;
          background: linear-gradient(90deg, #00f5ff, #8b5cf6);
          border-radius: 2px;
          box-shadow: 0 0 12px rgba(0, 245, 255, 0.6);
        }

        /* Mobile Menu - Liquid Glass */
        .mobileMenu {
          position: fixed;
          top: 0;
          right: 0;
          width: 75%;
          max-width: 400px;
          height: 100%;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(40px) saturate(150%);
          -webkit-backdrop-filter: blur(40px) saturate(150%);
          border-left: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 32px 0 0 32px;
          box-shadow: -10px 0 50px rgba(31, 38, 135, 0.2);
          padding: 2rem 1.5rem;
          z-index: 10000;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .mobileMenu.open {
          transform: translateX(0);
        }

        .mobileMenuContent {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: 100%;
        }

        /* Mobile Navigation Links */
        .mobileLink {
          color: rgba(255, 255, 255, 0.95);
          text-decoration: none;
          font-size: 1.1rem;
          padding: 1rem 1.2rem;
          cursor: pointer;
          border-radius: 18px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .mobileLink::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background: linear-gradient(180deg, #00f5ff, #8b5cf6);
          transform: scaleY(0);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 12px rgba(0, 245, 255, 0.6);
        }

        .mobileLink:hover {
          color: #00f5ff;
          background: rgba(0, 245, 255, 0.12);
          border-color: rgba(0, 245, 255, 0.35);
          padding-left: 1.6rem;
          box-shadow: 0 4px 20px rgba(0, 245, 255, 0.25);
          transform: translateX(4px);
        }

        .mobileLink:hover::before {
          transform: scaleY(1);
        }

        .mobileLink.active {
          color: #00f5ff;
          background: rgba(0, 245, 255, 0.18);
          border-color: rgba(0, 245, 255, 0.45);
          font-weight: 600;
          padding-left: 1.6rem;
          box-shadow: 0 4px 24px rgba(0, 245, 255, 0.35);
        }

        .mobileLink.active::before {
          transform: scaleY(1);
        }

        .mobileActions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: auto;
          padding-top: 1rem;
        }

        .mobileActions button {
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: "1.5rem",
    left: 0,
    right: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 3rem",
    
    /* Liquid Glass Effect - Matching Reference */
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(40px) saturate(150%)",
    WebkitBackdropFilter: "blur(40px) saturate(150%)",
    
    /* Fully Rounded Pill */
    borderRadius: "60px",
    margin: "0 auto",
    maxWidth: "92%",
    
    /* Professional Liquid Glass Border */
    border: "1px solid rgba(255, 255, 255, 0.18)",
    boxShadow: `
      0 8px 32px rgba(31, 38, 135, 0.15),
      0 2px 8px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      inset 0 -1px 0 rgba(0, 0, 0, 0.05)
    `,
    
    width: "auto",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    filter: "drop-shadow(0 2px 8px rgba(0, 245, 255, 0.3))",
    transition: "filter 0.3s ease",
  },
  logoImg: {
    height: "42px",
    width: "auto",
  },
  glassContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.3rem",
    
    /* Inner Liquid Glass Container for Nav Links */
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "50px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  actions: {
    display: "flex",
    gap: "0.8rem",
  },
  hamburger: {
    fontSize: "22px",
    color: "rgba(255, 255, 255, 0.95)",
    cursor: "pointer",
    padding: "0.8rem 1rem",
    borderRadius: "18px",
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
};