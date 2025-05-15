import { type ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { NotebookPen, Trash, UserPlus } from 'lucide-react';
import { Button } from '../ui/button';

export type SlotDto = {
  id: number;
  slotCode: string;
  status: 'available' | 'occupied';
  description?: string; 
};

export const AdminSlotsColumns: ColumnDef<SlotDto>[] = [
  {
    accessorKey: 'slotCode',
    header: 'Slot Code',
    cell: ({ row }) => (
      <div className="font-medium">{row.original.slotCode}</div>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.original.description || '—'}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        className="flex justify-center items-center"
        variant={row.original.status === 'available' ? 'default' : 'outline'}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: 'actions',
    header: () => (
      <div className="flex justify-center items-center">Actions</div>
    ),
    cell: () => {
      return (
        <div className="flex justify-center gap-2">
          <Button className="!px-[10px] !py-2 rounded-full" title="Edit">
            <NotebookPen size={19} />
          </Button>

          <Button className="!px-[10px] !py-2 rounded-full" title="Delete">
            <Trash size={20} />
          </Button>
        </div>
      );
    },
  },
  {
    id: 'assign',
    header: () => <div className="text-center">Assign</div>,
    cell: ({ row }) => {
      const isAvailable = row.original.status === 'available';
      return isAvailable ? (
        <div className="flex justify-center">
          <Button
            className="!px-[10px] !py-2 rounded-full mx-auto"
            title="Assign"
          >
            <UserPlus size={19} />
          </Button>
        </div>
      ) : (
        <div className="text-muted-foreground text-center">—</div>
      );
    },
  },
];
