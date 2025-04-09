import React from 'react';
import LayoutComponent from "@/app/_component/LayoutComponent";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <LayoutComponent>
        {children}
      </LayoutComponent>
    </div>
  );
};

export default Layout;