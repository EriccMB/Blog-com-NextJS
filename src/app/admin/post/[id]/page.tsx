export const dynamic = 'force-dynamic';

type AdminPageIDPostProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminPageIDPost({
  params,
}: AdminPageIDPostProps) {
  const { id } = await params;
  return <div className="py-16 text-6xl">AdminPageIDPost id: {id}</div>;
}
