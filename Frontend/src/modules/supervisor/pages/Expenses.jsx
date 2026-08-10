import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import { Camera } from "lucide-react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Textarea from "../../../components/Textarea";

export default function Expenses() {
  const { currentUser, projects, submitExpenseClaim } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const assignedProjects = projects.filter(p => p.supervisors.includes(currentUser.id));
  
  const defaultProjectId = location.state && location.state.projectId 
    ? location.state.projectId 
    : (assignedProjects[0]?.id || "");

  const [projectId, setProjectId] = useState(defaultProjectId);
  const [expenseForm, setExpenseForm] = useState({
    category: "Fuel",
    amount: "",
    vendor: "",
    description: ""
  });

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (!projectId) {
      alert("Please select a project site.");
      return;
    }

    const amt = parseFloat(expenseForm.amount);
    if (isNaN(amt) || amt <= 0) {
      alert("Please enter a valid expense amount.");
      return;
    }

    submitExpenseClaim({
      projectId: parseInt(projectId),
      amount: amt,
      category: expenseForm.category,
      vendor: expenseForm.vendor,
      description: expenseForm.description
    });

    setExpenseForm({ category: "Fuel", amount: "", vendor: "", description: "" });
    alert("Expense claim request submitted successfully!");
    navigate("/supervisor/home");
  };

  const categories = [
    { value: "Fuel", label: "Fuel (Diesel for pumps/rollers)" },
    { value: "Material", label: "Material (Urgent local buying)" },
    { value: "Labour", label: "Labour (Local sand-shifters/unloading)" },
    { value: "Machinery", label: "Machinery Rental/Repairs" },
    { value: "Transport", label: "Transport (Tractors/Truckings)" },
    { value: "Food & Water", label: "Workers Food & Drinking Water" },
    { value: "Other", label: "Other Contingencies / Miscellaneous" }
  ];

  return (
    <div>
      <h3 style={{ fontSize: "15px", marginBottom: "12px" }}>Submit Expense Claim</h3>
      <form onSubmit={handleExpenseSubmit}>
        <Select 
          label="Select Project Site" 
          id="e-proj" 
          value={projectId} 
          onChange={(e) => setProjectId(e.target.value)} 
          options={assignedProjects.map(p => ({ value: p.id, label: p.name }))}
          required
        />

        <Select 
          label="Expense Category" 
          id="e-cat" 
          value={expenseForm.category} 
          onChange={(e) => setExpenseForm({...expenseForm, category: e.target.value})} 
          options={categories}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <Input 
            label="Claim Amount (₹)" 
            id="e-amt" 
            type="number"
            placeholder="e.g. 5000"
            value={expenseForm.amount}
            onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})}
            required 
          />
          <Input 
            label="Vendor / Party Name" 
            id="e-vend" 
            placeholder="e.g. HP Fuel Station"
            value={expenseForm.vendor}
            onChange={(e) => setExpenseForm({...expenseForm, vendor: e.target.value})}
            required 
          />
        </div>

        <Textarea 
          label="Detailed Description" 
          id="e-desc" 
          placeholder="Reason for cash spend, quantity details, chainage reference..."
          value={expenseForm.description}
          onChange={(e) => setExpenseForm({...expenseForm, description: e.target.value})}
          required
        />

        <div className="form-group">
          <label>Attach Cash Receipt Photo</label>
          <div className="file-upload-zone" onClick={() => alert("Camera module activated.")}>
            <Camera size={24} className="file-upload-icon" />
            <div className="file-upload-text">Touch to capture receipt voucher</div>
            <div className="file-upload-subtext">Compulsory for approval</div>
          </div>
        </div>

        <Button type="submit" variant="accent" block>
          Submit Expense Voucher
        </Button>
      </form>
    </div>
  );
}
