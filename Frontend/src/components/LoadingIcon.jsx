import React from "react";
import "../styles/LoadingIcon.css";
import logo from "/Modelle-logo.png";
export default function Hexagon() {
  return (
    <div className="loading-container">
      <div className="hexagon">
        <img src={logo} alt="Modelle Logo" className="hex-logo" />
      </div>
    </div>
  );
}
