// import Navbar from "../components/Navbar";
// Frontend\src\components\Navbar.jsx
import Hero from "../components/LandingPage/Hero";
import About from "../components/LandingPage/About";
import HowItWorks3D from "../components/LandingPage/HowItWorks3D";
import Capabilities from "../components/LandingPage/Capabilities";
import Stakeholders from "../components/LandingPage/Stakeholders";
import Team from "../components/LandingPage/Team";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <section id="hero">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="features">
        <HowItWorks3D />
      </section>

      <section id="capabilities">
        <Capabilities />
      </section>

      <section id="stakeholders">
        <Stakeholders />
      </section>

      <section id="team">
        <Team />
      </section>

      <section id="cta">
        <CTA />
      </section>

      <section id="contact">
        <Footer />
      </section>
    </>
  );
}
