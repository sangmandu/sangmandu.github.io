import { useEffect, useState } from 'react';

export function getInitialLang(): 'ko' | 'en' {
  if (typeof window === 'undefined') return 'ko';
  return (localStorage.getItem('lang') as 'ko' | 'en') || 'ko';
}

export function setLang(lang: 'ko' | 'en') {
  localStorage.setItem('lang', lang);
  window.dispatchEvent(new CustomEvent('lang-change', { detail: lang }));
}

export function useLang() {
  const [lang, setLangState] = useState<'ko' | 'en'>('ko');

  useEffect(() => {
    setLangState(getInitialLang());
    const handler = (e: Event) => setLangState((e as CustomEvent).detail);
    window.addEventListener('lang-change', handler);
    return () => window.removeEventListener('lang-change', handler);
  }, []);

  return lang;
}

export default function LanguageToggle() {
  const lang = useLang();

  const base = {
    padding: '3px 8px',
    fontSize: 11,
    fontWeight: 500 as const,
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'Inter', sans-serif",
    letterSpacing: '0.02em',
    transition: 'all 0.15s',
    borderRadius: 0,
    lineHeight: '18px',
  };

  return (
    <span style={{
      display: 'inline-flex',
      border: '1px solid rgba(0,0,0,0.09)',
      borderRadius: 5,
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setLang('ko')}
        style={{
          ...base,
          background: lang === 'ko' ? '#1a1a1a' : 'transparent',
          color: lang === 'ko' ? '#fff' : '#a8a8a3',
          borderRadius: '4px 0 0 4px',
        }}
      >KO</button>
      <span style={{
        width: 1, background: 'rgba(0,0,0,0.09)', alignSelf: 'stretch',
      }} />
      <button
        onClick={() => setLang('en')}
        style={{
          ...base,
          background: lang === 'en' ? '#1a1a1a' : 'transparent',
          color: lang === 'en' ? '#fff' : '#a8a8a3',
          borderRadius: '0 4px 4px 0',
        }}
      >EN</button>
    </span>
  );
}
