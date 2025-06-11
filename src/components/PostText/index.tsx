import { PostDate } from '../PostDate';
import { PostHeading } from '../PostHeading';

type PostTextProps = {
  postHeading: 'h1' | 'h2';
  url: string;
  textContent: string;
  title: string;
  dateTime: string;
};

export function PostText({
  url,
  textContent,
  title,
  dateTime,
  postHeading,
}: PostTextProps) {
  return (
    <div className="flex flex-col gap-3 justify-start">
      <PostDate dateTime={dateTime} />

      <PostHeading as={postHeading} url={url}>
        {title}
      </PostHeading>
      <p>{textContent}</p>
    </div>
  );
}
