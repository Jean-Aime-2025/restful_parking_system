import * as React from 'react';
import {
  ArrowUpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  Loader2,
  MailIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useGetUser } from '@/hooks/useUser';

const adminNavItems = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: LayoutDashboardIcon,
  },
  {
    title: 'Requests',
    url: '/admin/requests',
    icon: MailIcon,
  },
  {
    title: 'Slots',
    url: '/admin/slots',
    icon: ListIcon,
  },
];

export function AdminSidebar({
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
              <Link to="/admin">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Admin Portal</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={adminNavItems} quickActionLabel="Quick Create" />
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
