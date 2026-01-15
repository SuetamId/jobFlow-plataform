import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/presentation/auth/context/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-family-sans',
});

export const metadata: Metadata = {
  title: 'JobFlow - Find Your Dream Job Now',
  description: 'Connect with top companies and find your next opportunity',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
