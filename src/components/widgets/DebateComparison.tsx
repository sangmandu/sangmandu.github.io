import { useState } from 'react';
import { useLang } from '../LanguageToggle';

const t = {
  ko: {
    methods: [
      {
        name: '삼각토론', code: '333', color: '#ef4444', icon: '⚔️',
        when: '이 방향이 맞나 틀리냐', how: '찬성 / 중립 / 반대 강제 배정',
        strength: '명확한 찬반 판단',
        agents: [{ role: 'PRO', color: '#22c55e' }, { role: 'NEUTRAL', color: '#3b82f6' }, { role: 'CON', color: '#ef4444' }],
        cases: ['아키텍처 결정', '기술 스택 선택', '현재 방향 검증'],
      },
      {
        name: '다각도 리뷰', code: 'sss', color: '#8b5cf6', icon: '🔍',
        when: '다양한 시각으로 보고 싶다', how: '입장 미배정, 자율 관점',
        strength: '예상 못한 발견',
        agents: [{ role: 'Agent A', color: '#3b82f6' }, { role: 'Agent B', color: '#f59e0b' }, { role: 'Agent C', color: '#8b5cf6' }],
        cases: ['브레인스토밍', '코드 리뷰', '설계 탐색'],
      },
    ],
    whenLabel: '언제 쓰는가',
    howLabel: '어떻게 작동하는가',
    strengthLabel: '핵심 강점',
    hint: '탭을 클릭하여 비교',
  },
  en: {
    methods: [
      {
        name: 'Triangular Debate', code: '333', color: '#ef4444', icon: '⚔️',
        when: 'Is this direction right or wrong?', how: 'Force-assigned: PRO / NEUTRAL / CON',
        strength: 'Clear go/no-go verdict',
        agents: [{ role: 'PRO', color: '#22c55e' }, { role: 'NEUTRAL', color: '#3b82f6' }, { role: 'CON', color: '#ef4444' }],
        cases: ['Architecture decisions', 'Tech stack choice', 'Direction validation'],
      },
      {
        name: 'Multi-Angle Review', code: 'sss', color: '#8b5cf6', icon: '🔍',
        when: 'Want diverse perspectives', how: 'No role assignment, autonomous angles',
        strength: 'Unexpected discoveries',
        agents: [{ role: 'Agent A', color: '#3b82f6' }, { role: 'Agent B', color: '#f59e0b' }, { role: 'Agent C', color: '#8b5cf6' }],
        cases: ['Brainstorming', 'Code review', 'Design exploration'],
      },
    ],
    whenLabel: 'When to use',
    howLabel: 'How it works',
    strengthLabel: 'Key strength',
    hint: 'Click tabs to compare',
  },
};

export default function DebateComparison() {
  const [active, setActive] = useState(0);
  const lang = useLang();
  const l = t[lang];
  const m = l.methods[active];

  return (
    <div style={{ maxWidth: 520, margin: '32px auto', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {l.methods.map((method, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            flex: 1, padding: '14px', borderRadius: 10, cursor: 'pointer',
            border: `2px solid ${active === i ? method.color : method.color + '25'}`,
            background: active === i ? method.color + '08' : '#fff',
            transition: 'all 0.2s',
          }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>{method.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: method.color }}>{method.name}</div>
            <div style={{
              fontSize: 11, color: '#a8a8a3', marginTop: 4,
              fontFamily: "'JetBrains Mono', monospace",
            }}>/{method.code}</div>
          </button>
        ))}
      </div>

      <div style={{
        background: '#fff', borderRadius: 12, border: '1px solid rgba(0,0,0,0.09)',
        padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 10, color: '#a8a8a3', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l.whenLabel}</div>
            <div style={{ fontSize: 13, color: '#1a1a1a', fontWeight: 500 }}>{m.when}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#a8a8a3', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l.howLabel}</div>
            <div style={{ fontSize: 13, color: '#1a1a1a', fontWeight: 500 }}>{m.how}</div>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <div style={{ fontSize: 10, color: '#a8a8a3', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l.strengthLabel}</div>
            <div style={{ fontSize: 13, color: m.color, fontWeight: 600 }}>{m.strength}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {m.agents.map((a, i) => (
            <div key={i} style={{
              flex: 1, padding: '10px', borderRadius: 8, textAlign: 'center',
              background: a.color + '10', border: `1px solid ${a.color}25`,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', margin: '0 auto 6px',
                background: a.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700, color: a.color,
              }}>{String.fromCharCode(65 + i)}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: a.color }}>{a.role}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {m.cases.map((c, i) => (
            <span key={i} style={{
              padding: '4px 10px', borderRadius: 20, fontSize: 11,
              background: '#f7f5f0', color: '#6b6b66', border: '1px solid rgba(0,0,0,0.06)',
            }}>{c}</span>
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 10, fontSize: 10, color: '#a8a8a3' }}>{l.hint}</div>
    </div>
  );
}
