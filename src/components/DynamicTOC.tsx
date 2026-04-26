import { useEffect, useState } from 'react';
import { useLang } from './LanguageToggle';

interface Heading {
  text: string;
  slug: string;
  depth: number;
}

export default function DynamicTOC() {
  const lang = useLang();
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const collect = () => {
      const results: Heading[] = [];
      const visibleBlocks = document.querySelectorAll(`.lang-block.lang-${lang}`);
      visibleBlocks.forEach(block => {
        block.querySelectorAll('h2, h3').forEach(el => {
          results.push({
            text: el.textContent || '',
            slug: el.id,
            depth: parseInt(el.tagName[1]),
          });
        });
      });

      if (results.length === 0) {
        document.querySelectorAll('.prose > h2, .prose > h3').forEach(el => {
          if (!el.closest('.lang-block')) {
            results.push({
              text: el.textContent || '',
              slug: el.id,
              depth: parseInt(el.tagName[1]),
            });
          }
        });
      }

      setHeadings(results);
    };

    collect();
    const timer = setTimeout(collect, 200);
    return () => clearTimeout(timer);
  }, [lang]);

  if (headings.length === 0) return null;

  return (
    <div style={{ position: 'sticky', top: 100, fontSize: 12 }}>
      {headings.map((h, i) => (
        <a
          key={`${h.slug}-${i}`}
          href={`#${h.slug}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(h.slug)?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            display: 'block',
            color: 'var(--mute)',
            padding: '4px 0',
            lineHeight: 1.4,
            borderLeft: '1px solid var(--border-soft)',
            paddingLeft: h.depth === 3 ? 24 : 12,
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--text)'; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--mute)'; }}
        >
          {h.text}
        </a>
      ))}
    </div>
  );
}
