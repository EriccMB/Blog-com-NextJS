'use client';
import { useEffect, useState } from 'react';
import { IconTheme } from '../IconTheme';

type ThemeAvaibles = 'dark' | 'light' | '';
export function ButtonChangeTheme() {
  const [theme, setTheme] = useState<ThemeAvaibles>('light');

  const handleChangeTheme = () => {
    setTheme((prevState) => {
      const nextTheme = prevState === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  };

  useEffect(() => {
    const localStorageTheme =
      (localStorage.getItem('theme') as ThemeAvaibles) || 'light';
    setTheme(localStorageTheme);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [theme]);

  return <IconTheme theme={theme} handleChangeTheme={handleChangeTheme} />;
}
