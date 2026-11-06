'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axiosClient, { lastRefresh } from '@/lib/axiosClient';
import { API_END_POINT, PATH } from '@/lib/constants';

type User = { id: number; name: string; email: string };

// List page: data is fetched from the browser with axios (CORS applies),
// the same way FaberAdminUI loads every list.
export default function UsersPage() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axiosClient
      .get<User[], User[]>('/users')
      .then(setUsers)
      .catch(e => setError(String(e)));
  }, []);

  return (
    <>
      <h1>Users</h1>
      <p style={{ fontSize: 13, color: '#666' }}>
        API: <code>{API_END_POINT}</code> · last <code>new-access-token</code> header:{' '}
        <code>{users ? lastRefresh.header ?? '(none / not exposed)' : '…'}</code>
      </p>
      {error && <p style={{ color: 'crimson' }}>Request failed (CORS?): {error}</p>}
      {!users && !error && <p>Loading…</p>}
      {users && (
        <table cellPadding={6} border={1} style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr><th>ID</th><th>Name</th><th>Email</th><th /></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                {/* Detail uses a query string, not a dynamic [id] route, like FaberAdminUI */}
                <td><Link href={`${PATH.USER_DETAIL}?id=${u.id}`}>Detail</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
