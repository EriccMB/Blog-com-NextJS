import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type PostImageProps = {
  url: string;
  src: string;
  alt: string;
  priority?: boolean;
};

export function PostImage({ url, src, alt, priority }: PostImageProps) {
  return (
    <Link
      href={url}
      className={clsx('w-full h-full overflow-hidden rounded-2xl')}
    >
      <Image
        className={clsx(
          'w-full h-full group-hover:scale-105 transition object-cover object-center'
        )}
        src={src}
        width={1200}
        height={760}
        alt={alt}
        priority={priority}
      />
    </Link>
  );
}
