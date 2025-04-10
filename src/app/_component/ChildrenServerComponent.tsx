// Create ChildrenProp Server React Component with Nextjs
import React from "react";

interface ChildrenServerComponentProps {
  children: React.ReactNode;
}

const ChildrenServerComponent: React.FC<ChildrenServerComponentProps> = ({ children }) => {
  return (
    <div>
      <h1>
        Children Prop Server Component
      </h1>
      {children}
    </div>
  );
};

export default ChildrenServerComponent;
