import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { IndianRupee } from "lucide-react";
import Table from "../../../components/Table";
import Badge from "../../../components/Badge";
import Button from "../../../components/Button";

export default function Expenses() {
  const { expenses, projects, supervisors, approveExpense, rejectExpense } = useApp();
  const [projectFilter, setProjectFilter] = useState("");

  const filteredExpenses = expenses.filter(e => {
    return !projectFilter || e.projectId === parseInt(projectFilter);
  });

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h2>Expenses Auditing</h2>
          <p>Review, approve, and track project spends logged by supervisors</p>
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

      <Table headers={["Date", "Project Site", "Supervisor", "Category", "Amount", "Vendor Name", "Description", "Status", "Actions"]}>
        {filteredExpenses.map(e => {
          const proj = projects.find(p => p.id === e.projectId);
          const sup = supervisors.find(s => s.id === e.submittedBy);
          return (
            <tr key={e.id}>
              <td>{e.date}</td>
              <td style={{ fontWeight: 600 }}>{proj ? proj.name : "Unknown"}</td>
              <td>{sup ? sup.name : "Unknown"}</td>
              <td style={{ fontWeight: 600 }}>{e.category}</td>
              <td style={{ fontWeight: 700, color: "var(--color-primary)" }}>₹{e.amount.toLocaleString("en-IN")}</td>
              <td>{e.vendor}</td>
              <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>{e.description}</td>
              <td>
                <Badge variant={
                  e.status === "Approved" ? "success" : 
                  e.status === "Pending" ? "warning" : "danger"
                }>
                  {e.status}
                </Badge>
              </td>
              <td>
                {e.status === "Pending" ? (
                  <div style={{ display: "flex", gap: "4px" }}>
                    <Button variant="primary" size="xs" onClick={() => approveExpense(e.id)}>Approve</Button>
                    <Button variant="danger" size="xs" onClick={() => rejectExpense(e.id)}>Reject</Button>
                  </div>
                ) : (
                  <span style={{ fontSize: "11px", color: "var(--text-light)" }}>Actioned</span>
                )}
              </td>
            </tr>
          );
        })}
        {filteredExpenses.length === 0 && (
          <tr>
            <td colSpan="9" style={{ textAlign: "center", padding: "20px", color: "var(--text-light)" }}>
              No expenses records.
            </td>
          </tr>
        )}
      </Table>
    </div>
  );
}
