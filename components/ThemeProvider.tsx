'use client';
import { ThemeProvider as Themes, type ThemeProviderProps } from 'next-themes';

export function Theme({ children, ...props }: ThemeProviderProps) {
  return <Themes {...props}>{children}</Themes>;
}
