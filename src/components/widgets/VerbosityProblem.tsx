import { useState } from 'react';
import { useLang } from '../LanguageToggle';

const t = {
  ko: {
    tabs: ['AI 기본 동작', '이상적인 학습'],
    hint: '탭을 클릭하여 비교',
    ai: {
      title: 'AI의 기본 모드',
      steps: [
        { label: '응답', desc: '개념 A, B, C, D, E를 한 번에 설명', icon: '📄', size: 100 },
        { label: '질문', desc: 'B가 뭐야?', icon: '❓', size: 30 },
        { label: '답변', desc: 'B에 대한 추가 설명', icon: '💬', size: 60 },
        { label: '질문', desc: 'C도 모르겠는데?', icon: '❓', size: 30 },
        { label: '답변', desc: 'C에 대한 추가 설명', icon: '💬', size: 60 },
      ],
      problem: '원래 설명은 ↑↑↑ 저 위로 밀려남',
    },
    ideal: {
      title: '끊어서 배우기',
      steps: [
        { label: 'A 설명', desc: '개념 A만 설명', icon: '📖', size: 50 },
        { label: '확인', desc: '이해됨 → next', icon: '✅', size: 20 },
        { label: 'B 설명', desc: '개념 B만 설명', icon: '📖', size: 50 },
        { label: '질문', desc: 'B가 잘 모르겠어', icon: '❓', size: 20 },
        { label: 'B 재설명', desc: '다른 각도로 B 설명', icon: '🔄', size: 50 },
      ],
      problem: '항상 지금 개념에 집중',
    },
  },
  en: {
    tabs: ['AI Default', 'Ideal Learning'],
    hint: 'Click tabs to compare',
    ai: {
      title: "AI's Default Mode",
      steps: [
        { label: 'Response', desc: 'Explains A, B, C, D, E all at once', icon: '📄', size: 100 },
        { label: 'Question', desc: "What's B?", icon: '❓', size: 30 },
        { label: 'Answer', desc: 'Additional explanation for B', icon: '💬', size: 60 },
        { label: 'Question', desc: "Don't understand C either", icon: '❓', size: 30 },
        { label: 'Answer', desc: 'Additional explanation for C', icon: '💬', size: 60 },
      ],
      problem: 'Original explanation pushed ↑↑↑ way up',
    },
    ideal: {
      title: 'Learn in chunks',
      steps: [
        { label: 'Explain A', desc: 'Only concept A', icon: '📖', size: 50 },
        { label: 'Check', desc: 'Understood → next', icon: '✅', size: 20 },
        { label: 'Explain B', desc: 'Only concept B', icon: '📖', size: 50 },
        { label: 'Question', desc: "B is unclear", icon: '❓', size: 20 },
        { label: 'Re-explain B', desc: 'B from another angle', icon: '🔄', size: 50 },
      ],
      problem: 'Always focused on current concept',
    },
  },
};

export default function VerbosityProblem() {
  const [mode, setMode] = useState(0);
  const lang = useLang();
  const l = t[lang];
  const data = mode === 0 ? l.ai : l.ideal;
  const colors = ['#ef4444', '#22c55e'];

  return (
    <div style={{ maxWidth: 520, margin: '32px auto', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {l.tabs.map((tab, i) => (
          <button key={i} onClick={() => setMode(i)} style={{
            flex: 1, padding: '12px', borderRadius: 10, cursor: 'pointer',
            border: `2px solid ${mode === i ? colors[i] : colors[i] + '25'}`,
            background: mode === i ? colors[i] + '08' : '#fff',
            fontSize: 14, fontWeight: 600, color: mode === i ? colors[i] : '#a8a8a3',
            transition: 'all 0.2s',
          }}>{tab}</button>
        ))}
      </div>

      <div style={{
        background: '#fff', borderRadius: 12, border: '1px solid rgba(0,0,0,0.09)',
        padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: colors[mode], marginBottom: 16 }}>
          {data.title}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {data.steps.map((step, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '8px 12px', borderRadius: 8,
              background: '#f7f5f0',
              transition: 'all 0.3s',
            }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{step.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6b6b66', marginBottom: 2 }}>
                  {step.label}
                </div>
                <div style={{ fontSize: 12, color: '#1a1a1a' }}>{step.desc}</div>
              </div>
              <div style={{
                width: `${step.size * 0.6}px`, height: 6, borderRadius: 3,
                background: colors[mode] + '30', flexShrink: 0,
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: 3,
                  background: colors[mode], opacity: 0.6,
                }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 16, padding: '10px 14px', borderRadius: 8,
          background: colors[mode] + '08', border: `1px solid ${colors[mode]}20`,
        }}>
          <div style={{ fontSize: 12, color: colors[mode], fontWeight: 600 }}>
            {mode === 0 ? '⚠️' : '✓'} {data.problem}
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 10, fontSize: 10, color: '#a8a8a3' }}>{l.hint}</div>
    </div>
  );
}
