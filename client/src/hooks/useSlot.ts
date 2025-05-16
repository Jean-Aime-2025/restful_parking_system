import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  assignSlot,
  createSlot,
  deleteSlot,
  getSlots,
  getUserProfile,
  updateSlot,
  type CreateSlot,
  type UpdateSlot,
  type AssignSlot,
} from "@/services/slot.service";
import { toast } from "sonner";

export const useUserProfile = () =>
  useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });

export const useGetSlots = (slotId?: string) =>
  useQuery({
    queryKey: ["slots", slotId],
    queryFn: () => getSlots(slotId),
  });

export const useCreateSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSlot) => createSlot(data),
    onSuccess: () => {
      toast.success("Slot created successfully");
      queryClient.invalidateQueries({ queryKey: ["slots"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error:any) => {
      toast.error(error?.response?.data?.message || 'Failed to create slot');
    },
  });
};

export const useUpdateSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateSlot) => updateSlot(data),
    onSuccess: () => {
      toast.success("Slot updated successfully");
      queryClient.invalidateQueries({ queryKey: ["slots"] });
    },
    onError: () => {
      toast.error("Failed to update slot");
    },
  });
};

export const useAssignSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AssignSlot) => assignSlot(data),
    onSuccess: () => {
      toast.success("Slot assigned successfully");
      queryClient.invalidateQueries({ queryKey: ["slots"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: () => {
      toast.error("Failed to assign slot");
    },
  });
};

export const useDeleteSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slotId: string) => deleteSlot(slotId),
    onSuccess: () => {
      toast.success("Slot deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["slots"] });
    },
    onError: () => {
      toast.error("Failed to delete slot");
    },
  });
};
