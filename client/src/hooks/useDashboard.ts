import { fetchAdminDashboard, fetchUserDashboard, type AdminDashboardData, type UserDashboardData } from '@/services/dashboard.service';
import { useQuery } from '@tanstack/react-query';

export const useAdminDashboard = () => {
  return useQuery<AdminDashboardData>({
    queryKey: ['adminDashboard'],
    queryFn: async () => {
      const response = await fetchAdminDashboard();
      return response.data;
    }
  });
};

export const useUserDashboard = () => {
  return useQuery<UserDashboardData>({
    queryKey: ['userDashboard'],
    queryFn: async () => {
      const response = await fetchUserDashboard();
      return response.data;
    }
  });
};
