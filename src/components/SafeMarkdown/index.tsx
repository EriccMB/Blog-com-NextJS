import clsx from 'clsx';
import Markdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

type SafeMarkdownProps = {
  markdown: string;
};

export function SafeMarkdown({ markdown }: SafeMarkdownProps) {
  return (
    <div
      className={clsx(
        'prose prose-stone',
        'w-full max-w-none',
        'overflow-hidden',
        'prose-a:text-blue-500',
        'prose-a:hover:text-blue-700',
        'prose-a:no-underline',
        'prose-a:hover:underline',
        'prose-img:mx-auto',
        'md:prose-lg'
      )}
    >
      <Markdown rehypePlugins={[rehypeSanitize]} remarkPlugins={[remarkGfm]}>
        {markdown}
      </Markdown>
    </div>
  );
}
