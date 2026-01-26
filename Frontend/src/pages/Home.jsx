import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import HowItWorks3D from "../components/HowItWorks3D";
import Capabilities from "../components/Capabilities";
import Stakeholders from "../components/Stakeholders";
import Team from "../components/Team";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
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
