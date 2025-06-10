import type { Metadata } from 'next';
import './globals.css';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { ButtonChangeTheme } from '@/components/ButtonChangeTheme';

export const metadata: Metadata = {
  title: {
    default: 'Blog',
    template: '$s | Blog',
  },

  description: 'Blog com NextJS',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-BR" className="">
      <body>
        <Container>
          <Header />
          {children}
          <footer className="text-7xl font-extrabold text-center">
            Footer
          </footer>
        </Container>
        <ButtonChangeTheme />
      </body>
    </html>
  );
}
