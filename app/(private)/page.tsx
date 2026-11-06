'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { history } from '@/lib/auth';
import { PATH } from '@/lib/constants';

// `/faber-admin/` has no content of its own: redirect on the client to the last
// visited page or the default list, like FaberAdminUI's app/page.tsx.
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace(history.getCur() || PATH.USERS);
  }, [router]);
  return null;
}
