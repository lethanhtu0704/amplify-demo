import type { ReactNode } from 'react';

export const metadata = { title: 'Amplify Demo' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif', padding: 24, maxWidth: 720 }}>
        {children}
      </body>
    </html>
  );
}
