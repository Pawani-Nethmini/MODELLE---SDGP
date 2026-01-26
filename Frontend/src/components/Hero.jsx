import React from "react";
import dragon from "../assets/dragon-vector.svg";
import CTA from "./CTA";
import "../styles/Hero.css";
// modelle_landing_page\src\styles\Hero.css

export default function Hero() {
  return (
    <section className="home-section">
      <div className="hero-container">
        

        {/* Description + buttons + dragon */}
        <div className="hero-content">
            {/* Title + subtitle */}
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
          <div className="hero-image">
            <img src={dragon} alt="3d-model" />
          </div>
        </div>

    </section>
  );
}
