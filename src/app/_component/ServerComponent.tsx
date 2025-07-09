import React from "react";
import { cookies } from "next/headers";

interface TestProps {
  onClose?: () => void;
}

const ServerComponent: React.FC =  async ({onClose}:TestProps) => {
  const API_URL = process.env.BACKEND_API_URL;
  const cookieStore = await cookies();

  const sessionId = cookieStore.get("sessionId")?.value || "No sessionId";

  return (
    <div style={{ border: "1px solid blue" }}>
      <h1>
        I'm Server Component
        BACKEND_API_URL: {API_URL}
      </h1>
    </div>
  );
};

export default ServerComponent;