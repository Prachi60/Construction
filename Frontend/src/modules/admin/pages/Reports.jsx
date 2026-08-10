import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { FileSpreadsheet, Download, FileText, ChevronRight } from "lucide-react";
import Card from "../../../components/Card";
import Button from "../../../components/Button";

export default function Reports() {
  const { projects } = useApp();
  
  const [reportType, setReportType] = useState("dpr");
  const [selectedProject, setSelectedProject] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExport = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert("Report compiled successfully! Downloading spreadsheet (.csv) to downloads folder.");
    }, 1200);
  };

  const reportsList = [
    { id: "dpr", title: "Daily Progress Report (DPR)", desc: "Contains aggregate task accomplishments, labor counts, and weather logs on a daily basis.", icon: <FileText size={24} /> },
    { id: "materials", title: "Material Reconciliation Audit", desc: "Compares opening material balance, stock received, and quantities consumed in construction work.", icon: <FileSpreadsheet size={24} /> },
    { id: "ledger", title: "Financial Cash-Book Ledger", desc: "Complete log of approved site expense vouchers, category-wise cash distributions, and fuel bills.", icon: <FileSpreadsheet size={24} /> }
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h2>Reports Engine</h2>
          <p>Export construction logs, DPR sheets, and material balance statements to Excel / PDF</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        
        {/* Left: Report configurations */}
        <Card title="Compile Report Details">
          <form onSubmit={handleExport}>
            <div className="form-group">
              <label>Select Report Template</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {reportsList.map(r => (
                  <label 
                    key={r.id}
                    style={{
                      display: "flex", alignItems: "center", gap: "12px", padding: "12px",
                      border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)",
                      cursor: "pointer",
                      backgroundColor: reportType === r.id ? "var(--color-info-bg)" : "#fff",
                      borderColor: reportType === r.id ? "var(--color-primary)" : "var(--border-color)"
                    }}
                  >
                    <input 
                      type="radio" 
                      name="report-radio" 
                      checked={reportType === r.id}
                      onChange={() => setReportType(r.id)}
                      style={{ display: "none" }}
                    />
                    <div style={{ color: "var(--color-primary)" }}>{r.icon}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "13px" }}>{r.title}</div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{r.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Project / Construction Site</label>
              <select 
                className="form-control"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                required
              >
                <option value="">-- Select Project Site --</option>
                <option value="all">All Projects Combined</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label>From Date</label>
                <input 
                  type="date" 
                  className="form-control" 
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>To Date</label>
                <input 
                  type="date" 
                  className="form-control" 
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  required 
                />
              </div>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              block 
              disabled={isGenerating}
            >
              {isGenerating ? "Compiling spreadsheet cells..." : "Export Excel Sheet (.csv)"}
            </Button>
          </form>
        </Card>

        {/* Right: Quick actions and instructions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Card title="Quick-Export Reports">
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ padding: "12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", backgroundColor: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "13px" }}>Today's DPR Summary</div>
                  <div style={{ fontSize: "11px", color: "var(--text-light)" }}>Daily status logs generated today</div>
                </div>
                <Button variant="secondary" size="xs" onClick={() => alert("Downloading Today's DPR CSV")}>
                  <Download size={14} /> CSV
                </Button>
              </div>

              <div style={{ padding: "12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", backgroundColor: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "13px" }}>Monthly Material Balances</div>
                  <div style={{ fontSize: "11px", color: "var(--text-light)" }}>Reconciliation statements for current month</div>
                </div>
                <Button variant="secondary" size="xs" onClick={() => alert("Downloading Monthly Materials CSV")}>
                  <Download size={14} /> CSV
                </Button>
              </div>

              <div style={{ padding: "12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", backgroundColor: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "13px" }}>Expense Ledger Summary</div>
                  <div style={{ fontSize: "11px", color: "var(--text-light)" }}>Fiscal ledger records for tax audit</div>
                </div>
                <Button variant="secondary" size="xs" onClick={() => alert("Downloading Ledger Summary CSV")}>
                  <Download size={14} /> CSV
                </Button>
              </div>
            </div>
          </Card>

          <Card title="Audit Compliance Guide">
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
              All reports generated by the engine comply with standard PWD billing, audit, and tax formats:
            </p>
            <ul style={{ fontSize: "12px", color: "var(--text-secondary)", paddingLeft: "20px", marginTop: "8px", lineHeight: "1.8" }}>
              <li><strong>DPR</strong> format aligns with NHAI / State Highway division regulations.</li>
              <li><strong>Material Reconciliation</strong> reports account for wastage up to 3% as permitted in state contract terms.</li>
              <li><strong>Ledger summaries</strong> require matching digital receipts and cash vouchers, which are logged automatically in the supervisor app database.</li>
            </ul>
          </Card>
        </div>

      </div>
    </div>
  );
}
