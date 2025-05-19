import api from "@/lib/api";
import type { AxiosResponse } from "axios";

export interface AdminDashboardData {
  totalSlots: number;
  totalRequests: number;
  availableSlots: number;
  occupiedSlots: number;
}

export interface Request {
  id: string;
  userId: string;
  vehicleId: string;
  status: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  notes: string;
}

export interface UserDashboardData {
  pendingRequest: Request | null;
  recentRequests: Request[];
  vehicleCount: number
}


export const fetchAdminDashboard = (): Promise<AxiosResponse<AdminDashboardData>> => {
  return api.get('/admin/dashboard');
};

export const fetchUserDashboard = (): Promise<AxiosResponse<UserDashboardData>> => {
  return api.get('/dashboard/user');
};
