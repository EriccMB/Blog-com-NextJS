import { getPostBySlugCached } from '@/utils/post/queries';
import Image from 'next/image';

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;
  const post = await getPostBySlugCached(slug);

  return (
    <>
      <h1>{post.title}</h1>
      <Image
        width={720}
        height={600}
        alt={post.title}
        src={post.coverImageUrl}
        priority
      ></Image>
    </>
  );
}
