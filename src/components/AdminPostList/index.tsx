import { getAllPostsAdmin } from '@/lib/post/admin-queries';
import clsx from 'clsx';
import Link from 'next/link';
import DeleteIcon from '../DeleteIcon';

export default async function AdminPostList() {
  const posts = await getAllPostsAdmin();

  return (
    <div className="mb-16 bg-stone-100 rounded-xl border-2 border-stone-400 overflow-hidden">
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className={clsx(
              'py-2 px-2',
              !post.published && 'bg-stone-200',
              'border-b border-stone-400',
              'flex items-center justify-between',
            )}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

            {!post.published && (
              <span className="italic text-sm">(Não publicado)</span>
            )}

            {/* <button
              className="p-1 bg-red-600 text-white cursor-pointer rounded-lg font-semibold 
                              hover:bg-red-700 transition duration-300 ease-in-out"
              aria-label={`Deletar post: ${post.title}`}
              title={`Deletar post: ${post.title}`}>
              Deletar
            </button> */}

            <button
              className="text-red-600 cursor-pointer hover:scale-105 
                                transition duration-300 ease-in-out"
            aria-label={`Deletar post ${post.title}`}
            title={`Deletar post: ${post.title}`}
            >
              <DeleteIcon />
            </button>
          </div>
        );
      })}
    </div>
  );
}
