import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { Posts } from '@/components/Posts';
import { SpinLoading } from '@/components/SpinLoading';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <Container>
      <Header />
      <Suspense fallback={<SpinLoading />}>
        <Posts />
      </Suspense>
      <h1>AFDSFSD</h1>
    </Container>
  );
}
