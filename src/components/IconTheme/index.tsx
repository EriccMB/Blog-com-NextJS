import { MoonIcon, SunIcon } from 'lucide-react';

type IconThemeProps = {
  theme: 'dark' | 'light' | '';
  handleChangeTheme: () => void;
};
export function IconTheme({ theme, handleChangeTheme }: IconThemeProps) {
  return (
    <button
      className={`fixed bottom-15 left-15 ${
        theme === 'dark'
          ? 'bg-stone-100 hover:bg-stone-300'
          : 'bg-stone-900 hover:bg-stone-800'
      } p-2 rounded-full cursor-pointer `}
      onClick={handleChangeTheme}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon color="white" />}
    </button>
  );
}
