/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createParkingRequest,
  getMyParkingRequests,
  getAllParkingRequests,
  acceptParkingRequest,
  rejectParkingRequest,
  getPendingRequests,
  editParkingRequest,
  cancelParkingRequest,
} from '@/services/parkingRequest.service';
import { toast } from 'sonner';

// Create parking request (user)
export const useCreateParkingRequest = (
  setOpen: (open: boolean) => void,
  setIsPending: (val: boolean) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateParkingRequestDto) => createParkingRequest(data),
    onSuccess: () => {
      toast.success('Parking request created successfully!');
      setIsPending(false);
      setOpen(false);

      // Invalidate user-specific requests
      queryClient.invalidateQueries({ queryKey: ['myParkingRequests'] });
    },
    onError: (error: any) => {
      console.error(error);
      const errorMessage =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to create parking request.';
      toast.error(errorMessage);
    },
  });
};

// Get my requests
export const useMyParkingRequests = () =>
  useQuery({
    queryKey: ['myParkingRequests'],
    queryFn: getMyParkingRequests,
  });

// Admin: get all requests
export const useAllParkingRequests = () =>
  useQuery({
    queryKey: ['allParkingRequests'],
    queryFn: getAllParkingRequests,
  });

// Admin: accept request
export const useAcceptParkingRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestId: string) => acceptParkingRequest(requestId),
    onSuccess: () => {
      toast.success('Parking request accepted!');

      // Invalidate admin views
      queryClient.invalidateQueries({ queryKey: ['allParkingRequests'] });
      queryClient.invalidateQueries({ queryKey: ['pendingParkingRequests'] });
    },
    onError: (error: any) => {
      console.error(error);
      const errorMessage =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to accept parking request.';
      toast.error(errorMessage);
    },
  });
};

// Admin: reject request
export const useRejectParkingRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestId: string) => rejectParkingRequest(requestId),
    onSuccess: () => {
      toast.success('Parking request rejected.');

      // Invalidate admin views
      queryClient.invalidateQueries({ queryKey: ['allParkingRequests'] });
      queryClient.invalidateQueries({ queryKey: ['pendingParkingRequests'] });
    },
    onError: (error: any) => {
      console.error(error);
      const errorMessage =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to reject parking request.';
      toast.error(errorMessage);
    },
  });
};

// Admin: get pending requests
export const usePendingParkingRequests = () =>
  useQuery({
    queryKey: ['pendingParkingRequests'],
    queryFn: getPendingRequests,
  });

// Hook for editing a request
export const useEditParkingRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      requestId,
      data,
    }: {
      requestId: string;
      data: { startTime: Date; endTime: Date; notes?: string };
      //@ts-ignore
    }) => editParkingRequest(requestId, data),
    onSuccess: () => {
      toast.success('Request updated successfully');
      queryClient.invalidateQueries({ queryKey: ['myParkingRequests'] }); // refetch user requests
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || 'Failed to update request');
    },
  });
};

// Hook for canceling a request
export const useCancelParkingRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestId: string) => cancelParkingRequest(requestId),
    onSuccess: () => {
      toast.success('Request canceled successfully');
      queryClient.invalidateQueries({ queryKey: ['myParkingRequests'] }); // refetch user requests
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || 'Failed to cancel request');
    },
  });
};
