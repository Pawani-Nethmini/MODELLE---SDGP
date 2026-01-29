import STLUploadCard from "../components/STLUploadCard";
import InteractiveRobot from "../components/InteractiveRobot";
import BackgroundShapes from "../components/BackgroundShapes";
import "../styles/stlvalidation.css";

export default function STLValidationPage() {
  return (
    <>
      {/* Full page 3D background - behind everything */}
      <BackgroundShapes />
      
      {/* Robot section */}
      <section className="robot-section">
        <InteractiveRobot />
      </section>

      {/* Upload section */}
      <STLUploadCard />
    </>
  );
}