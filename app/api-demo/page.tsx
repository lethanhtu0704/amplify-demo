import Link from 'next/link';
import ClientFetch from './ClientFetch';

export const dynamic = 'force-dynamic';

const API_URL = 'https://jsonplaceholder.typicode.com/todos/1';

export default async function ApiDemo() {
  let serverResult = '';
  try {
    const res = await fetch(API_URL, { cache: 'no-store' });
    serverResult = JSON.stringify(await res.json(), null, 2);
  } catch (e) {
    serverResult = `Server fetch failed: ${String(e)}`;
  }

  return (
    <main>
      <h1>API demo</h1>
      <h2>1. Server-side fetch (runs on Amplify compute)</h2>
      <pre>{serverResult}</pre>
      <h2>2. Client-side fetch (runs in browser, CORS applies)</h2>
      <ClientFetch url={API_URL} />
      <p><Link href="/">Back</Link></p>
    </main>
  );
}
