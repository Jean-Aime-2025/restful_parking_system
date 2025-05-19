import { type ColumnDef } from '@tanstack/react-table';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const requestColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'user.names',
    header: 'User',
    cell: ({ row }) => <div className='py-2'>{row.original.user?.names}</div>,
  },
  {
    accessorKey: 'vehicle.platenumber',
    header: 'Plate Number',
    cell: ({ row }) => <div>{row.original.vehicle?.platenumber}</div>,
  },
  {
    accessorKey: 'startTime',
    header: 'Start Time',
    cell: ({ row }) =>
      <div>{new Date(row.original.startTime).toLocaleString()}</div>,
  },
  {
    accessorKey: 'endTime',
    header: 'End Time',
    cell: ({ row }) =>
      <div>{new Date(row.original.endTime).toLocaleString()}</div>,
  },

  // ✅ Hours Expected Column
  {
    id: 'hoursExpected',
    header: 'Hours Expected',
    cell: ({ row }) => {
      const start = new Date(row.original.startTime);
      const end = new Date(row.original.endTime);
      const diffMs = end.getTime() - start.getTime();
      const hours = diffMs / (1000 * 60 * 60);
      const rounded = Math.round(hours * 100) / 100; // round to 2 decimals
      return <div>{rounded} hrs</div>;
    },
  },

  {
    accessorKey: 'notes',
    header: 'Notes',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const color =
        status === 'APPROVED' ? 'text-green-600' :
        status === 'DENIED' ? 'text-red-600' : 'text-yellow-600';

      return <span className={`font-medium ${color}`}>{status}</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) =>
      <div className="text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </div>,
  },
];
