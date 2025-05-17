import api from "@/lib/api";

export const requestSlot = (slotId: string) => {
  return api.post(`/request-slot/request/${slotId}`);
};

export const getAllSlotRequests = () => {
  return api.get(`/request-slot/requests/pending-with-slot`);
};

export const acceptRequest = (requestId: string, slotId: string) => {
  return api.patch(`/request-slot/requests/${requestId}/accept`, {
    slotId,
  });
};

export const rejectRequest = (requestId: string) => {
  return api.patch(`/request-slot/requests/${requestId}/reject`);
};