import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/printerLogin.css";

export default function PrinterLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login delay
    setTimeout(() => {
      alert("Login successful! (Placeholder)");
      setLoading(false);
      navigate("/customer/showroom");
    }, 1000);
  };

  return (
    <div className="printer-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Printer Portal</h1>
            <p className="login-subtitle">Upload your 3D print creations to the community showroom</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <button type="submit" className="login-submit-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login as Printer"}
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account? <a href="/printer-signup">Sign up here</a></p>
            <button className="back-btn" onClick={() => navigate("/customer/showroom")}>
              ← Back to Showroom
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
