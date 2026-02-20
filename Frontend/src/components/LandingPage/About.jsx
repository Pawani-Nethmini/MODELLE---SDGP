import { Color } from "ogl";

export default function OurVision() {
  return (
    <section style={styles.section}>
      <div style={styles}>
        <h2 style={styles.title}>Our Vision</h2>
        <p style={styles.text}>
          At Modelle, we envision a world where 3D printing brings imagination to life. 
          We aim to empower creators, designers, and hobbyists by providing a marketplace 
          that makes high-quality, custom 3D printing accessible, fast, and sustainable.
        </p>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "10rem ",
    color: "#f8eaea",
    display: "flex",
    justifyContent: "center",
    textAlign: "center"
  },
  container: {
    maxWidth: "1000px",
  },
  title: {
    fontSize: "2.7rem",
    fontWeight: "700",
    marginBottom: "1.5rem",
    background: "linear-gradient(90deg, #ffffff 10%, #eae6f1 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  text: {
    fontSize: "1.3rem",
    lineHeight: "1.8",
    color: "#ffffff"
  }
};
