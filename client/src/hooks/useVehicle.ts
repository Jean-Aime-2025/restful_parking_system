import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { vehicleService } from '@/services/vehicle.service';
import { toast } from 'sonner';

export const useCreateVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateVehicleDto) => vehicleService.createVehicle(data),
    onSuccess: () => {
      toast.success('Vehicle created successfully!');
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: () => {
      toast.error('Failed to create vehicle.');
    }
  });
};

export const useGetMyVehicles = () => {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: () => vehicleService.getMyVehicles(),
  });
};

export const useGetVehicleById = (id: string) => {
  return useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => vehicleService.getVehicleById(id),
    enabled: !!id,
  });
};

export const useUpdateVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateVehicleDto }) =>
      vehicleService.updateVehicle(id, data),
    onSuccess: () => {
      toast.success('Vehicle updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: () => {
      toast.error('Failed to update vehicle.');
    },
  });
};

export const useDeleteVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => vehicleService.deleteVehicle(id),
    onSuccess: () => {
      toast.success('Vehicle deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: () => {
      toast.error('Failed to delete vehicle.');
    },
  });
};
