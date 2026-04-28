'use client';
import { logoutAction } from '@/actions/login/loguot-action';
import clsx from 'clsx';
import {
  CircleX,
  FileTextIcon,
  HomeIcon,
  HourglassIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

export default function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const [isPending, startTranstiton] = useTransition();

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  const navClasses = clsx(
    'bg-stone-900 text-stone-100 flex flex-col ',
    'rounded-lg gap-2 mb-12',
    // 'sm:grid sm:grid-cols-6 sm:justify-center sm:h-auto ',
    'sm:flex-row sm:flex-wrap sm:justify-around sm:h-auto ',
    !isOpen && 'h-10 overflow-hidden',
  );
  const linkClasses = clsx(
    'flex items-center gap-2 p-2 transition hover:bg-stone-700 h-10 shrink-0 rounded-lg cursor-pointer sm:justify-center min-w-40',
  );
  const openedClosedButton = clsx(linkClasses, 'italic sm:hidden');

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    startTranstiton(async () => {
      await logoutAction();
    });
  }
  return (
    <nav className={navClasses}>
      <button className={openedClosedButton} onClick={() => setIsOpen(!isOpen)}>
        {!isOpen && (
          <>
            <MenuIcon />
            Menu
          </>
        )}
        {isOpen && (
          <>
            <CircleX />
            Fechar
          </>
        )}
      </button>
      <a href="/" target="_blank" className={linkClasses}>
        <HomeIcon />
        Home
      </a>
      <Link href="/admin/post" className={linkClasses}>
        <FileTextIcon />
        Posts
      </Link>
      <Link href="/admin/post/new" className={linkClasses}>
        <PlusIcon />
        Novo Post
      </Link>
      <a href="#" className={linkClasses} onClick={handleLogout}>
        {isPending && (
          <>
            <HourglassIcon />
            Aguarde...
          </>
        )}
        {!isPending && (
          <>
            <LogOutIcon />
            Sair
          </>
        )}
      </a>
    </nav>
  );
}
