import React, { createContext, useState, useContext, useEffect } from "react";
import {
  initialSupervisors,
  initialProjects,
  initialTasks,
  initialDailyReports,
  initialMaterials,
  initialLabour,
  initialIndividualLabour,
  initialExpenses,
  initialIssues,
  initialPhotos,
  initialNotifications
} from "../mockData";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // App views: 'gateway', 'admin_login', 'supervisor_login', 'admin_panel', 'supervisor_panel'
  const [activeView, setActiveView] = useState("gateway");
  
  // Auth state
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState(null); // 'admin' | 'supervisor'

  // Application Data States
  const [supervisors, setSupervisors] = useState(initialSupervisors);
  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);
  const [dailyReports, setDailyReports] = useState(initialDailyReports);
  const [materials, setMaterials] = useState(initialMaterials);
  const [labour, setLabour] = useState(initialLabour);
  const [individualLabour, setIndividualLabour] = useState(initialIndividualLabour);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [issues, setIssues] = useState(initialIssues);
  const [photos, setPhotos] = useState(initialPhotos);
  const [notifications, setNotifications] = useState(initialNotifications);

  // Active Menu Tabs for Panel Views
  const [adminActiveTab, setAdminActiveTab] = useState("dashboard"); // dashboard, projects, supervisors, tasks, daily-reports, materials, labour, expenses, issues, photos, reports, notifications, settings
  const [supervisorActiveTab, setSupervisorActiveTab] = useState("home"); // home, sites, tasks, reports, profile
  
  // Specific item selections for details view (null if in list view)
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedSupervisorId, setSelectedSupervisorId] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Notification helper
  const triggerNotification = (message, type = "info") => {
    const newNotif = {
      id: Date.now(),
      message,
      date: new Date().toLocaleDateString("en-IN") + " " + new Date().toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Auth Operations
  const login = (username, password, role) => {
    if (role === "admin") {
      if (username === "admin" || username === "admin@prachi.com") {
        setCurrentUser({ name: "Contractor Admin", username: "admin", email: "admin@prachi.com" });
        setCurrentUserRole("admin");
        setActiveView("admin_panel");
        setAdminActiveTab("dashboard");
        triggerNotification("Admin logged in successfully", "info");
        return { success: true };
      }
      return { success: false, message: "Invalid Admin Credentials! Use 'admin' or 'admin@prachi.com'." };
    } else {
      // Find supervisor
      const supervisor = supervisors.find(
        s => (s.username.toLowerCase() === username.toLowerCase() || s.email.toLowerCase() === username.toLowerCase())
      );
      if (supervisor) {
        if (supervisor.status === "Inactive") {
          return { success: false, message: "This supervisor account is Deactivated. Contact Admin." };
        }
        // Success
        setCurrentUser(supervisor);
        setCurrentUserRole("supervisor");
        setActiveView("supervisor_panel");
        setSupervisorActiveTab("home");
        // Update supervisor lastLogin and activity
        setSupervisors(prev =>
          prev.map(s =>
            s.id === supervisor.id
              ? { ...s, lastLogin: new Date().toLocaleDateString("en-IN") + ", " + new Date().toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' }), lastActivity: "Just logged in" }
              : s
          )
        );
        triggerNotification(`${supervisor.name} logged in successfully`, "info");
        return { success: true };
      }
      return { success: false, message: "Supervisor not found! Try 'rahul', 'amit', or 'suresh'." };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentUserRole(null);
    setSelectedProjectId(null);
    setSelectedSupervisorId(null);
    setSelectedTaskId(null);
    setActiveView("gateway");
  };

  // Admin Project Operations
  const addProject = (projectData) => {
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    const newProject = {
      id: newId,
      ...projectData,
      actualExpenses: 0,
      progress: 0,
      supervisors: projectData.supervisors || []
    };
    setProjects(prev => [newProject, ...prev]);
    
    // Add default materials for this project
    const defaultMaterials = [
      { id: Date.now() + 1, projectId: newId, name: "Cement", unit: "bags", opening: 0, received: 0, used: 0, current: 0, status: "Critical", lastUpdated: "Just created" },
      { id: Date.now() + 2, projectId: newId, name: "Steel", unit: "tons", opening: 0, received: 0, used: 0, current: 0, status: "Critical", lastUpdated: "Just created" },
      { id: Date.now() + 3, projectId: newId, name: "Sand", unit: "brass", opening: 0, received: 0, used: 0, current: 0, status: "Critical", lastUpdated: "Just created" }
    ];
    setMaterials(prev => [...prev, ...defaultMaterials]);

    triggerNotification(`New project "${projectData.name}" created.`, "info");
    return newId;
  };

  const updateProjectDetails = (projectId, updatedData) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, ...updatedData } : p));
  };

  const assignSupervisorToProject = (projectId, supervisorId) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          if (!p.supervisors.includes(supervisorId)) {
            return { ...p, supervisors: [...p.supervisors, supervisorId] };
          }
        }
        return p;
      })
    );
    const supervisor = supervisors.find(s => s.id === supervisorId);
    const project = projects.find(p => p.id === projectId);
    triggerNotification(`Assigned supervisor ${supervisor?.name} to site ${project?.name}.`, "info");
  };

  const removeSupervisorFromProject = (projectId, supervisorId) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return { ...p, supervisors: p.supervisors.filter(sid => sid !== supervisorId) };
        }
        return p;
      })
    );
    const supervisor = supervisors.find(s => s.id === supervisorId);
    const project = projects.find(p => p.id === projectId);
    triggerNotification(`Removed supervisor ${supervisor?.name} from site ${project?.name}.`, "alert");
  };

  // Supervisor Operations
  const addSupervisor = (supervisorData) => {
    const newId = supervisors.length > 0 ? Math.max(...supervisors.map(s => s.id)) + 1 : 1;
    const newSup = {
      id: newId,
      ...supervisorData,
      status: supervisorData.status || "Active",
      lastActivity: "Never",
      lastLogin: "Never"
    };
    setSupervisors(prev => [...prev, newSup]);
    triggerNotification(`Supervisor profile created for ${supervisorData.name}.`, "info");
    return newId;
  };

  const setSupervisorStatus = (supervisorId, status) => {
    setSupervisors(prev =>
      prev.map(s => s.id === supervisorId ? { ...s, status } : s)
    );
    const supervisor = supervisors.find(s => s.id === supervisorId);
    triggerNotification(`Supervisor ${supervisor?.name} status set to ${status}.`, "alert");
  };

  // Task Operations
  const addTask = (taskData) => {
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const newTask = {
      id: newId,
      ...taskData,
      completedQuantity: 0,
      status: taskData.status || "Pending"
    };
    setTasks(prev => [newTask, ...prev]);
    
    const supervisor = supervisors.find(s => s.id === parseInt(taskData.supervisorId));
    const project = projects.find(p => p.id === parseInt(taskData.projectId));
    triggerNotification(`New task "${taskData.title}" assigned to ${supervisor?.name} on ${project?.name}.`, "info");
    return newId;
  };

  const updateTaskProgress = (taskId, completedToday, description, remarks = "") => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newCompleted = Math.min(task.targetQuantity, task.completedQuantity + parseFloat(completedToday));
    const isCompleted = newCompleted >= task.targetQuantity;
    const newStatus = isCompleted ? "Completed" : "In Progress";
    
    // Update task
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? {
              ...t,
              completedQuantity: newCompleted,
              status: newStatus
            }
          : t
      )
    );

    // If there's a daily work log, we can add it to dailyReports
    const reportDate = new Date().toISOString().split("T")[0];
    const newReportId = dailyReports.length > 0 ? Math.max(...dailyReports.map(r => r.id)) + 1 : 1;
    const newReport = {
      id: newReportId,
      date: reportDate,
      projectId: task.projectId,
      supervisorId: task.supervisorId,
      workDescription: `Task: ${task.title}. Daily progress update of +${completedToday} ${task.unit}. ${description}. Remarks: ${remarks}`,
      progressDetails: `Progress updated to ${newCompleted}/${task.targetQuantity} ${task.unit} (${Math.round((newCompleted/task.targetQuantity)*100)}%).`,
      photos: [],
      status: "Pending" // requires admin view
    };
    setDailyReports(prev => [newReport, ...prev]);

    // Recalculate project progress
    updateProjectProgressFromTasks(task.projectId);

    triggerNotification(`Task progress updated by ${currentUser?.name} for "${task.title}".`, "report");
  };

  const updateProjectProgressFromTasks = (projId) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projId) {
          const projTasks = tasks.filter(t => t.projectId === projId);
          if (projTasks.length === 0) return p;
          
          const totalProgress = projTasks.reduce((acc, t) => {
            return acc + (t.completedQuantity / t.targetQuantity);
          }, 0);
          const avgProgress = Math.round((totalProgress / projTasks.length) * 100);
          return { ...p, progress: Math.min(100, avgProgress) };
        }
        return p;
      })
    );
  };

  // Add Daily Work (Directly from form)
  const addDailyWork = (reportData) => {
    const newId = dailyReports.length > 0 ? Math.max(...dailyReports.map(r => r.id)) + 1 : 1;
    const newReport = {
      id: newId,
      status: "Pending",
      ...reportData
    };
    setDailyReports(prev => [newReport, ...prev]);
    
    // update supervisor last activity
    if (currentUserRole === "supervisor") {
      setSupervisors(prev =>
        prev.map(s =>
          s.id === currentUser.id
            ? { ...s, lastActivity: `Submitted daily report on ${reportData.date}` }
            : s
        )
      );
    }

    const project = projects.find(p => p.id === parseInt(reportData.projectId));
    triggerNotification(`${currentUser?.name} submitted Daily Work Report for "${project?.name}".`, "report");
    return newId;
  };

  // Approve Daily Report
  const approveDailyReport = (reportId) => {
    setDailyReports(prev =>
      prev.map(r => r.id === reportId ? { ...r, status: "Approved" } : r)
    );
    triggerNotification("Daily Report approved by Admin", "approval");
  };

  // Material Log Operations
  const addMaterialRecord = (projectId, type, name, quantity, unit, details, date) => {
    // Check if material already exists for this project
    const qty = parseFloat(quantity);
    const existing = materials.find(m => m.projectId === projectId && m.name.toLowerCase() === name.toLowerCase());

    if (existing) {
      setMaterials(prev =>
        prev.map(m => {
          if (m.id === existing.id) {
            let newOpening = m.current;
            let newReceived = m.received;
            let newUsed = m.used;
            let newCurrent = m.current;

            if (type === "Received") {
              newReceived += qty;
              newCurrent += qty;
            } else {
              newUsed += qty;
              newCurrent = Math.max(0, newCurrent - qty);
            }

            let newStatus = "Good Stock";
            if (newCurrent === 0) newStatus = "Critical";
            else if (newCurrent < 50) newStatus = "Low Stock";

            return {
              ...m,
              opening: newOpening,
              received: newReceived,
              used: newUsed,
              current: newCurrent,
              status: newStatus,
              lastUpdated: `${date} by ${currentUser?.name || "System"}`
            };
          }
          return m;
        })
      );
    } else {
      // Create new material record
      const newId = materials.length > 0 ? Math.max(...materials.map(m => m.id)) + 1 : 1;
      const newCurrent = type === "Received" ? qty : 0;
      let newStatus = "Good Stock";
      if (newCurrent === 0) newStatus = "Critical";
      else if (newCurrent < 50) newStatus = "Low Stock";

      const newMaterial = {
        id: newId,
        projectId,
        name,
        unit,
        opening: 0,
        received: type === "Received" ? qty : 0,
        used: type === "Used" ? qty : 0,
        current: newCurrent,
        status: newStatus,
        lastUpdated: `${date} by ${currentUser?.name || "System"}`
      };
      setMaterials(prev => [...prev, newMaterial]);
    }

    const project = projects.find(p => p.id === projectId);
    triggerNotification(`${currentUser?.name} logged material ${type.toLowerCase()} (${quantity} ${unit} of ${name}) at ${project?.name}.`, "info");
  };

  // Labour Log Operations
  const addLabourRecord = (labourData) => {
    const newId = labour.length > 0 ? Math.max(...labour.map(l => l.id)) + 1 : 1;
    const masons = parseInt(labourData.masons) || 0;
    const helpers = parseInt(labourData.helpers) || 0;
    const operators = parseInt(labourData.operators) || 0;
    const electricians = parseInt(labourData.electricians) || 0;
    const others = parseInt(labourData.others) || 0;
    const total = masons + helpers + operators + electricians + others;

    const newRecord = {
      id: newId,
      ...labourData,
      masons,
      helpers,
      operators,
      electricians,
      others,
      total
    };
    setLabour(prev => [newRecord, ...prev]);

    const project = projects.find(p => p.id === parseInt(labourData.projectId));
    triggerNotification(`${currentUser?.name} logged labour attendance (${total} workers) at ${project?.name}.`, "info");
    return newId;
  };

  const addIndividualLabour = (individualData) => {
    const newId = individualLabour.length > 0 ? Math.max(...individualLabour.map(l => l.id)) + 1 : 1;
    const newInd = {
      id: newId,
      ...individualData,
      dailyWage: parseFloat(individualData.dailyWage) || 450
    };
    setIndividualLabour(prev => [...prev, newInd]);
  };

  const updateIndividualLabourAttendance = (labourId, attendance) => {
    setIndividualLabour(prev =>
      prev.map(l => l.id === labourId ? { ...l, attendance } : l)
    );
  };

  // Expense Operations
  const addExpenseRequest = (expenseData) => {
    const newId = expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1;
    const newExpense = {
      id: newId,
      date: expenseData.date || new Date().toISOString().split("T")[0],
      submittedBy: currentUser?.id || 1,
      status: "Pending",
      bill: expenseData.billName || "receipt.pdf",
      ...expenseData,
      amount: parseFloat(expenseData.amount)
    };
    setExpenses(prev => [newExpense, ...prev]);

    // Notify Admin
    const project = projects.find(p => p.id === parseInt(expenseData.projectId));
    triggerNotification(`${currentUser?.name} submitted expense request of ₹${parseFloat(expenseData.amount).toLocaleString("en-IN")} for ${expenseData.category} at ${project?.name}.`, "expense");
    return newId;
  };

  const approveExpense = (expenseId) => {
    const expense = expenses.find(e => e.id === expenseId);
    if (!expense) return;

    setExpenses(prev =>
      prev.map(e => e.id === expenseId ? { ...e, status: "Approved" } : e)
    );

    // Update project actual expenses
    setProjects(prev =>
      prev.map(p =>
        p.id === expense.projectId
          ? { ...p, actualExpenses: p.actualExpenses + expense.amount }
          : p
      )
    );

    triggerNotification(`Expense request of ₹${expense.amount.toLocaleString("en-IN")} Approved by Admin.`, "approval");
  };

  const rejectExpense = (expenseId) => {
    const expense = expenses.find(e => e.id === expenseId);
    if (!expense) return;

    setExpenses(prev =>
      prev.map(e => e.id === expenseId ? { ...e, status: "Rejected" } : e)
    );

    triggerNotification(`Expense request of ₹${expense.amount.toLocaleString("en-IN")} Rejected by Admin.`, "alert");
  };

  // Issue Operations
  const reportIssue = (issueData) => {
    const newId = issues.length > 0 ? Math.max(...issues.map(i => i.id)) + 1 : 1;
    const newIssue = {
      id: newId,
      reportedBy: currentUser?.id || 1,
      date: issueData.date || new Date().toISOString().split("T")[0],
      status: "Open",
      photos: issueData.photos || [],
      resolution: "",
      ...issueData
    };
    setIssues(prev => [newIssue, ...prev]);

    const project = projects.find(p => p.id === parseInt(issueData.projectId));
    triggerNotification(`${currentUser?.name} reported a ${issueData.priority} issue: "${issueData.title}" at ${project?.name}.`, "issue");
    return newId;
  };

  const updateIssueStatus = (issueId, status, resolution = "") => {
    setIssues(prev =>
      prev.map(i => i.id === issueId ? { ...i, status, resolution } : i)
    );
    const issue = issues.find(i => i.id === issueId);
    triggerNotification(`Issue "${issue?.title}" status updated to ${status}.`, "info");
  };

  // Media
  const addPhoto = (photoData) => {
    const newId = photos.length > 0 ? Math.max(...photos.map(p => p.id)) + 1 : 1;
    const newPhoto = {
      id: newId,
      date: new Date().toISOString().split("T")[0],
      supervisorId: currentUser?.id || 1,
      ...photoData
    };
    setPhotos(prev => [newPhoto, ...prev]);
  };

  // Mark all notifications read
  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Clear specific notification
  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        currentUser,
        setCurrentUser,
        currentUserRole,
        setCurrentUserRole,
        supervisors,
        projects,
        tasks,
        dailyReports,
        materials,
        labour,
        individualLabour,
        expenses,
        issues,
        photos,
        notifications,
        adminActiveTab,
        setAdminActiveTab,
        supervisorActiveTab,
        setSupervisorActiveTab,
        selectedProjectId,
        setSelectedProjectId,
        selectedSupervisorId,
        setSelectedSupervisorId,
        selectedTaskId,
        setSelectedTaskId,
        
        // Actions
        login,
        logout,
        addProject,
        updateProjectDetails,
        assignSupervisorToProject,
        removeSupervisorFromProject,
        addSupervisor,
        setSupervisorStatus,
        addTask,
        updateTaskProgress,
        addDailyWork,
        approveDailyReport,
        addMaterialRecord,
        addLabourRecord,
        addIndividualLabour,
        updateIndividualLabourAttendance,
        addExpenseRequest,
        approveExpense,
        rejectExpense,
        reportIssue,
        updateIssueStatus,
        addPhoto,
        markNotificationsAsRead,
        clearNotification,
        triggerNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
