'use client';
import { deletePostAction } from '@/actions/post/post/delete-post-action';
import Dialog from '@/components/Dialog';
import { Trash2Icon } from 'lucide-react';
import { useState, useTransition } from 'react';

type DeleteButtonAdminProps = {
  id: string;
  title: string;
};

export default function DeleteButtonAdmin({
  id,
  title,
}: DeleteButtonAdminProps) {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);

  async function handleClick() {
    setShowDialog(true);
  }

  async function handleConfirm() {
    startTransition(async () => {
      const result = await deletePostAction(id);
      setShowDialog(false);

      if (result.error) alert(`Erro: ${result.error}`);
    });
  }

  return (
    <>
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
      {showDialog && (
        <Dialog
          onConfirm={handleConfirm}
          onCancel={() => setShowDialog(false)}
          isVisible={showDialog}
          title={'Excluir o post?'}
          content={`Tem certeza que deseja excluir o post: ${title}`}
          disabled={isPending}
        />
      )}
    </>
  );
}
