/* eslint-disable @typescript-eslint/no-explicit-any */

import { RequestsColumns, type RequestDto } from '@/components/columns/request-columns';
import { DataTable } from '@/components/common/data-table';
import { useAllParkingRequests } from '@/hooks/useParkingRequest';

const Requests = () => {
  const { data: requests, isLoading, isError } = useAllParkingRequests();

  const tableData: RequestDto[] =
    requests?.map((req: any) => {
      const start = new Date(req.startTime);
      const end = new Date(req.endTime);
      const diffInMs = end.getTime() - start.getTime();
      const durationInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

      return {
        id: req.id,
        requesterName: req.user?.names ?? 'Unknown',
        vehiclePlateNumber: req.vehicle?.platenumber ?? 'N/A',
        createdAt: req.createdAt,
        status: req.status ?? 'UNKNOWN',
        duration: `${durationInDays} day${durationInDays > 1 ? 's' : ''}`,
      };
    }) ?? [];


  console.log(requests)

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
