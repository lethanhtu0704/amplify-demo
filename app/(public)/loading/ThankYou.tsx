'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { auth, history } from '@/lib/auth';
import { PATH } from '@/lib/constants';

// FaberAdminUI exchanges ?code= for a JWT through the backend, then routes to the
// last visited page. The demo fakes the exchange.
export default function ThankYou() {
  const router = useRouter();
  const code = useSearchParams().get('code');

  useEffect(() => {
    if (!code) {
      router.replace(PATH.LOGIN);
      return;
    }
    auth.setToken(`fake-token-from-sso-${code}`);
    router.replace(history.getCur() || PATH.USERS);
  }, [code, router]);

  return <p>Signing you in…</p>;
}
