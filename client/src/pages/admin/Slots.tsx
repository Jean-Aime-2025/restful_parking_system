import { Plus } from 'lucide-react';
import {
  AdminSlotsColumns,
  type SlotDto,
} from '@/components/columns/admin-slots-columns';
import { DataTable } from '@/components/common/data-table';
import { useState } from 'react';
import SlotFormDialog from '@/components/common/slot-form-dialog';
import { useGetSlots } from '@/hooks/useslots';

export default function SlotPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: slotsApiData, isLoading, isError } = useGetSlots();

  console.log(slotsApiData);

  const slotsData: SlotDto[] = Array.isArray(slotsApiData)
    ? slotsApiData.map((slot) => ({
        id: slot.id,
        slotCode: slot.code,
        status: slot.occupied ? 'occupied' : 'available',
        description: slot.description || '—',
      }))
    : [];

  const handleAddSlot = () => {
    setDialogOpen(true);
  };

  if (isError) return <div>Error loading slots</div>;

  return (
    <div className="p-6">
      <DataTable<SlotDto>
        data={slotsData}
        columns={AdminSlotsColumns}
        searchEnabled
        isLoading={isLoading}
        addButtonIcon={<Plus className="w-5 h-5 text-white" />}
        addButtonTitle="Add Slot"
        onAdd={handleAddSlot}
        message={
          slotsData.length === 0 && !isLoading ? 'No Slots found' : undefined
        }
      />
      <SlotFormDialog open={dialogOpen} setOpen={setDialogOpen} />
    </div>
  );
}