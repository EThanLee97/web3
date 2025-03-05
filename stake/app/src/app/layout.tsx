// app/layout.tsx
import React from 'react';
import '../styles/globals.css';
import Provider from '../component/Provider';
import Layout from '../component/Layout';

export const metadata = {
  title: 'My Stake',
  description: 'Using RainbowKit & Wagmi in App Router',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
}
