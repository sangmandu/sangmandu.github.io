import { useState, useEffect, useRef } from 'react';

interface Post {
  slug: string;
  title: string;
  tags: string[];
  excerpt: string;
  date: string;
}

interface Props {
  posts: Post[];
}

export default function SearchPalette({ posts }: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(v => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ('');
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    const trigger = document.getElementById('search-trigger');
    if (trigger) {
      const handler = () => setOpen(true);
      trigger.addEventListener('click', handler);
      return () => trigger.removeEventListener('click', handler);
    }
  }, []);

  if (!open) return null;

  const qLower = q.toLowerCase().trim();
  const matches = qLower
    ? posts.filter(p =>
        p.title.toLowerCase().includes(qLower) ||
        p.tags.some(t => t.includes(qLower)) ||
        p.excerpt.toLowerCase().includes(qLower)
      )
    : posts.slice(0, 5);

  const pages = [
    { title: 'Writing (home)', href: '/' },
    { title: 'Archive', href: '/archive' },
    { title: 'About', href: '/about' },
  ].filter(x => !qLower || x.title.toLowerCase().includes(qLower));

  return (
    <div onClick={() => setOpen(false)} style={{
      position: 'fixed', inset: 0,
      background: 'rgba(26, 26, 26, 0.35)',
      backdropFilter: 'blur(4px)',
      zIndex: 100,
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
      paddingTop: '12vh',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: 'min(560px, 92vw)',
        background: '#f7f5f0',
        border: '1px solid rgba(0,0,0,0.09)',
        borderRadius: 12,
        boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search posts..."
            style={{
              width: '100%', border: 'none', background: 'transparent',
              fontSize: 15, outline: 'none', color: '#1a1a1a',
              fontFamily: 'Inter, -apple-system, sans-serif',
            }}
          />
        </div>
        <div style={{ maxHeight: '50vh', overflowY: 'auto', padding: '8px 0' }}>
          {pages.length > 0 && (
            <div>
              <div style={{ padding: '8px 16px', fontSize: 11, color: '#a8a8a3', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>Pages</div>
              {pages.map(p => (
                <a key={p.href} href={p.href} style={{
                  display: 'block', padding: '10px 16px', color: '#1a1a1a',
                  fontSize: 14, textDecoration: 'none',
                }}>{p.title}</a>
              ))}
            </div>
          )}
          {matches.length > 0 && (
            <div>
              <div style={{ padding: '8px 16px', fontSize: 11, color: '#a8a8a3', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>Posts</div>
              {matches.map(p => (
                <a key={p.slug} href={`/posts/${p.slug}`} style={{
                  display: 'block', padding: '10px 16px', color: '#1a1a1a',
                  textDecoration: 'none',
                }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: '#6b6b66', marginTop: 2 }}>
                    {p.date.slice(5).replace('-', '.')} · {p.tags.map(t => '#' + t).join(' ')}
                  </div>
                </a>
              ))}
            </div>
          )}
          {pages.length === 0 && matches.length === 0 && (
            <div style={{ padding: '24px 16px', textAlign: 'center' as const, color: '#a8a8a3', fontSize: 13 }}>
              No results
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
