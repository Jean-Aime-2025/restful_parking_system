/* eslint-disable @typescript-eslint/no-explicit-any */

import { RequestsColumns, type RequestDto } from '@/components/columns/request-columns';
import { DataTable } from '@/components/common/data-table';
import { useAllParkingRequests } from '@/hooks/useParkingRequest';
// import { useGetAllRequests } from '@/hooks/useSlotRequest';

const Requests = () => {
  const { data: requests, isLoading, isError } = useAllParkingRequests();

  const tableData: RequestDto[] =
    requests?.map((req: any) => ({
      id: req.id,
      requesterName: req.user?.names ?? 'Unknown',
      requesterEmail: req.user?.email ?? 'N/A',
      slotCode: req.user?.assignedSlot?.code ?? 'N/A',
      slotDescription: req.user?.assignedSlot?.description ?? 'N/A',
      slotId: req.user?.assignedSlot?.id ?? '',
      createdAt: req.createdAt,
    })) ?? [];


  if (isError) {
    return (
      <div className="text-center text-red-500 font-medium">
        Failed to load requests.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
      <DataTable<RequestDto>
        data={tableData}
        isLoading={isLoading}
        columns={RequestsColumns}
        searchEnabled
        message={'No requests found"'}
      />
    </div>
  );
};

export default Requests;
