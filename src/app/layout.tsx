import type { Metadata } from 'next';
import './globals.css';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { ButtonChangeTheme } from '@/components/ButtonChangeTheme';
import { Footer } from '@/components/Footer';
import { ToastifyContainer } from '@/components/ToastifyContainer';

export const metadata: Metadata = {
  title: {
    default: 'Blog',
    template: '%s | Blog',
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
          <Footer />
        </Container>
         <ToastifyContainer />
        <ButtonChangeTheme />
      </body>
    </html>
  );
}
