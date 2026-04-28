import { useState } from 'react';
import { useLang } from '../LanguageToggle';

const t = {
  ko: {
    steps: [
      {
        phase: '[1/4]', title: 'Producer-Consumer',
        action: 'AI가 첫 번째 개념을 설명한다',
        detail: '정의 → 김밥천국 비유 → 왜 중요한지',
        userAction: null,
        state: 'explain',
      },
      {
        phase: '[1/4]', title: 'Producer-Consumer',
        action: '확인 질문을 던진다',
        detail: '[Optional] 큐 없이 직접 전달하면 어떤 문제가?',
        userAction: '사용자: "next" 또는 답변',
        state: 'question',
      },
      {
        phase: '[2/4]', title: 'Channel & Buffer',
        action: '다음 개념으로 넘어간다',
        detail: '채널의 정의 → bounded vs unbounded → 배압',
        userAction: null,
        state: 'explain',
      },
      {
        phase: '[2/4]', title: 'Channel & Buffer',
        action: '사용자 답변이 틀렸다',
        detail: '같은 개념을 다른 각도로 재설명',
        userAction: '사용자: 잘못된 답변',
        state: 'retry',
      },
      {
        phase: '[2/4]', title: 'Channel & Buffer',
        action: '다른 비유로 재설명',
        detail: '수도관 비유 — 파이프 지름이 곧 buffer 크기',
        userAction: null,
        state: 'reexplain',
      },
    ],
    hint: '클릭하여 단계별 진행',
  },
  en: {
    steps: [
      {
        phase: '[1/4]', title: 'Producer-Consumer',
        action: 'AI explains the first concept',
        detail: 'Definition → food court analogy → why it matters',
        userAction: null,
        state: 'explain',
      },
      {
        phase: '[1/4]', title: 'Producer-Consumer',
        action: 'Asks a check question',
        detail: '[Optional] What if Producer sends directly with no queue?',
        userAction: 'User: "next" or answers',
        state: 'question',
      },
      {
        phase: '[2/4]', title: 'Channel & Buffer',
        action: 'Moves to next concept',
        detail: 'Channel definition → bounded vs unbounded → backpressure',
        userAction: null,
        state: 'explain',
      },
      {
        phase: '[2/4]', title: 'Channel & Buffer',
        action: "User's answer is wrong",
        detail: 'Re-explain from a different angle',
        userAction: 'User: incorrect answer',
        state: 'retry',
      },
      {
        phase: '[2/4]', title: 'Channel & Buffer',
        action: 'Re-explain with different analogy',
        detail: 'Water pipe analogy — pipe diameter = buffer size',
        userAction: null,
        state: 'reexplain',
      },
    ],
    hint: 'Click to step through',
  },
};

const stateConfig: Record<string, { color: string; label: { ko: string; en: string } }> = {
  explain: { color: '#3b82f6', label: { ko: '설명', en: 'Explain' } },
  question: { color: '#f59e0b', label: { ko: '확인', en: 'Check' } },
  retry: { color: '#ef4444', label: { ko: '오답', en: 'Wrong' } },
  reexplain: { color: '#8b5cf6', label: { ko: '재설명', en: 'Re-explain' } },
};

export default function SbsFlow() {
  const [step, setStep] = useState(0);
  const lang = useLang();
  const s = t[lang].steps[step];
  const cfg = stateConfig[s.state];

  return (
    <div style={{ maxWidth: 520, margin: '32px auto', fontFamily: "'Inter', sans-serif" }}>
      <div style={{
        background: '#fff', borderRadius: 12, border: '1px solid rgba(0,0,0,0.09)',
        padding: '24px 28px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <span style={{
              fontSize: 11, fontWeight: 700, color: cfg.color, textTransform: 'uppercase',
              letterSpacing: '0.05em', marginRight: 8,
            }}>{cfg.label[lang]}</span>
            <span style={{
              fontSize: 11, color: '#a8a8a3',
              fontFamily: "'JetBrains Mono', monospace",
            }}>{s.phase} {s.title}</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {t[lang].steps.map((st, i) => (
              <button key={i} onClick={() => setStep(i)} style={{
                width: 24, height: 24, borderRadius: '50%', border: 'none', cursor: 'pointer',
                fontSize: 10, fontWeight: 600, transition: 'all 0.2s',
                background: i === step ? stateConfig[st.state].color : '#f1efea',
                color: i === step ? '#fff' : '#6b6b66',
              }}>{i + 1}</button>
            ))}
          </div>
        </div>

        <div style={{
          padding: '16px', borderRadius: 8, marginBottom: 14,
          background: cfg.color + '08', border: `1px solid ${cfg.color}20`,
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 6 }}>
            {s.action}
          </div>
          <div style={{ fontSize: 12, color: '#6b6b66', lineHeight: 1.6 }}>
            {s.detail}
          </div>
        </div>

        {s.userAction && (
          <div style={{
            padding: '10px 14px', borderRadius: 8,
            background: '#f7f5f0', border: '1px solid rgba(0,0,0,0.06)',
            fontSize: 12, color: '#6b6b66',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 14 }}>👤</span>
            {s.userAction}
          </div>
        )}

        <div style={{
          marginTop: 16, display: 'flex', gap: 3, height: 4, borderRadius: 2, overflow: 'hidden',
        }}>
          {t[lang].steps.map((st, i) => (
            <div key={i} style={{
              flex: 1, borderRadius: 2,
              background: i <= step ? stateConfig[st.state].color : '#f1efea',
              opacity: i <= step ? 0.7 : 1,
              transition: 'all 0.3s',
            }} />
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 10, fontSize: 10, color: '#a8a8a3' }}>{t[lang].hint}</div>
    </div>
  );
}
