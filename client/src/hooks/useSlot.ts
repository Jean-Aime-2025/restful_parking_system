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

// 🔹 Get current user profile
export const useUserProfile = () =>
  useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });

// 🔹 Get slots (optional: by slotId)
export const useGetSlots = (slotId?: string) =>
  useQuery({
    queryKey: ["slots", slotId],
    queryFn: () => getSlots(slotId),
  });

// 🔹 Create slot
export const useCreateSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSlot) => createSlot(data),
    onSuccess: () => {
      toast.success("Slot created successfully");
      queryClient.invalidateQueries({ queryKey: ["slots"] });
    },
    onError: () => {
      toast.error("Failed to create slot");
    },
  });
};

// 🔹 Update slot
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

// 🔹 Assign slot
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

// 🔹 Delete slot
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
