
import { useLocation } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getTitleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] || 'dashboard';

  const map: Record<string, string> = {
    dashboard: 'Dashboard',
    students: 'Students',
    student: 'Student Details',
  };

  return map[lastSegment] || capitalize(lastSegment);
}

export function SiteHeader() {
  const { pathname } = useLocation(); 
  const pageTitle = getTitleFromPath(pathname);

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{pageTitle}</h1>
      </div>
    </header>
  );
}