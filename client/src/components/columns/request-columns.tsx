/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Check, Loader2, X } from 'lucide-react';
import {
  useAcceptParkingRequest,
  useRejectParkingRequest,
} from '@/hooks/useParkingRequest';
import { useGetAvailableSlots } from '@/hooks/useslots';
import { useState } from 'react';

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
    cell: ({ row }) => {
      const status = row.original.status.toUpperCase();
      const colorClass =
        status === 'APPROVED'
          ? 'text-green-600'
          : status === 'REJECTED'
            ? 'text-red-600'
            : status === 'PENDING'
              ? 'text-yellow-600'
              : 'text-gray-500';

      return (
        <div className={`uppercase font-medium ${colorClass}`}>
          {status.toLowerCase()}
        </div>
      );
    },
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
      const { data: availableSlots = [], isLoading: loadingSlots } = useGetAvailableSlots();

      const [loadingAction, setLoadingAction] = useState<'accept' | 'reject' | null>(null);

      const { mutate: accept } = useAcceptParkingRequest();
      const { mutate: reject } = useRejectParkingRequest();

      const isPending = status.toUpperCase() === 'PENDING';

      if (!isPending || loadingSlots || availableSlots.length === 0) {
        return null;
      }

      const handleAccept = () => {
        setLoadingAction('accept');
        accept(id, {
          onSettled: () => setLoadingAction(null),
        });
      };

      const handleReject = () => {
        setLoadingAction('reject');
        reject(id, {
          onSettled: () => setLoadingAction(null),
        });
      };

      return (
        <div className="flex justify-center gap-2">
          <Button
            className="!px-[10px] !py-2 rounded-full"
            onClick={handleAccept}
            title="Accept"
            disabled={loadingAction !== null}
          >
            {loadingAction === 'accept' ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Check size={16} />
            )}
          </Button>
          <Button
            className="!px-[10px] !py-2 rounded-full"
            onClick={handleReject}
            title="Reject"
            disabled={loadingAction !== null}
          >
            {loadingAction === 'reject' ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <X size={16} />
            )}
          </Button>
        </div>
      );
    },
  }

];
