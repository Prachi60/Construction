import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import { Shield, HardHat, Construction, ArrowRight } from "lucide-react";
import Button from "../../../components/Button";

export default function Gateway() {
  const { login } = useApp();
  const navigate = useNavigate();

  const handleQuickLogin = (username, role) => {
    const res = login(username, username, role);
    if (res.success) {
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/supervisor/home");
      }
    }
  };

  return (
    <div className="gateway-container">
      <div className="gateway-card">
        <div className="gateway-logo" style={{ marginBottom: "12px" }}>
          <Construction size={40} style={{ color: "var(--color-accent)", filter: "drop-shadow(0 4px 6px rgba(255,122,0,0.2))" }} />
          <h1 className="logo-text" style={{ fontSize: "36px", background: "linear-gradient(135deg, #0a1128 30%, #ff7a00 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Prachi Construction
          </h1>
        </div>
        <p className="logo-tagline" style={{ fontSize: "15px", letterSpacing: "0.5px" }}>
          Smart Infrastructure & Projects Management Portal
        </p>
        
        <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "32px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>
          Select Interface to Log In
        </h2>

        <div className="gateway-options">
          {/* Admin Option */}
          <div className="gateway-box" style={{ borderTop: "4px solid var(--color-primary)" }}>
            <div>
              <h3 style={{ fontSize: "19px", color: "var(--color-primary)", marginBottom: "12px" }}>
                <Shield size={22} style={{ color: "var(--color-primary)" }} />
                Admin Panel
              </h3>
              <p style={{ fontSize: "13px", lineHeight: "1.6" }}>
                Contractor & Owner central command center to monitor projects, manage crew profiles, approve expenses, and generate PWD-ready DPR reports.
              </p>
              
              <div className="demo-credentials" style={{ background: "var(--color-primary-light)" }}>
                <strong>Quick Demo:</strong> User/Pass: <code>admin</code>
              </div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
              <Button 
                onClick={() => handleQuickLogin("admin", "admin")} 
                variant="primary"
                size="sm"
                block
                style={{ background: "var(--color-primary)", color: "#fff" }}
              >
                Instant Demo Log In
              </Button>
              <Button 
                onClick={() => navigate("/login/admin")} 
                variant="secondary"
                size="sm"
                block
              >
                Custom Admin Sign In <ArrowRight size={14} />
              </Button>
            </div>
          </div>

          {/* Supervisor Option */}
          <div className="gateway-box" style={{ borderTop: "4px solid var(--color-accent)" }}>
            <div>
              <h3 style={{ fontSize: "19px", color: "var(--color-accent)", marginBottom: "12px" }}>
                <HardHat size={22} style={{ color: "var(--color-accent)" }} />
                Supervisor App
              </h3>
              <p style={{ fontSize: "13px", lineHeight: "1.6" }}>
                Mobile-first utility for supervisors to track physical tasks, record materials consumption, submit expense vouchers, and report site issues.
              </p>
              
              <div className="demo-credentials" style={{ background: "var(--color-accent-light)", borderLeftColor: "var(--color-accent)" }}>
                <strong>Quick Demo:</strong> User: <code>rahul</code> or <code>amit</code>
              </div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
              <Button 
                onClick={() => handleQuickLogin("rahul", "supervisor")} 
                variant="primary"
                size="sm"
                block
              >
                Log In as Rahul
              </Button>
              <Button 
                onClick={() => navigate("/login/supervisor")} 
                variant="secondary"
                size="sm"
                block
              >
                Custom Supervisor Sign In <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </div>

        <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "24px", letterSpacing: "0.5px" }}>
          Prachi Construction PMIS v2.0 • Powered by Modern Shared State Engine
        </div>
      </div>
    </div>
  );
}
