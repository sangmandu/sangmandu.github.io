import { useState } from 'react';
import { useLang } from '../LanguageToggle';

const t = {
  ko: {
    eras: [
      {
        year: '2024',
        label: '에이전트 프레임워크',
        color: '#ef4444',
        icon: '🔗',
        title: '흐름은 코드가 잡고, 판단은 LLM이',
        desc: '노드와 엣지로 흐름을 고정하고, 각 단계의 판단만 LLM에게 맡겼다. LangGraph, CrewAI 시대.',
        traits: ['LangGraph로 흐름을 하드코딩', '프롬프트 엔지니어링이 핵심', '흐름 자체를 LLM에 맡기면 불안정'],
        formula: '코드가 흐름 제어 + LLM은 단계별 판단',
      },
      {
        year: '2025~',
        label: '에이전트 하니스',
        color: '#22c55e',
        icon: '📋',
        title: '도구를 주고, 흐름은 에이전트가',
        desc: 'Claude Code, Codex 등장. 스킬과 도구를 제공하면 에이전트가 스스로 흐름을 만든다.',
        traits: ['스킬 = 필요할 때 꺼내는 레시피', '에이전트가 흐름을 결정', 'Claude Code (2025.2), Codex (2025.4)'],
        formula: '도구 + 지식 제공 → 에이전트가 흐름을 생성',
      },
    ],
    hint: '시대를 클릭하여 비교',
  },
  en: {
    eras: [
      {
        year: '2024',
        label: 'Agent Frameworks',
        color: '#ef4444',
        icon: '🔗',
        title: 'Code orchestrates, LLMs judge',
        desc: 'Flow hardcoded as nodes and edges. LLMs only handled per-step judgment. The LangGraph, CrewAI era.',
        traits: ['LangGraph hardcoded the flow', 'Prompt engineering was king', 'Delegating flow to LLM was unstable'],
        formula: 'Code controls flow + LLM handles per-step judgment',
      },
      {
        year: '2025~',
        label: 'Agent Harnesses',
        color: '#22c55e',
        icon: '📋',
        title: 'Give tools, agent decides the flow',
        desc: 'Claude Code, Codex arrive. Provide skills and tools, the agent creates its own flow.',
        traits: ['Skills = recipes loaded on demand', 'Agent decides the flow', 'Claude Code (2025.2), Codex (2025.4)'],
        formula: 'Tools + knowledge provided → agent generates the flow',
      },
    ],
    hint: 'Click an era to compare',
  },
};

export default function WorkflowEvolution() {
  const [active, setActive] = useState(1);
  const lang = useLang();
  const l = t[lang];
  const era = l.eras[active];

  return (
    <div style={{ maxWidth: 520, margin: '32px auto', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ display: 'flex', gap: 0, marginBottom: 16, position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '25%', right: '25%', height: 2,
          background: 'linear-gradient(to right, #ef444440, #22c55e40)',
          transform: 'translateY(-50%)', zIndex: 0,
        }} />
        {l.eras.map((e, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            flex: 1, padding: '16px 8px', borderRadius: 10, cursor: 'pointer',
            border: `2px solid ${active === i ? e.color : 'transparent'}`,
            background: active === i ? e.color + '08' : 'transparent',
            transition: 'all 0.2s', position: 'relative', zIndex: 1,
          }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>{e.icon}</div>
            <div style={{
              fontSize: 13, fontWeight: 700, color: active === i ? e.color : '#6b6b66',
            }}>{e.year}</div>
            <div style={{ fontSize: 11, color: '#a8a8a3', marginTop: 2 }}>{e.label}</div>
          </button>
        ))}
      </div>

      <div style={{
        background: '#fff', borderRadius: 12, border: '1px solid rgba(0,0,0,0.09)',
        padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        borderTop: `3px solid ${era.color}`,
      }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>
          {era.title}
        </div>
        <div style={{ fontSize: 13, color: '#6b6b66', lineHeight: 1.7, marginBottom: 16 }}>
          {era.desc}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
          {era.traits.map((trait, i) => (
            <div key={i} style={{
              padding: '6px 12px', borderRadius: 6, fontSize: 12, color: '#1a1a1a',
              background: '#f7f5f0', border: '1px solid rgba(0,0,0,0.04)',
            }}>
              {trait}
            </div>
          ))}
        </div>

        <div style={{
          padding: '10px 14px', borderRadius: 8,
          background: era.color + '08', border: `1px solid ${era.color}20`,
          fontSize: 12, color: era.color, fontWeight: 600,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          {era.formula}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 10, fontSize: 10, color: '#a8a8a3' }}>
        {l.hint}
      </div>
    </div>
  );
}
