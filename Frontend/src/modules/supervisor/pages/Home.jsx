import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import { MapPin, ChevronRight } from "lucide-react";
import ProgressBar from "../../../components/ProgressBar";

export default function Home() {
  const { currentUser, projects, tasks, dailyReports } = useApp();
  const navigate = useNavigate();

  const assignedProjects = projects.filter(p => p.supervisors.includes(currentUser.id));
  const assignedTasks = tasks.filter(t => t.supervisorId === currentUser.id);

  // Today's date string matching dailyReports format
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayDateStr = `${yyyy}-${mm}-${dd}`;

  return (
    <div>
      {/* Summary widgets */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "24px" }}>
        <div className="supervisor-card" style={{ padding: "16px", margin: "0", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "85px" }}>
          <span style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.5px" }}>Assigned Tasks</span>
          <span style={{ fontSize: "24px", fontWeight: "800", color: "var(--color-primary)" }}>
            {assignedTasks.filter(t => t.status !== "Completed").length} <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>Pending</span>
          </span>
        </div>
        <div className="supervisor-card" style={{ padding: "16px", margin: "0", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "85px" }}>
          <span style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.5px" }}>Active Sites</span>
          <span style={{ fontSize: "24px", fontWeight: "800", color: "var(--color-accent)" }}>
            {assignedProjects.length} <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>Assigned</span>
          </span>
        </div>
      </div>

      <h3 style={{ fontSize: "13px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "14px", color: "var(--text-secondary)" }}>
        Assigned Project Sites
      </h3>
      
      {assignedProjects.map(p => {
        const todayReport = dailyReports.find(r => r.projectId === p.id && r.date === todayDateStr);
        const pendingTasksCount = tasks.filter(t => t.projectId === p.id && t.status !== "Completed").length;
        
        return (
          <div 
            key={p.id} 
            className="supervisor-card" 
            onClick={() => navigate(`/supervisor/sites/${p.id}`)}
            style={{ cursor: "pointer", padding: "18px", borderLeft: "5px solid var(--color-accent)", position: "relative" }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 800 }}>{p.name}</h3>
            <div className="supervisor-card-meta" style={{ marginTop: "4px" }}>
              <MapPin size={12} style={{ color: "var(--color-accent)" }} /> {p.location}
            </div>

            <div style={{ margin: "14px 0" }}>
              <ProgressBar progress={p.progress} label="Site Progress" height="5px" variant="success" />
            </div>

            <div className="supervisor-card-details">
              <div>
                <div style={{ color: "var(--text-muted)", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>Tasks Pending</div>
                <div style={{ fontWeight: 800, fontSize: "13px", color: "var(--text-secondary)", marginTop: "2px" }}>{pendingTasksCount} Tasks</div>
              </div>
              <div>
                <div style={{ color: "var(--text-muted)", fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>Today's DPR</div>
                <div style={{ fontWeight: 800, fontSize: "13px", marginTop: "2px", color: todayReport ? "var(--status-green)" : "var(--status-amber)" }}>
                  {todayReport ? "✓ Submitted" : "⚠️ Pending"}
                </div>
              </div>
            </div>

            <button 
              className="btn btn-secondary btn-sm btn-block" 
              style={{ marginTop: "14px", fontSize: "11px", padding: "6px 0", borderRadius: "10px", border: "1px solid #cbd5e1" }}
            >
              Open Site Control Panel <ChevronRight size={12} style={{ marginLeft: "4px" }} />
            </button>
          </div>
        );
      })}

      {assignedProjects.length === 0 && (
        <div className="empty-state" style={{ marginTop: "20px" }}>
          <MapPin size={32} />
          <p>No project sites assigned by contractor admin yet.</p>
        </div>
      )}
    </div>
  );
}
