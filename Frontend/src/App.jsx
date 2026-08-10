import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useApp } from "./context/AppContext";
import AppRoutes from "./routes/AppRoutes";
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";
import "./App.css";

export default function App() {
  const { notifications } = useApp();
  const [toasts, setToasts] = useState([]);

  // Toast listener: listen for new notifications and display them as toast banners
  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotif = notifications[0];
      const now = Date.now();
      const isRecent = latestNotif.id && (now - latestNotif.id < 5000);
      
      if (isRecent) {
        const newToast = {
          id: latestNotif.id,
          message: latestNotif.message,
          type: latestNotif.type
        };

        // Add toast
        setToasts(prev => [newToast, ...prev]);

        // Auto remove toast after 4 seconds
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== newToast.id));
        }, 4000);
      }
    }
  }, [notifications]);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const getToastIcon = (type) => {
    switch (type) {
      case "approval":
      case "success":
        return <CheckCircle size={18} style={{ color: "var(--status-green)" }} />;
      case "issue":
      case "alert":
        return <AlertTriangle size={18} style={{ color: "var(--status-red)" }} />;
      case "expense":
      case "report":
        return <Info size={18} style={{ color: "var(--status-amber)" }} />;
      default:
        return <Info size={18} style={{ color: "var(--status-blue)" }} />;
    }
  };

  const getToastClass = (type) => {
    switch (type) {
      case "approval":
      case "success":
        return "toast-success";
      case "issue":
      case "alert":
        return "toast-danger";
      case "expense":
      case "report":
        return "toast-warning";
      default:
        return "toast-info";
    }
  };

  return (
    <BrowserRouter>
      {/* Toast Notification Banner Container */}
      <div className="toast-container" style={{ zIndex: 150 }}>
        {toasts.map(toast => (
          <div key={toast.id} className={`toast ${getToastClass(toast.type)}`}>
            {getToastIcon(toast.type)}
            <div className="toast-content">
              {toast.message}
            </div>
            <button className="toast-close" onClick={() => removeToast(toast.id)}>
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Application Routing */}
      <AppRoutes />
    </BrowserRouter>
  );
}
