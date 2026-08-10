import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  CheckSquare,
  FileText,
  Package,
  HardHat,
  IndianRupee,
  AlertTriangle,
  Image,
  Bell,
  Search,
  LogOut,
  Menu,
  X,
  Shield,
  FileSpreadsheet
} from "lucide-react";

export default function AdminLayout() {
  const { notifications, markNotificationsAsRead, logout } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const unreadNotifications = notifications.filter(n => !n.read);

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/admin/projects", label: "Projects / Sites", icon: <FolderKanban size={18} /> },
    { path: "/admin/supervisors", label: "Supervisors", icon: <Users size={18} /> },
    { path: "/admin/tasks", label: "Tasks", icon: <CheckSquare size={18} /> },
    { path: "/admin/materials", label: "Materials", icon: <Package size={18} /> },
    { path: "/admin/labour", label: "Labour", icon: <HardHat size={18} /> },
    { path: "/admin/expenses", label: "Expenses", icon: <IndianRupee size={18} /> },
    { path: "/admin/issues", label: "Issues", icon: <AlertTriangle size={18} /> },
    { path: "/admin/documents", label: "Documents & Photos", icon: <Image size={18} /> },
    { path: "/admin/reports", label: "Reports Export", icon: <FileSpreadsheet size={18} /> },
  ];

  return (
    <div className="admin-layout">
      {/* Mobile Drawer Overlay */}
      {sidebarOpen && <div className="drawer-overlay" onClick={toggleSidebar} style={{ zIndex: 95 }} />}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FolderKanban size={24} style={{ color: "var(--color-accent)" }} />
            <h2 style={{ fontSize: "18px", color: "#fff", fontFamily: "var(--font-display)" }}>PRACHI CONT.</h2>
          </div>
          <button className="menu-toggle-btn" onClick={toggleSidebar} style={{ color: "#fff" }}>
            <X size={20} />
          </button>
        </div>

        <nav className="admin-sidebar-menu">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `admin-menu-item ${isActive ? "active" : ""}`}
              style={{ textDecoration: "none" }}
            >
              <span className="admin-menu-item-left">
                {item.icon} {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-profile">
            <div className="admin-avatar">A</div>
            <div className="admin-profile-info">
              <div className="admin-profile-name">Prachi Admin</div>
              <div className="admin-profile-role">Contractor (Owner)</div>
            </div>
            <button className="admin-logout-btn" onClick={handleLogoutClick} title="Logout">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="admin-main">
        {/* Top Header */}
        <header className="admin-header">
          <div className="header-left">
            <button className="menu-toggle-btn" onClick={toggleSidebar}>
              <Menu size={22} />
            </button>
            <div className="header-search">
              <Search size={16} className="header-search-icon" />
              <input
                type="text"
                placeholder="Search everything..."
                className="header-search-input"
              />
            </div>
          </div>

          <div className="header-right">
            <div className="system-mode-indicator">
              <Shield size={14} /> Admin Mode
            </div>

            {/* Notifications Dropdown */}
            <div style={{ position: "relative" }}>
              <button 
                className="header-btn" 
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              >
                <Bell size={20} />
                {unreadNotifications.length > 0 && <span className="header-badge-dot" />}
              </button>

              {notifDropdownOpen && (
                <div 
                  style={{
                    position: "absolute", right: 0, top: "45px", width: "320px",
                    backgroundColor: "#ffffff", border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-lg)",
                    zIndex: 200, padding: "8px 0", overflow: "hidden"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid var(--border-color)", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: "13px", color: "var(--text-main)" }}>Notifications</span>
                    <button 
                      onClick={() => { markNotificationsAsRead(); setNotifDropdownOpen(false); }} 
                      style={{ background: "none", border: "none", color: "var(--color-accent)", fontSize: "11px", fontWeight: 700 }}
                    >
                      Mark all read
                    </button>
                  </div>
                  <div style={{ maxHeight: "280px", overflowY: "auto" }}>
                    {notifications.length === 0 ? (
                      <div style={{ padding: "20px", textAlign: "center", color: "var(--text-light)", fontSize: "13px" }}>
                        No notifications.
                      </div>
                    ) : (
                      notifications.slice(0, 5).map(n => (
                        <div 
                          key={n.id} 
                          style={{
                            padding: "12px 16px", borderBottom: "1px solid var(--border-light)", fontSize: "12px",
                            backgroundColor: n.read ? "#ffffff" : "var(--color-primary-light)"
                          }}
                        >
                          <div style={{ color: "var(--text-secondary)", lineHeight: "1.4" }}>{n.message}</div>
                          <div style={{ fontSize: "10px", color: "var(--text-light)", marginTop: "4px", fontWeight: 600 }}>{n.date}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="admin-user-profile" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }} onClick={() => navigate("/admin/supervisors")}>
              <div className="admin-avatar" style={{ width: "36px", height: "36px" }}>A</div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }} className="profile-details-text">
                <span style={{ fontWeight: 700, fontSize: "12px", color: "var(--text-main)", lineHeight: 1.2 }}>Mr. Contractor</span>
                <span style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 600 }}>Owner</span>
              </div>
            </div>

            <button 
              onClick={handleLogoutClick}
              className="header-btn logout-header-btn"
              title="Log Out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Content Wrapper */}
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
