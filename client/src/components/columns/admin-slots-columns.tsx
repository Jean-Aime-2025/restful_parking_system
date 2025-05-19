/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { NotebookPen, Trash, Undo2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import EditSlotForm from '../common/edit-slot-form';
import { useState } from 'react';
import { useDeassignSlot, useDeleteSlot } from '@/hooks/useslots';

export type SlotDto = {
  id: string;
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
    cell: ({ row }) => {
      const [editOpen, setEditOpen] = useState(false);
      const [deleteOpen, setDeleteOpen] = useState(false);
      const slot = row.original;

      const deleteMutation = useDeleteSlot();

      const handleDelete = () => {
        deleteMutation.mutate(slot.id, {
          onSuccess: () => setDeleteOpen(false),
        });
      };

      return (
        <div className="flex justify-center gap-2">
          {/* Edit dialog */}
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <Button className="!px-[10px] !py-2 rounded-full" title="Edit">
                <NotebookPen size={19} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] px-[3%] py-10 rounded-3xl">
              <DialogHeader className="flex flex-col gap-4">
                <DialogTitle className="text-2xl">Edit Slot</DialogTitle>
              </DialogHeader>
              <EditSlotForm setOpen={setEditOpen} slot={slot} />
            </DialogContent>
          </Dialog>

          {/* Delete dialog */}
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger asChild>
              <Button className="!px-[10px] !py-2 rounded-full" title="Delete">
                <Trash size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="flex flex-col gap-4">
                <DialogTitle className="text-2xl">
                  Are you absolutely sure?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  this slot and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
  {
    id: 'revoke',
    header: 'Revoke',
    cell: ({ row }) => {
      const [revokeOpen, setRevokeOpen] = useState(false);
      const slot = row.original;
      const deassignMutation = useDeassignSlot();

      const handleDeassign = () => {
        deassignMutation.mutate(slot.id, {
          onSuccess: () => setRevokeOpen(false),
        });
      };

      return slot.status === 'occupied' ? (
        <Dialog open={revokeOpen} onOpenChange={setRevokeOpen}>
          <DialogTrigger asChild>
            <Button className="!px-[10px] !py-2 rounded-full" title="Delete">
              <Undo2 size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="flex flex-col gap-4">
              <DialogTitle className="text-2xl">
                Are you absolutely sure?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently devoke this
                slot from user and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleDeassign}
                disabled={deassignMutation.isPending}
              >
                {deassignMutation.isPending ? 'Revoking...' : 'Revoke'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    },
  },
];
