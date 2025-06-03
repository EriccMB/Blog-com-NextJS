import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { PostHeading } from '@/components/PostHeading';
import { Posts } from '@/components/Posts';
import { SpinLoading } from '@/components/SpinLoading';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <Container>
      <Header />
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 group mb-10">
        <Link href="#" className="w-full h-full overflow-hidden rounded-2xl">
          <Image
            className="w-full h-full group-hover:scale-105 transition object-cover object-center"
            src="/images/bryen_1.png"
            width={1200}
            height={760}
            alt="Title"
            priority
          />
        </Link>
        <div className='flex flex-col gap-3 justify-start' >
          <time dateTime="2025-05-10" className='text-stone-500 text-sm' >10-05-2025 09:00</time>
          <PostHeading url='#'>dads</PostHeading>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate
            maiores, ut quibusdam non architecto quos? Amet labore veniam id
            error obcaecati blanditiis laborum eligendi esse expedita. Ducimus,
            laborum odit asperiores
          </p>
        </div>
      </section>

      <Suspense fallback={<SpinLoading />}>
        <Posts />
      </Suspense>
    </Container>
  );
}
