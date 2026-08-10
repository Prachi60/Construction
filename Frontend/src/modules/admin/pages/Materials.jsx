import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { Package, AlertTriangle } from "lucide-react";
import Card from "../../../components/Card";
import Table from "../../../components/Table";
import Badge from "../../../components/Badge";

export default function Materials() {
  const { materials, projects } = useApp();
  const [projectFilter, setProjectFilter] = useState("");

  const filteredMaterials = materials.filter(m => {
    return !projectFilter || m.projectId === parseInt(projectFilter);
  });

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h2>Material Stock Register</h2>
          <p>Inventory, received quantities, and consumption audits across project sites</p>
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

      {/* Critical Stock Alerts banner */}
      {materials.filter(m => m.status === "Critical").length > 0 && (
        <div className="security-info" style={{ backgroundColor: "var(--color-danger-bg)", color: "var(--status-red-text)", border: "1px solid var(--status-red)", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold" }}>
            <AlertTriangle size={18} /> Attention Required: Critical Stock levels detected at active sites!
          </div>
        </div>
      )}

      <Table headers={["Material Name", "Project Site", "Opening Balance", "Received (+)", "Consumed (-)", "Current Stock Balance", "Unit", "Stock Status", "Last Updated"]}>
        {filteredMaterials.map(m => {
          const proj = projects.find(p => p.id === m.projectId);
          return (
            <tr key={m.id}>
              <td style={{ fontWeight: 600 }}>{m.name}</td>
              <td>{proj ? proj.name : "Unknown"}</td>
              <td>{m.opening}</td>
              <td style={{ color: "var(--status-green)", fontWeight: 600 }}>+{m.received}</td>
              <td style={{ color: "var(--status-red)", fontWeight: 600 }}>-{m.used}</td>
              <td style={{ fontWeight: 700 }}>{m.current}</td>
              <td>{m.unit}</td>
              <td>
                <Badge variant={m.status === "Good Stock" ? "success" : m.status === "Low Stock" ? "warning" : "danger"}>
                  {m.status}
                </Badge>
              </td>
              <td style={{ fontSize: "11px", color: "var(--text-light)" }}>{m.lastUpdated}</td>
            </tr>
          );
        })}
        {filteredMaterials.length === 0 && (
          <tr>
            <td colSpan="9" style={{ textAlign: "center", padding: "20px", color: "var(--text-light)" }}>
              No material records found.
            </td>
          </tr>
        )}
      </Table>
    </div>
  );
}
