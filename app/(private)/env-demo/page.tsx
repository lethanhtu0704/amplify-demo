import Link from 'next/link';

// Static export: every value below is read at BUILD time and baked into the HTML.
// There is no server at runtime, so server-only env vars cannot change after build.
export default function EnvDemo() {
  return (
    <main>
      <h1>Environment variable demo (static export)</h1>
      <table cellPadding={6} border={1}>
        <tbody>
          <tr>
            <td>NEXT_PUBLIC_DEMO_VAR (inlined at build time)</td>
            <td>{process.env.NEXT_PUBLIC_DEMO_VAR ?? '(undefined)'}</td>
          </tr>
          <tr>
            <td>DEMO_SERVER_VAR (read at build time only)</td>
            <td>{process.env.DEMO_SERVER_VAR ?? '(undefined)'}</td>
          </tr>
          <tr>
            <td>NODE_ENV</td>
            <td>{process.env.NODE_ENV}</td>
          </tr>
          <tr>
            <td>Built at</td>
            <td>{new Date().toISOString()}</td>
          </tr>
        </tbody>
      </table>
      <p><Link href="/">Back</Link></p>
    </main>
  );
}
