import api from "@/lib/api";

export const vehicleService = {
  createVehicle: async (data: CreateVehicleDto): Promise<Vehicle> => {
    const res = await api.post('/vehicles', data);
    return res.data;
  },

  getMyVehicles: async (): Promise<Vehicle[]> => {
    const res = await api.get('/vehicles');
    return res.data;
  },

  getVehicleById: async (id: string): Promise<Vehicle> => {
    const res = await api.get(`/vehicles/${id}`);
    return res.data;
  },

  updateVehicle: async (id: string, data: UpdateVehicleDto): Promise<Vehicle> => {
    const res = await api.put(`/vehicles/${id}`, data);
    return res.data;
  },

  deleteVehicle: async (id: string): Promise<{ message: string }> => {
    const res = await api.delete(`/vehicles/${id}`);
    return res.data;
  }
};
