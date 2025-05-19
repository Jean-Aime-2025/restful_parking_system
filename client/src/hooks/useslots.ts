/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createSlot,
  deassignSlot,
  deleteSlot,
  getAvailableSlots,
  // getAvailableSlots,
  getSlots,
  updateSlot,
  type CreateSlot,
  type UpdateSlot,
} from '@/services/slot.service';
import { toast } from 'sonner';

export const useGetSlots = () =>
  useQuery({
    queryKey: ['slots'],
    queryFn: async () => {
      const response = await getSlots();
      return response.data;
    },
  });
  
export const useGetAvailableSlots = () =>
  useQuery({
    queryKey: ['slots'],
    queryFn: async () => {
      const response = await getAvailableSlots();
      return response.data;
    },
  });

export const useCreateSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSlot) => createSlot(data),
    onSuccess: () => {
      toast.success('Slot created successfully');
      queryClient.invalidateQueries({ queryKey: ['slots'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create slot');
    },
  });
};

export const useUpdateSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateSlot) => updateSlot(data),
    onSuccess: () => {
      toast.success('Slot updated successfully');
      queryClient.invalidateQueries({ queryKey: ['slots'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update slot');
    },
  });
};

export const useDeleteSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slotId: string) => deleteSlot(slotId),
    onSuccess: () => {
      toast.success('Slot deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['slots'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete slot');
    },
  });
};

export const useDeassignSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slotId: string) => deassignSlot(slotId),
    onSuccess: () => {
      toast.success('Slot deassigned successfully');
      queryClient.invalidateQueries({ queryKey: ['slots'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || 'Failed to deassign slot');
    },
  });
};