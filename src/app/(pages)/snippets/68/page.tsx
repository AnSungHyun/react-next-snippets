// app/page.tsx
import ServerUserAgentDetection from './ServerUserAgentDetection';
import UserAgentDetectionPage from './UserAgentDetectionPage';

export default function Page() {
  return (
    <>
      <ServerUserAgentDetection />
      <hr />
      <UserAgentDetectionPage />
    </>
  );
}