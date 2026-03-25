'use client';
import { deletePostAction } from '@/actions/post/post/delete-post-action';
import { Trash2Icon } from 'lucide-react';
import { useTransition } from 'react';

type DeleteButtonAdminProps = {
  id: string;
  title: string;
};

export default function DeleteButtonAdmin({
  id,
  title,
}: DeleteButtonAdminProps) {
  const [isPending, startTransition] = useTransition();

  async function handleClick() {
    startTransition(async () => {
      await deletePostAction(id);
      alert('excluindo' + id);
    });
  }
  return (
    <button
      className="text-red-600 cursor-pointer hover:scale-105 
                                transition duration-300 ease-in-out
                                disabled:text-stone-600 diabled:cursor-not-allowed"
      aria-label={`Deletar post ${title}`}
      title={`Deletar post: ${title}`}
      onClick={handleClick}
      disabled={isPending}
    >
      <Trash2Icon />
    </button>
  );
}
