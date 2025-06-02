import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog com NextJS',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-BR" className="">
      <body>{children}</body>
    </html>
  );
}
