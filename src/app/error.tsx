'use client';
import { ErrorContainer } from '@/components/ErrorContainer';

export default function RootError() {
  return (
    <ErrorContainer
      title="Erro interno"
      titleContent="404"
      content="Erro interno"
    />
  );
}
