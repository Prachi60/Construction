export const initialSupervisors = [
  { id: 1, name: "Rahul Sharma", username: "rahul", phone: "+91 98765 43210", email: "rahul@prachi.com", status: "Active", lastActivity: "Today, 10:30 AM", lastLogin: "10 Aug 2026, 08:00 AM" },
  { id: 2, name: "Amit Verma", username: "amit", phone: "+91 98765 43211", email: "amit@prachi.com", status: "Active", lastActivity: "Today, 09:15 AM", lastLogin: "10 Aug 2026, 07:30 AM" },
  { id: 3, name: "Suresh Kumar", username: "suresh", phone: "+91 98765 43212", email: "suresh@prachi.com", status: "Active", lastActivity: "Yesterday, 05:45 PM", lastLogin: "09 Aug 2026, 08:15 AM" },
  { id: 4, name: "Mohit Singh", username: "mohit", phone: "+91 98765 43213", email: "mohit@prachi.com", status: "Active", lastActivity: "Today, 11:20 AM", lastLogin: "10 Aug 2026, 08:45 AM" },
  { id: 5, name: "Vijay Yadav", username: "vijay", phone: "+91 98765 43214", email: "vijay@prachi.com", status: "Active", lastActivity: "Yesterday, 04:00 PM", lastLogin: "09 Aug 2026, 08:00 AM" },
  { id: 6, name: "Rajesh Patel", username: "rajesh", phone: "+91 98765 43215", email: "rajesh@prachi.com", status: "Inactive", lastActivity: "3 days ago", lastLogin: "07 Aug 2026, 09:00 AM" },
  { id: 7, name: "Anand Mishra", username: "anand", phone: "+91 98765 43216", email: "anand@prachi.com", status: "Active", lastActivity: "Today, 12:05 PM", lastLogin: "10 Aug 2026, 09:00 AM" },
  { id: 8, name: "Vikram Rathore", username: "vikram", phone: "+91 98765 43217", email: "vikram@prachi.com", status: "Active", lastActivity: "Yesterday, 06:10 PM", lastLogin: "09 Aug 2026, 08:30 AM" },
  { id: 9, name: "Sanjay Gupta", username: "sanjay", phone: "+91 98765 43218", email: "sanjay@prachi.com", status: "Active", lastActivity: "Today, 02:30 PM", lastLogin: "10 Aug 2026, 10:00 AM" },
  { id: 10, name: "Dinesh Chaudhary", username: "dinesh", phone: "+91 98765 43219", email: "dinesh@prachi.com", status: "Active", lastActivity: "Yesterday, 05:00 PM", lastLogin: "09 Aug 2026, 08:00 AM" }
];

