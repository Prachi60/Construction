import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";

export default function Labour() {
  const { currentUser, projects, individualLabour, submitLabourAttendance, updateIndividualLabourAttendance } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const assignedProjects = projects.filter(p => p.supervisors.includes(currentUser.id));
  
  const defaultProjectId = location.state && location.state.projectId 
    ? location.state.projectId 
    : (assignedProjects[0]?.id || "");

  const [projectId, setProjectId] = useState(defaultProjectId);
  const [labourTab, setLabourTab] = useState("aggregate"); // 'aggregate' | 'individual'
  
  const [labourForm, setLabourForm] = useState({
    masons: "",
    helpers: "",
    operators: "",
    electricians: "",
    others: ""
  });

  const handleLabourSubmit = (e) => {
    e.preventDefault();
    if (!projectId) {
      alert("Please select a project site.");
      return;
    }

    submitLabourAttendance({
      projectId: parseInt(projectId),
      masons: parseInt(labourForm.masons) || 0,
      helpers: parseInt(labourForm.helpers) || 0,
      operators: parseInt(labourForm.operators) || 0,
      electricians: parseInt(labourForm.electricians) || 0,
      others: parseInt(labourForm.others) || 0
    });

    setLabourForm({ masons: "", helpers: "", operators: "", electricians: "", others: "" });
    alert("Manpower log recorded successfully!");
    navigate("/supervisor/home");
  };

  const getHeadcountSum = () => {
    return (parseInt(labourForm.masons) || 0) + 
           (parseInt(labourForm.helpers) || 0) + 
           (parseInt(labourForm.operators) || 0) + 
           (parseInt(labourForm.electricians) || 0) + 
           (parseInt(labourForm.others) || 0);
  };

  return (
    <div>
      <h3 style={{ fontSize: "15px", marginBottom: "12px" }}>Log Labour Attendance</h3>
      
      {/* Tab select */}
      <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid var(--border-color)", marginBottom: "16px" }}>
        <button 
          type="button" 
          onClick={() => setLabourTab("aggregate")}
          style={{
            background: "none", border: "none", padding: "10px 4px", fontSize: "13px",
            fontWeight: 600, color: labourTab === "aggregate" ? "var(--color-accent)" : "var(--text-muted)",
            borderBottom: labourTab === "aggregate" ? "3px solid var(--color-accent)" : "3px solid transparent",
            flexGrow: 1, cursor: "pointer"
          }}
        >
          Aggregate Counts
        </button>
        <button 
          type="button" 
          onClick={() => setLabourTab("individual")}
          style={{
            background: "none", border: "none", padding: "10px 4px", fontSize: "13px",
            fontWeight: 600, color: labourTab === "individual" ? "var(--color-accent)" : "var(--text-muted)",
            borderBottom: labourTab === "individual" ? "3px solid var(--color-accent)" : "3px solid transparent",
            flexGrow: 1, cursor: "pointer"
          }}
        >
          Individual Roll Call
        </button>
      </div>

      <div className="form-group">
        <Select 
          label="Select Project Site" 
          id="l-proj" 
          value={projectId} 
          onChange={(e) => setProjectId(e.target.value)} 
          options={assignedProjects.map(p => ({ value: p.id, label: p.name }))}
          required
        />
      </div>

      {labourTab === "aggregate" ? (
        <form onSubmit={handleLabourSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <Input 
              label="Masons (Mistri)" 
              id="l-masons" 
              type="number"
              placeholder="e.g. 5" 
              value={labourForm.masons} 
              onChange={(e) => setLabourForm({...labourForm, masons: e.target.value})}
            />
            <Input 
              label="Helpers (Mazdoor)" 
              id="l-helpers" 
              type="number"
              placeholder="e.g. 15" 
              value={labourForm.helpers} 
              onChange={(e) => setLabourForm({...labourForm, helpers: e.target.value})}
            />
            <Input 
              label="Operators" 
              id="l-ops" 
              type="number"
              placeholder="e.g. 2" 
              value={labourForm.operators} 
              onChange={(e) => setLabourForm({...labourForm, operators: e.target.value})}
            />
            <Input 
              label="Electricians" 
              id="l-elec" 
              type="number"
              placeholder="e.g. 0" 
              value={labourForm.electricians} 
              onChange={(e) => setLabourForm({...labourForm, electricians: e.target.value})}
            />
            <div style={{ gridColumn: "1 / -1" }}>
              <Input 
                label="Others / Security" 
                id="l-others" 
                type="number"
                placeholder="e.g. 1" 
                value={labourForm.others} 
                onChange={(e) => setLabourForm({...labourForm, others: e.target.value})}
              />
            </div>
          </div>

          <div 
            style={{ 
              padding: "12px", backgroundColor: "var(--border-light)", 
              borderRadius: "var(--radius-md)", display: "flex", 
              justifyContent: "space-between", alignItems: "center", marginBottom: "16px", marginTop: "12px" 
            }}
          >
            <span style={{ fontWeight: 600, fontSize: "14px" }}>Total headcount:</span>
            <span style={{ fontWeight: 700, fontSize: "16px", color: "var(--color-primary)" }}>
              {getHeadcountSum()} workers
            </span>
          </div>

          <Button type="submit" variant="accent" block>Log Attendance Counts</Button>
        </form>
      ) : (
        <div>
          {individualLabour.filter(l => l.projectId === parseInt(projectId)).map(w => (
            <div 
              key={w.id} 
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center", 
                padding: "10px 14px", border: "1px solid var(--border-color)", 
                borderRadius: "var(--radius-md)", backgroundColor: "#fff", marginBottom: "8px"
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: "13px" }}>{w.name}</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{w.role} • Wage: ₹{w.dailyWage}</div>
              </div>
              
              <div style={{ display: "flex", gap: "6px" }}>
                <button 
                  onClick={() => updateIndividualLabourAttendance(w.id, "Present")}
                  className={`btn btn-sm ${w.attendance === "Present" ? "btn-primary" : "btn-secondary"}`}
                  style={{ padding: "4px 8px", fontSize: "11px" }}
                >
                  Present
                </button>
                <button 
                  onClick={() => updateIndividualLabourAttendance(w.id, "Absent")}
                  className={`btn btn-sm ${w.attendance === "Absent" ? "btn-danger" : "btn-secondary"}`}
                  style={{ padding: "4px 8px", fontSize: "11px" }}
                >
                  Absent
                </button>
              </div>
            </div>
          ))}

          {individualLabour.filter(l => l.projectId === parseInt(projectId)).length === 0 && (
            <div className="empty-state" style={{ padding: "20px" }}>
              <p style={{ fontSize: "12px" }}>No registered workers assigned to this site.</p>
            </div>
          )}
          
          <Button 
            onClick={() => {
              alert("Individual worker roll call saved locally.");
              navigate("/supervisor/home");
            }} 
            variant="accent"
            block
            style={{ marginTop: "16px" }}
          >
            Save Individual Roll Call
          </Button>
        </div>
      )}
    </div>
  );
}
