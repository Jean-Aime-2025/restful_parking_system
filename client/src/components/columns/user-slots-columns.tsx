import { type ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export type UserSlotDto = {
  id: number;
  slotCode: string;
  description?: string;
};

export const UserSlotsColumns: ColumnDef<UserSlotDto>[] = [
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

      const handleRequest = () => {
        alert(`Requested slot ${row.original.slotCode} (id: ${id})`);
      };

      return (
        <div className="flex justify-center">
          <Button
            variant="default"
            className="!px-[10px] !py-2 rounded-full"
            onClick={handleRequest}
            title="Request Slot"
          >
            <Plus size={16} />
          </Button>
        </div>
      );
    },
  },
];