export const initialProjects = [
  {
    id: 1,
    name: "Indore-Bhopal Highway Expansion",
    type: "Road",
    client: "MP Road Development Corp (MPRDC)",
    workOrderNumber: "WO-2025/MPRDC-884",
    location: "Indore-Bhopal Highway, MP",
    startDate: "2025-09-01",
    endDate: "2026-12-31",
    contractAmount: 125000000, // ₹12.5 Cr
    estimatedCost: 105000000, // ₹10.5 Cr
    actualExpenses: 68000000, // ₹6.8 Cr
    description: "Four-lane widening and asphalt re-laying of Indore-Bhopal highway section KM 45 to KM 90, including concrete drains and signage.",
    status: "On Track", // "On Track", "At Risk", "Delayed", "Completed"
    progress: 82,
    supervisors: [1, 4] // Assigned supervisor IDs
  },
  {
    id: 2,
    name: "Government Model School Building",
    type: "Building",
    client: "Project Implementation Unit, WDB",
    workOrderNumber: "WO-2026/PIU-091",
    location: "Arera Colony, Bhopal, MP",
    startDate: "2026-01-15",
    endDate: "2027-03-31",
    contractAmount: 48000000, // ₹4.8 Cr
    estimatedCost: 41000000, // ₹4.1 Cr
    actualExpenses: 22000000, // ₹2.2 Cr
    description: "Construction of a 3-storey school structure with classrooms, laboratories, administrative block, and playground facilities.",
    status: "At Risk",
    progress: 61,
    supervisors: [2]
  },
  {
    id: 3,
    name: "Narmada River Bridge",
    type: "Bridge",
    client: "National Highways Authority of India (NHAI)",
    workOrderNumber: "WO-2025/NHAI-002",
    location: "Hoshangabad Bypass, MP",
    startDate: "2025-05-10",
    endDate: "2027-06-30",
    contractAmount: 182000000, // ₹18.2 Cr
    estimatedCost: 155000000, // ₹15.5 Cr
    actualExpenses: 92000000, // ₹9.2 Cr
    description: "Design and construction of pre-stressed concrete girder bridge across Narmada river with 14 piers and approach roads.",
    status: "Delayed",
    progress: 43,
    supervisors: [3, 8]
  },
  {
    id: 4,
    name: "PWD Link Road Project",
    type: "Road",
    client: "Public Works Department (PWD) Ujjain",
    workOrderNumber: "WO-2026/PWD-UJ-442",
    location: "Ujjain-Dewas Link Road, MP",
    startDate: "2026-03-01",
    endDate: "2026-10-31",
    contractAmount: 35000000, // ₹3.5 Cr
    estimatedCost: 30000000, // ₹3.0 Cr
    actualExpenses: 21000000, // ₹2.1 Cr
    description: "Asphalt overlaying, sub-base restoration, and minor culvert work on the link road.",
    status: "On Track",
    progress: 76,
    supervisors: [1, 9]
  },
  {
    id: 5,
    name: "Government Office Building",
    type: "Building",
    client: "Environmental Planning & Coord Org (EPCO)",
    workOrderNumber: "WO-2026/EPCO-118",
    location: "City Center, Gwalior, MP",
    startDate: "2026-05-01",
    endDate: "2027-08-31",
    contractAmount: 62000000, // ₹6.2 Cr
    estimatedCost: 52000000, // ₹5.2 Cr
    actualExpenses: 11000000, // ₹1.1 Cr
    description: "Eco-friendly, energy-efficient administrative building containing multiple department offices and meeting halls.",
    status: "On Track",
    progress: 28,
    supervisors: [5]
  },
  {
    id: 6,
    name: "Bypass Highway Road",
    type: "Road",
    client: "MP Road Development Corp (MPRDC)",
    workOrderNumber: "WO-2026/MPRDC-899",
    location: "Dewas Bypass, Dewas, MP",
    startDate: "2026-02-10",
    endDate: "2026-12-15",
    contractAmount: 84000000, // ₹8.4 Cr
    estimatedCost: 72000000, // ₹7.2 Cr
    actualExpenses: 34000000, // ₹3.4 Cr
    description: "Construction of bypass alignment, bypass earthworks, sub-grade preparation and culverts.",
    status: "On Track",
    progress: 52,
    supervisors: [4]
  },
  {
    id: 7,
    name: "Smart City IT Park Phase 1",
    type: "Building",
    client: "Indore Smart City Dev Ltd (ISCDL)",
    workOrderNumber: "WO-2026/ISCDL-711",
    location: "Super Corridor, Indore, MP",
    startDate: "2026-07-01",
    endDate: "2028-03-31",
    contractAmount: 150000000, // ₹15.0 Cr
    estimatedCost: 130000000, // ₹13.0 Cr
    actualExpenses: 8000000, // ₹80L
    description: "Multi-storey commercial IT building with state-of-the-art HVAC, fire fighting systems, and modern glass facade.",
    status: "On Track",
    progress: 15,
    supervisors: [7, 10]
  },
  {
    id: 8,
    name: "Civil Hospital Expansion Block",
    type: "Building",
    client: "MP Health & Family Welfare Dept",
    workOrderNumber: "WO-2024/HLTH-302",
    location: "Wright Town, Jabalpur, MP",
    startDate: "2024-06-01",
    endDate: "2026-06-30",
    contractAmount: 96000000, // ₹9.6 Cr
    estimatedCost: 85000000, // ₹8.5 Cr
    actualExpenses: 84000000, // ₹8.4 Cr
    description: "Adding a new 100-bed trauma ward building adjacent to the old hospital building, with elevators and piped oxygen lines.",
    status: "Completed",
    progress: 100,
    supervisors: [2, 5]
  },
  {
    id: 9,
    name: "Municipal Sewerage Main Line",
    type: "Infrastructure",
    client: "Sagar Municipal Corporation (SMC)",
    workOrderNumber: "WO-2026/SMC-322",
    location: "Civil Lines, Sagar, MP",
    startDate: "2026-02-15",
    endDate: "2026-11-30",
    contractAmount: 28000000, // ₹2.8 Cr
    estimatedCost: 24000000, // ₹2.4 Cr
    actualExpenses: 12000000, // ₹1.2 Cr
    description: "Laying of 900mm RCC sewage pipeline with manholes, junction chambers and disposal line connection.",
    status: "Delayed",
    progress: 38,
    supervisors: [3]
  }
];

