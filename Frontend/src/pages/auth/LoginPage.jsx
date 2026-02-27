import { useState } from "react";
import { login, getUserRole } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleChoice, setRoleChoice] = useState("customer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(email, password);
      const role = await getUserRole(user.uid);

      // if actual stored role doesn't match chosen role we still proceed to chosen destination
      if (role !== roleChoice) {
        setError(
          `Your account role is '${role}', but you selected '${roleChoice}'. ` +
            `Proceeding to the ${roleChoice} portal.`
        );
      }

      // navigate based on user selection rather than actual
      if (roleChoice === "customer") navigate("/customer");
      else if (roleChoice === "designer") navigate("/designer");
      else if (roleChoice === "printer") navigate("/printer");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your Modelle account</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <select
              className="auth-form-select"
              value={roleChoice}
              onChange={(e) => setRoleChoice(e.target.value)}
            >
              <option value="customer">Customer</option>
              <option value="designer">Designer</option>
              <option value="printer">Printer</option>
            </select>
          </div>
          {error && (
            <div className="auth-error">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              className="auth-form-input"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="auth-form-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="auth-link">
          Don't have an account? <a href="/register">Sign up</a>
        </div>
      </div>
    </div>
  );
}
