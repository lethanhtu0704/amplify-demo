'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { history } from '@/lib/auth';

// Like FaberAdminUI's RouteTracker / useFullPathname: remember the current
// path + query so `/faber-admin/` can send the user back to it.
export default function RouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    history.setCur(query ? `${pathname}?${query}` : pathname);
  }, [pathname, searchParams]);

  return null;
}
