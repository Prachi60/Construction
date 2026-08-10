import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { Plus, CheckSquare } from "lucide-react";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Table from "../../../components/Table";
import Modal from "../../../components/Modal";
import Badge from "../../../components/Badge";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Textarea from "../../../components/Textarea";
import ProgressBar from "../../../components/ProgressBar";

export default function Tasks() {
  const {
    tasks,
    projects,
    supervisors,
    addTask
  } = useApp();

  const [projectFilter, setProjectFilter] = useState("");
  const [supervisorFilter, setSupervisorFilter] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newTaskForm, setNewTaskForm] = useState({
    title: "", projectId: "", supervisorId: "", description: "", targetQuantity: "", unit: "cum",
    startDate: "", deadline: "", priority: "Medium", status: "Pending"
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    addTask({
      title: newTaskForm.title,
      projectId: parseInt(newTaskForm.projectId),
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
      title: "", projectId: "", supervisorId: "", description: "", targetQuantity: "", unit: "cum",
      startDate: "", deadline: "", priority: "Medium", status: "Pending"
    });
    setShowCreateModal(false);
  };

  const filteredTasks = tasks.filter(t => {
    const projMatch = !projectFilter || t.projectId === parseInt(projectFilter);
    const supMatch = !supervisorFilter || t.supervisorId === parseInt(supervisorFilter);
    return projMatch && supMatch;
  });

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
      <div className="page-header">
        <div className="page-title-group">
          <h2>Task Board</h2>
          <p>Task status, daily supervisor progress, and deadlines across sites</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowCreateModal(true)}>
          <Plus size={16} /> Assign Task
        </Button>
      </div>

      <div className="filters-panel">
        <div className="filter-group">
          <label>Filter by Project</label>
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

        <div className="filter-group">
          <label>Filter by Supervisor</label>
          <select 
            className="filter-select"
            value={supervisorFilter}
            onChange={(e) => setSupervisorFilter(e.target.value)}
          >
            <option value="">-- All Supervisors --</option>
            {supervisors.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      <Table headers={["Task Title", "Project Site", "Supervisor", "Target Qty", "Completed Qty", "Progress", "Priority", "Status", "Deadline"]}>
        {filteredTasks.map(t => {
          const proj = projects.find(p => p.id === t.projectId);
          const sup = supervisors.find(s => s.id === t.supervisorId);
          const percent = Math.round((t.completedQuantity / t.targetQuantity) * 100);
          return (
            <tr key={t.id}>
              <td style={{ fontWeight: 600 }}>{t.title}</td>
              <td>{proj ? proj.name : "Unknown"}</td>
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
                <Badge variant={
                  t.status === "Completed" ? "success" : 
                  t.status === "In Progress" ? "info" : 
                  t.status === "Delayed" ? "danger" : "warning"
                }>
                  {t.status}
                </Badge>
              </td>
              <td style={{ fontSize: "12px" }}>{t.deadline}</td>
            </tr>
          );
        })}
        {filteredTasks.length === 0 && (
          <tr>
            <td colSpan="9" style={{ textAlign: "center", padding: "20px", color: "var(--text-light)" }}>
              No tasks found.
            </td>
          </tr>
        )}
      </Table>

      {/* --- CREATE TASK MODAL --- */}
      <Modal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        title="Assign Work Task"
      >
        <form onSubmit={handleCreateTask}>
          <Input 
            label="Task Title" 
            id="t-title" 
            placeholder="e.g. Laying GSB Layer"
            value={newTaskForm.title} 
            onChange={(e) => setNewTaskForm({...newTaskForm, title: e.target.value})} 
            required 
          />

          <Select 
            label="Select Project Site" 
            id="t-proj" 
            value={newTaskForm.projectId} 
            onChange={(e) => setNewTaskForm({...newTaskForm, projectId: e.target.value})} 
            options={projects.map(p => ({ value: p.id, label: p.name }))}
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
              placeholder="e.g. cum"
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
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Assign Task</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
