import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import { AlertTriangle } from "lucide-react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Textarea from "../../../components/Textarea";

export default function Issues() {
  const { currentUser, projects, reportIssue } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const assignedProjects = projects.filter(p => p.supervisors.includes(currentUser.id));
  
  const defaultProjectId = location.state && location.state.projectId 
    ? location.state.projectId 
    : (assignedProjects[0]?.id || "");

  const [projectId, setProjectId] = useState(defaultProjectId);
  const [issueForm, setIssueForm] = useState({
    title: "",
    priority: "Medium",
    description: ""
  });

  const handleIssueSubmit = (e) => {
    e.preventDefault();
    if (!projectId) {
      alert("Please select a project site.");
      return;
    }

    reportIssue({
      projectId: parseInt(projectId),
      title: issueForm.title,
      priority: issueForm.priority,
      description: issueForm.description
    });

    setIssueForm({ title: "", priority: "Medium", description: "" });
    alert("Site Blocker Issue reported to contractor dashboard!");
    navigate("/supervisor/home");
  };

  const priorities = [
    { value: "Low", label: "Low (General query / query details)" },
    { value: "Medium", label: "Medium (Minor site delay)" },
    { value: "High", label: "High (Action required soon)" },
    { value: "Critical", label: "Critical Blocker (Work completely stopped)" }
  ];

  return (
    <div>
      <h3 style={{ fontSize: "15px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px", color: "var(--status-red)" }}>
        <AlertTriangle size={18} /> Report Site Blocker / Issue
      </h3>
      
      <form onSubmit={handleIssueSubmit}>
        <Select 
          label="Select Project Site" 
          id="i-proj" 
          value={projectId} 
          onChange={(e) => setProjectId(e.target.value)} 
          options={assignedProjects.map(p => ({ value: p.id, label: p.name }))}
          required
        />

        <Input 
          label="Issue Title / Summary" 
          id="i-title" 
          placeholder="e.g. Roller Breakdown / Waterlogging"
          value={issueForm.title}
          onChange={(e) => setIssueForm({...issueForm, title: e.target.value})}
          required 
        />

        <Select 
          label="Issue Urgency" 
          id="i-pri" 
          value={issueForm.priority} 
          onChange={(e) => setIssueForm({...issueForm, priority: e.target.value})} 
          options={priorities}
        />

        <Textarea 
          label="Detailed Blocker Description" 
          id="i-desc" 
          placeholder="Provide detail on why the work is blocked or what machinery/utility is delayed..."
          value={issueForm.description}
          onChange={(e) => setIssueForm({...issueForm, description: e.target.value})}
          required
        />

        <Button type="submit" variant="danger" block>
          Broadcast Blocker Issue
        </Button>
      </form>
    </div>
  );
}
