import React, { useState, useEffect } from "react";
import CTA from "./CTA";
import "../styles/Hero.css";

// ─── YOUR 3D PRINTING IMAGES ─────────────────────────────────────────────────
const SLIDES = [
  { src: "/prints/3D1.jpeg", caption: "Precision FDM Printing" },
  { src: "/prints/3D2.jpeg", caption: "SLA Resin Models" },
  { src: "/prints/3D3.jpeg", caption: "Custom 3D Designs" },
  { src: "/prints/3D4.jpeg", caption: "Bring Ideas To Life" },
  { src: "/prints/3D5.jpeg", caption: "Bring Ideas To Life" },
];
// ─────────────────────────────────────────────────────────────────────────────

const INTERVAL = 4000; // ms per slide

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => {
        setPrev(c);
        return (c + 1) % SLIDES.length;
      });
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  // Clear prev after transition completes
  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), 1200);
    return () => clearTimeout(t);
  }, [prev]);

  return (
    <section className="home-section">
      <div className="hero-container">

        {/* Left: text */}
        <div className="hero-content">
          <div className="hero-header">
            <h1 className="hero-title">Modelle</h1>
            <h2 className="hero-subtitle">
              Where Your 3D Imaginations Come To Life
            </h2>
          </div>
          <div className="hero-text">
            <p className="hero-description">
              Upload, customize, and order 3D prints from creators nationwide.
            </p>
            <div className="hero-buttons">
              <CTA variant="getStarted" />
              <CTA variant="exploreFeatures" />
            </div>
          </div>
        </div>

        {/* Right: professional auto-slideshow */}
        <div className="hero-carousel">
          {/* Ambient glow */}
          <div className="carousel-glow" />

          {/* Frame */}
          <div className="carousel-frame">

            {/* Outgoing slide — fades & zooms out */}
            {prev !== null && (
              <div key={`prev-${prev}`} className="c-slide c-slide--exit">
                <img src={SLIDES[prev].src} alt={SLIDES[prev].caption} draggable={false} />
              </div>
            )}

            {/* Incoming slide — fades & Ken-Burns zooms in */}
            <div key={`cur-${current}`} className="c-slide c-slide--enter">
              <img src={SLIDES[current].src} alt={SLIDES[current].caption} draggable={false} />
            </div>

            {/* Gradient overlay for depth */}
            <div className="carousel-overlay" />

            {/* Caption slides up from bottom */}
            <div key={`cap-${current}`} className="carousel-caption">
              <span className="caption-line" />
              <span className="caption-text">{SLIDES[current].caption}</span>
            </div>

            {/* Progress bar */}
            <div className="carousel-progress">
              <div
                key={`prog-${current}`}
                className="carousel-progress-bar"
                style={{ animationDuration: `${INTERVAL}ms` }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Wrapper ── */
        .hero-carousel {
          position: relative;
          width: 460px;
          height: 360px;
          flex-shrink: 0;
        }

        /* Soft ambient glow behind the card */
        .carousel-glow {
          position: absolute;
          inset: -30px;
          border-radius: 40px;
          background: radial-gradient(ellipse at 60% 50%,
            rgba(0,245,255,0.18) 0%,
            rgba(139,92,246,0.14) 50%,
            transparent 75%
          );
          filter: blur(20px);
          z-index: 0;
          pointer-events: none;
        }

        /* ── Main frame ── */
        .carousel-frame {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
          z-index: 1;
          background: #060810;
          box-shadow:
            0 0 0 1px rgba(0,245,255,0.15),
            0 30px 80px rgba(0,0,0,0.6),
            0 0 40px rgba(0,245,255,0.06) inset;
        }

        /* ── Slides ── */
        .c-slide {
          position: absolute;
          inset: 0;
          will-change: opacity, transform;
        }

        .c-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Incoming: fade in + slow Ken Burns zoom */
        .c-slide--enter {
          opacity: 0;
          animation: slideEnter 1.1s cubic-bezier(0.4,0,0.2,1) forwards;
          z-index: 2;
        }

        @keyframes slideEnter {
          0%   { opacity: 0; transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1.0); }
        }

        /* Keep active image slowly zooming (Ken Burns) */
        .c-slide--enter img {
          animation: kenBurns ${INTERVAL}ms ease-in-out forwards;
        }

        @keyframes kenBurns {
          0%   { transform: scale(1.0) translate(0px, 0px); }
          100% { transform: scale(1.06) translate(-8px, -4px); }
        }

        /* Outgoing: fade out */
        .c-slide--exit {
          opacity: 1;
          animation: slideExit 0.9s cubic-bezier(0.4,0,0.2,1) forwards;
          z-index: 1;
        }

        @keyframes slideExit {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }

        /* ── Gradient overlay ── */
        .carousel-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          background:
            linear-gradient(to top,  rgba(4,6,16,0.85) 0%, transparent 45%),
            linear-gradient(to right, rgba(4,6,16,0.3) 0%, transparent 40%);
          pointer-events: none;
        }

        /* ── Caption ── */
        .carousel-caption {
          position: absolute;
          bottom: 42px;
          left: 20px;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0;
          transform: translateY(12px);
          animation: captionIn 0.7s 0.6s cubic-bezier(0.4,0,0.2,1) forwards;
        }

        @keyframes captionIn {
          to { opacity: 1; transform: translateY(0); }
        }

        .caption-line {
          display: block;
          width: 28px;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #00f5ff, #8b5cf6);
          box-shadow: 0 0 8px rgba(0,245,255,0.6);
          flex-shrink: 0;
        }

        .caption-text {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
          text-shadow: 0 1px 8px rgba(0,0,0,0.6);
        }

        /* ── Progress bar ── */
        .carousel-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: rgba(255,255,255,0.08);
          z-index: 5;
        }

        .carousel-progress-bar {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #00f5ff, #8b5cf6);
          box-shadow: 0 0 8px rgba(0,245,255,0.5);
          animation: progressFill linear forwards;
        }

        @keyframes progressFill {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .hero-carousel { width: 380px; height: 300px; }
        }

        @media (max-width: 768px) {
          .hero-carousel {
            width: 100%;
            max-width: 400px;
            height: 240px;
            margin: 2rem auto 0;
          }
        }
      `}</style>
    </section>
  );
}