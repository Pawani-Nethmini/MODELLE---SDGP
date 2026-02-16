import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../../../styles/auth.css";

export default function CustomerRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    username: "",
    phone: "",
    purpose: "",
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
        role: "customer",
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
          {/* <div className="success-icon"></div> */}
          <h2 className="success-title">Registration Successful!</h2>
          <p className="success-message">
            Welcome to Modelle, {form.fullName || "Customer"}! Your account has been created successfully.
          </p>
          <button
            className="success-button"
            onClick={() => navigate("/customer")}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Your Account</h1>
        <p className="auth-subtitle">Join as a Customer</p>

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
              placeholder="Username"
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
              type="text"
              name="purpose"
              className="auth-form-input"
              placeholder="Your pourpose of using Modelle?"
              value={form.purpose}
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

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-link">
          Already have an account? <a href="/login">Sign in</a>
        </div>
      </div>
    </div>
  );
}
