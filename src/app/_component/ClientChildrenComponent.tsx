'use client'

import React from "react";

interface Props {
  children: React.ReactNode;
}

const ClientChildrenComponent: React.FC<Props> = ({children}) => {
  return (
    <div style={{ border: "1px solid red" }}>
      <h1>
        I'm Client Children Component
      </h1>
      {children}
    </div>
  );
};

export default ClientChildrenComponent;