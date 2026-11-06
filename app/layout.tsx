// Root layout. FaberAdminUI marks its root layout 'use client'; that also works here,
// but a server component root layout is fine for static export too.
import type { ReactNode } from 'react';

export const metadata = { title: 'Amplify Demo' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* basePath is not added to raw <link> tags, so the prefix is written by hand,
            exactly like FaberAdminUI does for its favicon. */}
        <link rel="icon" href="/faber-admin/images/logo.svg" />
      </head>
      <body style={{ fontFamily: 'sans-serif', margin: 0 }}>{children}</body>
    </html>
  );
}
