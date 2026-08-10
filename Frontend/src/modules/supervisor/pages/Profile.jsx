import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import { LogOut } from "lucide-react";
import Button from "../../../components/Button";

export default function Profile() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!currentUser) return null;

  return (
    <div>
      <div className="supervisor-card" style={{ textAlign: "center", padding: "24px 16px" }}>
        <div className="admin-avatar" style={{ width: "64px", height: "64px", fontSize: "28px", margin: "0 auto 12px" }}>
          {currentUser.name.substring(0, 1)}
        </div>
        <h3 style={{ fontSize: "18px" }}>{currentUser.name}</h3>
        <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>Field Supervisor</p>
      </div>

      <div className="supervisor-card" style={{ padding: "0" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-light)", fontSize: "13px" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "10px" }}>Username</div>
          <div style={{ fontWeight: 600 }}>{currentUser.username}</div>
        </div>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-light)", fontSize: "13px" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "10px" }}>Mobile Phone</div>
          <div style={{ fontWeight: 600 }}>{currentUser.phone}</div>
        </div>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-light)", fontSize: "13px" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "10px" }}>Email Address</div>
          <div style={{ fontWeight: 600 }}>{currentUser.email}</div>
        </div>
      </div>

      <Button 
        onClick={handleLogout} 
        variant="danger" 
        block 
        style={{ marginTop: "20px" }}
      >
        <LogOut size={16} style={{ marginRight: "6px", verticalAlign: "middle" }} /> Log Out
      </Button>
    </div>
  );
}
