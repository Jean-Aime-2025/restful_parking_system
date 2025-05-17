/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRequestSlot } from '@/hooks/useSlot';

export type SlotDto = {
  id: number;
  slotCode: string;
  description?: string;
};

export const UserSlotsColumns: ColumnDef<SlotDto>[] = [
  {
    accessorKey: 'slotCode',
    header: 'Available Slot',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.slotCode}</div>
        <div className="text-muted-foreground text-sm">{row.original.description || '—'}</div>
      </div>
    ),
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const { id } = row.original;
      const mutation = useRequestSlot();

      const handleRequest = () => {
        mutation.mutate(id.toString());
      };

      return (
        <div className="flex justify-center">
          <Button
            variant="default"
            className="!px-[10px] !py-2 rounded-full"
            onClick={handleRequest}
            title="Request Slot"
            disabled={mutation.isPending}
          >
            <Plus size={16} />
          </Button>
        </div>
      );
    },
  },
];
