import React from 'react';
import LayoutComponent from "@/app/_component/LayoutComponent";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';

const Layout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const locale = await getLocale();
  return (
    <div
      style={
        {
          // height: '100vh',
          // overflowY: 'hidden'
        }
      }
    >
      <NextIntlClientProvider>
        <LayoutComponent>{children}</LayoutComponent>
      </NextIntlClientProvider>
    </div>
  );
};

export default Layout;