export const initialTasks = [
  {
    id: 1,
    title: "Complete Drainage Work",
    projectId: 1,
    supervisorId: 1,
    description: "Excavation and brickwork lining for drainage canals along Section A (left-hand side).",
    targetQuantity: 200,
    completedQuantity: 150,
    unit: "meters",
    startDate: "2026-07-10",
    deadline: "2026-08-25",
    priority: "High", // "Low", "Medium", "High", "Critical"
    status: "In Progress" // "Pending", "In Progress", "Completed", "Delayed"
  },
  {
    id: 2,
    title: "Lay GSB (Granular Sub-Base) Layer",
    projectId: 1,
    supervisorId: 1,
    description: "Spread and compact GSB layer from chainage 12km to 15km.",
    targetQuantity: 3000,
    completedQuantity: 3000,
    unit: "cum",
    startDate: "2026-06-01",
    deadline: "2026-07-20",
    priority: "Medium",
    status: "Completed"
  },
  {
    id: 3,
    title: "First Floor Slab Casting",
    projectId: 2,
    supervisorId: 2,
    description: "Slab formwork checking, steel bar reinforcement tying, and concrete casting of Block A first floor.",
    targetQuantity: 450,
    completedQuantity: 0,
    unit: "sqm",
    startDate: "2026-08-15",
    deadline: "2026-08-30",
    priority: "Critical",
    status: "Pending"
  },
  {
    id: 4,
    title: "Pier 5 Well Excavation",
    projectId: 3,
    supervisorId: 3,
    description: "Excavation inside Pier 5 well foundation below river bed level to reach solid rock strata.",
    targetQuantity: 18,
    completedQuantity: 12,
    unit: "meters",
    startDate: "2026-07-01",
    deadline: "2026-08-20",
    priority: "Critical",
    status: "In Progress"
  },
  {
    id: 5,
    title: "Laying WMM (Wet Mix Macadam) Layer",
    projectId: 1,
    supervisorId: 4,
    description: "Compaction of WMM layer in Section B from chainage 18km to 20km.",
    targetQuantity: 2000,
    completedQuantity: 1100,
    unit: "cum",
    startDate: "2026-08-01",
    deadline: "2026-09-05",
    priority: "High",
    status: "In Progress"
  },
  {
    id: 6,
    title: "Ground Floor Brickwork",
    projectId: 2,
    supervisorId: 2,
    description: "Construction of 9-inch brick partition walls on the ground floor block B.",
    targetQuantity: 120,
    completedQuantity: 90,
    unit: "cum",
    startDate: "2026-07-20",
    deadline: "2026-08-15",
    priority: "Medium",
    status: "In Progress"
  },
  {
    id: 7,
    title: "Subgrade Compaction",
    projectId: 4,
    supervisorId: 9,
    description: "Soil subgrade compaction and density testing on Link Road section.",
    targetQuantity: 5000,
    completedQuantity: 5000,
    unit: "sqm",
    startDate: "2026-04-10",
    deadline: "2026-05-15",
    priority: "Low",
    status: "Completed"
  },
  {
    id: 8,
    title: "Foundation Concreting",
    projectId: 5,
    supervisorId: 5,
    description: "Pouring concrete footings for the primary pillars of the Gwalior office building.",
    targetQuantity: 250,
    completedQuantity: 220,
    unit: "cum",
    startDate: "2026-07-15",
    deadline: "2026-08-18",
    priority: "High",
    status: "In Progress"
  },
  {
    id: 9,
    title: "Earth excavation for bypass road",
    projectId: 6,
    supervisorId: 4,
    description: "Cutting and filling work for bypass road alignment, section C.",
    targetQuantity: 8000,
    completedQuantity: 4200,
    unit: "cum",
    startDate: "2026-06-15",
    deadline: "2026-09-10",
    priority: "Medium",
    status: "In Progress"
  },
  {
    id: 10,
    title: "Sewer Pipe Alignment & Laying",
    projectId: 9,
    supervisorId: 3,
    description: "Excavation and laying of 900mm sewage pipeline in Sector 4 road.",
    targetQuantity: 800,
    completedQuantity: 240,
    unit: "meters",
    startDate: "2026-06-01",
    deadline: "2026-09-15",
    priority: "High",
    status: "Delayed"
  },
  {
    id: 11,
    title: "Pillar reinforcement tying",
    projectId: 7,
    supervisorId: 7,
    description: "Tying TMT rebars for basement columns.",
    targetQuantity: 45,
    completedQuantity: 15,
    unit: "columns",
    startDate: "2026-08-01",
    deadline: "2026-08-30",
    priority: "High",
    status: "In Progress"
  },
  {
    id: 12,
    title: "Excavation of Basement Area",
    projectId: 7,
    supervisorId: 10,
    description: "Soil excavation up to 6 meters depth for basement double parking.",
    targetQuantity: 15000,
    completedQuantity: 9500,
    unit: "cum",
    startDate: "2026-07-05",
    deadline: "2026-08-25",
    priority: "Medium",
    status: "In Progress"
  },
  {
    id: 13,
    title: "Site clearance and demarcation",
    projectId: 7,
    supervisorId: 10,
    description: "Boundary marking and clearing vegetation from Smart City IT Park land.",
    targetQuantity: 1,
    completedQuantity: 1,
    unit: "job",
    startDate: "2026-07-01",
    deadline: "2026-07-10",
    priority: "Low",
    status: "Completed"
  },
  {
    id: 14,
    title: "Internal plastering of hospital block",
    projectId: 8,
    supervisorId: 5,
    description: "Applying 12mm plastering on internal brick walls of ICU and private rooms.",
    targetQuantity: 12000,
    completedQuantity: 12000,
    unit: "sqm",
    startDate: "2026-02-01",
    deadline: "2026-04-30",
    priority: "High",
    status: "Completed"
  },
  {
    id: 15,
    title: "Piping and medical gas lines",
    projectId: 8,
    supervisorId: 2,
    description: "Installation and testing of oxygen and copper vacuum tubes.",
    targetQuantity: 1800,
    completedQuantity: 1800,
    unit: "meters",
    startDate: "2026-03-15",
    deadline: "2026-06-15",
    priority: "Critical",
    status: "Completed"
  },
  {
    id: 16,
    title: "Asphalt layer laying",
    projectId: 4,
    supervisorId: 1,
    description: "Laying 40mm BC (Bituminous Concrete) layer for PWD link road.",
    targetQuantity: 18000,
    completedQuantity: 12000,
    unit: "sqm",
    startDate: "2026-08-01",
    deadline: "2026-08-20",
    priority: "High",
    status: "In Progress"
  },
  {
    id: 17,
    title: "Pier Cap Casting",
    projectId: 3,
    supervisorId: 8,
    description: "Casting reinforced concrete caps for piers 1, 2 and 3.",
    targetQuantity: 3,
    completedQuantity: 1,
    unit: "caps",
    startDate: "2026-07-15",
    deadline: "2026-08-31",
    priority: "High",
    status: "In Progress"
  },
  {
    id: 18,
    title: "Culvert concrete pour",
    projectId: 6,
    supervisorId: 4,
    description: "RCC box culvert pour at bypass chainage 3.4km.",
    targetQuantity: 2,
    completedQuantity: 1,
    unit: "culverts",
    startDate: "2026-08-05",
    deadline: "2026-08-25",
    priority: "Medium",
    status: "In Progress"
  },
  {
    id: 19,
    title: "Junction Manhole construction",
    projectId: 9,
    supervisorId: 3,
    description: "Constructing precast concrete junction chambers for sewage pipes.",
    targetQuantity: 24,
    completedQuantity: 8,
    unit: "manholes",
    startDate: "2026-07-10",
    deadline: "2026-09-05",
    priority: "Medium",
    status: "In Progress"
  },
  {
    id: 20,
    title: "Brickwork Boundary Wall",
    projectId: 5,
    supervisorId: 5,
    description: "Building 2.1-meter-high perimeter security wall around Gwalior office site.",
    targetQuantity: 600,
    completedQuantity: 480,
    unit: "meters",
    startDate: "2026-06-01",
    deadline: "2026-08-10",
    priority: "Low",
    status: "Delayed"
  },
  {
    id: 21,
    title: "Sub-grade preparation",
    projectId: 1,
    supervisorId: 1,
    description: "Clearing and compacting base earth.",
    targetQuantity: 5000,
    completedQuantity: 5000,
    unit: "sqm",
    startDate: "2026-05-01",
    deadline: "2026-05-25",
    priority: "Medium",
    status: "Completed"
  }
];

