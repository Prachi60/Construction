import React, { useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  Home,
  MapPin,
  CheckSquare,
  FileText,
  User,
  Bell,
  ArrowLeft,
  Camera,
  ChevronLeft
} from "lucide-react";
import ProgressBar from "../components/ProgressBar";
import Badge from "../components/Badge";

export default function SupervisorLayout() {
  const { currentUser, notifications, projects } = useApp();
  const [showNotif, setShowNotif] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const isFormOrSubpage = 
    location.pathname.includes("/supervisor/daily-work") ||
    location.pathname.includes("/supervisor/materials") ||
    location.pathname.includes("/supervisor/labour") ||
    location.pathname.includes("/supervisor/expenses") ||
    location.pathname.includes("/supervisor/issues") ||
    location.pathname.includes("/supervisor/photos") ||
    (location.pathname.includes("/supervisor/sites/") && location.pathname !== "/supervisor/sites");

  const unreadNotifs = notifications.filter(n => !n.read).length;

  // Find active project if viewing a specific site
  const activeProj = id ? projects.find(p => p.id === parseInt(id)) : null;

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("/supervisor/home")) return "Prachi Field App";
    if (path.includes("/supervisor/sites/")) return "Site Control";
    if (path.includes("/supervisor/sites")) return "My Sites";
    if (path.includes("/supervisor/tasks")) return "My Tasks";
    if (path.includes("/supervisor/daily-work")) return "Daily Work Entry";
    if (path.includes("/supervisor/materials")) return "Log Materials";
    if (path.includes("/supervisor/labour")) return "Log Labour";
    if (path.includes("/supervisor/expenses")) return "Submit Expense";
    if (path.includes("/supervisor/issues")) return "Report Issue";
    if (path.includes("/supervisor/photos")) return "Upload Photo";
    if (path.includes("/supervisor/profile")) return "My Profile";
    return "Supervisor App";
  };

  const handleBack = () => {
    if (location.pathname.includes("/supervisor/sites/")) {
      navigate("/supervisor/sites");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="supervisor-app-wrapper">
      <div className="supervisor-mobile-container">
        
        {/* Render a Beautiful Image Banner Header if on Home or Site pages */}
        {!isFormOrSubpage && !showNotif && (
          <div className="supervisor-top-banner">
            <div className="supervisor-banner-nav">
              <button className="banner-circle-btn" onClick={() => navigate("/supervisor/profile")}>
                <User size={16} />
              </button>
              <button className="banner-pill-btn" onClick={() => navigate("/supervisor/sites")}>
                Switch project
              </button>
            </div>
            
            <div className="supervisor-banner-content">
              {activeProj ? (
                <>
                  <span style={{ fontSize: "10px", textTransform: "uppercase", background: "rgba(255,122,0,0.85)", padding: "2px 6px", borderRadius: "4px", fontWeight: 700 }}>
                    {activeProj.type} SITE
                  </span>
                  <h2 style={{ marginTop: "4px" }}>{activeProj.name}</h2>
                  <p><MapPin size={12} /> {activeProj.location}</p>
                  <div style={{ marginTop: "10px" }}>
                    <ProgressBar progress={activeProj.progress} height="5px" variant="blue" />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", marginTop: "4px" }}>
                      <span>Progress</span>
                      <span>{activeProj.progress}%</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <span style={{ fontSize: "10px", textTransform: "uppercase", background: "rgba(0,180,216,0.85)", padding: "2px 6px", borderRadius: "4px", fontWeight: 700 }}>
                    PWD CONTRACTOR APP
                  </span>
                  <h2 style={{ marginTop: "4px" }}>Hello, {currentUser?.name || "Supervisor"}</h2>
                  <p>Site Manager • Active and assigned projects tracker</p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Regular Labeled Header for subpages and forms */}
        {(isFormOrSubpage || showNotif) && (
          <header className="supervisor-header">
            <button 
              onClick={handleBack}
              style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: "4px", color: "inherit", cursor: "pointer", fontSize: "13px", fontWeight: 700 }}
            >
              <ChevronLeft size={20} /> Back
            </button>
            <h2 style={{ fontSize: "14px", fontWeight: 800 }}>
              {showNotif ? "Notifications" : getPageTitle()}
            </h2>
            <button 
              className="header-btn" 
              onClick={() => setShowNotif(!showNotif)}
              style={{ padding: "4px" }}
            >
              <Bell size={18} />
              {unreadNotifs > 0 && <span className="header-badge-dot" style={{ top: "4px", right: "4px" }} />}
            </button>
          </header>
        )}

        {/* Content Area */}
        <div className="supervisor-content" style={{ paddingTop: (!isFormOrSubpage && !showNotif) ? "20px" : "12px" }}>
          {showNotif ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "15px" }}>Alert Logs</h3>
                <button onClick={() => setShowNotif(false)} className="btn btn-secondary btn-sm" style={{ padding: "4px 10px" }}>Close</button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {notifications.slice(0, 10).map(n => (
                  <div key={n.id} style={{ padding: "14px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", backgroundColor: "#ffffff", boxShadow: "var(--shadow-sm)" }}>
                    <div style={{ color: "var(--text-secondary)", fontSize: "12px", lineHeight: "1.4" }}>{n.message}</div>
                    <div style={{ fontSize: "10px", color: "var(--text-light)", marginTop: "6px", fontWeight: 600 }}>{n.date}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>

        {/* Bottom Nav Bar with Curved Profile and Floating Camera Button */}
        {!showNotif && (
          <nav className="supervisor-bottom-nav">
            <NavLink 
              to="/supervisor/home" 
              className={({ isActive }) => `nav-tab-item ${isActive ? "active" : ""}`}
            >
              <Home size={20} />
              <span style={{ marginTop: "2px" }}>Home</span>
            </NavLink>

            <NavLink 
              to="/supervisor/sites" 
              className={({ isActive }) => `nav-tab-item ${isActive ? "active" : ""}`}
            >
              <MapPin size={20} />
              <span style={{ marginTop: "2px" }}>Sites</span>
            </NavLink>

            {/* Floating Action Button for Camera/Photos Upload */}
            <NavLink 
              to="/supervisor/photos" 
              className="nav-tab-fab"
              title="Camera Upload"
            >
              <Camera size={26} />
            </NavLink>

            <NavLink 
              to="/supervisor/tasks" 
              className={({ isActive }) => `nav-tab-item ${isActive ? "active" : ""}`}
            >
              <CheckSquare size={20} />
              <span style={{ marginTop: "2px" }}>Tasks</span>
            </NavLink>

            <NavLink 
              to="/supervisor/profile" 
              className={({ isActive }) => `nav-tab-item ${isActive ? "active" : ""}`}
            >
              <User size={20} />
              <span style={{ marginTop: "2px" }}>Profile</span>
            </NavLink>
          </nav>
        )}

      </div>
    </div>
  );
}
