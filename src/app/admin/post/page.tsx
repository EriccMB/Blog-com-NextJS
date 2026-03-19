import { getAllPostsAdmin } from '@/lib/post/adminQueries';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Post Admin',
};

export default async function AdminPagePost() {
  const posts = await getAllPostsAdmin();

  return (
    <div className="py-16 text-2xl">
      {posts.map((post) => {
        return <p key={post.id}>{post.title}</p>;
      })}
    </div>
  );
}
