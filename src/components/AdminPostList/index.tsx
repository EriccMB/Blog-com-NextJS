import { getAllPostsAdmin } from '@/lib/post/admin-queries';
import clsx from 'clsx';
import Link from 'next/link';
import { deletePostAction } from '@/actions/post/post/delete-post-action';
import DeleteButtonAdmin from '../admin/DeleteButtonAdmin';

export default async function AdminPostList() {
  const posts = await getAllPostsAdmin();

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
      <div
        className="bg-black/40 backdrop-blur-xs fixed inset-0 
                      flex items-center justify-center"
      >
        <div
          className="bg-stone-100 p-6 rounded-xl max-w-2xl mx-4
                          flex flex-col gap-6
                          shadow-lg shadow-black/30
                          text-center"
        >
          <h3 className='font-extrabold text-xl'>Titulo do dialogo</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
            cupiditate amet vitae. Eos, non dignissimos.
          </p>
          <div className="flex justify-around ">
            <button className="bg-green-500 hover:bg-green-400 cursor-pointer text-white py-1 px-3 rounded-md ">
              Ok
            </button>
            <button
              className="bg-red-500 hover:bg-red-400 cursor-pointer text-white py-1 px-3 rounded-md "
              autoFocus
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
