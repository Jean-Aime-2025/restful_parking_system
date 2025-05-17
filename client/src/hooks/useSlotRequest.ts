/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllSlotRequests,
  acceptRequest,
  rejectRequest,
} from '@/services/slotRequest.service'
import { toast } from 'sonner';

export const useGetAllRequests = () => {
  return useQuery({
    queryKey: ['slot-requests'],
    queryFn: getAllSlotRequests,
    select: (data) => data.data.requests,
  });
};

export const useAcceptRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestId: string) => acceptRequest(requestId),
    onSuccess: (data) => {
      toast.success(data.data.message || 'Request approved');
      queryClient.invalidateQueries({ queryKey: ['slot-requests'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to approve request');
    },
  });
};

export const useRejectRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestId: string) => rejectRequest(requestId),
    onSuccess: (data) => {
      toast.info(data.data.message || 'Request rejected');
      queryClient.invalidateQueries({ queryKey: ['slot-requests'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to reject request');
    },
  });
};