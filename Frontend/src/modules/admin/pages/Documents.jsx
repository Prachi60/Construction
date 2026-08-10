import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { Folder, FileText, Image, Download, Eye, ExternalLink } from "lucide-react";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Table from "../../../components/Table";

export default function Documents() {
  const { projects } = useApp();
  const [activeFolder, setActiveFolder] = useState("all");

  const folders = [
    { id: "all", name: "All Folders" },
    { id: "drawings", name: "CAD Drawings & Blueprints" },
    { id: "contracts", name: "PWD Work Orders & Agreements" },
    { id: "invoices", name: "Material Invoices" },
    { id: "photos", name: "Progress Photos" }
  ];

  // Static documents lists
  const documents = [
    { id: 1, name: "Indore_Bypass_Layout_Final.dwg", folder: "drawings", size: "18.4 MB", date: "2026-07-15", project: "Indore Bypass Road Expansion" },
    { id: 2, name: "Drainage_Section_Plan_Rev2.pdf", folder: "drawings", size: "4.2 MB", date: "2026-07-22", project: "Indore Bypass Road Expansion" },
    { id: 3, name: "PWD_WorkOrder_Indore_Bypass_Signed.pdf", folder: "contracts", size: "12.8 MB", date: "2026-06-10", project: "Indore Bypass Road Expansion" },
    { id: 4, name: "School_Foundation_Structural.pdf", folder: "drawings", size: "8.7 MB", date: "2026-07-02", project: "Indore School Building construction" },
    { id: 5, name: "UltraTech_Cement_Invoice_903.pdf", folder: "invoices", size: "1.1 MB", date: "2026-08-01", project: "Indore Bypass Road Expansion" },
    { id: 6, name: "Steel_Rebar_TestCertificate_Balaji.pdf", folder: "invoices", size: "2.3 MB", date: "2026-08-04", project: "Indore School Building construction" },
    { id: 7, name: "Culvert_Compaction_Photo.jpg", folder: "photos", size: "3.4 MB", date: "2026-08-08", project: "Indore Bypass Road Expansion" },
    { id: 8, name: "Pillar_Casting_Photo.jpg", folder: "photos", size: "2.9 MB", date: "2026-08-09", project: "Indore School Building construction" }
  ];

  const filteredDocs = activeFolder === "all" 
    ? documents 
    : documents.filter(d => d.folder === activeFolder);

  const getFolderIcon = (type) => {
    switch (type) {
      case "drawings":
      case "contracts":
        return <FileText size={16} />;
      case "photos":
        return <Image size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h2>Document Cabinet</h2>
          <p>Central vault for drawings, blueprint documents, PWD approvals, and supplier invoices</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "24px" }}>
        
        {/* Left: Folder list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {folders.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFolder(f.id)}
              style={{
                display: "flex", alignItems: "center", gap: "10px", width: "100%",
                padding: "12px 16px", border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)", fontSize: "13px", fontWeight: 600,
                textAlign: "left", cursor: "pointer",
                backgroundColor: activeFolder === f.id ? "var(--color-primary)" : "#fff",
                color: activeFolder === f.id ? "#fff" : "var(--text-secondary)"
              }}
            >
              <Folder size={18} style={{ color: activeFolder === f.id ? "#fff" : "var(--color-primary)" }} />
              {f.name}
            </button>
          ))}
        </div>

        {/* Right: File list Table */}
        <Card title={folders.find(f => f.id === activeFolder).name}>
          <Table headers={["File Name", "Project", "Size", "Date Logged", "Actions"]}>
            {filteredDocs.map(d => (
              <tr key={d.id}>
                <td style={{ fontWeight: 600 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {getFolderIcon(d.folder)}
                    <span>{d.name}</span>
                  </div>
                </td>
                <td>{d.project}</td>
                <td>{d.size}</td>
                <td>{d.date}</td>
                <td>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <Button 
                      variant="secondary" 
                      size="xs" 
                      onClick={() => alert(`Previewing ${d.name} inside cabinet mock window.`)}
                      style={{ padding: "4px" }}
                    >
                      <Eye size={12} />
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="xs" 
                      onClick={() => alert(`Starting secure download for file: ${d.name}`)}
                      style={{ padding: "4px" }}
                    >
                      <Download size={12} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        </Card>

      </div>
    </div>
  );
}
