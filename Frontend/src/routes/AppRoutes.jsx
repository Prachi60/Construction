import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import SupervisorLayout from "../layouts/SupervisorLayout";

// Auth Modules
import Gateway from "../modules/auth/pages/Gateway";
import Login from "../modules/auth/pages/Login";

// Admin Pages
import AdminDashboard from "../modules/admin/pages/Dashboard";
import AdminProjects from "../modules/admin/pages/Projects";
import AdminSupervisors from "../modules/admin/pages/Supervisors";
import AdminTasks from "../modules/admin/pages/Tasks";
import AdminMaterials from "../modules/admin/pages/Materials";
import AdminLabour from "../modules/admin/pages/Labour";
import AdminExpenses from "../modules/admin/pages/Expenses";
import AdminIssues from "../modules/admin/pages/Issues";
import AdminDocuments from "../modules/admin/pages/Documents";
import AdminReports from "../modules/admin/pages/Reports";

// Supervisor Pages
import SupervisorHome from "../modules/supervisor/pages/Home";
import SupervisorSites from "../modules/supervisor/pages/Sites";
import SupervisorTasks from "../modules/supervisor/pages/Tasks";
import SupervisorDailyWork from "../modules/supervisor/pages/DailyWork";
import SupervisorMaterials from "../modules/supervisor/pages/Materials";
import SupervisorLabour from "../modules/supervisor/pages/Labour";
import SupervisorExpenses from "../modules/supervisor/pages/Expenses";
import SupervisorIssues from "../modules/supervisor/pages/Issues";
import SupervisorPhotos from "../modules/supervisor/pages/Photos";
import SupervisorProfile from "../modules/supervisor/pages/Profile";

// Auth Guard: Requires user to be logged in
function RequireAuth({ children, role }) {
  const { currentUser, currentUserRole } = useApp();

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (role && currentUserRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth / Gateway Routes */}
      <Route path="/" element={<Gateway />} />
      <Route path="/login/admin" element={<Login role="admin" />} />
      <Route path="/login/supervisor" element={<Login role="supervisor" />} />

      {/* Admin Protected Dashboard Routes */}
      <Route
        path="/admin"
        element={
          <RequireAuth role="admin">
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="supervisors" element={<AdminSupervisors />} />
        <Route path="tasks" element={<AdminTasks />} />
        <Route path="materials" element={<AdminMaterials />} />
        <Route path="labour" element={<AdminLabour />} />
        <Route path="expenses" element={<AdminExpenses />} />
        <Route path="issues" element={<AdminIssues />} />
        <Route path="documents" element={<AdminDocuments />} />
        <Route path="reports" element={<AdminReports />} />
      </Route>

      {/* Supervisor Protected Field App Routes */}
      <Route
        path="/supervisor"
        element={
          <RequireAuth role="supervisor">
            <SupervisorLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<SupervisorHome />} />
        <Route path="sites" element={<SupervisorSites />} />
        <Route path="sites/:id" element={<SupervisorSites />} />
        <Route path="tasks" element={<SupervisorTasks />} />
        <Route path="daily-work" element={<SupervisorDailyWork />} />
        <Route path="materials" element={<SupervisorMaterials />} />
        <Route path="labour" element={<SupervisorLabour />} />
        <Route path="expenses" element={<SupervisorExpenses />} />
        <Route path="issues" element={<SupervisorIssues />} />
        <Route path="photos" element={<SupervisorPhotos />} />
        <Route path="profile" element={<SupervisorProfile />} />
      </Route>

      {/* Fallback Catch-all Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
