import { getPostBySlugCached } from '@/utils/post/queries';
import Image from 'next/image';
import { PostDate } from '../PostDate';
import { PostHeading } from '../PostHeading';
import { SafeMarkdown } from '../SafeMarkdown';

type PostViewProps = {
  slug: string;
};

export async function PostView({ slug }: PostViewProps) {
  const post = await getPostBySlugCached(slug);
  const postLink = `/posts/${post.slug}`;
  return (
    <article>
      <header className="group flex flex-col gap-5 mb-5">
        <Image
          className="rounded-xl"
          width={1200}
          height={720}
          alt={post.title}
          src={post.coverImageUrl}
          priority
        ></Image>
        <PostHeading url={postLink} as="h1">
          {post.title}
        </PostHeading>
        <span>
          {post.author} | {<PostDate dateTime={post.createdAt} />}
        </span>
      </header>

      <p className="text-xl text-stone-700 mb-7 sm:text-2xl">{post.excerpt}</p>

      <SafeMarkdown markdown={post.content} />
    </article>
  );
}
