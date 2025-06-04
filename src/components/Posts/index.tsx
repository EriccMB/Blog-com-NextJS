import { postRepository } from '@/repositories/post';
import { PostImage } from '../PostImage';
import { PostText } from '../PostText';
import { getFormatedDateTime } from '@/utils/get-formateddate';

export async function Posts() {
  const posts = await postRepository.findAll();

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      {posts.map((post) => {
        const postLink = `/posts/${post.slug}`;
        return (
          <div className="flex flex-col gap-4 group" key={post.id}>
            <PostImage
              url={postLink}
              alt={post.title}
              src={post.coverImageUrl}
            />
            <PostText
              dateTime={post.createdAt}
              time={getFormatedDateTime(post.createdAt)}
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
