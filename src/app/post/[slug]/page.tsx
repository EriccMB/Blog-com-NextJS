import { getPostBySlugCached } from '@/utils/post/queries';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;

  let post;

  try {
    post = await getPostBySlugCached(slug);
  } catch {
    post = undefined;
  }

  if (!post) notFound();
  return (
    <>
      <h1>{post.title}</h1>
      <Image
        width={720}
        height={600}
        alt={post.title}
        src={post.coverImageUrl}
      ></Image>
    </>
  );
}
