import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAdminDashboard } from '@/hooks/useDashboard';
import SkeletonCard from './SkeletonCard';

export function AdminSectionCards() {
  const { data, isLoading, error } = useAdminDashboard();

  if (isLoading)
    return (
      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  if (error || !data) return <p>Failed to load admin dashboard data.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Slots</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {data.totalSlots ?? '0'}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              Stable
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="flex gap-2 font-medium">
            Capacity maintained <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            No change in slot allocation
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Requests</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {data.totalRequests ?? '0'}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +15%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="flex gap-2 font-medium">
            High user demand <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Requests are growing this month
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Available Slots</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {data.availableSlots ?? 'O'}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +10%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="flex gap-2 font-medium">
            More availability this week <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Compared to last week's data
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Occupied Slots</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {data.occupiedSlots ?? '0'}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingDownIcon className="size-3" />
              -5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="flex gap-2 font-medium">
            Slightly less usage <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Occupancy decreased slightly
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}