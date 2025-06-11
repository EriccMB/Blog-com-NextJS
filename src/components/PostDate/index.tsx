import { getFormatedDateTime, getRelativeDate } from '@/utils/get-formateddate';

type PostDateProps = {
  dateTime: string;
};

export function PostDate({ dateTime }: PostDateProps) {
  return (
    <time
      dateTime={dateTime}
      className="text-stone-500 text-sm"
      title={getRelativeDate(dateTime)}
    >
      {getFormatedDateTime(dateTime)}
    </time>
  );
}
