import { useLang } from './LanguageToggle';
import type { ReactNode } from 'react';

export function Ko({ children }: { children: ReactNode }) {
  const lang = useLang();
  if (lang !== 'ko') return null;
  return <>{children}</>;
}

export function En({ children }: { children: ReactNode }) {
  const lang = useLang();
  if (lang !== 'en') return null;
  return <>{children}</>;
}
