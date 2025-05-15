// components/columns/requests-columns.tsx
import { type ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

export type RequestDto = {
  id: number;
  requesterName: string;
  slotCode: string;
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
    accessorKey: 'slotCode',
    header: 'Slot Code',
    cell: ({ row }) => <div>{row.original.slotCode}</div>,
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const { id } = row.original;

      const handleAccept = () => {
        alert(`Accepted request ${id}`);
      };

      const handleReject = () => {
        alert(`Rejected request ${id}`);
      };

      return (
        <div className="flex justify-center gap-2">
          <Button
            className="!px-[10px] !py-2 rounded-full"
            onClick={handleAccept}
            title="Accept"
          >
            <Check size={16} />
          </Button>
          <Button
            className="!px-[10px] !py-2 rounded-full"
            onClick={handleReject}
            title="Reject"
          >
            <X size={16} />
          </Button>
        </div>
      );
    },
  },
];
