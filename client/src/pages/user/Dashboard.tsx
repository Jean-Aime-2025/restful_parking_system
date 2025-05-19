import { UserSectionCards } from '@/components/common/user-section-cards';
import { Card, CardFooter } from '@/components/ui/card';
import { useGetUser } from '@/hooks/useUser';
import { Loader2, MoveRight } from 'lucide-react';

const UserDashboard = () => {
  const { data, isLoading, error } = useGetUser();

  const isNotVerified = data?.verificationStatus !== 'VERIFIED';

  if (isLoading) return <Loader2/>;

  if (error) return <div>Something went wrong</div>;

  return (
    <div className="h-full flex flex-col justify-between gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
      <UserSectionCards />

      {isNotVerified && (
        <Card className="@container/card bg-gray-100">
          <CardFooter className="flex items-center justify-between text-sm">
            <div className="text-muted-foreground">Not verified?</div>
            <div className="line-clamp-1 flex items-center underline gap-1 font-medium cursor-pointer">
              Verify <MoveRight className="size-4" />
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default UserDashboard;
