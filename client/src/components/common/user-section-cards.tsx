import { TrendingUpIcon } from 'lucide-react';

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
          <CardDescription>Your request status</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {data.pendingRequest?.status ?? 'No slot info available'}
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
            Request sent <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            You have an active slot reservation
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Requests</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {data.recentRequests.length ?? 'No request status available'}
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
            Your requests exploded <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            You can now view your requests
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Vehicles</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {data.vehicleCount ?? 'No request status available'}
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
            Your vehicles <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            You can now access your vehicles
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
