
import { UserSlotsColumns, type UserSlotDto } from '@/components/columns/user-slots-columns';
import { DataTable } from '@/components/common/data-table';

// Mock available slots data
const availableSlots: UserSlotDto[] = [
  { id: 1, slotCode: 'A001', description: 'Main Entrance' },
  { id: 2, slotCode: 'A004', description: 'West Corner' },
  { id: 3, slotCode: 'A005', description: 'Underground 1' },
  { id: 4, slotCode: 'A007', description: 'Near Lobby' },
  { id: 5, slotCode: 'A010', description: 'Exit Point' },
];

const UserSlots = () => {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
      <DataTable<UserSlotDto>
        data={availableSlots}
        columns={UserSlotsColumns}
        searchEnabled={true}
        message="No available slots found"
      />
    </div>
  );
};

export default UserSlots;
