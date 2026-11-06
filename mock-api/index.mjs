// Mock backend for the CORS test (research step 4). Deploy as an AWS Lambda with a
// Function URL (Node.js 22, auth type NONE). Do NOT enable CORS on the Function URL
// itself: this handler sets the headers, mirroring FaberAdminConsole's SecurityConfig.
//
// Env var ALLOWED_ORIGINS: comma-separated, e.g.
//   https://static.<appid>.amplifyapp.com,http://localhost:3000
// Then build the demo with NEXT_PUBLIC_END_POINT=<function url without trailing slash>.

const USERS = [
  { id: 1, name: 'Alice Example', email: 'alice@example.com', phone: '000-0001', website: 'example.com' },
  { id: 2, name: 'Bob Example', email: 'bob@example.com', phone: '000-0002', website: 'example.org' },
];

const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);

export const handler = async event => {
  const origin = event.headers?.origin || '';
  const cors = allowed.includes(origin)
    ? {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
        'Access-Control-Allow-Headers': 'Authorization,Cache-Control,Content-Type',
        'Access-Control-Allow-Credentials': 'true',
        // Without this line the browser hides new-access-token from axios.
        'Access-Control-Expose-Headers': 'new-access-token',
        Vary: 'Origin',
      }
    : {};

  const method = event.requestContext?.http?.method || 'GET';
  if (method === 'OPTIONS') return { statusCode: 204, headers: cors };

  const auth = event.headers?.authorization || '';
  if (!auth.startsWith('Bearer ')) {
    return { statusCode: 401, headers: cors, body: JSON.stringify({ message: 'Missing Bearer token' }) };
  }

  const path = event.rawPath || '/';
  const headers = {
    ...cors,
    'Content-Type': 'application/json',
    'new-access-token': `refreshed-${Date.now()}`,
  };

  if (path === '/users') return { statusCode: 200, headers, body: JSON.stringify(USERS) };
  const m = path.match(/^\/users\/(\d+)$/);
  if (m) {
    const user = USERS.find(u => u.id === Number(m[1]));
    return user
      ? { statusCode: 200, headers, body: JSON.stringify(user) }
      : { statusCode: 404, headers, body: JSON.stringify({ message: 'Not found' }) };
  }
  return { statusCode: 404, headers, body: JSON.stringify({ message: 'Unknown path' }) };
};
