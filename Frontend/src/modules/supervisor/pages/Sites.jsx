import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import {
  MapPin,
  ChevronRight,
  FileText,
  Package,
  HardHat,
  IndianRupee,
  AlertTriangle,
  Camera,
  CheckSquare
} from "lucide-react";
import ProgressBar from "../../../components/ProgressBar";
import Badge from "../../../components/Badge";

export default function Sites() {
  const { id } = useParams();
  const { currentUser, projects, tasks } = useApp();
  const navigate = useNavigate();

  const assignedProjects = projects.filter(p => p.supervisors.includes(currentUser.id));

  // Render list of sites if no id parameter is in path
  if (!id) {
    return (
      <div>
        <h2 style={{ fontSize: "16px", marginBottom: "12px" }}>Assigned Project Sites</h2>
        {assignedProjects.map(p => (
          <div 
            key={p.id} 
            className="supervisor-card" 
            onClick={() => navigate(`/supervisor/sites/${p.id}`)}
            style={{ cursor: "pointer" }}
          >
            <h3>{p.name}</h3>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: "4px 0" }}>
              Client: {p.client}
            </p>
            <div style={{ marginTop: "10px" }}>
              <ProgressBar progress={p.progress} height="4px" variant="blue" />
            </div>
          </div>
        ))}
        {assignedProjects.length === 0 && (
          <div className="empty-state">
            <MapPin size={32} />
            <p>No project sites assigned by admin yet.</p>
          </div>
        )}
      </div>
    );
  }

  // Render specific site details page
  const activeProj = projects.find(p => p.id === parseInt(id));
  if (!activeProj) {
    return (
      <div className="empty-state">
        <MapPin size={32} />
        <p>Site not found or access denied.</p>
      </div>
    );
  }

  const siteTasks = tasks.filter(t => t.projectId === activeProj.id && t.supervisorId === currentUser.id);

  const handleTileClick = (path) => {
    // Navigate to form, passing project ID in state
    navigate(path, { state: { projectId: activeProj.id } });
  };

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <Badge variant="info" style={{ marginBottom: "6px" }}>{activeProj.type}</Badge>
        <h2 style={{ fontSize: "18px", color: "var(--color-primary)" }}>{activeProj.name}</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "12px" }}><MapPin size={12} /> {activeProj.location}</p>
      </div>

      {/* Actions Grid */}
      <h3 style={{ fontSize: "13px", marginBottom: "8px", color: "var(--text-secondary)" }}>Submit Daily Records</h3>
      <div className="mobile-site-sections">
        <div className="section-tile" onClick={() => handleTileClick("/supervisor/daily-work")}>
          <div className="section-tile-icon" style={{ backgroundColor: "#fff0e0", color: "#ff7a00" }}>
            <FileText size={18} />
          </div>
          <div className="section-tile-label">Daily Work</div>
        </div>
        <div className="section-tile" onClick={() => handleTileClick("/supervisor/materials")}>
          <div className="section-tile-icon" style={{ backgroundColor: "#e6f7fa", color: "#00b4d8" }}>
            <Package size={18} />
          </div>
          <div className="section-tile-label">Materials</div>
        </div>
        <div className="section-tile" onClick={() => handleTileClick("/supervisor/labour")}>
          <div className="section-tile-icon" style={{ backgroundColor: "#f0f4f9", color: "#0a1128" }}>
            <HardHat size={18} />
          </div>
          <div className="section-tile-label">Labour</div>
        </div>
        <div className="section-tile" onClick={() => handleTileClick("/supervisor/expenses")}>
          <div className="section-tile-icon" style={{ backgroundColor: "#fffbeb", color: "#f59e0b" }}>
            <IndianRupee size={18} />
          </div>
          <div className="section-tile-label">Expenses</div>
        </div>
        <div className="section-tile" onClick={() => handleTileClick("/supervisor/issues")}>
          <div className="section-tile-icon" style={{ backgroundColor: "#fef2f2", color: "#ef4444" }}>
            <AlertTriangle size={18} />
          </div>
          <div className="section-tile-label">Report Issue</div>
        </div>
        <div className="section-tile" onClick={() => handleTileClick("/supervisor/photos")}>
          <div className="section-tile-icon" style={{ backgroundColor: "#ecfdf5", color: "#10b981" }}>
            <Camera size={18} />
          </div>
          <div className="section-tile-label">Upload Photo</div>
        </div>
      </div>

      {/* Tasks on this site */}
      <h3 style={{ fontSize: "13px", marginTop: "24px", marginBottom: "8px", color: "var(--text-secondary)" }}>Active Tasks at this Site</h3>
      {siteTasks.map(t => {
        const percent = Math.round((t.completedQuantity / t.targetQuantity) * 100);
        return (
          <div key={t.id} className="supervisor-card" style={{ padding: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 600, fontSize: "13px" }}>{t.title}</span>
              <Badge variant={t.status === "Completed" ? "success" : "warning"}>{t.status}</Badge>
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", margin: "4px 0" }}>
              Target: {t.targetQuantity} {t.unit} • Completed: {t.completedQuantity} {t.unit} ({percent}%)
            </div>
            <div style={{ margin: "6px 0" }}>
              <ProgressBar progress={percent} height="4px" variant="blue" />
            </div>
            {t.status !== "Completed" && (
              <button 
                className="btn btn-secondary btn-sm" 
                style={{ width: "100%", padding: "2px", fontSize: "10px", marginTop: "6px" }}
                onClick={() => navigate(`/supervisor/tasks`, { state: { taskId: t.id } })}
              >
                Update progress
              </button>
            )}
          </div>
        );
      })}

      {siteTasks.length === 0 && (
        <div className="empty-state" style={{ padding: "12px" }}>
          <CheckSquare size={20} />
          <p style={{ fontSize: "11px" }}>No active tasks at this site.</p>
        </div>
      )}
    </div>
  );
}
