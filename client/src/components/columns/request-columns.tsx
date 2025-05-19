/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { useAcceptParkingRequest, useRejectParkingRequest } from '@/hooks/useParkingRequest';

export type RequestDto = {
  id: string;
  requesterName: string;
  requesterEmail: string;
  createdAt: string;
};

export const RequestsColumns: ColumnDef<RequestDto>[] = [
  {
    accessorKey: 'requesterName',
    header: 'Name',
    cell: ({ row }) => (
      <div className="font-medium">{row.original.requesterName}</div>
    ),
  },
  {
    accessorKey: 'requesterEmail',
    header: 'Email',
    cell: ({ row }) => <div>{row.original.requesterEmail}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Requested At',
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return <div>{date.toLocaleString()}</div>;
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const { id } = row.original;
      const { mutate: accept } = useAcceptParkingRequest();
      const { mutate: reject } = useRejectParkingRequest();

      return (
        <div className="flex justify-center gap-2">
          <Button
            className="!px-[10px] !py-2 rounded-full"
            onClick={() => accept(row.original.id)}
            title="Accept"
          >
            <Check size={16} />
          </Button>
          <Button
            className="!px-[10px] !py-2 rounded-full"
            onClick={() => reject(id)}
            title="Reject"
          >
            <X size={16} />
          </Button>
        </div>
      );
    },
  },
];
