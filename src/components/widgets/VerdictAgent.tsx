import { useState } from 'react';
import { useLang } from '../LanguageToggle';

const t = {
  ko: {
    agents: [
      { role: 'PRO', label: '찬성', color: '#22c55e', icon: '👍', summary: '"이 구조가 맞다"' },
      { role: 'NEUTRAL', label: '중립', color: '#3b82f6', icon: '⚖️', summary: '"양쪽 다 일리 있다"' },
      { role: 'CON', label: '반대', color: '#ef4444', icon: '👎', summary: '"근본적 문제 있다"' },
    ],
    flowLabel: '삼각토론 결과',
    arrow: '결과만 전달',
    title: 'Verdict Agent',
    desc: '독립된 판단자 — 원래 코드나 작업 맥락을 모른다.',
    how: '세 에이전트의 주장과 근거만 보고 최종 결정',
    block: 'main agent의 편향 (자기 코드 선호) 을 차단',
    hint: 'Verdict Agent를 클릭하여 상세 보기',
  },
  en: {
    agents: [
      { role: 'PRO', label: 'Advocate', color: '#22c55e', icon: '👍', summary: '"This structure is correct"' },
      { role: 'NEUTRAL', label: 'Analyst', color: '#3b82f6', icon: '⚖️', summary: '"Both sides have merit"' },
      { role: 'CON', label: 'Critic', color: '#ef4444', icon: '👎', summary: '"Fundamental problem"' },
    ],
    flowLabel: 'Debate results',
    arrow: 'Results only',
    title: 'Verdict Agent',
    desc: 'Independent judge — no knowledge of original code or work context.',
    how: 'Decides based solely on the three agents\' arguments and evidence',
    block: 'Blocks main agent bias (preference for own code)',
    hint: 'Click Verdict Agent for details',
  },
};

export default function VerdictAgent() {
  const [open, setOpen] = useState(false);
  const lang = useLang();
  const l = t[lang];

  return (
    <div style={{ maxWidth: 520, margin: '32px auto', fontFamily: "'Inter', sans-serif" }}>
      <div style={{
        background: '#fff', borderRadius: 12, border: '1px solid rgba(0,0,0,0.09)',
        padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        <div style={{ fontSize: 10, color: '#a8a8a3', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
          {l.flowLabel}
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          {l.agents.map((a, i) => (
            <div key={i} style={{
              flex: 1, padding: '10px 8px', borderRadius: 8, textAlign: 'center',
              background: a.color + '08', border: `1px solid ${a.color}20`,
            }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{a.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: a.color }}>{a.role}</div>
              <div style={{ fontSize: 10, color: '#6b6b66', marginTop: 4, fontStyle: 'italic', lineHeight: 1.3 }}>
                {a.summary}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 8, margin: '4px 0 12px', color: '#a8a8a3',
        }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.06)' }} />
          <div style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
            ↓ {l.arrow}
          </div>
          <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.06)' }} />
        </div>

        <button onClick={() => setOpen(!open)} style={{
          width: '100%', padding: '14px', borderRadius: 10, border: '2px solid #4f46e530',
          background: open ? '#4f46e510' : '#faf9f7', cursor: 'pointer',
          fontSize: 13, fontWeight: 600, color: '#4f46e5', transition: 'all 0.2s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <span style={{
            width: 28, height: 28, borderRadius: '50%', background: '#4f46e515',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
          }}>⚖️</span>
          {l.title}
          <span style={{ fontSize: 10, opacity: 0.6 }}>{open ? '▼' : '▶'}</span>
        </button>

        {open && (
          <div style={{
            marginTop: 10, padding: '16px 20px', borderRadius: 8,
            background: '#4f46e506', borderLeft: '3px solid #4f46e5',
          }}>
            <div style={{ fontSize: 12, color: '#6b6b66', lineHeight: 1.7 }}>
              <div style={{ marginBottom: 8, color: '#1a1a1a', fontWeight: 500 }}>{l.desc}</div>
              <div style={{ marginBottom: 10 }}>{l.how}</div>
              <div style={{
                padding: '8px 12px', background: '#4f46e508', borderRadius: 6,
                fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: '#4f46e5',
              }}>
                {l.block}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: 10, fontSize: 10, color: '#a8a8a3' }}>{l.hint}</div>
    </div>
  );
}
