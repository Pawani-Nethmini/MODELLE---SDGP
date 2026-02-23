import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../../../styles/auth.css";

export default function RegisterPrinter() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    shopName: "",
    phone: "",
    location: "",
    printerType: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        role: "printer",
        ...form,
        createdAt: new Date()
      });

      setSuccess(true);
    } catch (error) {
      console.error("Registration Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card success-container">
          <div className="success-icon">✨</div>
          <h2 className="success-title">Registration Successful!</h2>
          <p className="success-message">
            Welcome to Modelle, {form.shopName}! Your printing shop has been registered.
          </p>
          <button
            className="success-button"
            onClick={() => navigate("/printer")}
          >
            Go to Printer Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Set Up Your Shop</h1>
        <p className="auth-subtitle">Register as a 3D Printing Shop</p>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error">
              <span>⚠️</span>
              <span>{error}</span>
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
              name="shopName"
              className="auth-form-input"
              placeholder="Shop name"
              value={form.shopName}
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
              type="text"
              name="location"
              className="auth-form-input"
              placeholder="Shop location"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <select
              name="printerType"
              className="auth-form-select"
              value={form.printerType}
              onChange={handleChange}
              required
            >
              <option value="">Select printer type</option>
              <option value="resin">Resin Printer</option>
              <option value="fdm">FDM Printer</option>
              <option value="sla">SLA Printer</option>
              <option value="sls">SLS Printer</option>
              <option value="multi">Multiple Types</option>
            </select>
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

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Creating Shop..." : "Create Shop Account"}
          </button>
        </form>

        <div className="auth-link">
          Already have an account? <a href="/login">Sign in</a>
        </div>
      </div>
    </div>
  );
}
