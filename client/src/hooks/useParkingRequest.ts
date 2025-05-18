/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createParkingRequest,
  getMyParkingRequests,
  getAllParkingRequests,
  acceptParkingRequest,
  rejectParkingRequest,
  getPendingRequests,
} from '@/services/parkingRequest.service';
import { toast } from 'sonner';

// Create parking request (user)
export const useCreateParkingRequest = (
  setOpen: (open: boolean) => void,
  setIsPending: (val: boolean) => void
) =>
  useMutation({
    mutationFn: (data: CreateParkingRequestDto) => createParkingRequest(data),
    onSuccess: () => {
      toast.success('Parking request created successfully!');
      setIsPending(false);
      setOpen(false);
    },
    onError: (error: any) => {
      console.error(error);
      toast.error('Failed to create parking request. Please try again.');
      setIsPending(false);
    },
  });

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
export const useAcceptParkingRequest = (
  onSuccess?: () => void,
  onError?: (error: any) => void
) =>
  useMutation({
    mutationFn: (requestId: string) => acceptParkingRequest(requestId),
    onSuccess,
    onError,
  });

// Admin: reject request
export const useRejectParkingRequest = (
  onSuccess?: () => void,
  onError?: (error: any) => void
) =>
  useMutation({
    mutationFn: (requestId: string) => rejectParkingRequest(requestId),
    onSuccess,
    onError,
  });

// Admin: get pending requests
export const usePendingParkingRequests = () =>
  useQuery({
    queryKey: ['pendingParkingRequests'],
    queryFn: getPendingRequests,
  });
