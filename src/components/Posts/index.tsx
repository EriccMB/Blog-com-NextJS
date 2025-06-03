import { postRepository } from '@/repositories/post';
import { PostImage } from '../PostImage';
import { PostText } from '../PostText';

export async function Posts() {
  const posts = await postRepository.findAll();

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      {posts.map((post) => {
        return (
          <div className="flex flex-col gap-4 group" key={post.id}>
            <PostImage
              href={`/posts/${post.slug}`}
              alt={post.title}
              src={post.coverImageUrl}
            />
            <PostText
              time={post.createdAt}
              url={`/posts/${post.slug}`}
              textContent={post.excerpt}
              title={post.title}
            />
          </div>
        );
      })}
    </div>
  );
}
