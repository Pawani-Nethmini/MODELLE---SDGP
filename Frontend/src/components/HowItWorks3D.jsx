import "../styles/HowItWorks.css";
export default function HowItWorks() {
  const steps = [
    { id: 1, title: "Upload Model", desc: "Upload your 3D STL or OBJ file" },
    { id: 2, title: "Get Validated", desc: "We validate geometry and printability and connect you with designers to fix issues." },
    { id: 3, title: "Customize", desc: "Choose material, size & color" },
    { id: 4, title: "Print & Deliver", desc: "We print and ship to you" },
  ];

  return (
    <section className="how-section">
      <h2 className="how-title">How It Works</h2>

      <div className="card-container">
        {steps.map((step) => (
          <div
            key={step.id}
            className="step-card"
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform =
                "rotateY(0deg) translateZ(40px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform =
                "rotateY(-12deg) translateZ(0)")
            }
          >
            <div className="step-number">0{step.id}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
