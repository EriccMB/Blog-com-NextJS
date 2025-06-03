import { PostHeading } from '../PostHeading';

type PostTextProps = {
  time: string;
  url: string;
  textContent: string;
  title: string;
};

export function PostText({ time, url, textContent, title }: PostTextProps) {
  return (
    <div className="flex flex-col gap-3 justify-start">
      <time dateTime="2025-05-10" className="text-stone-500 text-sm">
        {time}
      </time>
      <PostHeading as='h2' url={url}>{title}</PostHeading>
      <p>{textContent}</p>
    </div>
  );
}
