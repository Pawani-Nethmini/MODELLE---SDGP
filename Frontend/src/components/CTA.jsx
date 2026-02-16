import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CTA({
  text,
  onClick,
  variant = "primary",
  style,
}) {
  const navigate = useNavigate();

  // Preset CTA definitions (used by file #2)
  const presetButtons = {
    getStarted: {
      text: "Get Started",
      link: "/register",
      style: "primary",
    },
    joinCommunity: {
      text: "Join the Community",
      link: "/community",
      style: "primary",
    },
    exploreFeatures: {
      text: "Explore Features",
      link: "/",
      style: "secondary",
      scrollTarget: "#features",
    },
    login: {
      text: "Log In",
      link: "/login",
      style: "secondary",
    },
  };

  const preset = presetButtons[variant];

  const handlePresetClick = (e) => {
    if (preset.scrollTarget) {
      e.preventDefault();
      const element = document.querySelector(preset.scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(preset.link);
    }
  };

  return (
    <>
      {/* --- Mode 1: Preset CTA (Link or button) --- */}
      {preset ? (
        <button
          onClick={handlePresetClick}
          className={`cta-button ${preset.style}`}
          style={style}
        >
          {preset.text}
        </button>
      ) : (
        /* --- Mode 2: Custom CTA (button with onClick) --- */
        <button
          className={`cta-button ${variant}`}
          onClick={onClick}
          style={style}
        >
          {text}
        </button>
      )}

      <style>{`
        .cta-button {
          margin-top: 1rem;
          padding: 12px 30px;
          border-radius: 30px;
          font-weight: bold;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          display: inline-block;
          text-decoration: none;
          border: none;
          font-family: inherit;
          background: inherit;
          color: inherit;
        }

        .cta-button.primary {
          background: linear-gradient(
            90deg,
            #00f5ff 5%,
            #7d98f3 50%,
            #8b5cf6 100%
          );
          color: black;
          border: none;
        }

        .cta-button.primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 247, 255, 0.32);
        }

        .cta-button.secondary {
          border: 2px solid transparent;
          background-image:
            linear-gradient(#0f0f0f, #0f0f0f),
            linear-gradient(90deg, #00f5ff 5%, #7d98f3 50%, #8b5cf6 100%);
          background-origin: border-box;
          background-clip: padding-box, border-box;
          color: white;
        }

        .cta-button.secondary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 247, 255, 0.32);
        }
      `}</style>
    </>
  );
}
