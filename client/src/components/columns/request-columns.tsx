/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import {
  useAcceptParkingRequest,
  useRejectParkingRequest,
} from '@/hooks/useParkingRequest';
import { useGetAvailableSlots } from '@/hooks/useslots';

export type RequestDto = {
  id: string;
  requesterName: string;
  vehiclePlateNumber: string;
  createdAt: string;
  status: string;
  duration: string;
};

export const RequestsColumns: ColumnDef<RequestDto>[] = [
  {
    accessorKey: 'requesterName',
    header: 'Name',
    cell: ({ row }) => (
      <div className="font-medium py-2">{row.original.requesterName}</div>
    ),
  },
  {
    accessorKey: 'vehiclePlateNumber',
    header: 'Plate Number',
    cell: ({ row }) => <div>{row.original.vehiclePlateNumber}</div>,
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
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="capitalize font-medium">{row.original.status.toLowerCase()}</div>
    ),
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ row }) => <div>{row.original.duration}</div>,
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const { id, status } = row.original;
      const { mutate: accept } = useAcceptParkingRequest();
      const { mutate: reject } = useRejectParkingRequest();
      const { data: availableSlots = [], isLoading } = useGetAvailableSlots();

      // Only show actions if status is PENDING and slots are available
      const isPending = status.toUpperCase() === 'PENDING';

      if (!isPending || isLoading || availableSlots.length === 0) {
        return null;
      }

      return (
        <div className="flex justify-center gap-2">
          <Button
            className="!px-[10px] !py-2 rounded-full"
            onClick={() => accept(id)}
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
  }
];
