import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import { Shield, HardHat, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

export default function Login({ role }) {
  const { login } = useApp();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = login(username, password, role);
      setLoading(false);
      if (res.success) {
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/supervisor/home");
        }
      } else {
        setError(res.message);
      }
    }, 400);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
            {role === "admin" ? (
              <Shield size={32} style={{ color: "var(--color-primary)" }} />
            ) : (
              <HardHat size={32} style={{ color: "var(--color-accent)" }} />
            )}
          </div>
          <h2>{role === "admin" ? "Admin Web Panel" : "Supervisor Portal"}</h2>
          <p>Sign in to manage construction operations</p>
        </div>

        {error && (
          <div className="login-error">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}



        <form onSubmit={handleSubmit}>
          <Input
            label="Username or Email"
            id="username"
            type="text"
            placeholder={role === "admin" ? "e.g. admin" : "e.g. rahul"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <Input
            label="Password"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            iconRight={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: "none", border: "none", display: "flex", alignItems: "center", cursor: "pointer", color: "var(--text-muted)", padding: 0 }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a 
              href="#forgot" 
              onClick={(e) => { e.preventDefault(); setError("Demo Mode: Please contact support or use quick-login."); }} 
              className="forgot-password"
            >
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            variant={role === "admin" ? "primary" : "accent"}
            block
            disabled={loading}
          >
            {loading ? "Verifying..." : "Log In"}
          </Button>
        </form>

        <div className="back-to-gateway">
          <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
            <ArrowLeft size={14} /> Back to role selection
          </button>
        </div>
      </div>
    </div>
  );
}
