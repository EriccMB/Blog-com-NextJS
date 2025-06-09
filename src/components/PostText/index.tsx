import { PostHeading } from '../PostHeading';


type PostTextProps = {
  time: string;
  postHeading: 'h1' | 'h2';
  url: string;
  textContent: string;
  title: string;
  dateTime: string;
  relativeDate: string;
};

export function PostText({ time, url, textContent, title, dateTime, relativeDate, postHeading }: PostTextProps) {
  return (
    <div className="flex flex-col gap-3 justify-start">
      <time dateTime={dateTime} className="text-stone-500 text-sm" title={relativeDate}>
        {time}
      </time>
      <PostHeading as={postHeading} url={url}>{title}</PostHeading>
      <p>{textContent}</p>
    </div>
  );
}