export const initialDailyReports = [
  {
    id: 1,
    date: "2026-08-10",
    projectId: 1,
    supervisorId: 1,
    workDescription: "Conducted drainage trench excavation along chainage 45.3km. Cleared 25m of path. Layed 12m of brickwork support. Cement plastering completed for 8m.",
    progressDetails: "Excavation completed for Section A LHS.",
    photos: ["/assets/site_work_1.jpg"], // We will render structured SVG/CSS layouts in frontend
    status: "Approved"
  },
  {
    id: 2,
    date: "2026-08-10",
    projectId: 2,
    supervisorId: 2,
    workDescription: "Ground floor Brickwork continued for Block B rooms 4 and 5. Total 8 cum bricks laid today. Mixer machine was operational.",
    progressDetails: "Ground floor walls 80% complete.",
    photos: ["/assets/site_work_2.jpg"],
    status: "Pending"
  },
  {
    id: 3,
    date: "2026-08-09",
    projectId: 3,
    supervisorId: 3,
    workDescription: "Well excavation for Pier 5 progressed by 0.5 meters. Met hard clay layer. Dewatering pumps working 24 hours.",
    progressDetails: "Excavation depth reached 12.5m.",
    photos: ["/assets/site_work_3.jpg"],
    status: "Approved"
  },
  {
    id: 4,
    date: "2026-08-10",
    projectId: 4,
    supervisorId: 9,
    workDescription: "Asphalt compaction on Link Road. Layed bituminous concrete layer for 250 meters. Heavy road rollers active.",
    progressDetails: "Asphalt layer 70% completed for the project.",
    photos: ["/assets/site_work_4.jpg"],
    status: "Approved"
  },
  {
    id: 5,
    date: "2026-08-08",
    projectId: 5,
    supervisorId: 5,
    workDescription: "Pillar rebar cage tying and formwork placement for column C1, C2. Cement concrete mix ratio 1:1.5:3 used.",
    progressDetails: "Columns C1, C2 ready for pouring.",
    photos: [],
    status: "Approved"
  }
];

