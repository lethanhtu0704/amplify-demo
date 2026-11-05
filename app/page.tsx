import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Amplify Demo (basePath: /faber-admin)</h1>
      <p>If you can see this at <code>/faber-admin</code>, basePath works.</p>
      <ul>
        <li><Link href="/api-demo">API call demo (client + server fetch)</Link></li>
        <li><Link href="/env-demo">Environment variable demo</Link></li>
      </ul>
    </main>
  );
}
