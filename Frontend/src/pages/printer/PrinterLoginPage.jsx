import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/printerLogin.css";

export default function PrinterLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // reuse the shared auth service
      const { login, getUserRole } = await import("../../services/authService");
      const user = await login(email, password);
      const role = await getUserRole(user.uid);

      if (role !== "printer") {
        setError("You must sign in with a printer account to upload.");
        await import("../../services/authService").then(mod => mod.logout());
      } else {
        navigate("/customer/showroom");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
            {error && (
              <div className="auth-error" style={{ marginBottom: "1rem" }}>
                ⚠️ {error}
              </div>
            )}

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
