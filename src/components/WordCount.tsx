import { useLang } from './LanguageToggle';

export default function WordCount({ ko, en }: { ko: number; en: number }) {
  const lang = useLang();
  const count = lang === 'ko' ? ko : en;
  return <span>{count.toLocaleString()} words</span>;
}
