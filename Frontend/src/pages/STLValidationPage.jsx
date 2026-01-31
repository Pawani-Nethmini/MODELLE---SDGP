import STLUploadCard from "../components/STLUploadCard";
import InteractiveRobot from "../components/InteractiveRobot";
import BackgroundShapes from "../components/BackgroundShapes";
import "../styles/stlvalidation.css";

export default function STLValidationPage() {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Full page 3D background - MUST BE FIRST */}
      <BackgroundShapes />
      
      {/* Robot section */}
      <section className="robot-section">
        <InteractiveRobot />
      </section>

      {/* Upload section */}
      <STLUploadCard />
    </div>
  );
}