'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/auth';
import { PATH } from '@/lib/constants';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('demo@example.com');

  // 1) Password login: FaberAdminUI POSTs to /auth/login and stores the JWT.
  //    The demo has no backend, so it stores a fake token.
  const login = () => {
    auth.setToken(`fake-token-for-${email}`);
    router.replace(PATH.USERS);
  };

  // 2) SSO login: FaberAdminUI builds redirectURL from window.location.host + basePath
  //    + /loading. The identity provider must whitelist that URL, which is why the
  //    hostname matters when the UI moves to Amplify. Here we fake the IdP and jump
  //    straight to /loading?code=...
  //    window does not exist at build time, so compute it after mount.
  const [ssoRedirectUrl, setSsoRedirectUrl] = useState('');
  useEffect(() => {
    setSsoRedirectUrl(`${window.location.protocol}//${window.location.host}/faber-admin${PATH.LOADING}`);
  }, []);

  const sso = () => {
    window.location.href = `${ssoRedirectUrl}?code=demo-sso-code`;
  };

  return (
    <>
      <Image src="/faber-admin/images/logo.svg" alt="logo" width={64} height={64} />
      <h1>Login</h1>
      <label>
        Email{' '}
        <input id="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <p style={{ display: 'flex', gap: 8 }}>
        <button onClick={login}>Login (fake token)</button>
        <button onClick={sso}>Login with SSO (fake)</button>
      </p>
      <p style={{ fontSize: 12, color: '#666' }}>
        SSO redirect URL that the IdP would need to allow: <code>{ssoRedirectUrl || '(computed in browser)'}</code>
      </p>
    </>
  );
}
