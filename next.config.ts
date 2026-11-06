import type { NextConfig } from 'next';

// Static export variant (branch `static`): same basePath as FaberAdminUI,
// but output is plain HTML/JS/CSS in `out/` with no Node server.
const nextConfig: NextConfig = {
  basePath: '/faber-admin',
  output: 'export',
  // Emit /env-demo/index.html instead of /env-demo.html so Amplify serves clean URLs.
  trailingSlash: true,
  // The image optimizer needs a server; static export requires this.
  images: { unoptimized: true },
};

export default nextConfig;
