// Create ChildrenProp Server React Component with Nextjs
import React from "react";

interface ChildrenServerComponentProps {
  children: React.ReactNode;
}

const ChildrenServerComponent: React.FC<ChildrenServerComponentProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default ChildrenServerComponent;
