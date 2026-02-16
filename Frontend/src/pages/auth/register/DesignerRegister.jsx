import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../../../styles/auth.css";

export default function DesignerRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [portfolioFile, setPortfolioFile] = useState(null);
  
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    username: "",
    phone: "",
    password: "",
    skills: [],
    software: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSkillToggle = (skill) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSoftwareToggle = (software) => {
    setForm(prev => ({
      ...prev,
      software: prev.software.includes(software)
        ? prev.software.filter(s => s !== software)
        : [...prev.software, software]
    }));
  };

  const handlePortfolioChange = (e) => {
    setPortfolioFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        role: "designer",
        email: form.email,
        fullName: form.fullName,
        username: form.username,
        phone: form.phone,
        skills: form.skills,
        software: form.software,
        portfolioFile: portfolioFile?.name || null,
        createdAt: new Date()
      });

      setSuccess(true);
    } catch (error) {
      console.error("Registration Error:", error);
      
      // Provide better error messages
      let errorMessage = error.message;
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered. Please log in instead or use a different email address.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters long.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card success-container">
          {/* <div className="success-icon"></div> */}
          <h2 className="success-title">Registration Successful!</h2>
          <p className="success-message">
            Welcome to Modelle, {form.fullName}! Your designer portfolio is ready to showcase.
          </p>
          <button
            className="success-button"
            onClick={() => navigate("/designer")}
          >
            Go to Designer Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="form-steps">
          <div className={`form-step ${step >= 1 ? "completed" : ""} ${step === 1 ? "active" : ""}`}></div>
          <div className={`form-step ${step >= 2 ? "completed" : ""} ${step === 2 ? "active" : ""}`}></div>
          <div className={`form-step ${step >= 3 ? "completed" : ""} ${step === 3 ? "active" : ""}`}></div>
        </div>

        <h1 className="auth-title">Join as Designer</h1>
        <p className="auth-subtitle">Step {step} of 3</p>

        {/* Step 1: General Information */}
        {step === 1 && (
          <>
            {error && (
              <div className="auth-error">
                {/* <span>error logo</span> */}
                <span>{error}</span>
                {error.includes("already registered") && (
                  <div style={{ marginTop: "12px", fontSize: "14px" }}>
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#4a9eff",
                        cursor: "pointer",
                        textDecoration: "underline",
                        fontSize: "14px"
                      }}
                    >
                      Go to Login
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="form-group">
              <input
                type="email"
                name="email"
                className="auth-form-input"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="fullName"
                className="auth-form-input"
                placeholder="Full name"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="username"
                className="auth-form-input"
                placeholder="Portfolio username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="phone"
                className="auth-form-input"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                className="auth-form-input"
                placeholder="Password (min. 6 characters)"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {/* Step 2: Technical Skills */}
        {step === 2 && (
          <>
            <p style={{ marginBottom: "20px", color: "#cfcfcf" }}>Select your design expertise:</p>
            {[
              { id: "modeling", label: "3D Modeling" },
              { id: "texturing", label: "Texturing" },
              { id: "animation", label: "Animation" },
              { id: "rendering", label: "Rendering" },
              { id: "sculpting", label: "Sculpting" },
              { id: "vfx", label: "VFX" }
            ].map(skill => (
              <label key={skill.id} style={{ display: "flex", alignItems: "center", marginBottom: "12px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.skills.includes(skill.id)}
                  onChange={() => handleSkillToggle(skill.id)}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                />
                <span>{skill.label}</span>
              </label>
            ))}

            <p style={{ marginTop: "24px", marginBottom: "20px", color: "#cfcfcf" }}>Software you use:</p>
            {[
              { id: "blender", label: "Blender" },
              { id: "maya", label: "Maya" },
              { id: "3dsmax", label: "3DS Max" },
              { id: "cinema4d", label: "Cinema 4D" },
              { id: "zbrush", label: "ZBrush" },
              { id: "houdini", label: "Houdini" }
            ].map(software => (
              <label key={software.id} style={{ display: "flex", alignItems: "center", marginBottom: "12px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.software.includes(software.id)}
                  onChange={() => handleSoftwareToggle(software.id)}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                />
                <span>{software.label}</span>
              </label>
            ))}
          </>
        )}

        {/* Step 3: Portfolio */}
        {step === 3 && (
          <>
            <p style={{ marginBottom: "20px", color: "#cfcfcf" }}>Upload your portfolio (PDF or ZIP)</p>
            <div className="file-upload">
              <input
                type="file"
                id="portfolio"
                onChange={handlePortfolioChange}
                accept=".pdf,.zip"
              />
              <label htmlFor="portfolio" className="file-upload-label">
                 Click to upload or drag and drop
              </label>
            </div>
            {portfolioFile && (
              <div className="file-name">✓ Selected: {portfolioFile.name}</div>
            )}
          </>
        )}

        {/* Navigation */}
        <div className="form-navigation">
          {step > 1 && (
            <button
              type="button"
              className="form-nav-button"
              onClick={() => setStep(step - 1)}
            >
              ← Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              className="form-nav-button"
              onClick={() => setStep(step + 1)}
            >
              Next →
            </button>
          ) : (
            <button
              type="button"
              className="auth-button"
              onClick={handleSubmit}
              disabled={loading}
              style={{ flex: 1 }}
            >
              {loading ? "Creating Account..." : "Complete Registration"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
