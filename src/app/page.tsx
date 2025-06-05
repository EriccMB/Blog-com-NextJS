import { ButtonChangeTheme } from '@/components/ButtonChangeTheme';
import { Container } from '@/components/Container';
import { FeaturedPost } from '@/components/FeaturedPost';
import { Header } from '@/components/Header';
import { Posts } from '@/components/Posts';
import { SpinLoading } from '@/components/SpinLoading';

import { Suspense } from 'react';

export default async function Home() {
  return (
    <>
      <Container>
        <Header />
        <FeaturedPost />

        <Suspense fallback={<SpinLoading />}>
          <Posts />
        </Suspense>
      </Container>
      <ButtonChangeTheme />
    </>
  );
}
