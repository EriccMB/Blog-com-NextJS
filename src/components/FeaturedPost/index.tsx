import { getFormatedDateTime, getRelativeDate } from '@/utils/get-formateddate';
import { PostImage } from '../PostImage';
import { PostText } from '../PostText';
import { getAllPublishedPosts } from '@/utils/post/queries';

export async function FeaturedPost() {
  const posts = await getAllPublishedPosts();
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 group mb-10">
      <PostImage
        url={`/posts/${posts[0].slug}`}
        alt={posts[0].title}
        src={posts[0].coverImageUrl}
        priority
      />
      <PostText
        postHeading={'h1'}
        dateTime={posts[0].createdAt}
        time={getFormatedDateTime(posts[0].createdAt)}
        relativeDate={getRelativeDate(posts[0].createdAt)}
        url={`/posts/${posts[0].slug}`}
        textContent={posts[0].excerpt}
        title={posts[0].title}
      />
    </section>
  );
}
