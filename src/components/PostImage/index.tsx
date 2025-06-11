import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type PostImageProps = {
  url: string;
  src: string;
  alt: string;
  priority?: boolean;
  linkClass?: string;
};

export function PostImage({ url, src, alt, priority, linkClass }: PostImageProps) {
  console.log(linkClass)
  return (
    <Link
      href={url}
      className={clsx('w-full h-full  overflow-hidden rounded-2xl ', linkClass)}
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
