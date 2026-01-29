import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Stars } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import "../styles/Stakeholders.css";
import CTA from "./CTA";

function FloatingCard({ position, title, points, iconColor, size, isActive, isMobile }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.position.x += (position[0] - groupRef.current.position.x) * 0.1;
    groupRef.current.position.y = position[1] + Math.sin(t) * 0.3;
    groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.02;
    
    // Smooth scale transition with active state for mobile
    const targetScale = hovered ? 1.05 : (isMobile && isActive ? 1 : isMobile ? 0.85 : 1);
    groupRef.current.scale.setScalar(
      groupRef.current.scale.x + (targetScale - groupRef.current.scale.x) * 0.1
    );
  });

  return (
    <group
      ref={groupRef}
      position={position}
      scale={[0.7, 0.7, 0.7]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[size.width, size.height, 0.3]} />
        <meshStandardMaterial
          color="#111"
          transparent
          opacity={isMobile && !isActive ? 0.15 : 0.2}
          roughness={0.05}
          metalness={0.8}
          emissive={hovered || (isMobile && isActive) ? iconColor : "#000"}
          emissiveIntensity={hovered || (isMobile && isActive) ? 0.1 : 0}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[size.width + 0.2, size.height + 0.2, 0.1]} />
        <meshBasicMaterial 
          color={iconColor} 
          transparent 
          opacity={isMobile && !isActive ? 0.2 : 0.3} 
        />
      </mesh>
      <mesh position={[0, size.height / 2 - 1, 0.2]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color={iconColor}
          emissive={iconColor}
          emissiveIntensity={0.2 + Math.sin(Date.now() * 0.001) * 0.1}
        />
      </mesh>

      <Html
        position={[0, 0, 0.35]}
        zIndexRange={[0, 100]}
        center={true}
        distanceFactor={10}
        transform
        wrapperClass="stakeholder-html"
        style={{ pointerEvents: "none" }}
      >
        <div className={`stakeholder-card ${hovered ? 'hovered' : ''} ${isMobile && isActive ? 'active' : ''} ${isMobile && !isActive ? 'inactive' : ''}`}>
          <h3>{title}</h3>
          <ul>
            {points.map((p, i) => (
              <li key={i}>
                <span className="icon">●</span>
                <span className="text">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </Html>
    </group>
  );
}

export default function Stakeholders3D() {
  const fov = 60;
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  const isMobile = windowSize.width <= 768;
  const cameraZ = isMobile ? 19 : 15;

  const visibleHeight = 2 * Math.tan((fov * Math.PI) / 360) * cameraZ;
  const meshHeight = isMobile ? visibleHeight * 0.8 : 12.5;

  useEffect(() => {
    const handleResize = () => setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stakeholders = [
    {
      title: "3D Enthusiasts & Innovators",
      iconColor: "#8b5cf6",
      points: [
        "Upload STL files & check printability",
        "Get feedback on errors",
        "Connect with designers",
        "Get multiple printer quotes",
        "Choose services by price, quality, reviews",
      ],
    },
    {
      title: "3D Designers",
      iconColor: "#b8b8ff",
      points: [
        "Receive client requests",
        "Work with pre-analyzed STL files",
        "Save time with validation insights",
        "Showcase expertise via ratings",
        "Earn by offering modeling services",
      ],
    },
    {
      title: "3D Printing Providers",
      iconColor: "#dbafe9",
      points: [
        "Receive validated STL files",
        "Get jobs matched to machines/materials",
        "Submit competitive quotes",
        "Reduce print failures & waste",
        "Reach global customers",
      ],
    },
  ];

  const [activeCard, setActiveCard] = useState(0);

  const handlePrevCard = () => {
    setActiveCard((prev) => (prev > 0 ? prev - 1 : stakeholders.length - 1));
  };

  const handleNextCard = () => {
    setActiveCard((prev) => (prev < stakeholders.length - 1 ? prev + 1 : 0));
  };

  const getPositions = () => {
    if (isMobile) {
      return stakeholders.map((_, idx) => [(idx - activeCard) * 10, 0, 0]);
    } else {
      return [[-11, 0, 0], [0, 0, 0], [11, 0, 0]];
    }
  };

  const positions = getPositions();
  const cardSize = {
    width: isMobile ? 7 : 7.5,
    height: meshHeight,
  };
  const cameraPos = isMobile ? [0, 0, 12] : [0, 0, 15];

  return (
    <section className="stakeholders-section" style={{ minHeight: "100vh", padding: "2rem", position: "relative", overflow: "hidden" }}>
      <h2
        className="section-title"
        style={{
          textAlign: "center",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          marginBottom: "-3rem",
          background: "linear-gradient(90deg, #00f5ff 5%, #7d98f3 50%, #8b5cf6 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "fadeInUp 1s ease-out",
        }}
      >
        How We Empower You
      </h2>

      <div className="canvas-scroll-wrapper">
        {isMobile && (
          <button 
            className="scroll-arrow left"
            onClick={handlePrevCard}
            aria-label="Previous card"
          >
            ‹
          </button>
        )}

        <div className={`canvas-wrapper ${isMobile ? 'mobile-scroll' : ''}`}>
          <Canvas
            style={{ width: "100%", minHeight: isMobile ? "500px" : "100vh" }}
            camera={{ position: cameraPos, fov: 60 }}
          >
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
            <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#8b5cf6" />
            <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#00f5ff" />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {stakeholders.map((s, idx) => (
              <FloatingCard
                key={idx}
                position={positions[idx]}
                title={s.title}
                points={s.points}
                iconColor={s.iconColor}
                size={cardSize}
                isActive={idx === activeCard}
                isMobile={isMobile}
              />
            ))}
          </Canvas>
        </div>

        {isMobile && (
          <button 
            className="scroll-arrow right"
            onClick={handleNextCard}
            aria-label="Next card"
          >
            ›
          </button>
        )}
      </div>

      {isMobile && (
        <div className="card-indicators">
          {stakeholders.map((_, idx) => (
            <button
              key={idx}
              className={`indicator ${idx === activeCard ? 'active' : ''}`}
              onClick={() => setActiveCard(idx)}
              aria-label={`Go to card ${idx + 1}`}
            />
          ))}
        </div>
      )}

      <div className="btn-join-community">
        <CTA variant="joinCommunity" />
      </div>
    </section>
  );
}