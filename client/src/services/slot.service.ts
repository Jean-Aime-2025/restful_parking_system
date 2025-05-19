import api from '@/lib/api';

export interface CreateSlot {
  code: string;
  occupied: boolean;
  description: string;
}

export interface UpdateSlot {
  id: string;
  code?: string;
  occupied?: boolean;
  description?: string;
}

export const createSlot = (data: CreateSlot) => {
  return api.post('/slot', data);
};

export const updateSlot = (data: UpdateSlot) => {
  return api.patch(`/slot/${data.id}`, data);
};

export const getAvailableSlots = () => {
  return api.get('/slot/available');
};
export const getSlots = () => {
  return api.get('/slot');
};

export const deleteSlot = (slotId: string) => {
  return api.delete(`/slot/${slotId}`);
};

export const deassignSlot = (slotId: string) => {
  return api.post('/slot/deassign', { slotId });
};

