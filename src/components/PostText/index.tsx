import { PostHeading } from '../PostHeading';

type PostTextProps = {
  time: string;
  url: string;
  textContent: string;
  title: string;
  dateTime: string;
};

export function PostText({ time, url, textContent, title, dateTime }: PostTextProps) {
  return (
    <div className="flex flex-col gap-3 justify-start">
      <time dateTime={dateTime} className="text-stone-500 text-sm">
        {time}
      </time>
      <PostHeading as='h2' url={url}>{title}</PostHeading>
      <p>{textContent}</p>
    </div>
  );
}
