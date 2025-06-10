import { ButtonChangeTheme } from '@/components/ButtonChangeTheme';
import { FeaturedPost } from '@/components/FeaturedPost';
import { Posts } from '@/components/Posts';
import { SpinLoading } from '@/components/SpinLoading';

import { Suspense } from 'react';

export default async function Home() {
  return (
    <>
      <Suspense fallback={<SpinLoading />}>
        <FeaturedPost />
      </Suspense>
      <Suspense fallback={<SpinLoading />}>
        <Posts />
      </Suspense>

      <ButtonChangeTheme />
    </>
  );
}
