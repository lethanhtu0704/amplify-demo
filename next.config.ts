import type { NextConfig } from 'next';

// Same basePath as FaberAdminUI so we can verify Amplify handles it.
const nextConfig: NextConfig = {
  basePath: '/faber-admin',
  // NOTE: no `output: 'standalone'` on purpose. Amplify uses its own build adapter.
  // Part of the research: check whether Amplify needs/accepts standalone.
};

export default nextConfig;
