import { useState, useRef, useEffect } from "react";
import "../styles/Team.css";
import ganguly from "../assets/team-ganguly.jpg"; 
import nethmi from "../assets/team-Nethmi.jpeg";
import vishmi from "../assets/team-vishmi.jpg";
import pawani from "../assets/team-pawani.jpeg";
import pamudu from "../assets/team-pamudu.jpeg";
import sasindi from "../assets/team-sasindi.jpeg";

export default function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  const teamMembers = [
    {
      img: ganguly,
      name: "Ganguly Hettiarachci",
      role: "Team Lead & QA Manager",
      desc: "Leads the team, manages project timelines, and ensures system quality through testing and reviews."
    },
    {
      img: vishmi,
      name: "Vishmi Fernando",
      role: "UI/UX Designer & Database Engineer",
      desc: "Designs intuitive user experiences while handling database structure and backend data management."
    },
    {
      img: nethmi,
      name: "Nethmi Athukorala",
      role: "Full-stack & Cloud Systems Developer",
      desc: "Develops frontend and backend features, algorithms, and manages cloud-based file storage systems."
    },
    {
      img: pawani,
      name: "Pawani Hettiarachci",
      role: "Backend & API Integration Developer",
      desc: "Builds backend logic and integrates APIs to support seamless support functionality"
    },
    {
      img: sasindi,
      name: "Sasindi Korala",
      role: "UI/UX Designer & Frontend Developer",
      desc: "Creates user-centered designs and implements responsive, interactive frontend interfaces."
    },
    {
      img: pamudu,
      name: "Pamudu Wijethunga",
      role: "Backend & System Reliability Developer",
      desc: "Focuses on backend development, system stability, and handling edge cases efficiently."
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleTouchStart = (e) => {
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !isMobile) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    setIsDragging(false);
    
    const threshold = 50;
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      } else if (translateX < 0 && currentIndex < teamMembers.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    }
    setTranslateX(0);
  };

  const handleMouseDown = (e) => {
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isMobile) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isMobile) return;
    handleTouchEnd();
  };

  const getCardStyle = (index) => {
    if (!isMobile) return {};
    
    const offset = index - currentIndex;
    const baseTranslate = offset * 100;
    const dragOffset = (translateX / window.innerWidth) * 100;
    const totalTranslate = baseTranslate + dragOffset;
    
    const scale = Math.max(0.85, 1 - Math.abs(offset) * 0.15);
    const opacity = Math.max(0.4, 1 - Math.abs(offset) * 0.3);
    const rotateY = offset * -5;
    
    return {
      transform: `translateX(${totalTranslate}%) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity: opacity,
      zIndex: 10 - Math.abs(offset),
      pointerEvents: offset === 0 ? 'auto' : 'none'
    };
  };

  return (
    <section className="team-section">
      <h2>Meet Our Team</h2>

      {isMobile && (
        <div className="swipe-hint">
          <span className="swipe-icon">👆</span>
          <p>Swipe to explore</p>
        </div>
      )}

      <div 
        className={`team-scroll ${isMobile ? 'mobile-carousel' : ''}`}
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {teamMembers.map((member, index) => (
          <div 
            key={index}
            className={`team-card ${isMobile ? 'carousel-card' : ''} ${index === currentIndex && isMobile ? 'active-card' : ''}`}
            style={getCardStyle(index)}
          >
            <div className="card-inner">
              <div className="card-front">
                <img src={member.img} alt={member.name} />
                <h3>{member.name}</h3>
              </div>
              <div className="card-back">
                <h3>{member.role}</h3>
                <p>{member.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isMobile && (
        <>
          <div className="carousel-dots">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to team member ${index + 1}`}
              />
            ))}
          </div>

          <div className="card-counter">
            {currentIndex + 1} / {teamMembers.length}
          </div>
        </>
      )}
    </section>
  );
}