'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axiosClient from '@/lib/axiosClient';
import { PATH } from '@/lib/constants';

type User = { id: number; name: string; email: string; phone: string; website: string };

export default function UserDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    axiosClient
      .get<User, User>(`/users/${id}`)
      .then(setUser)
      .catch(e => setError(String(e)));
  }, [id]);

  return (
    <>
      <p><Link href={PATH.USERS}>← Back</Link></p>
      <h1>User detail (?id={id ?? '—'})</h1>
      {!id && <p>Missing ?id= in the URL.</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {user && (
        <dl>
          <dt>Name</dt><dd>{user.name}</dd>
          <dt>Email</dt><dd>{user.email}</dd>
          <dt>Phone</dt><dd>{user.phone}</dd>
          <dt>Website</dt><dd>{user.website}</dd>
        </dl>
      )}
    </>
  );
}
