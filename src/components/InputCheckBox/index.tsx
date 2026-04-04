import clsx from 'clsx';
import { useId } from 'react';

type InputCheckBoxProps = {
  labelText?: string;
  type?: 'checkbox';
} & React.ComponentProps<'input'>;

export default function InputCheckBox({
  labelText,
  type = 'checkbox',
  ...props
}: InputCheckBoxProps) {
  const id = useId();
  return (
    <div className="flex gap-4 items-center">
      <input
        id={id}
        type={type}
        {...props}
        className={clsx(
          'w-4 h-4 outline-none',
          'focus:ring-1 focus:ring-stone-700',
          props.className,
        )}
      />
      {labelText && <label htmlFor={id}>{labelText}</label>}
    </div>
  );
}
