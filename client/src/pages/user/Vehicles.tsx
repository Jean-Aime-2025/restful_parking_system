import { vehicleColumns } from '@/components/columns/vehicle-columns';
import { DataTable } from '@/components/common/data-table';
import VehicleFormDialog from '@/components/common/vehicle-form-dialog';
import { useGetMyVehicles } from '@/hooks/useVehicle';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const Vehicles = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: vehicles, isLoading } = useGetMyVehicles();

  const handleAddVehicle = () => {
    setDialogOpen(true);
  };

  return (
    <div className="p-6">
      <DataTable
        data={vehicles ?? []}
        columns={vehicleColumns}
        searchEnabled
        isLoading={isLoading}
        addButtonIcon={<Plus className="w-5 h-5 text-white" />}
        addButtonTitle="Add Vehicle"
        onAdd={handleAddVehicle}
        message="No vehicles found"
      />
      <VehicleFormDialog open={dialogOpen} setOpen={setDialogOpen} />
    </div>
  );
};

export default Vehicles;
