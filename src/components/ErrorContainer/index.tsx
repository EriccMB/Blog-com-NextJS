'use client';
type ErrorContainerProps = {
  title: string;
  titleContent: string;
  content: React.ReactNode;
};

export function ErrorContainer({
  content,
  title,
  titleContent,
}: ErrorContainerProps) {
  return (
    <>
      <title>{title}</title>
      <div className="w-full flex flex-col gap-15 justify-center items-center py-30 ">
        <h1 className="text-stone-900 font-bold text-7xl">{titleContent}</h1>
        <p>{content}</p>
      </div>
    </>
  );
}
