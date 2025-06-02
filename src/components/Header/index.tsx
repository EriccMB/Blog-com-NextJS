import clsx from 'clsx';
import Link from 'next/link';

export function Header() {
  return (
    <header>
      {/** sm: é acima de 640px */}
      <h1
        className={clsx(
          'text-5xl font-extrabold py-9',
          'sm:py-10',
          'md:text-6xl md: py-11',
          'lg:text-7xl lg: py-12'
        )}
      >
        <Link href="#">Blog</Link>
      </h1>
    </header>
  );
}
