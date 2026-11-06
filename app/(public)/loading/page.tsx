import { Suspense } from 'react';
import ThankYou from './ThankYou';

// SSO callback page. ThankYou reads ?code= with useSearchParams.
// Without this <Suspense>, `next build` with output: 'export' fails:
//   useSearchParams() should be wrapped in a suspense boundary at page "/loading"
// FaberAdminUI already wraps its /loading and /login pages the same way.
export default function LoadingPage() {
  return (
    <Suspense fallback={<p>Signing you in…</p>}>
      <ThankYou />
    </Suspense>
  );
}
