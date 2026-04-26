import { useLang } from './LanguageToggle';

interface Props {
  title: string;
  titleEn?: string;
  excerpt: string;
  excerptEn?: string;
}

export default function PostTitle({ title, titleEn, excerpt, excerptEn }: Props) {
  const lang = useLang();
  const t = lang === 'en' && titleEn ? titleEn : title;
  const e = lang === 'en' && excerptEn ? excerptEn : excerpt;

  return (
    <>
      <h1 style={{
        fontSize: 40, fontWeight: 500, letterSpacing: '-0.025em',
        lineHeight: 1.15, margin: '0 0 16px',
      }}>{t}</h1>
      <p style={{
        fontSize: 19, lineHeight: 1.55, color: 'var(--sub)',
        margin: '0 0 40px', fontStyle: 'italic',
      }}>{e}</p>
    </>
  );
}
