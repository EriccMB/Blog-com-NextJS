import clsx from 'clsx';

type SpinLoadingProps = {
  spinClasses?: string;
};

export function SpinLoading({ spinClasses }: SpinLoadingProps) {
  const classes = clsx('flex items-center justify-center ', spinClasses);

  return (
    <div className={classes}>
      <div className="w-10 h-10 border-5 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
