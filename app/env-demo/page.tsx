import Link from 'next/link';

// Read env vars at request time to see what is available at runtime.
export const dynamic = 'force-dynamic';

export default function EnvDemo() {
  return (
    <main>
      <h1>Environment variable demo</h1>
      <table cellPadding={6} border={1}>
        <tbody>
          <tr>
            <td>NEXT_PUBLIC_DEMO_VAR (inlined at build time)</td>
            <td>{process.env.NEXT_PUBLIC_DEMO_VAR ?? '(undefined)'}</td>
          </tr>
          <tr>
            <td>DEMO_SERVER_VAR (server only, read at runtime)</td>
            <td>{process.env.DEMO_SERVER_VAR ?? '(undefined)'}</td>
          </tr>
          <tr>
            <td>NODE_ENV</td>
            <td>{process.env.NODE_ENV}</td>
          </tr>
        </tbody>
      </table>
      <p>
        If DEMO_SERVER_VAR is undefined on Amplify even though it is set in the console,
        see the env step in amplify.yml.
      </p>
      <p><Link href="/">Back</Link></p>
    </main>
  );
}
