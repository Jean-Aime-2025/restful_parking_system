import {
  UserSlotsColumns,
  type SlotDto,
} from '@/components/columns/user-slots-columns';
import { DataTable } from '@/components/common/data-table';
import { useGetSlots } from '@/hooks/useSlot';

const UserSlots = () => {
  const { data: availableSlots, isLoading, error } = useGetSlots();

  if (error)
    return <div className="text-red-500">Failed to load available slots.</div>;

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
      <DataTable<SlotDto>
        data={availableSlots || []}
        isLoading={isLoading}
        columns={UserSlotsColumns}
        searchEnabled={true}
        message={
          availableSlots.length === 0 && !isLoading
            ? 'No available slots found'
            : undefined
        }
      />
    </div>
  );
};

export default UserSlots;
