import { ErrorContainer } from '@/components/ErrorContainer';

export default function NotFoundPage() {
  return (
    <ErrorContainer
      title="Página não encontrada"
      titleContent="404"
      content="Á página que você está tentando acessar não existe"
    />
  );
}
