import { useEffect, useState } from "react";
import LoadingIcon from "./LoadingIcon";
import "../styles/Splash.css";

export default function Splash({ onFinish }) {
  const [showContent, setShowContent] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
  const showTimer = setTimeout(() => {
    setShowContent(true); // reveal logo + cube + tagline
  }, 3000);

  const exitTimer = setTimeout(() => {
    setExit(true); // start fade-out
  }, 4000);

  const finishTimer = setTimeout(() => {
    onFinish(); // unmount AFTER fade-out
  }, 3600);

  return () => {
    clearTimeout(showTimer);
    clearTimeout(exitTimer);
    clearTimeout(finishTimer);
  };
}, [onFinish]);


  return (
    <div className={`splash-container ${exit ? 'exit' : ''}`}>
      <div className={`brand-core ${showContent ? "show" : ""}`}>
        <LoadingIcon />

        {/* Logo on top of cube */}
        {/* <img
          src="/Modelle-logo.png"
          alt="Modelle"
          className="splash-logo-overlay"
        /> */}
      </div>

      <p className={`splash-tagline ${showContent ? "show" : ""}`}>
        Where 3D Imaginations Come To Life
      </p>
    </div>
  );
}
