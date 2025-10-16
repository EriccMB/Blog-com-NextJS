import { PostView } from '@/components/PostView';
import { SpinLoading } from '@/components/SpinLoading';
import { getPostBySlugCached } from '@/lib/post/queries';
import { Metadata } from 'next';
import { Suspense } from 'react';

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlugCached(slug);
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
