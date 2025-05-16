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

export interface AssignSlot {
  slotId: string;
  userId: string;
}

export const createSlot = (data: CreateSlot) => {
  return api.post('/slot', data);
};

export const updateSlot = (data: UpdateSlot) => {
  return api.patch(`/slot/${data.id}`, data);
};

export const assignSlot = (data: AssignSlot) => {
  return api.post('/slot/assign', data);
};

export const getSlots = (slotId?: string) => {
  return api.get('/slot', {
    params: slotId ? { slotId } : undefined,
  });
};

export const deleteSlot = (slotId: string) => {
  return api.delete('/slot', {
    params: { slotId },
  });
};

export const getUserProfile = () => api.get('/user/me');
