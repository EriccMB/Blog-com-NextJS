import { postRepository } from '@/repositories/post';

export async function Posts() {
  const posts = await postRepository.findAll();

  return (
    <div>
      {posts.map((post) => {
        return <p key={post.id}>{post.title}</p>;
      })}
    </div>
  );
}
