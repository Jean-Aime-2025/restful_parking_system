import api from "@/lib/api";
import type { AxiosResponse } from "axios";

export interface AdminDashboardData {
  totalSlots: number;
  totalRequests: number;
  availableSlots: number;
  occupiedSlots: number;
}

export interface UserDashboardData {
  slotInfo: string;
  slotStatus: string;
  requestStatus: string;
}

export const fetchAdminDashboard = (): Promise<AxiosResponse<AdminDashboardData>> => {
  return api.get('/admin/dashboard');
};

export const fetchUserDashboard = (): Promise<AxiosResponse<UserDashboardData>> => {
  return api.get('/dashboard/user');
};
