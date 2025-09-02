import { Users, Calendar, Map, Tag, Clock, FileText } from 'react-feather';


export const navLinks = [
  { id: 1, label: "Home", path: "/", },
  { id: 2, label: "Checkpoint", path: "/checkpoint", role: "employee" },
  { id: 3, label: "Admin", path: "/admin", role: "admin" },
];



export const adminLinks = [
  { id: 1, label: "Employees", path: "/employees", icon: <Users size={20} /> },
  { id: 2, label: "Parking Report", path: "/parking-report", icon: <Calendar size={20} /> },
  { id: 3, label: "Zones", path: "/zones", icon: <Map size={20} /> },
  { id: 4, label: "Categories", path: "/categories", icon: <Tag size={20} /> },
  { id: 5, label: "Rush Hours", path: "/rush-hours", icon: <Clock size={20} /> },
  { id: 6, label: "Vacations", path: "/vacations", icon: <Calendar size={20} /> },
  { id: 7, label: "Audit Log", path: "/audit-log", icon: <FileText size={20} /> },
];