export const initialMaterials = [
  // project-wise material stocks
  { id: 1, projectId: 1, name: "Cement", unit: "bags", opening: 500, received: 500, used: 120, current: 880, status: "Good Stock", lastUpdated: "2026-08-10 11:30 AM" },
  { id: 2, projectId: 1, name: "TMT Steel Rebars", unit: "tons", opening: 12, received: 8, used: 5.5, current: 14.5, status: "Good Stock", lastUpdated: "2026-08-10 11:30 AM" },
  { id: 3, projectId: 1, name: "Sand", unit: "brass", opening: 40, received: 30, used: 25, current: 45, status: "Good Stock", lastUpdated: "2026-08-09 04:30 PM" },
  { id: 4, projectId: 2, name: "Bricks", unit: "pcs", opening: 25000, received: 10000, used: 12000, current: 23000, status: "Good Stock", lastUpdated: "2026-08-10 09:15 AM" },
  { id: 5, projectId: 2, name: "Cement", unit: "bags", opening: 200, received: 0, used: 165, current: 35, status: "Critical", lastUpdated: "2026-08-10 09:15 AM" }, // Critical < 50
  { id: 6, projectId: 3, name: "Cement", unit: "bags", opening: 900, received: 300, used: 450, current: 750, status: "Good Stock", lastUpdated: "2026-08-09 05:45 PM" },
  { id: 7, projectId: 3, name: "Aggregates (20mm)", unit: "brass", opening: 80, received: 0, used: 65, current: 15, status: "Low Stock", lastUpdated: "2026-08-09 05:45 PM" },
  { id: 8, projectId: 4, name: "Bitumen (Asphalt)", unit: "drums", opening: 120, received: 150, used: 95, current: 175, status: "Good Stock", lastUpdated: "2026-08-10 02:00 PM" },
  { id: 9, projectId: 9, name: "RCC Sewer Pipe 900mm", unit: "meters", opening: 150, received: 0, used: 120, current: 30, status: "Low Stock", lastUpdated: "2026-08-10 10:00 AM" }
];

