'use client';

import { Plus } from 'lucide-react';
import {
  AdminSlotsColumns,
  type SlotDto,
} from '@/components/columns/admin-slots-columns';
import { DataTable } from '@/components/common/data-table';
import { useState } from 'react';
import SlotFormDialog from '@/components/common/slot-form-dialog';

const slotsData: SlotDto[] = [
  {
    id: 1,
    slotCode: 'A001',
    status: 'available',
    description: 'Main Entrance',
  },
  { id: 2, slotCode: 'A002', status: 'occupied', description: 'VIP Zone' },
  { id: 3, slotCode: 'A003', status: 'occupied', description: 'East Wing' },
  { id: 4, slotCode: 'A004', status: 'available', description: 'West Corner' },
  {
    id: 5,
    slotCode: 'A005',
    status: 'available',
    description: 'Underground 1',
  },
  { id: 6, slotCode: 'A006', status: 'occupied', description: 'Underground 2' },
  { id: 7, slotCode: 'A007', status: 'available', description: 'Near Lobby' },
  { id: 8, slotCode: 'A008', status: 'available', description: 'Back Lot' },
  { id: 9, slotCode: 'A009', status: 'occupied', description: 'Loading Zone' },
  { id: 10, slotCode: 'A010', status: 'available', description: 'Exit Point' },
];

export default function SlotPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddSlot = () => {
    setDialogOpen(true); 
  };

  return (
    <div className="p-6">
      <DataTable<SlotDto>
        data={slotsData}
        columns={AdminSlotsColumns}
        searchEnabled
        isLoading={false}
        addButtonIcon={<Plus className="w-5 h-5 text-white" />}
        addButtonTitle="Add Slot"
        onAdd={handleAddSlot}
        message="No slots found"
      />
      <SlotFormDialog open={dialogOpen} setOpen={setDialogOpen} />
    </div>
  );
}
