import LoginForm from '@/components/admin/LoginForm';
import { ErrorContainer } from '@/components/ErrorContainer';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Login',
};

export default async function AdminPageLogin() {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));
  if (!allowLogin) {
    return <ErrorContainer titleContent="403" content="Login não permitido" />;
  }
  return <LoginForm />;
}
