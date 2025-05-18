import api from '@/lib/api';

// 1. Create parking request
export const createParkingRequest = async (data: CreateParkingRequestDto): Promise<ParkingRequest> => {
  const response = await api.post('/requests', data);
  return response.data;
};

// 2. Get user’s parking requests
export const getMyParkingRequests = async (): Promise<ParkingRequest[]> => {
  const response = await api.get('/requests/my');
  return response.data;
};

// 3. Get all requests (admin)
export const getAllParkingRequests = async (): Promise<ParkingRequest[]> => {
  const response = await api.get('/requests/all');
  return response.data;
};

// 4. Accept request
export const acceptParkingRequest = async (requestId: string): Promise<{ message: string }> => {
  const response = await api.patch(`/requests/accept/${requestId}`);
  return response.data;
};

// 5. Reject request
export const rejectParkingRequest = async (requestId: string): Promise<{ message: string }> => {
  const response = await api.patch(`/requests/reject/${requestId}`);
  return response.data;
};

// 6. Get pending requests (admin)
export const getPendingRequests = async (): Promise<ParkingRequest[]> => {
  const response = await api.get('/requests/pending-requests');
  return response.data;
};
