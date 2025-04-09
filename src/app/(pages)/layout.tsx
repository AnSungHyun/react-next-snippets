import React from 'react';
import LayoutComponent from "@/app/_component/LayoutComponent";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ height:'100vh',  overflowY: 'hidden'  }}>
      <LayoutComponent>
        {children}
      </LayoutComponent>
    </div>
  );
};

export default Layout;