import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import { CheckSquare } from "lucide-react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import ProgressBar from "../../../components/ProgressBar";
import Badge from "../../../components/Badge";

export default function Tasks() {
  const { currentUser, tasks, projects, updateTaskProgress } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const assignedTasks = tasks.filter(t => t.supervisorId === currentUser.id);

  // Read task selection from location state (redirect from Sites or list)
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [taskCompletedQty, setTaskCompletedQty] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    if (location.state && location.state.taskId) {
      setSelectedTaskId(location.state.taskId);
    }
  }, [location.state]);

  const activeTask = tasks.find(t => t.id === selectedTaskId);

  const handleTaskProgressSubmit = (e) => {
    e.preventDefault();
    if (!activeTask) return;

    const qty = parseFloat(taskCompletedQty);
    if (isNaN(qty) || qty <= 0) {
      alert("Please enter a valid positive quantity.");
      return;
    }

    updateTaskProgress(activeTask.id, qty, taskDescription);
    
    // Clear state & navigate back to list or site details
    setTaskCompletedQty("");
    setTaskDescription("");
    setSelectedTaskId(null);
    navigate(-1);
  };

  if (selectedTaskId && activeTask) {
    const proj = projects.find(p => p.id === activeTask.projectId);
    return (
      <div>
        <h3 style={{ fontSize: "15px", marginBottom: "12px" }}>Update Task Progress</h3>
        <div className="supervisor-card" style={{ padding: "12px", marginBottom: "16px" }}>
          <div style={{ fontWeight: 700, fontSize: "14px" }}>{activeTask.title}</div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
            Site: {proj ? proj.name : "Unknown"}<br />
            Target: {activeTask.targetQuantity} {activeTask.unit} • Previously completed: {activeTask.completedQuantity} {activeTask.unit}
          </div>
        </div>

        <form onSubmit={handleTaskProgressSubmit}>
          <Input 
            label={`Today's Completed Quantity (${activeTask.unit})`} 
            id="t-qty" 
            type="number"
            step="any"
            placeholder="e.g. 50"
            value={taskCompletedQty}
            onChange={(e) => setTaskCompletedQty(e.target.value)}
            required 
          />

          <Textarea 
            label="Work Description / Details" 
            id="t-desc" 
            placeholder="Explain what work was done to reach this quantity..."
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />

          <Button type="submit" variant="accent" block>
            Submit Progress
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            block 
            style={{ marginTop: "8px" }}
            onClick={() => setSelectedTaskId(null)}
          >
            Cancel
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: "16px", marginBottom: "12px" }}>Assigned Tasks</h2>
      {assignedTasks.map(t => {
        const proj = projects.find(p => p.id === t.projectId);
        const percent = Math.round((t.completedQuantity / t.targetQuantity) * 100);
        
        return (
          <div key={t.id} className="supervisor-card">
            <span className={`badge ${
              t.priority === "Critical" ? "badge-danger" :
              t.priority === "High" ? "badge-warning" : "badge-info"
            }`} style={{ marginBottom: "6px" }}>
              {t.priority}
            </span>
            <h3>{t.title}</h3>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "8px" }}>
              Site: {proj ? proj.name : "Unknown"}
            </p>

            <div className="supervisor-card-row">
              <span className="supervisor-card-row-label">Target:</span>
              <span className="supervisor-card-row-value">{t.targetQuantity} {t.unit}</span>
            </div>
            <div className="supervisor-card-row">
              <span className="supervisor-card-row-label">Completed:</span>
              <span className="supervisor-card-row-value">{t.completedQuantity} {t.unit}</span>
            </div>

            <div style={{ margin: "10px 0" }}>
              <ProgressBar progress={percent} height="4px" variant="blue" />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
              <Badge variant={t.status === "Completed" ? "success" : "warning"}>
                {t.status}
              </Badge>
              {t.status !== "Completed" && (
                <Button 
                  variant="accent" 
                  size="sm" 
                  onClick={() => setSelectedTaskId(t.id)}
                  style={{ padding: "4px 10px", fontSize: "11px" }}
                >
                  Update Progress
                </Button>
              )}
            </div>
          </div>
        );
      })}
      {assignedTasks.length === 0 && (
        <div className="empty-state">
          <CheckSquare size={32} />
          <p>No active tasks assigned to you.</p>
        </div>
      )}
    </div>
  );
}
