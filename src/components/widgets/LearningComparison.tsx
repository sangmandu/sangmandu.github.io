import { useState } from 'react';
import { useLang } from '../LanguageToggle';

const t = {
  ko: {
    methods: [
      {
        name: 'Step-by-Step', code: 'sbs', color: '#3b82f6', icon: '📖',
        when: '모르는 개념이 3~4개 꽂힐 때',
        how: '바로 개념 1부터 → 확인 → 다음',
        strength: '좁고 깊은 이해',
        flow: [
          { step: '개념 설명', type: 'ai' },
          { step: '확인 질문', type: 'ai' },
          { step: '답변/next', type: 'user' },
          { step: '다음 개념', type: 'ai' },
        ],
        cases: ['특정 키워드 학습', '기술 면접 준비', '논문 용어 정리'],
        research: '없음 (AI 지식)',
        unit: '개념 (concept)',
      },
      {
        name: 'Research, Refine, Respond', code: 'rrr', color: '#22c55e', icon: '🔬',
        when: '프레임워크/도구 전체를 이해하고 싶을 때',
        how: '리서치 → 플랜 합의 → 챕터별 설명',
        strength: '넓고 깊은, 근거 있는 이해',
        flow: [
          { step: '외부 리서치', type: 'ai' },
          { step: '플랜 제시', type: 'ai' },
          { step: '승인/조정', type: 'user' },
          { step: '스텝별 검색+설명', type: 'ai' },
        ],
        cases: ['Agno 프레임워크', 'LangGraph 아키텍처', '새 도구 학습'],
        research: '매 스텝마다 세부 검색',
        unit: '챕터 (chapter)',
      },
    ],
    whenLabel: '언제 쓰는가',
    howLabel: '작동 방식',
    strengthLabel: '핵심 강점',
    researchLabel: '외부 조사',
    unitLabel: '학습 단위',
    flowLabel: '흐름',
    hint: '탭을 클릭하여 비교',
  },
  en: {
    methods: [
      {
        name: 'Step-by-Step', code: 'sbs', color: '#3b82f6', icon: '📖',
        when: "3-4 unfamiliar concepts jump out",
        how: 'Start from concept 1 → check → next',
        strength: 'Narrow and deep understanding',
        flow: [
          { step: 'Explain concept', type: 'ai' },
          { step: 'Check question', type: 'ai' },
          { step: 'Answer/next', type: 'user' },
          { step: 'Next concept', type: 'ai' },
        ],
        cases: ['Specific keyword learning', 'Interview prep', 'Paper terminology'],
        research: 'None (AI knowledge)',
        unit: 'Concept',
      },
      {
        name: 'Research, Refine, Respond', code: 'rrr', color: '#22c55e', icon: '🔬',
        when: 'Want to understand an entire framework/tool',
        how: 'Research → plan agreement → chapter-by-chapter',
        strength: 'Wide, deep, evidence-based understanding',
        flow: [
          { step: 'External research', type: 'ai' },
          { step: 'Present plan', type: 'ai' },
          { step: 'Approve/adjust', type: 'user' },
          { step: 'Per-step search + explain', type: 'ai' },
        ],
        cases: ['Agno framework', 'LangGraph architecture', 'New tool learning'],
        research: 'Focused search per step',
        unit: 'Chapter',
      },
    ],
    whenLabel: 'When to use',
    howLabel: 'How it works',
    strengthLabel: 'Key strength',
    researchLabel: 'External research',
    unitLabel: 'Learning unit',
    flowLabel: 'Flow',
    hint: 'Click tabs to compare',
  },
};

export default function LearningComparison() {
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 24px', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 10, color: '#a8a8a3', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l.whenLabel}</div>
            <div style={{ fontSize: 13, color: '#1a1a1a', fontWeight: 500 }}>{m.when}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#a8a8a3', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l.unitLabel}</div>
            <div style={{ fontSize: 13, color: '#1a1a1a', fontWeight: 500 }}>{m.unit}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#a8a8a3', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l.researchLabel}</div>
            <div style={{ fontSize: 13, color: '#1a1a1a', fontWeight: 500 }}>{m.research}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#a8a8a3', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l.strengthLabel}</div>
            <div style={{ fontSize: 13, color: m.color, fontWeight: 600 }}>{m.strength}</div>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: '#a8a8a3', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l.flowLabel}</div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {m.flow.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  padding: '6px 10px', borderRadius: 6, fontSize: 11, fontWeight: 500,
                  background: f.type === 'ai' ? m.color + '12' : '#f7f5f0',
                  color: f.type === 'ai' ? m.color : '#6b6b66',
                  border: `1px solid ${f.type === 'ai' ? m.color + '25' : 'rgba(0,0,0,0.06)'}`,
                  whiteSpace: 'nowrap',
                }}>
                  {f.type === 'user' ? '👤 ' : ''}{f.step}
                </div>
                {i < m.flow.length - 1 && (
                  <span style={{ color: '#a8a8a3', fontSize: 10 }}>→</span>
                )}
              </div>
            ))}
          </div>
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
