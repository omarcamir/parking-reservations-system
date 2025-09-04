export interface EmployeeProps {
  id: string;
  name: string;
  role: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type UserPostRequestProps = {
  username: string;
  name: string;
  role: string;
  password: string;
};

export type ParkingReportProps = {
  zoneId: string;
  name: string;
  totalSlots: number;
  occupied: number;
  free: number;
  reserved: number;
  availableForVisitors: number;
  availableForSubscribers: number;
  subscriberCount: number;
  open: boolean;
};

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
