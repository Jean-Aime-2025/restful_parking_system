import { getUser } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';

export const useGetUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await getUser();
      return response.data;
    },
  });
