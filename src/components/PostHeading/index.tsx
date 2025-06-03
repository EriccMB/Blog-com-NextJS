import clsx from 'clsx';
import Link from 'next/link';

type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as?: 'h1' | 'h2';
};

export function PostHeading({
  children,
  url,
  as: HeadingClass = 'h1',
}: PostHeadingProps) {
  const headingMapClasses = {
    h1: 'text-2xl/tight sm:text-4xl',
    h2: 'text-red-900 text-2xl/tight sm:text-4xl',
  };
  const commonClasses = 'font-extrabold';
  return (
    <HeadingClass className={clsx(commonClasses, headingMapClasses[HeadingClass])}>
      <Link href={url}>{children}</Link>
    </HeadingClass>
  );
}
