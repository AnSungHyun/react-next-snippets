import React from "react";

const ServerComponent: React.FC = () => {

  const API_URL = process.env.BACKEND_API_URL;
  throw new Error("Error occurred in ServerComponent");
  // return (
  //   <div style={{ border: "1px solid blue" }}>
  //     <h1>
  //       I'm Server Component
  //       BACKEND_API_URL: {API_URL}
  //     </h1>
  //   </div>
  // );
};

export default ServerComponent;