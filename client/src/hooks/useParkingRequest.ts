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
export const useAcceptParkingRequest = () =>
  useMutation({
    mutationFn: (requestId: string) => acceptParkingRequest(requestId),
    onSuccess: () => {
      toast.success('Parking request accepted!');
    },
    onError: (error: any) => {
      console.error(error);
      toast.error('Failed to accept parking request. Please try again.');
    },
  });

// Admin: reject request
export const useRejectParkingRequest = () =>
  useMutation({
    mutationFn: (requestId: string) => rejectParkingRequest(requestId),
    onSuccess: () => {
      toast.success('Parking request rejected.');
    },
    onError: (error: any) => {
      console.error(error);
      toast.error('Failed to reject parking request. Please try again.');
    },
  });

// Admin: get pending requests
export const usePendingParkingRequests = () =>
  useQuery({
    queryKey: ['pendingParkingRequests'],
    queryFn: getPendingRequests,
  });
