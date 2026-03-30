import { getAllPostsAdmin } from '@/lib/post/admin-queries';
import clsx from 'clsx';
import Link from 'next/link';
import DeleteButtonAdmin from '../admin/DeleteButtonAdmin';
import { ErrorContainer } from '../ErrorContainer';

export default async function AdminPostList() {
  const posts = await getAllPostsAdmin();

  if (posts.length <= 0) {
    return (
      <ErrorContainer
        titleContent="🤔"
        content="Não há nenhum post a ser atualizado"
      />
    );
  }
  return (
    <>
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

              <DeleteButtonAdmin id={post.id} title={post.title} />
            </div>
          );
        })}
      </div>
    </>
  );
}
