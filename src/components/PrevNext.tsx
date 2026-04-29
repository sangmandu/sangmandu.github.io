import { useLang } from './LanguageToggle';

interface NavPost {
  id: string;
  data: { title: string; title_en?: string };
}

export default function PrevNext({ prev, next }: { prev?: NavPost; next?: NavPost }) {
  const lang = useLang();

  if (!prev && !next) return null;

  const getTitle = (post: NavPost) =>
    lang === 'en' && post.data.title_en ? post.data.title_en : post.data.title;

  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', gap: 24,
      marginTop: 56, paddingTop: 32, borderTop: '1px solid var(--border)',
    }}>
      {prev ? (
        <a href={`/posts/${prev.id}`} style={{ maxWidth: '45%', textDecoration: 'none' }}>
          <span style={{ fontSize: 12, color: 'var(--mute)', display: 'block', marginBottom: 4 }}>← Previous</span>
          <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{getTitle(prev)}</span>
        </a>
      ) : <div />}
      {next ? (
        <a href={`/posts/${next.id}`} style={{ maxWidth: '45%', textDecoration: 'none', textAlign: 'right', marginLeft: 'auto' }}>
          <span style={{ fontSize: 12, color: 'var(--mute)', display: 'block', marginBottom: 4 }}>Next →</span>
          <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{getTitle(next)}</span>
        </a>
      ) : <div />}
    </div>
  );
}
