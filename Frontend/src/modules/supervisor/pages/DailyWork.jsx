import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import { FileText, Camera } from "lucide-react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Textarea from "../../../components/Textarea";

export default function DailyWork() {
  const { currentUser, projects, dailyReports, submitDailyReport } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const assignedProjects = projects.filter(p => p.supervisors.includes(currentUser.id));
  
  // Pre-fill site ID if passed from Sites detail context
  const defaultProjectId = location.state && location.state.projectId 
    ? location.state.projectId 
    : (assignedProjects[0]?.id || "");

  const [projectId, setProjectId] = useState(defaultProjectId);
  const [dailyWorkForm, setDailyWorkForm] = useState({
    workType: "Earthwork",
    quantity: "",
    unit: "cum",
    description: "",
    remarks: ""
  });

  const handleDailyWorkSubmit = (e) => {
    e.preventDefault();
    if (!projectId) {
      alert("Please select a project site.");
      return;
    }

    const qty = parseFloat(dailyWorkForm.quantity);
    if (isNaN(qty) || qty <= 0) {
      alert("Please enter a valid positive quantity.");
      return;
    }

    submitDailyReport({
      projectId: parseInt(projectId),
      workDescription: `${dailyWorkForm.workType}: ${dailyWorkForm.description}`,
      progressDetails: `${qty} ${dailyWorkForm.unit}`,
      remarks: dailyWorkForm.remarks
    });

    // Reset Form & Navigate back
    setDailyWorkForm({
      workType: "Earthwork",
      quantity: "",
      unit: "cum",
      description: "",
      remarks: ""
    });
    alert("Daily Work Report submitted successfully!");
    navigate("/supervisor/home");
  };

  const workTypes = [
    { value: "Earthwork", label: "Earthwork (Excavation)" },
    { value: "GSB", label: "GSB Laying" },
    { value: "WMM", label: "WMM Compaction" },
    { value: "Drainage", label: "Drainage & Culvert" },
    { value: "Concrete", label: "Concrete casting" },
    { value: "Brickwork", label: "Brickwork partition" },
    { value: "Plaster", label: "Plastering" },
    { value: "Other", label: "Other / Miscellaneous" }
  ];

  const units = [
    { value: "cum", label: "cum (Cubic M)" },
    { value: "meters", label: "meters" },
    { value: "sqm", label: "sqm (Sq M)" },
    { value: "tons", label: "tons" },
    { value: "bags", label: "bags" },
    { value: "job", label: "job / lump-sum" }
  ];

  return (
    <div>
      <h3 style={{ fontSize: "15px", marginBottom: "12px" }}>Daily Work Entry</h3>
      <form onSubmit={handleDailyWorkSubmit}>
        <Select 
          label="Select Project Site" 
          id="w-proj" 
          value={projectId} 
          onChange={(e) => setProjectId(e.target.value)} 
          options={assignedProjects.map(p => ({ value: p.id, label: p.name }))}
          required
        />

        <Select 
          label="Work Type" 
          id="w-type" 
          value={dailyWorkForm.workType} 
          onChange={(e) => setDailyWorkForm({...dailyWorkForm, workType: e.target.value})} 
          options={workTypes}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <Input 
            label="Quantity Completed" 
            id="w-qty" 
            type="number"
            placeholder="e.g. 20"
            value={dailyWorkForm.quantity}
            onChange={(e) => setDailyWorkForm({...dailyWorkForm, quantity: e.target.value})}
            required 
          />

          <Select 
            label="Unit" 
            id="w-unit" 
            value={dailyWorkForm.unit} 
            onChange={(e) => setDailyWorkForm({...dailyWorkForm, unit: e.target.value})} 
            options={units}
          />
        </div>

        <Textarea 
          label="Description of Actions" 
          id="w-desc" 
          placeholder="Explain machine usage, levels, chains, layers spread..."
          value={dailyWorkForm.description}
          onChange={(e) => setDailyWorkForm({...dailyWorkForm, description: e.target.value})}
          required
        />

        <Input 
          label="Supervisor Remarks (Optional)" 
          id="w-rem" 
          placeholder="Weather status, general logs..."
          value={dailyWorkForm.remarks}
          onChange={(e) => setDailyWorkForm({...dailyWorkForm, remarks: e.target.value})}
        />

        <div className="form-group">
          <label>Attach Site Photo</label>
          <div className="file-upload-zone" onClick={() => alert("Demo Mode: Photo attachment selected.")}>
            <Camera size={24} className="file-upload-icon" />
            <div className="file-upload-text">Touch to open Camera</div>
            <div className="file-upload-subtext">Optional progress verification</div>
          </div>
        </div>

        <Button type="submit" variant="accent" block>
          Submit Today's Work
        </Button>
      </form>
    </div>
  );
}
