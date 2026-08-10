import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { HardHat } from "lucide-react";
import Table from "../../../components/Table";
import Badge from "../../../components/Badge";

export default function Labour() {
  const { labour, individualLabour, projects } = useApp();
  const [projectFilter, setProjectFilter] = useState("");

  const filteredLabour = labour.filter(l => {
    return !projectFilter || l.projectId === parseInt(projectFilter);
  });

  const filteredIndividual = individualLabour.filter(l => {
    return !projectFilter || l.projectId === parseInt(projectFilter);
  });

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h2>Labour Roll & Attendance</h2>
          <p>Daily manpower count, contractor wages, and supervisor roll-calls</p>
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

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "24px", alignItems: "start" }}>
        
        {/* Left: Aggregate counts */}
        <div>
          <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Daily Aggregate Counts</h3>
          <Table headers={["Date", "Project Site", "Masons", "Helpers", "Operators", "Electricians", "Others", "Total"]}>
            {filteredLabour.map(l => {
              const proj = projects.find(p => p.id === l.projectId);
              return (
                <tr key={l.id}>
                  <td>{l.date}</td>
                  <td>{proj ? proj.name : "Unknown"}</td>
                  <td>{l.masons}</td>
                  <td>{l.helpers}</td>
                  <td>{l.operators}</td>
                  <td>{l.electricians}</td>
                  <td>{l.others}</td>
                  <td style={{ fontWeight: 700 }}>{l.total} workers</td>
                </tr>
              );
            })}
            {filteredLabour.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px", color: "var(--text-light)" }}>
                  No labour logs found.
                </td>
              </tr>
            )}
          </Table>
        </div>

        {/* Right: Individual attendance roll call status */}
        <div>
          <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Individual Workers Register</h3>
          <Table headers={["Name", "Role", "Project Site", "Wage", "Attendance"]}>
            {filteredIndividual.map(l => {
              const proj = projects.find(p => p.id === l.projectId);
              return (
                <tr key={l.id}>
                  <td style={{ fontWeight: 600 }}>{l.name}</td>
                  <td>{l.role}</td>
                  <td>{proj ? proj.name.split(" ")[0] : "Unknown"}</td>
                  <td>₹{l.dailyWage}</td>
                  <td>
                    <Badge variant={l.attendance === "Present" ? "success" : "danger"}>
                      {l.attendance}
                    </Badge>
                  </td>
                </tr>
              );
            })}
            {filteredIndividual.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px", color: "var(--text-light)" }}>
                  No worker attendance logs.
                </td>
              </tr>
            )}
          </Table>
        </div>

      </div>
    </div>
  );
}