export const initialLabour = [
  // project-wise aggregated daily attendance or general record
  { id: 1, projectId: 1, date: "2026-08-10", masons: 8, helpers: 24, operators: 4, electricians: 1, others: 2, total: 39 },
  { id: 2, projectId: 2, date: "2026-08-10", masons: 12, helpers: 18, operators: 1, electricians: 2, others: 1, total: 34 },
  { id: 3, projectId: 3, date: "2026-08-10", masons: 5, helpers: 15, operators: 6, electricians: 1, others: 3, total: 30 },
  { id: 4, projectId: 4, date: "2026-08-10", masons: 2, helpers: 12, operators: 8, electricians: 0, others: 2, total: 24 },
  { id: 5, projectId: 5, date: "2026-08-10", masons: 6, helpers: 10, operators: 2, electricians: 1, others: 1, total: 20 }
];

export const initialIndividualLabour = [
  { id: 1, name: "Karan Singh", role: "Mason", dailyWage: 650, attendance: "Present", projectId: 1 },
  { id: 2, name: "Ramesh Lal", role: "Mason", dailyWage: 650, attendance: "Present", projectId: 1 },
  { id: 3, name: "Sita Ram", role: "Helper", dailyWage: 450, attendance: "Present", projectId: 1 },
  { id: 4, name: "Deepak Yadav", role: "Operator", dailyWage: 800, attendance: "Present", projectId: 1 },
  { id: 5, name: "Ganesh Das", role: "Mason", dailyWage: 650, attendance: "Present", projectId: 2 },
  { id: 6, name: "Manoj Kumar", role: "Helper", dailyWage: 450, attendance: "Present", projectId: 2 },
  { id: 7, name: "Ravi Shankar", role: "Electrician", dailyWage: 700, attendance: "Absent", projectId: 2 },
  { id: 8, name: "Sunil Verma", role: "Helper", dailyWage: 450, attendance: "Present", projectId: 2 }
];

export const initialExpenses = [
  {
    id: 1,
    date: "2026-08-10",
    projectId: 1,
    submittedBy: 1, // supervisorId
    category: "Material", // "Material", "Labour", "Machinery", "Transport", "Fuel", "Other"
    amount: 125000,
    description: "Urgent purchase of 250 bags of local ACC cement due to supply chain delay from main supplier.",
    vendor: "Shree Balaji Cement Traders",
    status: "Approved",
    bill: "bill_cement_indore.pdf"
  },
  {
    id: 2,
    date: "2026-08-10",
    projectId: 2,
    submittedBy: 2,
    category: "Labour",
    amount: 25000,
    description: "Weekly helper wages for local sand-sifting daily wagers.",
    vendor: "Narmada Labour Provider Co.",
    status: "Pending",
    bill: "labour_payment_voucher.pdf"
  },
  {
    id: 3,
    date: "2026-08-09",
    projectId: 3,
    submittedBy: 3,
    category: "Fuel",
    amount: 45000,
    description: "Diesel fuel purchase (500 liters) for concrete mixer trucks and dewatering pump generator.",
    vendor: "HP Fuel Oasis, Hoshangabad",
    status: "Pending",
    bill: "HP_diesel_invoice.pdf"
  },
  {
    id: 4,
    date: "2026-08-08",
    projectId: 1,
    submittedBy: 4,
    category: "Machinery",
    amount: 180000,
    description: "Rent of hydraulic excavator (10 days) including operator wages.",
    vendor: "Earth Movers Rental Bhopal",
    status: "Approved",
    bill: "excavator_rent_slip.pdf"
  },
  {
    id: 5,
    date: "2026-08-07",
    projectId: 4,
    submittedBy: 9,
    category: "Transport",
    amount: 32000,
    description: "Dumping trucks transport charges for lifting excavated waste soil from site to dumping yard.",
    vendor: "Bhopal Cargo Services",
    status: "Rejected",
    bill: "cargo_bill_4412.pdf"
  },
  {
    id: 6,
    date: "2026-08-09",
    projectId: 2,
    submittedBy: 2,
    category: "Other",
    amount: 8500,
    description: "Purchase of basic safety helmets (25 pcs) and safety vests for new site workers.",
    vendor: "Suraksha Safe Equipment Shop",
    status: "Approved",
    bill: "safety_invoice_890.pdf"
  }
];

