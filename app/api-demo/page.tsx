import Link from 'next/link';
import ClientFetch from './ClientFetch';

// Static export: no server-side fetch. Only the browser calls the API,
// which is how FaberAdminUI works (axios from the client, CORS applies).
const API_URL = 'https://jsonplaceholder.typicode.com/todos/1';

export default function ApiDemo() {
  return (
    <main>
      <h1>API demo (static export)</h1>
      <h2>Client-side fetch (runs in browser, CORS applies)</h2>
      <ClientFetch url={API_URL} />
      <p><Link href="/">Back</Link></p>
    </main>
  );
}
