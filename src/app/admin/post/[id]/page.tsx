import ManagePostForm from '@/components/admin/ManagePostForm';
import { makePublicPost } from '@/dto/post/dto';
import { getPostByIdAdmin } from '@/lib/post/admin-queries';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type AdminPageIDPostProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Editar Post',
};

export default async function AdminPageIDPost({
  params,
}: AdminPageIDPostProps) {
  const { id } = await params;

  const post = await getPostByIdAdmin(id).catch();
  if(!post) notFound();

  const publicPost = await makePublicPost(post);
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-extrabold">Editar post</h1>
      <ManagePostForm publicPost={publicPost} />
    </div>
  );
}
