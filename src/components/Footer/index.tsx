import clsx from 'clsx';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-16 pb-16 text-center">
      <Link className={clsx('hover:underline hover:text-stone-600')} href={'https://portfolioericmorais.netlify.app/'} target="blank">
        {new Date().getFullYear()} - Eric Morais &copy; - Portifólio{' '}
      </Link>
    </footer>
  );
}
