import clsx from 'clsx';
import { useId } from 'react';

type InputTextPros = {
  labelText?: string;
} & React.ComponentProps<'input'>;

export default function InputText({ labelText, ...props }: InputTextPros) {
  const id = useId();
  return (
    <div className="flex flex-col gap-4">
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <input
        id={id}
        {...props}
        className={clsx(
          'bg-white outline-0 ring-2 ring-stone-300',
          'rounded-sm p-3',
          'text-base/tight',
          'transition',
          'focus:ring-stone-700',
          'placeholder-stone-400',
          'disabled:bg-stone-200 disabled:cursor-not-allowed',
          'read-only:bg-stone-100',
          props.className,
        )}
      />
    </div>
  );
}
