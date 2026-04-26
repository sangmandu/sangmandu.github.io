import { useState } from 'react';
import { useLang } from '../LanguageToggle';

const t = {
  ko: {
    agents: [
      { role: 'PRO', label: '찬성', icon: '👍', desc: '현재 방향을 무조건 방어한다', action: '근거를 찾아서 옹호', example: '"이 구조는 확장성이 좋고, 기존 패턴과 일관성이 있다."' },
      { role: 'NEUTRAL', label: '중립', icon: '⚖️', desc: '양쪽을 객관적으로 분석한다', action: '대안 비교 + 트레이드오프', example: '"A 방식은 유지보수에 유리하고, B 방식은 성능에 유리하다."' },
      { role: 'CON', label: '반대', icon: '👎', desc: '현재 방향을 무조건 공격한다', action: '근본적 결함을 찾아 공격', example: '"이 접근은 근본적으로 문제가 있다. 완전히 다른 방법이 낫다."' },
    ],
    rolePrefix: '역할',
    hint: '에이전트를 클릭하여 역할 확인',
  },
  en: {
    agents: [
      { role: 'PRO', label: 'Advocate', icon: '👍', desc: 'Unconditionally defends the current direction', action: 'Find evidence to support it', example: '"This structure has good extensibility and is consistent with existing patterns."' },
      { role: 'NEUTRAL', label: 'Analyst', icon: '⚖️', desc: 'Objectively analyzes both sides', action: 'Compare alternatives + trade-offs', example: '"Approach A favors maintainability, while approach B favors performance."' },
      { role: 'CON', label: 'Critic', icon: '👎', desc: 'Unconditionally attacks the current direction', action: 'Find fundamental flaws', example: '"This approach is fundamentally flawed. An entirely different method would be better."' },
    ],
    rolePrefix: 'Role',
    hint: 'Click an agent to see its role',
  },
};

const agentColors = ['#22c55e', '#3b82f6', '#ef4444'];

export default function TriangularDebate() {
  const [selected, setSelected] = useState<number | null>(null);
  const lang = useLang();
  const l = t[lang];

  return (
    <div style={{ maxWidth: 520, margin: '32px auto', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {l.agents.map((a, i) => (
          <button key={i} onClick={() => setSelected(i)} style={{
            flex: 1, padding: '18px 14px', borderRadius: 12, cursor: 'pointer',
            border: `2px solid ${selected === i ? agentColors[i] : agentColors[i] + '30'}`,
            background: selected === i ? agentColors[i] + '10' : '#fff',
            transition: 'all 0.2s',
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{a.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: agentColors[i] }}>{a.role}</div>
            <div style={{ fontSize: 11, color: '#6b6b66', marginTop: 2 }}>{a.label}</div>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div style={{
          background: '#fff', borderRadius: 12, border: `1px solid ${agentColors[selected]}30`,
          padding: '20px 24px', marginBottom: 12, borderLeft: `4px solid ${agentColors[selected]}`,
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: agentColors[selected], marginBottom: 8 }}>
            {l.agents[selected].role} Agent — {l.agents[selected].desc}
          </div>
          <div style={{
            fontSize: 12, color: '#6b6b66', marginBottom: 12,
            padding: '6px 10px', background: '#f7f5f0', borderRadius: 6,
          }}>
            {l.rolePrefix}: {l.agents[selected].action}
          </div>
          <div style={{
            fontSize: 13, lineHeight: 1.6, color: '#1a1a1a', fontStyle: 'italic',
            padding: '10px 14px', background: agentColors[selected] + '08', borderRadius: 8,
          }}>
            {l.agents[selected].example}
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: 10, fontSize: 10, color: '#a8a8a3' }}>{l.hint}</div>
    </div>
  );
}
