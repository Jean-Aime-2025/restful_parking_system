interface CreateParkingRequestDto {
  vehicleId: string;
  startTime: string; 
  endTime: string;   
  notes?: string;
}

type ParkingRequestStatus = 'PENDING' | 'APPROVED' | 'DENIED';

interface ParkingRequest {
  id: string;
  userId: string;
  vehicleId: string;
  startTime: string;
  endTime: string;
  notes: string;
  status: ParkingRequestStatus;
  createdAt: string;
  updatedAt: string;
  vehicle: {
    id: string;
    licensePlate: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
    assignedSlotId?: string | null;
    assignedSlot?: {
      id: string;
      label: string;
    };
  };
}

interface CreateVehicleDto {
  platenumber: string;
  model: string;
  color?: string;
}

interface UpdateVehicleDto {
  platenumber?: string;
  model?: string;
  color?: string;
}

interface Vehicle {
  id: string;
  platenumber: string;
  model: string;
  color?: string;
  createdAt: string;
  userId: string;
}
