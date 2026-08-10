import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import { Camera } from "lucide-react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";

export default function Materials() {
  const { currentUser, projects, recordMaterialReceipt, recordMaterialUsage } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const assignedProjects = projects.filter(p => p.supervisors.includes(currentUser.id));
  
  const defaultProjectId = location.state && location.state.projectId 
    ? location.state.projectId 
    : (assignedProjects[0]?.id || "");

  const [projectId, setProjectId] = useState(defaultProjectId);
  const [materialTxType, setMaterialTxType] = useState("Received");
  const [materialForm, setMaterialForm] = useState({
    name: "Cement",
    quantity: "",
    unit: "bags",
    supplier: "",
    usedFor: ""
  });

  const handleMaterialSubmit = (e) => {
    e.preventDefault();
    if (!projectId) {
      alert("Please select a project site.");
      return;
    }

    const qty = parseFloat(materialForm.quantity);
    if (isNaN(qty) || qty <= 0) {
      alert("Please enter a valid positive quantity.");
      return;
    }

    if (materialTxType === "Received") {
      recordMaterialReceipt({
        projectId: parseInt(projectId),
        materialName: materialForm.name,
        quantity: qty,
        supplier: materialForm.supplier
      });
    } else {
      recordMaterialUsage({
        projectId: parseInt(projectId),
        materialName: materialForm.name,
        quantity: qty,
        usedFor: materialForm.usedFor
      });
    }

    // Reset Form & Navigate back
    setMaterialForm({
      name: "Cement",
      quantity: "",
      unit: "bags",
      supplier: "",
      usedFor: ""
    });
    alert("Material log recorded successfully!");
    navigate("/supervisor/home");
  };

  const materialsList = [
    { value: "Cement", label: "Cement" },
    { value: "TMT Steel Rebars", label: "TMT Steel Rebars" },
    { value: "Sand", label: "Sand" },
    { value: "Aggregates (20mm)", label: "Aggregates (20mm)" },
    { value: "Bricks", label: "Bricks" },
    { value: "Bitumen (Asphalt)", label: "Bitumen (Asphalt)" },
    { value: "RCC Sewer Pipe 900mm", label: "RCC Sewer Pipe 900mm" }
  ];

  return (
    <div>
      <h3 style={{ fontSize: "15px", marginBottom: "12px" }}>Log Material Activity</h3>
      
      {/* Select transaction type received/used */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
        <button 
          type="button" 
          onClick={() => setMaterialTxType("Received")}
          className={`btn btn-sm ${materialTxType === "Received" ? "btn-accent" : "btn-secondary"}`}
          style={{ flexGrow: 1, padding: "8px" }}
        >
          Receive Material (+)
        </button>
        <button 
          type="button" 
          onClick={() => setMaterialTxType("Used")}
          className={`btn btn-sm ${materialTxType === "Used" ? "btn-accent" : "btn-secondary"}`}
          style={{ flexGrow: 1, padding: "8px" }}
        >
          Use Material (-)
        </button>
      </div>

      <form onSubmit={handleMaterialSubmit}>
        <Select 
          label="Select Project Site" 
          id="m-proj" 
          value={projectId} 
          onChange={(e) => setProjectId(e.target.value)} 
          options={assignedProjects.map(p => ({ value: p.id, label: p.name }))}
          required
        />

        <Select 
          label="Material Name" 
          id="m-name" 
          value={materialForm.name} 
          onChange={(e) => {
            const val = e.target.value;
            let defaultUnit = "bags";
            if (val === "Sand" || val === "Aggregates (20mm)") defaultUnit = "brass";
            else if (val === "TMT Steel Rebars") defaultUnit = "tons";
            else if (val === "Bitumen (Asphalt)") defaultUnit = "drums";
            setMaterialForm({...materialForm, name: val, unit: defaultUnit});
          }} 
          options={materialsList}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <Input 
            label="Quantity" 
            id="m-qty" 
            type="number"
            step="any"
            placeholder="e.g. 100"
            value={materialForm.quantity}
            onChange={(e) => setMaterialForm({...materialForm, quantity: e.target.value})}
            required 
          />
          <Input label="Unit" id="m-unit" value={materialForm.unit} disabled />
        </div>

        {materialTxType === "Received" ? (
          <Input 
            label="Supplier / Vendor Name" 
            id="m-sup" 
            placeholder="e.g. Balaji Traders"
            value={materialForm.supplier}
            onChange={(e) => setMaterialForm({...materialForm, supplier: e.target.value})}
            required 
          />
        ) : (
          <Input 
            label="Used For / Location details" 
            id="m-use" 
            placeholder="e.g. Block A casting, drainage lining"
            value={materialForm.usedFor}
            onChange={(e) => setMaterialForm({...materialForm, usedFor: e.target.value})}
            required 
          />
        )}

        <div className="form-group">
          <label>Upload Receipt Photo (Optional)</label>
          <div className="file-upload-zone" onClick={() => alert("File dialog opened.")}>
            <Camera size={20} className="file-upload-icon" />
            <div className="file-upload-text">Upload receipt photo</div>
          </div>
        </div>

        <Button type="submit" variant="accent" block>
          Submit Material Record
        </Button>
      </form>
    </div>
  );
}
