import { requestColumns } from '@/components/columns/user-request-columns';
import { DataTable } from '@/components/common/data-table';
import RequestDialog from '@/components/common/RequestDialog';
import { useMyParkingRequests } from '@/hooks/useParkingRequest';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const UserRequests = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: requests, isLoading } = useMyParkingRequests();

  const handleAddVehicle = () => {
    setDialogOpen(true);
  };

  return (
    <div className="p-6">
      <DataTable
        data={requests ?? []}
        columns={requestColumns}
        searchEnabled
        isLoading={isLoading}
        addButtonIcon={<Plus className="w-5 h-5 text-white" />}
        addButtonTitle="Add Request"
        onAdd={handleAddVehicle}
        message="No Requests found"
      />
      <RequestDialog open={dialogOpen} setOpen={setDialogOpen} />
    </div>
  );
};

export default UserRequests;
