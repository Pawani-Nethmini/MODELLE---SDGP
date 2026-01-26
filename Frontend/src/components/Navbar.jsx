import { useState } from "react";
import CTA from "./CTA";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Desktop Links */}
        <ul style={styles.links} className="desktop-only">
          <li><a href="#hero" className="nav-link">Home</a></li>
          <li><a href="#about" className="nav-link">About us</a></li>
          <li><a href="#features" className="nav-link">Features</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>

        {/* Desktop Actions */}
        <div style={styles.actions} className="desktop-only">
          <CTA
            variant="login"
            style={{
              padding: "8px 20px",
              margin: 0,
              borderRadius: "20px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <CTA
            variant="getStarted"
            style={{
              padding: "8px 20px",
              margin: 0,
              borderRadius: "20px",
              border: "none",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
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
                padding: "8px 20px",
                margin: 0,
                borderRadius: "20px",
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
                padding: "8px 20px",
                margin: 0,
                borderRadius: "20px",
                border: "none",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => setMenuOpen(false)}
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

        /* Desktop Navigation Links */
        .nav-link {
          color: #9ca3af;
          text-decoration: none;
          font-weight: 500;
          position: relative;
          transition: color 0.3s ease;
          padding: 0.5rem 0;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #00f5ff, #0ea5e9);
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #00f5ff;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link:active {
          color: #06b6d4;
          transform: translateY(1px);
        }

        .nav-link.active {
          color: #00f5ff;
          font-weight: 600;
        }

        .nav-link.active::after {
          width: 100%;
        }

        /* Mobile Menu */
        .mobileMenu {
          position: fixed;
          top: 0;
          right: 0;
          width: 70%;
          height: 100%;
          background-color: rgba(15, 15, 15, 0.95);
          backdrop-filter: blur(10px);
          padding: 2rem 1.5rem;
          z-index: 10000;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .mobileMenu.open {
          transform: translateX(0);
        }

        .mobileMenuContent {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          height: 100%;
        }

        /* Mobile Navigation Links */
        .mobileLink {
          color: #9ca3af;
          text-decoration: none;
          font-size: 1.2rem;
          padding: 0.75rem 1rem;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .mobileLink::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 3px;
          background: linear-gradient(180deg, #00f5ff, #0ea5e9);
          transform: scaleY(0);
          transition: transform 0.3s ease;
        }

        .mobileLink:hover {
          color: #00f5ff;
          background-color: rgba(0, 245, 255, 0.05);
          padding-left: 1.5rem;
        }

        .mobileLink:hover::before {
          transform: scaleY(1);
        }

        .mobileLink.active {
          color: #00f5ff;
          background-color: rgba(0, 245, 255, 0.1);
          font-weight: 600;
          padding-left: 1.5rem;
          box-shadow: 0 0 10px rgba(0, 245, 255, 0.3);
        }

        .mobileLink.active::before {
          transform: scaleY(1);
        }

        .mobileActions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: auto;
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
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    margin: -2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 5vw",
    backgroundColor: "rgba(15, 15, 15, 0.75)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid #222",
    width: "100%",
    border: "none",
  },
  logo: {
    display: "flex",
    alignItems: "center",
  },
  logoImg: {
    height: "50px",
    width: "auto",
  },
  links: {
    display: "flex",
    gap: "2rem",
    listStyle: "none",
    cursor: "pointer",
  },
  actions: {
    display: "flex",
    gap: "1rem",
  },
  hamburger: {
    fontSize: "24px",
    color: "#ccc",
    cursor: "pointer",
  },
};