'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState, type ReactNode } from 'react';
import RouteTracker from '@/app/_components/RouteTracker';
import { auth } from '@/lib/auth';
import { APP_ENV, PATH } from '@/lib/constants';

// Private area guard: no token in localStorage → go to login.
// The check runs in useEffect because there is no server to check it.
export default function PrivateLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      router.replace(PATH.LOGIN);
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return <p style={{ padding: 24 }}>Checking session…</p>;

  return (
    <div>
      <header style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '12px 24px', borderBottom: '1px solid #ddd' }}>
        {/* next/image: src must include the basePath; images.unoptimized is required for export */}
        <Image src="/faber-admin/images/logo.svg" alt="logo" width={32} height={32} />
        <strong>Admin demo</strong>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link href={PATH.USERS}>Users</Link>
          <Link href={PATH.ENV_DEMO}>Env</Link>
        </nav>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#666' }}>env: {APP_ENV}</span>
        <button
          onClick={() => {
            auth.clear();
            router.replace(PATH.LOGIN);
          }}
        >
          Logout
        </button>
      </header>
      {/* RouteTracker and the detail page use useSearchParams. They are only rendered after
          the client-side session check, so the build never prerenders them and no build error
          appears. The Suspense keeps it safe if that guard is ever removed. */}
      <Suspense>
        <RouteTracker />
      </Suspense>
      <main style={{ padding: 24, maxWidth: 900 }}>{children}</main>
    </div>
  );
}
