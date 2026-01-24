import STLUploadCard from "../components/STLUploadCard";
import InteractiveRobot from "../components/InteractiveRobot";

export default function STLValidationPage() {
  return (
    <>

      {/* Robot section */}
      <section
        style={{
          height: "50vh",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          pointerEvents: "none", 
          marginTop: "-150px"
        }}
      >
        <InteractiveRobot />
      </section>

      {/* Upload section */}
      <STLUploadCard />
    </>
  );
}
