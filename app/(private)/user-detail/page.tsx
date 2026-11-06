import UserDetail from './UserDetail';

// Server component page wrapping a client feature component, the same split as
// FaberAdminUI's ranking-monitoring-detail (page.tsx exports metadata, the
// feature reads ?id= with useSearchParams).
export const metadata = { title: 'User detail' };

export default function UserDetailPage() {
  return <UserDetail />;
}
