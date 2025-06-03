import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type PostImageProps = {
  href: string;
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

export function PostImage({ href, src, alt, priority }: PostImageProps) {
  return (
    <Link href={href} className={clsx("w-full h-full overflow-hidden rounded-2xl")}>
      <Image
        className={clsx("w-full h-full group-hover:scale-105 transition object-cover object-center")}
        src={src}
        width={1200}
        height={760}
        alt={alt}
        priority={priority}
      />
    </Link>
  );
}
