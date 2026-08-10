import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import { Camera, Image } from "lucide-react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";

export default function Photos() {
  const { currentUser, projects, uploadSitePhoto } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const assignedProjects = projects.filter(p => p.supervisors.includes(currentUser.id));
  
  const defaultProjectId = location.state && location.state.projectId 
    ? location.state.projectId 
    : (assignedProjects[0]?.id || "");

  const [projectId, setProjectId] = useState(defaultProjectId);
  const [photoForm, setPhotoForm] = useState({
    category: "Progress Verification",
    description: ""
  });

  const handlePhotoSubmit = (e) => {
    e.preventDefault();
    if (!projectId) {
      alert("Please select a project site.");
      return;
    }

    uploadSitePhoto({
      projectId: parseInt(projectId),
      category: photoForm.category,
      description: photoForm.description,
      photoUrl: "" // In demo mode, this gets mock-allocated on the backend
    });

    setPhotoForm({ category: "Progress Verification", description: "" });
    alert("Site progress photo uploaded successfully to document vault!");
    navigate("/supervisor/home");
  };

  const photoCategories = [
    { value: "Progress Verification", label: "Progress Verification (General)" },
    { value: "Material Receipt", label: "Material Receipt (Receipt copy/unloading)" },
    { value: "Labour Attendance", label: "Labour Attendance (Roll call proof)" },
    { value: "Expense Voucher", label: "Expense Voucher (Cash invoice)" },
    { value: "Site Blocker/Issue", label: "Site Blocker/Issue (Breakdown/Flood)" }
  ];

  return (
    <div>
      <h3 style={{ fontSize: "15px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
        <Image size={18} /> Upload Progress Photo
      </h3>
      
      <form onSubmit={handlePhotoSubmit}>
        <Select 
          label="Select Project Site" 
          id="p-proj" 
          value={projectId} 
          onChange={(e) => setProjectId(e.target.value)} 
          options={assignedProjects.map(p => ({ value: p.id, label: p.name }))}
          required
        />

        <Select 
          label="Photo Purpose / Category" 
          id="p-cat" 
          value={photoForm.category} 
          onChange={(e) => setPhotoForm({...photoForm, category: e.target.value})} 
          options={photoCategories}
        />

        <Input 
          label="Brief Photo Description" 
          id="p-desc" 
          placeholder="e.g. Laying wet mix compaction completed up to chain 120"
          value={photoForm.description}
          onChange={(e) => setPhotoForm({...photoForm, description: e.target.value})}
          required 
        />

        <div className="form-group">
          <label>Camera Capture</label>
          <div className="file-upload-zone" onClick={() => alert("Mobile camera shutter opened.")}>
            <Camera size={32} className="file-upload-icon" />
            <div className="file-upload-text">Tap to snap a photo</div>
            <div className="file-upload-subtext">Optimized for high-compression mobile transmission</div>
          </div>
        </div>

        <Button type="submit" variant="accent" block>
          Upload Photo to Document Vault
        </Button>
      </form>
    </div>
  );
}
