'use client';
import clsx from 'clsx';
import {
  ArrowDown,
  CircleX,
  FileTextIcon,
  HomeIcon,
  LockOpenIcon,
  LogOut,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  Text,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  const navClasses = clsx(
    'bg-stone-900 text-stone-100 flex flex-col ',
    'rounded-lg gap-2 mb-6',
    // 'sm:grid sm:grid-cols-6 sm:justify-center sm:h-auto ',
    'sm:flex-row sm:flex-wrap sm:justify-around sm:h-auto ',
    !isOpen && 'h-10 overflow-hidden',
  );
  const linkClasses = clsx(
    'flex items-center gap-2 p-2 transition hover:bg-stone-700 h-10 shrink-0 rounded-lg cursor-pointer sm:justify-center',
  );
  const openedClosedButton = clsx(linkClasses, 'italic sm:hidden');
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
      <Link href="#" className={linkClasses}>
        <LogOutIcon />
        Sair
      </Link>
    </nav>
  );
}
