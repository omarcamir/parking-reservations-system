export interface EmployeeProps {
  id: string;
  name: string;
  role: string;
  email: string;
  createdAt?: string; 
  updatedAt?: string;  
}

export interface ParkingReportProps {
  zone: string;
  occupied: number;
  capacity: number;
  isOpen: boolean;
}

export interface ZoneProps {
  id: string;
  name: string;
  isOpen: boolean;
}

export interface CategoryProps {
  id: string;
  name: string;
  normalRate: number;
  specialRate: number;
}

export interface RushHourProps {
  id: string;
  weekday: string;
  from: string;
  to: string;
}

export interface VacationProps {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
}

export interface AuditLogProps {
  timestamp: string;
  admin: string;
  action: string;
}
