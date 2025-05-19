/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table';
import { NotebookPen, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useDeleteVehicle } from '@/hooks/useVehicle';
import EditVehicleForm from '../common/edit-vehicle-form';

export const vehicleColumns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: 'platenumber',
    header: 'Plate Number',
    cell: ({ row }) => (
      <div className="font-medium">{row.original.platenumber}</div>
    ),
  },
  {
    accessorKey: 'model',
    header: 'Model',
    cell: ({ row }) => <div>{row.original.model}</div>,
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => <div>{row.original.color || '-'}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </div>
    ),
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const vehicle = row.original;
      const [editOpen, setEditOpen] = useState(false);
      const [deleteOpen, setDeleteOpen] = useState(false);
      const deleteMutation = useDeleteVehicle();

      const handleDelete = () => {
        deleteMutation.mutate(vehicle.id, {
          onSuccess: () => setDeleteOpen(false),
        });
      };

      return (
        <div className="flex justify-center gap-2">
          {/* Edit Dialog */}
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <Button className="!px-[10px] !py-2 rounded-full" title="Edit">
                <NotebookPen size={18} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] px-[3%] py-10 rounded-3xl">
              <DialogHeader className="flex flex-col gap-4">
                <DialogTitle className="text-2xl">Edit Vehicle</DialogTitle>
              </DialogHeader>
              <EditVehicleForm setOpen={setEditOpen} vehicle={vehicle} />
            <DialogClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DialogClose>
            </DialogContent>
          </Dialog>

          {/* Delete Dialog */}
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger asChild>
              <Button className="!px-[10px] !py-2 rounded-full" title="Delete">
                <Trash size={18} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="flex flex-col gap-4">
                <DialogTitle className="text-2xl">Are you sure?</DialogTitle>
                <DialogDescription>
                  This action will permanently delete this vehicle.
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
];
