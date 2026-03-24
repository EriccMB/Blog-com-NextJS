import AdminPostList from '@/components/AdminPostList';
import { SpinLoading } from '@/components/SpinLoading';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Post Admin',
};

export default async function AdminPagePost() {
  return (
    <Suspense fallback={<SpinLoading spinClasses='mb-16' />}>
      <AdminPostList />
    </Suspense>
  );
}
