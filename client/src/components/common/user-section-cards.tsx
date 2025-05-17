import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUserDashboard } from '@/hooks/useDashboard';
import SkeletonCard from './SkeletonCard';

export function UserSectionCards() {
  const { data, isLoading, error } = useUserDashboard();

  if (isLoading)
    return (
      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  if (error || !data) return <p>Failed to load user dashboard data.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-3">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Your Slot</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {data.slotInfo ?? 'No slot info available'}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              Confirmed
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="flex gap-2 font-medium">
            Assigned successfully <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            You have an active slot reservation
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Slot Status</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {data.slotStatus ?? 'No slot status available'}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingDownIcon className="size-3" />
              In Use
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="flex gap-2 font-medium">
            Your slot is currently in use{' '}
            <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            You can manage it via the slot dashboard
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Request Status</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {data.requestStatus ?? 'No request status available'}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              Success
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="flex gap-2 font-medium">
            Your request was successful <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            You can now access your assigned slot
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
