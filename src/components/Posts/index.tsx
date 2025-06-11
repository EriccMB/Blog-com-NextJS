import { PostImage } from '../PostImage';
import { PostText } from '../PostText';
import { getAllPublishedPostsCached } from '@/utils/post/queries';

export async function Posts() {
  const posts = await getAllPublishedPostsCached();

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      {posts.slice(1).map((post) => {
        const postLink = `/posts/${post.slug}`;
        return (
          <div className="flex flex-col gap-4 group" key={post.id}>
            <PostImage
              url={postLink}
              alt={post.title}
              src={post.coverImageUrl}
              linkClass="max-h-50"
            />
            <PostText
              postHeading={'h2'}
              dateTime={post.createdAt}
              url={postLink}
              textContent={post.excerpt}
              title={post.title}
            />
          </div>
        );
      })}
    </div>
  );
}