export const initialIssues = [
  {
    id: 1,
    projectId: 1,
    reportedBy: 1, // supervisorId
    title: "Delay in Subgrade Cement Supply",
    description: "The main supplier has delayed the shipment of 1000 bags of OPC cement. Stock is currently at 880 but will deplete in 2 days if work speed remains constant.",
    priority: "High", // "Low", "Medium", "High", "Critical"
    date: "2026-08-09",
    status: "In Progress", // "Open", "In Progress", "Resolved"
    photos: ["issue_cement_stock.jpg"],
    resolution: ""
  },
  {
    id: 2,
    projectId: 3,
    reportedBy: 3,
    title: "Generator Breakdown at Well Foundation",
    description: "The 125KVA generator powering the dewatering pump broke down due to alternator failure. Water level is rising in Pier 5. Need urgent repair technician.",
    priority: "Critical",
    date: "2026-08-10",
    status: "Open",
    photos: ["gen_breakdown.jpg"],
    resolution: ""
  },
  {
    id: 3,
    projectId: 2,
    reportedBy: 2,
    title: "Labour Shortage due to Harvest Season",
    description: "Masons and helper attendance has fallen from 35 to 18 this week due to local harvesting festival. Work progress is 20% slower.",
    priority: "Medium",
    date: "2026-08-07",
    status: "In Progress",
    photos: [],
    resolution: "Sourcing temporary workers from a different agency in neighboring town."
  },
  {
    id: 4,
    projectId: 9,
    reportedBy: 3,
    title: "Underground Telephone Line Hindrance",
    description: "Encountered an unmarked BSNL underground fiber optical cable at chainage 1.5m during sewer line excavation. Excavation halted to prevent cable cutting.",
    priority: "High",
    date: "2026-08-08",
    status: "Open",
    photos: ["cable_interference.jpg"],
    resolution: ""
  }
];

export const initialPhotos = [
  { id: 1, projectId: 1, supervisorId: 1, url: "progress_road_1.jpg", category: "Work Progress", date: "2026-08-10", description: "Laying GSB on Section A LHS" },
  { id: 2, projectId: 1, supervisorId: 1, url: "material_cement_1.jpg", category: "Material", date: "2026-08-10", description: "Cement bags stack in main site store" },
  { id: 3, projectId: 2, supervisorId: 2, url: "brick_wall_floor1.jpg", category: "Work Progress", date: "2026-08-10", description: "Brick partition walls of class rooms" },
  { id: 4, projectId: 3, supervisorId: 3, url: "pier5_well_excavation.jpg", category: "Work Progress", date: "2026-08-09", description: "Dewatering pumps in well foundation" },
  { id: 5, projectId: 3, supervisorId: 8, url: "pier_cap_girder.jpg", category: "Work Progress", date: "2026-08-08", description: "Pier cap casting finished" },
  { id: 6, projectId: 4, supervisorId: 9, url: "asphalt_compaction.jpg", category: "Work Progress", date: "2026-08-10", description: "Vibratory roller compaction" },
  { id: 7, projectId: 2, supervisorId: 2, url: "safety_kits.jpg", category: "Other", date: "2026-08-07", description: "Distributed helmets and vests to workers" }
];

export const initialNotifications = [
  { id: 1, message: "Rahul Sharma submitted today's report for Indore-Bhopal Highway Expansion.", date: "2026-08-10 10:30 AM", read: false, type: "report" },
  { id: 2, message: "Amit Verma submitted a new expense request of ₹25,000 for Labour.", date: "2026-08-10 09:15 AM", read: false, type: "expense" },
  { id: 3, message: "Suresh Kumar reported a Critical issue: Generator Breakdown at Well Foundation.", date: "2026-08-10 08:30 AM", read: false, type: "issue" },
  { id: 4, message: "Narmada River Bridge project has no daily report submitted for today.", date: "2026-08-10 07:00 AM", read: false, type: "alert" },
  { id: 5, message: "Cement stock is Low (35 bags) at Government Model School Building site.", date: "2026-08-09 05:00 PM", read: true, type: "alert" },
  { id: 6, message: "Admin approved expense of ₹1,80,000 for Indore-Bhopal Highway Expansion.", date: "2026-08-08 04:00 PM", read: true, type: "approval" }
];
