import { PostHeading } from "../PostHeading";
import { PostImage } from "../PostImage";

export function FeaturedPost() {
    const slug = 'sla';
    const postLink = `/posts/${slug}`
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 group mb-10">
      <PostImage url={postLink} alt="Title" src="/images/bryen_1.png" priority />
      <div className="flex flex-col gap-3 justify-start">
        <time dateTime="2025-05-10" className="text-stone-500 text-sm">
          10-05-2025 09:00
        </time>
        <PostHeading url={postLink}>Featured Post</PostHeading>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate
          maiores, ut quibusdam non architecto quos? Amet labore veniam id error
          obcaecati blanditiis laborum eligendi esse expedita. Ducimus, laborum
          odit asperiores
        </p>
      </div>
    </section>
  );
}
