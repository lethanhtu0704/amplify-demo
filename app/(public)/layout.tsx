'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { auth } from '@/lib/auth';
import { PATH } from '@/lib/constants';

// Public area: already logged in → go to the private area (FaberAdminUI does the same).
export default function PublicLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    if (auth.isAuthenticated()) router.replace(PATH.USERS);
  }, [router]);
  return <div style={{ padding: 24, maxWidth: 480 }}>{children}</div>;
}
