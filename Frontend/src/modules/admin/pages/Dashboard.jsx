import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import {
  FolderKanban,
  Users,
  CheckSquare,
  IndianRupee,
  AlertTriangle,
  TrendingUp,
  Clock,
  Plus,
  Check,
  Calendar,
  CloudSun,
  HardHat,
  Package
} from "lucide-react";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Badge from "../../../components/Badge";

export default function Dashboard() {
  const {
    projects,
    supervisors,
    tasks,
    materials,
    expenses,
    issues,
    notifications
  } = useApp();
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header" style={{ marginBottom: "28px" }}>
        <div className="page-title-group">
          <h2 style={{ fontSize: "24px", fontWeight: 800, letterSpacing: "-0.5px" }}>Dashboard</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Overview of active road, bridge, and building construction project sites</p>
        </div>
        <div className="page-actions" style={{ gap: "12px" }}>
          <Button variant="secondary" size="sm" onClick={() => navigate("/admin/supervisors")}>
            <Users size={16} /> Crew Supervisors
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate("/admin/projects")} style={{ background: "var(--color-accent)", border: "none" }}>
            <Plus size={16} /> New Project Site
          </Button>
        </div>
      </div>

      {/* Row 1: Premium Visual Widgets (Linarc Style) */}
      <div className="dashboard-widgets-grid">
        
        {/* Site Data Card */}
        <Card title="Site Data">
          <div className="crew-pill-grid">
            <div className="crew-pill crew-pill-orange">
              <span className="crew-pill-count">12</span>
              <span className="crew-pill-label">Speciality Crew</span>
            </div>
            <div className="crew-pill crew-pill-navy">
              <span className="crew-pill-count">22</span>
              <span className="crew-pill-label">General Crew</span>
            </div>
            <div className="crew-pill crew-pill-teal">
              <span className="crew-pill-count">03</span>
              <span className="crew-pill-label">Equipment Units</span>
            </div>
          </div>
          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", borderBottom: "1px solid var(--border-light)", paddingBottom: "6px" }}>
              <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>02120 Diamond Saw Cutting</span>
              <span style={{ color: "var(--text-muted)" }}>Active</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", borderBottom: "1px solid var(--border-light)", paddingBottom: "6px" }}>
              <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>02190 Core Drilling</span>
              <span style={{ color: "var(--text-muted)" }}>Active</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
              <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>02398 Mass Excavation</span>
              <span style={{ color: "var(--text-muted)" }}>Pending Setup</span>
            </div>
          </div>
        </Card>

        {/* Upcoming Status Card */}
        <Card title="Upcoming Milestones">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", height: "100%", justifyContent: "center" }}>
            <div style={{ borderRight: "1px solid var(--border-light)", paddingRight: "10px" }}>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Next Milestone</div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--color-accent)", margin: "4px 0" }}>0 Days</div>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Bhopal Bypass Earthwork</div>
            </div>
            <div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>In Progress Value</div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--color-primary)", margin: "4px 0" }}>₹38.5 Lakhs</div>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Active work items</div>
            </div>
            <div style={{ borderRight: "1px solid var(--border-light)", paddingRight: "10px", borderTop: "1px solid var(--border-light)", paddingTop: "12px" }}>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Next Checkpoint</div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--color-teal)", margin: "4px 0" }}>12 Days</div>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>PWD Audit Verification</div>
            </div>
            <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "12px" }}>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Tasks Count</div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--color-primary)", margin: "4px 0" }}>{tasks.filter(t => t.status === "In Progress").length} Active</div>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Assigned to crew</div>
            </div>
          </div>
        </Card>

        {/* Site Weather & Budget Card */}
        <Card title="Site Weather & Value">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f8fafc", padding: "12px 16px", borderRadius: "12px" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: "13px" }}>Indore, MP Site</div>
                <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--color-primary)", margin: "2px 0" }}>32°C</div>
                <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Humidity: 65% • Clear Sky</div>
              </div>
              <CloudSun size={36} style={{ color: "var(--color-accent)" }} />
            </div>

            <div style={{ background: "var(--color-primary)", color: "#ffffff", padding: "12px 16px", borderRadius: "12px", display: "flex", justifyContents: "space-between", alignItems: "center" }}>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: "10px", textTransform: "uppercase", opacity: 0.8, fontWeight: 700 }}>Total Projects Contract Value</div>
                <div style={{ fontSize: "20px", fontWeight: 800, fontFamily: "var(--font-display)", color: "#ffffff" }}>
                  ₹{(projects.reduce((acc, curr) => acc + curr.contractAmount, 0) / 10000000).toFixed(2)} Cr
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Row 2: Standard metrics */}
      <div className="summary-cards-grid">
        <div className="summary-card">
          <div className="summary-card-details">
            <h4>Total Projects</h4>
            <div className="summary-card-value">{projects.length}</div>
          </div>
          <div className="summary-card-icon-box icon-blue">
            <FolderKanban size={20} />
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-card-details">
            <h4>Supervisors</h4>
            <div className="summary-card-value">{supervisors.filter(s => s.status === "Active").length}</div>
          </div>
          <div className="summary-card-icon-box icon-green">
            <Users size={20} />
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-card-details">
            <h4>Pending Expenses</h4>
            <div className="summary-card-value">
              ₹{(expenses.filter(e => e.status === "Pending").reduce((acc, curr) => acc + curr.amount, 0) / 100000).toFixed(1)}L
            </div>
          </div>
          <div className="summary-card-icon-box icon-amber">
            <IndianRupee size={20} />
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-card-details">
            <h4>Open Issues</h4>
            <div className="summary-card-value">{issues.filter(i => i.status === "Open").length}</div>
          </div>
          <div className="summary-card-icon-box icon-red">
            <AlertTriangle size={20} />
          </div>
        </div>
      </div>

      {/* Row 3: Visual Charts & Alert Feeds */}
      <div className="dashboard-grid-main">
        {/* Left: Project Progress Bar Chart */}
        <Card title="Project Completion Progress (%)">
          <div className="chart-container" style={{ marginTop: "10px" }}>
            <svg className="bar-chart-svg">
              <line x1="50" y1="20" x2="95%" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="50" y1="70" x2="95%" y2="70" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="50" y1="120" x2="95%" y2="120" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="50" y1="170" x2="95%" y2="170" stroke="#f1f5f9" strokeWidth="1" />
              
              {projects.slice(0, 5).map((p, idx) => {
                const yPos = 30 + idx * 36;
                return (
                  <g key={p.id}>
                    <text x="10" y={yPos + 12} className="bar-chart-label" style={{ fontSize: "11px", fontWeight: 700, fill: "var(--text-secondary)" }}>
                      {p.name.length > 18 ? p.name.substring(0, 16) + "..." : p.name}
                    </text>
                    <rect x="150" y={yPos} width="60%" height="16" fill="#f1f5f9" rx="8" />
                    <rect x="150" y={yPos} width={`${p.progress * 0.6}%`} height="16" fill="url(#blueGrad)" rx="8" />
                    <text x="82%" y={yPos + 12} className="bar-chart-val" style={{ fill: "var(--text-main)", fontWeight: 700 }}>
                      {p.progress}%
                    </text>
                  </g>
                );
              })}
              <defs>
                <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00b4d8" />
                  <stop offset="100%" stopColor="#0a1128" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </Card>

        {/* Right: Urgent Site Alerts */}
        <Card title="Pending Attention Alerts">
          <div style={{ maxHeight: "280px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
            {/* Low Material Stock */}
            {materials.filter(m => m.status === "Critical").map(m => {
              const proj = projects.find(p => p.id === m.projectId);
              return (
                <div key={m.id} className="alert-item priority-critical" style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="alert-item-left" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <AlertTriangle size={18} style={{ color: "var(--status-red)" }} />
                    <div>
                      <div className="alert-title" style={{ fontSize: "13px", fontWeight: 700 }}>Low Stock: {m.name}</div>
                      <div className="alert-desc" style={{ fontSize: "11px", color: "var(--text-muted)" }}>{m.current} {m.unit} at {proj?.name}</div>
                    </div>
                  </div>
                  <Badge variant="danger">CRITICAL</Badge>
                </div>
              );
            })}

            {/* Critical Issues */}
            {issues.filter(i => i.priority === "Critical" && i.status !== "Resolved").map(i => {
              const proj = projects.find(p => p.id === i.projectId);
              return (
                <div key={i.id} className="alert-item priority-critical" style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="alert-item-left" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <AlertTriangle size={18} style={{ color: "var(--status-red)" }} />
                    <div>
                      <div className="alert-title" style={{ fontSize: "13px", fontWeight: 700 }}>{i.title}</div>
                      <div className="alert-desc" style={{ fontSize: "11px", color: "var(--text-muted)" }}>{proj?.name}</div>
                    </div>
                  </div>
                  <Badge variant="danger">CRITICAL ISSUE</Badge>
                </div>
              );
            })}

            {/* Pending Expenses */}
            {expenses.filter(e => e.status === "Pending").slice(0, 2).map(e => {
              const proj = projects.find(p => p.id === e.projectId);
              return (
                <div key={e.id} className="alert-item priority-high" style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="alert-item-left" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <IndianRupee size={18} style={{ color: "var(--status-amber)" }} />
                    <div>
                      <div className="alert-title" style={{ fontSize: "13px", fontWeight: 700 }}>Expense Approval</div>
                      <div className="alert-desc" style={{ fontSize: "11px", color: "var(--text-muted)" }}>₹{e.amount.toLocaleString("en-IN")} for {e.category}</div>
                    </div>
                  </div>
                  <Badge variant="warning" onClick={() => navigate("/admin/expenses")} style={{ cursor: "pointer" }}>REVIEW</Badge>
                </div>
              );
            })}

            {materials.filter(m => m.status === "Critical").length === 0 &&
             issues.filter(i => i.priority === "Critical" && i.status !== "Resolved").length === 0 &&
             expenses.filter(e => e.status === "Pending").length === 0 && (
               <div style={{ textAlign: "center", padding: "40px 20px" }}>
                 <Check size={28} style={{ color: "var(--status-green)", margin: "0 auto 8px" }} />
                 <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>No issues require immediate attention.</p>
               </div>
            )}
          </div>
        </Card>
      </div>

      <div className="dashboard-grid-secondary" style={{ marginTop: "24px" }}>
        {/* Left: Recent Activity Feed */}
        <Card title="Recent Site Activity">
          <div className="activity-feed">
            {notifications.slice(0, 4).map(item => (
              <div key={item.id} className="activity-item" style={{ display: "flex", gap: "12px", marginBottom: "8px" }}>
                <div className="activity-icon-bullet" style={{ marginTop: "4px" }}>
                  <Clock size={12} />
                </div>
                <div>
                  <div className="activity-text" style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{item.message}</div>
                  <div className="activity-time" style={{ fontSize: "10px", color: "var(--text-light)", fontWeight: 600 }}>{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right: Pie Distribution */}
        <Card title="Project Status Distribution">
          <div className="donut-chart-box" style={{ display: "flex", gap: "24px", alignItems: "center", justifyContent: "center" }}>
            <svg width="120" height="120" viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--status-green)" strokeWidth="6" strokeDasharray="55 45" strokeDashoffset="25" />
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--status-amber)" strokeWidth="6" strokeDasharray="11 89" strokeDashoffset="70" />
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--status-red)" strokeWidth="6" strokeDasharray="22 78" strokeDashoffset="81" />
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--status-blue)" strokeWidth="6" strokeDasharray="12 88" strokeDashoffset="103" />
              
              <g className="chart-text">
                <text x="21" y="22" style={{ fontSize: "6px", textAnchor: "middle", fill: "var(--color-primary)", fontWeight: 800 }}>
                  {projects.length}
                </text>
                <text x="21" y="26" style={{ fontSize: "2.5px", textAnchor: "middle", fill: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.2px" }}>
                  TOTAL SITES
                </text>
              </g>
            </svg>
            
            <div className="donut-legend" style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "11px" }}>
              <div className="donut-legend-item" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span className="legend-color-dot" style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--status-green)" }} />
                <span style={{ fontWeight: 600 }}>On Track ({projects.filter(p => p.status === "On Track").length})</span>
              </div>
              <div className="donut-legend-item" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span className="legend-color-dot" style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--status-amber)" }} />
                <span style={{ fontWeight: 600 }}>At Risk ({projects.filter(p => p.status === "At Risk").length})</span>
              </div>
              <div className="donut-legend-item" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span className="legend-color-dot" style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--status-red)" }} />
                <span style={{ fontWeight: 600 }}>Delayed ({projects.filter(p => p.status === "Delayed").length})</span>
              </div>
              <div className="donut-legend-item" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span className="legend-color-dot" style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--status-blue)" }} />
                <span style={{ fontWeight: 600 }}>Completed ({projects.filter(p => p.status === "Completed").length})</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
