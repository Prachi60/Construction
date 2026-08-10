import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import {
  Plus,
  MapPin,
  Image,
  AlertTriangle,
  HardHat,
  IndianRupee,
  FileText,
  Package,
  CheckSquare,
  Users,
  Download,
  FileSpreadsheet
} from "lucide-react";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Table from "../../../components/Table";
import Modal from "../../../components/Modal";
import ProgressBar from "../../../components/ProgressBar";
import Badge from "../../../components/Badge";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Textarea from "../../../components/Textarea";

export default function Projects() {
  const {
    projects,
    supervisors,
    tasks,
    dailyReports,
    materials,
    labour,
    individualLabour,
    expenses,
    issues,
    photos,
    selectedProjectId,
    setSelectedProjectId,
    
    // Actions
    addProject,
    addTask,
    approveDailyReport,
    approveExpense,
    rejectExpense,
    updateIssueStatus
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  
  // Project detail sub-tab: 'overview' | 'tasks' | 'daily' | 'materials' | 'labour' | 'expenses' | 'issues' | 'photos'
  const [detailTab, setDetailTab] = useState("overview");

  // Form states
  const [newProjectForm, setNewProjectForm] = useState({
    name: "", type: "Road", client: "", workOrderNumber: "", location: "",
    startDate: "", endDate: "", contractAmount: "", estimatedCost: "",
    description: "", status: "On Track", supervisors: []
  });

  const [newTaskForm, setNewTaskForm] = useState({
    title: "", supervisorId: "", description: "", targetQuantity: "", unit: "cum",
    startDate: "", deadline: "", priority: "Medium", status: "Pending"
  });

  const activeProject = projects.find(p => p.id === selectedProjectId);

  const handleCreateProject = (e) => {
    e.preventDefault();
    const contract = parseFloat(newProjectForm.contractAmount) || 0;
    const est = parseFloat(newProjectForm.estimatedCost) || 0;
    
    const pId = addProject({
      name: newProjectForm.name,
      type: newProjectForm.type,
      client: newProjectForm.client,
      workOrderNumber: newProjectForm.workOrderNumber,
      location: newProjectForm.location,
      startDate: newProjectForm.startDate,
      endDate: newProjectForm.endDate,
      contractAmount: contract,
      estimatedCost: est,
      description: newProjectForm.description,
      status: newProjectForm.status,
      supervisors: newProjectForm.supervisors.map(id => parseInt(id))
    });

    setNewProjectForm({
      name: "", type: "Road", client: "", workOrderNumber: "", location: "",
      startDate: "", endDate: "", contractAmount: "", estimatedCost: "",
      description: "", status: "On Track", supervisors: []
    });
    setShowCreateModal(false);
    setSelectedProjectId(pId);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    addTask({
      title: newTaskForm.title,
      projectId: selectedProjectId,
      supervisorId: parseInt(newTaskForm.supervisorId),
      description: newTaskForm.description,
      targetQuantity: parseFloat(newTaskForm.targetQuantity) || 0,
      unit: newTaskForm.unit,
      startDate: newTaskForm.startDate,
      deadline: newTaskForm.deadline,
      priority: newTaskForm.priority,
      status: newTaskForm.status
    });

    setNewTaskForm({
      title: "", supervisorId: "", description: "", targetQuantity: "", unit: "cum",
      startDate: "", deadline: "", priority: "Medium", status: "Pending"
    });
    setShowCreateTaskModal(false);
  };

  const projectTypes = [
    { value: "Road", label: "Road construction" },
    { value: "Building", label: "Building construction" },
    { value: "Bridge", label: "Bridge construction" },
    { value: "Infrastructure", label: "Government Infrastructure" }
  ];

  const priorities = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
    { value: "Critical", label: "Critical" }
  ];

  const statuses = [
    { value: "Pending", label: "Pending" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
    { value: "Delayed", label: "Delayed" }
  ];

  return (
    <div>
      {!selectedProjectId ? (
        /* PROJECTS LIST VIEW */
        <div>
          <div className="page-header">
            <div className="page-title-group">
              <h2>Projects & Sites</h2>
              <p>Active road construction, building, and PWD contract works</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setShowCreateModal(true)}>
              <Plus size={16} /> Create Project
            </Button>
          </div>

          {/* Search bar */}
          <div className="filters-panel">
            <div className="filter-group">
              <label>Search Name</label>
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="filter-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Grid Layout of Cards for mobile or Table for desktop */}
          <Table headers={["Project Name", "Type", "Location", "Contract Value", "Actual spent", "Supervisors", "Progress", "Status", "Actions"]}>
            {projects
              .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(p => {
                const sups = supervisors.filter(s => p.supervisors.includes(s.id));
                return (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 600 }}>
                      <a href="#view" onClick={(e) => { e.preventDefault(); setSelectedProjectId(p.id); setDetailTab("overview"); }}>
                        {p.name}
                      </a>
                    </td>
                    <td>{p.type}</td>
                    <td>{p.location}</td>
                    <td>₹{(p.contractAmount / 10000000).toFixed(2)} Cr</td>
                    <td style={{ color: p.actualExpenses > p.estimatedCost ? "var(--status-red)" : "inherit" }}>
                      ₹{(p.actualExpenses / 100000).toFixed(1)}L
                    </td>
                    <td>
                      {sups.length === 0 ? (
                        <span style={{ color: "var(--status-red)", fontSize: "11px" }}>No Supervisor</span>
                      ) : (
                        sups.map(s => s.name.split(" ")[0]).join(", ")
                      )}
                    </td>
                    <td>
                      <ProgressBar progress={p.progress} />
                    </td>
                    <td>
                      <Badge variant={
                        p.status === "On Track" ? "success" :
                        p.status === "Completed" ? "info" :
                        p.status === "At Risk" ? "warning" : "danger"
                      }>
                        {p.status}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="secondary" size="xs" onClick={() => { setSelectedProjectId(p.id); setDetailTab("overview"); }}>
                        Details
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </Table>
        </div>
      ) : (
        /* PROJECTS DETAIL VIEW */
        <div>
          <div style={{ marginBottom: "16px" }}>
            <Button variant="secondary" size="sm" onClick={() => setSelectedProjectId(null)}>
              ← Back to Projects list
            </Button>
          </div>

          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <Badge variant={
                  activeProject.status === "On Track" ? "success" :
                  activeProject.status === "Completed" ? "info" :
                  activeProject.status === "At Risk" ? "warning" : "danger"
                } style={{ marginBottom: "8px" }}>
                  {activeProject.status}
                </Badge>
                <h2 style={{ fontSize: "24px", color: "var(--color-primary)" }}>{activeProject.name}</h2>
                <div style={{ display: "flex", gap: "12px", color: "var(--text-muted)", fontSize: "13px", marginTop: "4px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <MapPin size={14} /> {activeProject.location}
                  </span>
                  <span>•</span>
                  <span>Client: {activeProject.client}</span>
                </div>
              </div>

              <div style={{ width: "200px" }}>
                <ProgressBar progress={activeProject.progress} label="Overall Progress" height="6px" variant="success" />
              </div>
            </div>

            {/* Project Tabs Header */}
            <div 
              style={{ 
                display: "flex", gap: "20px", borderBottom: "1px solid var(--border-color)", 
                marginTop: "24px", overflowX: "auto", paddingBottom: "2px" 
              }}
            >
              {[
                { id: "overview", label: "Overview" },
                { id: "tasks", label: "Tasks" },
                { id: "daily", label: "Daily Reports" },
                { id: "materials", label: "Materials" },
                { id: "labour", label: "Labour" },
                { id: "expenses", label: "Expenses" },
                { id: "issues", label: "Issues" },
                { id: "photos", label: "Photos" }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setDetailTab(t.id)}
                  style={{
                    background: "none", border: "none", padding: "10px 4px", fontSize: "13px",
                    fontWeight: 600, color: detailTab === t.id ? "var(--color-accent)" : "var(--text-muted)",
                    borderBottom: detailTab === t.id ? "3px solid var(--color-accent)" : "3px solid transparent",
                    cursor: "pointer", whiteSpace: "nowrap"
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab content renderer */}
            <div style={{ marginTop: "24px" }}>
              
              {/* Tab: Overview */}
              {detailTab === "overview" && (
                <div className="project-overview-grid">
                  <div>
                    <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Description / Scope of Work</h3>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "20px" }}>
                      {activeProject.description}
                    </p>

                    <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Assigned Supervisors</h3>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {supervisors.filter(s => activeProject.supervisors.includes(s.id)).map(s => (
                        <div 
                          key={s.id} 
                          style={{
                            display: "flex", alignItems: "center", gap: "8px", border: "1px solid var(--border-color)",
                            padding: "6px 12px", borderRadius: "var(--radius-md)", backgroundColor: "#fff", fontSize: "13px"
                          }}
                        >
                          <div className="admin-avatar" style={{ width: "24px", height: "24px", fontSize: "10px" }}>
                            {s.name.substring(0, 1)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{s.name}</div>
                            <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{s.phone}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div 
                    style={{ 
                      backgroundColor: "var(--border-light)", padding: "16px", 
                      borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)",
                      display: "flex", flexDirection: "column", gap: "16px" 
                    }}
                  >
                    <div className="details-item">
                      <span className="details-label">Work Order Number</span>
                      <span className="details-val">{activeProject.workOrderNumber}</span>
                    </div>
                    <div className="details-item">
                      <span className="details-label">Contract Amount</span>
                      <span className="details-val" style={{ color: "var(--color-primary)", fontWeight: 700 }}>
                        ₹{(activeProject.contractAmount / 10000000).toFixed(2)} Cr
                      </span>
                    </div>
                    <div className="details-item">
                      <span className="details-label">Estimated Cost</span>
                      <span className="details-val">₹{(activeProject.estimatedCost / 10000000).toFixed(2)} Cr</span>
                    </div>
                    <div className="details-item">
                      <span className="details-label">Actual Spent</span>
                      <span className="details-val" style={{ color: activeProject.actualExpenses > activeProject.estimatedCost ? "var(--status-red)" : "var(--status-green)", fontWeight: 700 }}>
                        ₹{(activeProject.actualExpenses / 100000).toFixed(1)} Lakhs
                      </span>
                    </div>
                    <div className="details-item">
                      <span className="details-label">Timeline</span>
                      <span className="details-val" style={{ fontSize: "13px" }}>
                        {activeProject.startDate} to {activeProject.endDate}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Tasks */}
              {detailTab === "tasks" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", alignItems: "center" }}>
                    <h3 style={{ fontSize: "16px" }}>Project Work Tasks</h3>
                    <Button variant="primary" size="sm" onClick={() => setShowCreateTaskModal(true)}>
                      <Plus size={14} /> Add Task
                    </Button>
                  </div>
                  <Table headers={["Task Title", "Supervisor", "Target", "Completed", "Progress", "Priority", "Status"]}>
                    {tasks.filter(t => t.projectId === activeProject.id).map(t => {
                      const sup = supervisors.find(s => s.id === t.supervisorId);
                      const percent = Math.round((t.completedQuantity / t.targetQuantity) * 100);
                      return (
                        <tr key={t.id}>
                          <td style={{ fontWeight: 600 }}>{t.title}</td>
                          <td>{sup ? sup.name : "Unassigned"}</td>
                          <td>{t.targetQuantity} {t.unit}</td>
                          <td>{t.completedQuantity} {t.unit}</td>
                          <td>
                            <ProgressBar progress={percent} />
                          </td>
                          <td>
                            <Badge variant={t.priority === "Critical" ? "danger" : t.priority === "High" ? "warning" : "info"}>
                              {t.priority}
                            </Badge>
                          </td>
                          <td>
                            <Badge variant={t.status === "Completed" ? "success" : t.status === "In Progress" ? "info" : t.status === "Delayed" ? "danger" : "warning"}>
                              {t.status}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </Table>
                </div>
              )}

              {/* Tab: Daily Reports */}
              {detailTab === "daily" && (
                <Table headers={["Date", "Supervisor", "Work Description", "Quantities", "Status", "Action"]}>
                  {dailyReports.filter(r => r.projectId === activeProject.id).map(r => {
                    const sup = supervisors.find(s => s.id === r.supervisorId);
                    return (
                      <tr key={r.id}>
                        <td>{r.date}</td>
                        <td>{sup ? sup.name : "Unknown"}</td>
                        <td style={{ maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis" }}>{r.workDescription}</td>
                        <td>{r.progressDetails}</td>
                        <td>
                          <Badge variant={r.status === "Approved" ? "success" : "warning"}>
                            {r.status}
                          </Badge>
                        </td>
                        <td>
                          {r.status === "Pending" ? (
                            <Button variant="primary" size="xs" onClick={() => approveDailyReport(r.id)}>
                              Approve
                            </Button>
                          ) : (
                            <span style={{ color: "var(--text-light)", fontSize: "11px" }}>No action</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {dailyReports.filter(r => r.projectId === activeProject.id).length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", padding: "20px", color: "var(--text-light)" }}>
                        No reports found.
                      </td>
                    </tr>
                  )}
                </Table>
              )}

              {/* Tab: Materials */}
              {detailTab === "materials" && (
                <Table headers={["Material Name", "Opening Bal", "Received (+)", "Consumed (-)", "Current Stock", "Unit", "Status", "Last Updated"]}>
                  {materials.filter(m => m.projectId === activeProject.id).map(m => (
                    <tr key={m.id}>
                      <td style={{ fontWeight: 600 }}>{m.name}</td>
                      <td>{m.opening}</td>
                      <td style={{ color: "var(--status-green)" }}>+{m.received}</td>
                      <td style={{ color: "var(--status-red)" }}>-{m.used}</td>
                      <td style={{ fontWeight: 700 }}>{m.current}</td>
                      <td>{m.unit}</td>
                      <td>
                        <Badge variant={m.status === "Good Stock" ? "success" : m.status === "Low Stock" ? "warning" : "danger"}>
                          {m.status}
                        </Badge>
                      </td>
                      <td style={{ fontSize: "11px", color: "var(--text-muted)" }}>{m.lastUpdated}</td>
                    </tr>
                  ))}
                </Table>
              )}

              {/* Tab: Labour */}
              {detailTab === "labour" && (
                <div>
                  <h3 style={{ fontSize: "15px", marginBottom: "12px" }}>Daily Labour Roll Call</h3>
                  <Table headers={["Date", "Masons", "Helpers", "Operators", "Electricians", "Others", "Total Workers"]}>
                    {labour.filter(l => l.projectId === activeProject.id).map(l => (
                      <tr key={l.id}>
                        <td>{l.date}</td>
                        <td>{l.masons}</td>
                        <td>{l.helpers}</td>
                        <td>{l.operators}</td>
                        <td>{l.electricians}</td>
                        <td>{l.others}</td>
                        <td style={{ fontWeight: 700 }}>{l.total} workers</td>
                      </tr>
                    ))}
                  </Table>

                  <h3 style={{ fontSize: "15px", marginTop: "24px", marginBottom: "12px" }}>Individual Workers Register</h3>
                  <Table headers={["Name", "Role", "Daily Wage", "Today's Attendance"]}>
                    {individualLabour.filter(l => l.projectId === activeProject.id).map(l => (
                      <tr key={l.id}>
                        <td>{l.name}</td>
                        <td>{l.role}</td>
                        <td>₹{l.dailyWage}</td>
                        <td>
                          <Badge variant={l.attendance === "Present" ? "success" : "danger"}>
                            {l.attendance}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </Table>
                </div>
              )}

              {/* Tab: Expenses */}
              {detailTab === "expenses" && (
                <Table headers={["Date", "Category", "Amount", "Vendor", "Description", "Status", "Actions"]}>
                  {expenses.filter(e => e.projectId === activeProject.id).map(e => (
                    <tr key={e.id}>
                      <td>{e.date}</td>
                      <td style={{ fontWeight: 600 }}>{e.category}</td>
                      <td style={{ fontWeight: 700 }}>₹{e.amount.toLocaleString("en-IN")}</td>
                      <td>{e.vendor}</td>
                      <td>{e.description}</td>
                      <td>
                        <Badge variant={e.status === "Approved" ? "success" : e.status === "Pending" ? "warning" : "danger"}>
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
                  ))}
                </Table>
              )}

              {/* Tab: Issues */}
              {detailTab === "issues" && (
                <Table headers={["Date", "Issue Title", "Description", "Priority", "Status", "Resolution"]}>
                  {issues.filter(i => i.projectId === activeProject.id).map(i => (
                    <tr key={i.id}>
                      <td>{i.date}</td>
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
                              style={{ padding: "2px 6px", fontSize: "11px", width: "120px" }}
                              id={`proj-res-${i.id}`}
                            />
                            <Button 
                              variant="primary" 
                              size="xs" 
                              onClick={() => {
                                const text = document.getElementById(`proj-res-${i.id}`).value;
                                updateIssueStatus(i.id, "Resolved", text || "Resolved by Admin");
                              }}
                            >
                              Resolve
                            </Button>
                          </div>
                        ) : (
                          <span style={{ fontSize: "12px", color: "var(--status-green-text)" }}>{i.resolution}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </Table>
              )}

              {/* Tab: Photos */}
              {detailTab === "photos" && (
                <div className="photo-gallery">
                  {photos.filter(p => p.projectId === activeProject.id).map(photo => (
                    <div key={photo.id} className="photo-card">
                      <div className="photo-thumbnail-container">
                        <div className="photo-category-tag">{photo.category}</div>
                        <div className="photo-thumbnail-placeholder">
                          <Image size={24} />
                          <span>[ Site Media Preview ]</span>
                        </div>
                      </div>
                      <div className="photo-info">
                        <div className="photo-desc">{photo.description}</div>
                        <div className="photo-meta">Logged: {photo.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </Card>
        </div>
      )}

      {/* --- CREATE PROJECT MODAL --- */}
      <Modal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        title="Create New Project Site"
        size="large"
      >
        <form onSubmit={handleCreateProject}>
          <div className="modal-form-grid">
            <div style={{ gridColumn: "1 / -1" }}>
              <Input 
                label="Project Name" 
                id="p-name" 
                value={newProjectForm.name} 
                onChange={(e) => setNewProjectForm({...newProjectForm, name: e.target.value})} 
                required 
              />
            </div>
            
            <Select 
              label="Project Type" 
              id="p-type" 
              value={newProjectForm.type} 
              onChange={(e) => setNewProjectForm({...newProjectForm, type: e.target.value})} 
              options={projectTypes}
            />

            <Input 
              label="Client / Dept" 
              id="p-client" 
              value={newProjectForm.client} 
              onChange={(e) => setNewProjectForm({...newProjectForm, client: e.target.value})} 
              required 
            />

            <Input 
              label="Work Order Number" 
              id="p-wo" 
              value={newProjectForm.workOrderNumber} 
              onChange={(e) => setNewProjectForm({...newProjectForm, workOrderNumber: e.target.value})} 
            />

            <Input 
              label="Location" 
              id="p-loc" 
              value={newProjectForm.location} 
              onChange={(e) => setNewProjectForm({...newProjectForm, location: e.target.value})} 
              required 
            />

            <Input 
              label="Contract Amount (INR ₹)" 
              id="p-amount" 
              type="number"
              value={newProjectForm.contractAmount} 
              onChange={(e) => setNewProjectForm({...newProjectForm, contractAmount: e.target.value})} 
              required 
            />

            <Input 
              label="Estimated Cost (INR ₹)" 
              id="p-est" 
              type="number"
              value={newProjectForm.estimatedCost} 
              onChange={(e) => setNewProjectForm({...newProjectForm, estimatedCost: e.target.value})} 
              required 
            />

            <Input 
              label="Start Date" 
              id="p-start" 
              type="date"
              value={newProjectForm.startDate} 
              onChange={(e) => setNewProjectForm({...newProjectForm, startDate: e.target.value})} 
            />

            <Input 
              label="End Date" 
              id="p-end" 
              type="date"
              value={newProjectForm.endDate} 
              onChange={(e) => setNewProjectForm({...newProjectForm, endDate: e.target.value})} 
            />

            <div style={{ gridColumn: "1 / -1" }}>
              <Textarea 
                label="Scope / Scope Details" 
                id="p-desc" 
                value={newProjectForm.description} 
                onChange={(e) => setNewProjectForm({...newProjectForm, description: e.target.value})} 
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: 600 }}>Assign Supervisors</label>
              <div className="checkbox-grid">
                {supervisors.map(s => (
                  <label key={s.id} className="checkbox-label" style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginRight: "16px", cursor: "pointer" }}>
                    <input 
                      type="checkbox" 
                      value={s.id} 
                      checked={newProjectForm.supervisors.includes(s.id.toString())}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const val = e.target.value;
                        setNewProjectForm(prev => {
                          const sups = checked 
                            ? [...prev.supervisors, val] 
                            : prev.supervisors.filter(id => id !== val);
                          return { ...prev, supervisors: sups };
                        });
                      }}
                    />
                    {s.name}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer" style={{ marginTop: "16px" }}>
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Create Project</Button>
          </div>
        </form>
      </Modal>

      {/* --- CREATE TASK MODAL --- */}
      <Modal 
        isOpen={showCreateTaskModal} 
        onClose={() => setShowCreateTaskModal(false)}
        title="Assign New Task"
      >
        <form onSubmit={handleCreateTask}>
          <Input 
            label="Task Title" 
            id="t-title" 
            value={newTaskForm.title} 
            onChange={(e) => setNewTaskForm({...newTaskForm, title: e.target.value})} 
            required 
          />

          <Select 
            label="Assign Supervisor" 
            id="t-sup" 
            value={newTaskForm.supervisorId} 
            onChange={(e) => setNewTaskForm({...newTaskForm, supervisorId: e.target.value})} 
            options={supervisors.map(s => ({ value: s.id, label: s.name }))}
            required
          />

          <div className="modal-form-grid">
            <Input 
              label="Target Quantity" 
              id="t-qty" 
              type="number"
              value={newTaskForm.targetQuantity} 
              onChange={(e) => setNewTaskForm({...newTaskForm, targetQuantity: e.target.value})} 
              required 
            />
            <Input 
              label="Unit" 
              id="t-unit" 
              value={newTaskForm.unit} 
              onChange={(e) => setNewTaskForm({...newTaskForm, unit: e.target.value})} 
              required 
            />
          </div>

          <div className="modal-form-grid">
            <Input 
              label="Start Date" 
              id="t-start" 
              type="date"
              value={newTaskForm.startDate} 
              onChange={(e) => setNewTaskForm({...newTaskForm, startDate: e.target.value})} 
            />
            <Input 
              label="Deadline" 
              id="t-end" 
              type="date"
              value={newTaskForm.deadline} 
              onChange={(e) => setNewTaskForm({...newTaskForm, deadline: e.target.value})} 
              required 
            />
          </div>

          <div className="modal-form-grid">
            <Select 
              label="Priority" 
              id="t-priority" 
              value={newTaskForm.priority} 
              onChange={(e) => setNewTaskForm({...newTaskForm, priority: e.target.value})} 
              options={priorities}
            />
            <Select 
              label="Status" 
              id="t-status" 
              value={newTaskForm.status} 
              onChange={(e) => setNewTaskForm({...newTaskForm, status: e.target.value})} 
              options={statuses}
            />
          </div>

          <Textarea 
            label="Work Details" 
            id="t-desc" 
            value={newTaskForm.description} 
            onChange={(e) => setNewTaskForm({...newTaskForm, description: e.target.value})} 
          />

          <div className="modal-footer" style={{ marginTop: "16px" }}>
            <Button variant="secondary" onClick={() => setShowCreateTaskModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Assign Task</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
