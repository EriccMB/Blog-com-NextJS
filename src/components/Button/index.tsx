import clsx from 'clsx';

type ButtonColorVariants = 'default' | 'ghost' | 'danger';

type ButtonSizes = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant?: ButtonColorVariants;
  size?: ButtonSizes;
} & React.ComponentProps<'button'>;

export default function Button({
  variant = 'default',
  size = 'md',
  ...props
}: ButtonProps) {
  const buttonDefaultStyles = clsx(
    'text-center rounded-lg cursor-pointer hover:opacity-85 transtion',
    'disabled:bg-stone-400 disabled:cursor-not-allowed',
  );

  const buttonColorDictonary: Record<ButtonColorVariants, string> = {
    default: clsx('bg-green-800 text-white'),
    ghost: clsx('bg-transparent border-2 border-solid text-stone-900'),
    danger: clsx('bg-red-600 text-white'),
  };

  const buttonSizeDictonary: Record<ButtonSizes, string> = {
    sm: clsx('text-sm/tight px-2 py-1'),
    md: clsx('text-base/tight px-4 py-3'),
    lg: clsx('text-xl/tight px-6 py-4'),
  };

  const buttonClasses = clsx(
    buttonDefaultStyles,
    buttonColorDictonary[variant],
    buttonSizeDictonary[size],
    props.className,
  );

  return <button {...props} className={buttonClasses} />;
}
