import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { AlertTriangle } from "lucide-react";
import Table from "../../../components/Table";
import Badge from "../../../components/Badge";
import Button from "../../../components/Button";

export default function Issues() {
  const { issues, projects, supervisors, updateIssueStatus } = useApp();
  const [projectFilter, setProjectFilter] = useState("");

  const filteredIssues = issues.filter(i => {
    return !projectFilter || i.projectId === parseInt(projectFilter);
  });

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h2>Site Issues Log</h2>
          <p>Track blockages, machinery breakdowns, and general safety alerts reported by supervisors</p>
        </div>
      </div>

      <div className="filters-panel">
        <div className="filter-group">
          <label>Filter by Project Site</label>
          <select 
            className="filter-select"
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
          >
            <option value="">-- All Projects --</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      <Table headers={["Date", "Project Site", "Supervisor", "Issue Title", "Description", "Priority", "Status", "Resolution Notes"]}>
        {filteredIssues.map(i => {
          const proj = projects.find(p => p.id === i.projectId);
          const sup = supervisors.find(s => s.id === i.reportedBy);
          return (
            <tr key={i.id}>
              <td>{i.date}</td>
              <td style={{ fontWeight: 600 }}>{proj ? proj.name : "Unknown"}</td>
              <td>{sup ? sup.name : "Unknown"}</td>
              <td style={{ fontWeight: 600 }}>{i.title}</td>
              <td>{i.description}</td>
              <td>
                <Badge variant={i.priority === "Critical" ? "danger" : i.priority === "High" ? "warning" : "info"}>
                  {i.priority}
                </Badge>
              </td>
              <td>
                <Badge variant={i.status === "Open" ? "danger" : i.status === "In Progress" ? "warning" : "success"}>
                  {i.status}
                </Badge>
              </td>
              <td>
                {i.status !== "Resolved" ? (
                  <div style={{ display: "flex", gap: "6px" }}>
                    <input 
                      type="text" 
                      placeholder="Resolution notes..." 
                      className="form-control"
                      style={{ padding: "2px 6px", fontSize: "11px", width: "150px" }}
                      id={`res-${i.id}`}
                    />
                    <Button 
                      variant="primary" 
                      size="xs" 
                      onClick={() => {
                        const text = document.getElementById(`res-${i.id}`).value;
                        updateIssueStatus(i.id, "Resolved", text || "Resolved by Admin");
                      }}
                    >
                      Resolve
                    </Button>
                  </div>
                ) : (
                  <span style={{ fontSize: "12px", color: "var(--status-green-text)", fontWeight: 500 }}>
                    {i.resolution}
                  </span>
                )}
              </td>
            </tr>
          );
        })}
        {filteredIssues.length === 0 && (
          <tr>
            <td colSpan="8" style={{ textAlign: "center", padding: "20px", color: "var(--text-light)" }}>
              No issues reported.
            </td>
          </tr>
        )}
      </Table>
    </div>
  );
}
