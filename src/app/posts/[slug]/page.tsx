import { PostView } from '@/components/PostView';
import { SpinLoading } from '@/components/SpinLoading';
import { getPublicPostBySlugCached } from '@/lib/post/publicQueries';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-static';

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublicPostBySlugCached(slug);
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<SpinLoading spinClasses="min-h-100" />}>
      <PostView slug={slug} />
    </Suspense>
  );
}
