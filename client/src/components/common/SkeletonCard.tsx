import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';

function SkeletonCard() {
  return (
    <Card className="@container/card animate-pulse flex items-start justify-start">
      <CardHeader>
        <CardDescription>
          <Skeleton className="h-4 w-24 bg-gray-300 rounded"></Skeleton>
        </CardDescription>
        <CardTitle>
          <Skeleton className="h-8 w-32 bg-gray-300 rounded mt-2"></Skeleton>
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-col items-start gap-1">
        <Skeleton className="h-4 w-48 bg-gray-300 rounded"></Skeleton>
        <Skeleton className="h-3 w-36 bg-gray-300 rounded"></Skeleton>
      </CardFooter>
    </Card>
  );
}

export default SkeletonCard;