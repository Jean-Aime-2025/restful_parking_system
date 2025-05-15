'use client';

import { RequestsColumns, type RequestDto } from '@/components/columns/request-columns';
import { DataTable } from '@/components/common/data-table';

// Mock requests data
const requestsData: RequestDto[] = [
  { id: 1, requesterName: 'Alice Johnson', slotCode: 'A001' },
  { id: 2, requesterName: 'Bob Smith', slotCode: 'A005' },
  { id: 3, requesterName: 'Charlie Davis', slotCode: 'A003' },
  { id: 4, requesterName: 'Diana Prince', slotCode: 'A007' },
  { id: 5, requesterName: 'Ethan Hunt', slotCode: 'A002' },
];

const Requests = () => {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
      <DataTable<RequestDto>
        data={requestsData}
        columns={RequestsColumns}
        searchEnabled={true}
        message="No requests found"
      />
    </div>
  );
};

export default Requests;
