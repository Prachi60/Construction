import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import {
  Plus,
  Phone,
  Mail,
  Clock,
  Calendar
} from "lucide-react";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Table from "../../../components/Table";
import Modal from "../../../components/Modal";
import Badge from "../../../components/Badge";
import Input from "../../../components/Input";
import Select from "../../../components/Select";

export default function Supervisors() {
  const {
    supervisors,
    projects,
    dailyReports,
    expenses,
    issues,
    selectedSupervisorId,
    setSelectedSupervisorId,
    
    // Actions
    addSupervisor,
    setSupervisorStatus,
    assignSupervisorToProject,
    removeSupervisorFromProject
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newSupervisorForm, setNewSupervisorForm] = useState({
    name: "", username: "", phone: "", email: "", password: "", confirmPassword: "", status: "Active"
  });

  const activeSupervisor = supervisors.find(s => s.id === selectedSupervisorId);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (newSupervisorForm.password !== newSupervisorForm.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    addSupervisor({
      name: newSupervisorForm.name,
      username: newSupervisorForm.username,
      phone: newSupervisorForm.phone,
      email: newSupervisorForm.email,
      status: newSupervisorForm.status
    });

    setNewSupervisorForm({
      name: "", username: "", phone: "", email: "", password: "", confirmPassword: "", status: "Active"
    });
    setShowCreateModal(false);
  };

  return (
    <div>
      {!selectedSupervisorId ? (
        /* SUPERVISOR LIST VIEW */
        <div>
          <div className="page-header">
            <div className="page-title-group">
              <h2>Supervisors Management</h2>
              <p>Field managers assigned to various project locations</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setShowCreateModal(true)}>
              <Plus size={16} /> Add Supervisor
            </Button>
          </div>

          <div className="filters-panel">
            <div className="filter-group">
              <label>Search Name</label>
              <input 
                type="text" 
                placeholder="Search supervisors..." 
                className="filter-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Table headers={["Name", "Username", "Phone", "Email", "Assigned Sites", "Last Login", "Status", "Actions"]}>
            {supervisors
              .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(s => {
                const assignedProjects = projects.filter(p => p.supervisors.includes(s.id));
                return (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 600 }}>
                      <a href="#view" onClick={(e) => { e.preventDefault(); setSelectedSupervisorId(s.id); }}>
                        {s.name}
                      </a>
                    </td>
                    <td><code>{s.username}</code></td>
                    <td>{s.phone}</td>
                    <td>{s.email}</td>
                    <td>
                      {assignedProjects.length === 0 ? (
                        <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>None</span>
                      ) : (
                        assignedProjects.map(p => p.name.split(" ")[0]).join(", ")
                      )}
                    </td>
                    <td>{s.lastLogin}</td>
                    <td>
                      <Badge variant={s.status === "Active" ? "success" : "danger"}>
                        {s.status}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="secondary" size="xs" onClick={() => setSelectedSupervisorId(s.id)}>
                        Activities
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </Table>
        </div>
      ) : (
        /* SUPERVISOR DETAIL VIEW */
        <div>
          <div style={{ marginBottom: "16px" }}>
            <Button variant="secondary" size="sm" onClick={() => setSelectedSupervisorId(null)}>
              ← Back to Supervisors list
            </Button>
          </div>

          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <div className="admin-avatar" style={{ width: "50px", height: "50px", fontSize: "20px" }}>
                  {activeSupervisor.name.substring(0, 1)}
                </div>
                <div>
                  <h2 style={{ fontSize: "22px" }}>{activeSupervisor.name}</h2>
                  <p style={{ color: "var(--text-muted)", fontSize: "13px", marginTop: "4px" }}>
                    Username: <code>{activeSupervisor.username}</code> • Status: 
                    <Badge variant={activeSupervisor.status === "Active" ? "success" : "danger"} style={{ marginLeft: "8px" }}>
                      {activeSupervisor.status}
                    </Badge>
                  </p>
                </div>
              </div>

              <div>
                {activeSupervisor.status === "Active" ? (
                  <Button variant="danger" size="sm" onClick={() => setSupervisorStatus(activeSupervisor.id, "Inactive")}>
                    Deactivate
                  </Button>
                ) : (
                  <Button variant="primary" size="sm" onClick={() => setSupervisorStatus(activeSupervisor.id, "Active")}>
                    Activate
                  </Button>
                )}
              </div>
            </div>

            <div className="details-grid" style={{ marginTop: "24px", padding: "16px", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
              <div className="details-item">
                <span className="details-label"><Phone size={12} /> Contact Mobile</span>
                <span className="details-val">{activeSupervisor.phone}</span>
              </div>
              <div className="details-item">
                <span className="details-label"><Mail size={12} /> Email Address</span>
                <span className="details-val">{activeSupervisor.email}</span>
              </div>
              <div className="details-item">
                <span className="details-label"><Clock size={12} /> Last Active</span>
                <span className="details-val">{activeSupervisor.lastActivity}</span>
              </div>
              <div className="details-item">
                <span className="details-label"><Calendar size={12} /> Last Login</span>
                <span className="details-val">{activeSupervisor.lastLogin}</span>
              </div>
            </div>

            <h3 style={{ fontSize: "16px", marginTop: "24px", marginBottom: "12px" }}>Assigned Sites</h3>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
              {projects.filter(p => p.supervisors.includes(activeSupervisor.id)).map(p => (
                <div 
                  key={p.id} 
                  style={{
                    border: "1px solid var(--border-color)", padding: "10px 14px", borderRadius: "var(--radius-md)",
                    backgroundColor: "#fff", display: "flex", alignItems: "center", gap: "12px", width: "300px", justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "13px" }}>{p.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{p.location}</div>
                  </div>
                  <Button 
                    variant="danger" 
                    size="xs"
                    onClick={() => removeSupervisorFromProject(p.id, activeSupervisor.id)}
                    style={{ padding: "2px 6px", fontSize: "11px" }}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <div 
                style={{
                  border: "1px dashed var(--border-color)", padding: "10px 14px", borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--bg-main)", display: "flex", alignItems: "center", gap: "10px", width: "300px"
                }}
              >
                <select 
                  id={`assign-proj-select-${activeSupervisor.id}`} 
                  className="form-control" 
                  style={{ padding: "4px 8px", fontSize: "12px", flexGrow: 1 }}
                >
                  <option value="">-- Assign Site --</option>
                  {projects.filter(p => !p.supervisors.includes(activeSupervisor.id)).map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <Button 
                  variant="primary" 
                  size="xs"
                  onClick={() => {
                    const selectEl = document.getElementById(`assign-proj-select-${activeSupervisor.id}`);
                    const val = selectEl.value;
                    if (val) {
                      assignSupervisorToProject(parseInt(val), activeSupervisor.id);
                      selectEl.value = "";
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </div>

            <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Activities Submitted</h3>
            <Table headers={["Date", "Entry Type", "Details", "Status"]}>
              {dailyReports.filter(r => r.supervisorId === activeSupervisor.id).map(r => (
                <tr key={r.id}>
                  <td>{r.date}</td>
                  <td><Badge variant="info">DAILY WORK</Badge></td>
                  <td>{r.workDescription}</td>
                  <td><Badge variant={r.status === "Approved" ? "success" : "warning"}>{r.status}</Badge></td>
                </tr>
              ))}
              {expenses.filter(e => e.submittedBy === activeSupervisor.id).map(e => (
                <tr key={e.id}>
                  <td>{e.date}</td>
                  <td><Badge variant="warning">EXPENSE</Badge></td>
                  <td>₹{e.amount.toLocaleString("en-IN")} for {e.category} to {e.vendor}</td>
                  <td><Badge variant={e.status === "Approved" ? "success" : e.status === "Pending" ? "warning" : "danger"}>{e.status}</Badge></td>
                </tr>
              ))}
              {issues.filter(i => i.reportedBy === activeSupervisor.id).map(i => (
                <tr key={i.id}>
                  <td>{i.date}</td>
                  <td><Badge variant="danger">ISSUE REPORT</Badge></td>
                  <td>{i.title}: {i.description}</td>
                  <td><Badge variant={i.status === "Resolved" ? "success" : "danger"}>{i.status}</Badge></td>
                </tr>
              ))}
            </Table>
          </Card>
        </div>
      )}

      {/* --- CREATE SUPERVISOR MODAL --- */}
      <Modal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        title="Create Supervisor Account"
      >
        <form onSubmit={handleCreateSubmit}>
          <div className="security-info" style={{ marginBottom: "12px" }}>
            Field supervisors cannot register themselves. You, as the Contractor Admin, create their login credentials here.
          </div>
          <Input 
            label="Full Name" 
            id="s-name" 
            placeholder="e.g. Rahul Sharma"
            value={newSupervisorForm.name} 
            onChange={(e) => setNewSupervisorForm({...newSupervisorForm, name: e.target.value})} 
            required 
          />
          <Input 
            label="Mobile Number" 
            id="s-phone" 
            placeholder="e.g. +91 9988776655"
            value={newSupervisorForm.phone} 
            onChange={(e) => setNewSupervisorForm({...newSupervisorForm, phone: e.target.value})} 
            required 
          />
          <Input 
            label="Email Address" 
            id="s-email" 
            type="email"
            placeholder="e.g. rahul@prachi.com"
            value={newSupervisorForm.email} 
            onChange={(e) => setNewSupervisorForm({...newSupervisorForm, email: e.target.value})} 
            required 
          />
          <Input 
            label="Login Username" 
            id="s-username" 
            placeholder="e.g. rahul"
            value={newSupervisorForm.username} 
            onChange={(e) => setNewSupervisorForm({...newSupervisorForm, username: e.target.value.toLowerCase()})} 
            required 
          />
          <div className="modal-form-grid">
            <Input 
              label="Password" 
              id="s-pass" 
              type="password"
              placeholder="••••••••"
              value={newSupervisorForm.password} 
              onChange={(e) => setNewSupervisorForm({...newSupervisorForm, password: e.target.value})} 
              required 
            />
            <Input 
              label="Confirm Password" 
              id="s-conf" 
              type="password"
              placeholder="••••••••"
              value={newSupervisorForm.confirmPassword} 
              onChange={(e) => setNewSupervisorForm({...newSupervisorForm, confirmPassword: e.target.value})} 
              required 
            />
          </div>
          <div className="modal-footer" style={{ marginTop: "16px" }}>
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Create Supervisor</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
