import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { Geist, Geist_Mono } from 'next/font/google';

import TanstackQueryClientProviders from '@/app/tanstack-query-client-providers';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Blogs App',
  description:
    'Blog platform with user login, post creation, editing, listing, and deletion functionality.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackQueryClientProviders>
          {children}

          <Toaster />
        </TanstackQueryClientProviders>
      </body>
    </html>
  );
}
