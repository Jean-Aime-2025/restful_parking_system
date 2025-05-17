/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { useAcceptRequest, useRejectRequest } from '@/hooks/useSlotRequest';

export type RequestDto = {
  id: string;
  requesterName: string;
  requesterEmail: string;
  slotCode: string;
  slotDescription: string;
  createdAt: string;
  slotId: string;
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
    accessorKey: 'slotCode',
    header: 'Slot Code',
    cell: ({ row }) => <div>{row.original.slotCode}</div>,
  },
  {
    accessorKey: 'slotDescription',
    header: 'Slot Description',
    cell: ({ row }) => <div>{row.original.slotDescription}</div>,
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
      const { mutate: accept } = useAcceptRequest();
      const { mutate: reject } = useRejectRequest();

      return (
        <div className="flex justify-center gap-2">
          <Button
            className="!px-[10px] !py-2 rounded-full"
            onClick={() => accept({ requestId: id, slotId: row.original.slotId })}
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
