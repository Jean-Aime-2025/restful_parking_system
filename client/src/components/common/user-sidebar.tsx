import * as React from 'react';
import { BookOpenIcon, ListIcon, Loader2, Mail, User } from 'lucide-react';
import { Link } from 'react-router-dom';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavUser } from './nav-user';
import { NavMain } from './nav-main';
import { useGetUser } from '@/hooks/useUser';

const userNavItems = [
  {
    title: 'Dashboard',
    url: '/user',
    icon: BookOpenIcon,
  },
  {
    title: 'Vehicles',
    url: '/user/vehicles',
    icon: ListIcon,
  },
  {
    title: 'Requests',
    url: '/user/requests',
    icon: Mail,
  },
];

export function UserSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data, isLoading, error } = useGetUser();

  if (isLoading) {
    return <Loader2 />;
  }

  if (error || !data || !data.data?.user) {
    return <div>Error loading user info</div>;
  }

  const user = data.data.user;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/user">
                <User className="h-5 w-5" />
                <span className="text-base font-semibold">User Portal</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={userNavItems} quickActionLabel="Request parking" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user.names,
            email: user.email,
            avatar: user.profilePicture,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
