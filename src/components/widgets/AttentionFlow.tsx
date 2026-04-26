import { useState } from 'react';
import { useLang } from '../LanguageToggle';

const t = {
  ko: {
    steps: [
      {
        label: 'Step 1', title: '첫 토큰 생성',
        desc: '에이전트가 방향을 잡고 첫 응답을 시작한다.',
        tokens: ['함수를', '리팩토링'],
      },
      {
        label: 'Step 2', title: '컨텍스트 누적',
        desc: '생성된 토큰들이 컨텍스트에 쌓이면서 다음 토큰의 방향을 끌어당긴다.',
        tokens: ['함수를', '리팩토링', '하려면', '먼저', '클래스를', '분리'],
      },
      {
        label: 'Step 3', title: '방향 고착',
        desc: 'Attention 가중치가 기존 방향으로 집중된다. 이미 쓴 코드가 닻이 되어 다른 접근을 차단한다.',
        tokens: ['함수를', '리팩토링', '하려면', '먼저', '클래스를', '분리', '...하고', '인터페이스를', '추출'],
      },
      {
        label: 'Step 4', title: '이탈 불가',
        desc: '더 나은 방법이 있어도, 축적된 컨텍스트가 기존 방향을 강화한다. Anchoring effect.',
        tokens: ['함수를', '리팩토링', '하려면', '먼저', '클래스를', '분리', '...하고', '인터페이스를', '추출', '...하고', '팩토리', '패턴을'],
      },
    ],
    biasLabel: '편향 강도',
    hint: '클릭하여 단계별 진행',
  },
  en: {
    steps: [
      {
        label: 'Step 1', title: 'First tokens',
        desc: 'The agent picks a direction and starts generating its first response.',
        tokens: ['refactor', 'the function'],
      },
      {
        label: 'Step 2', title: 'Context accumulates',
        desc: 'Generated tokens stack up in context, pulling the next tokens in the same direction.',
        tokens: ['refactor', 'the function', 'by first', 'extracting', 'the class'],
      },
      {
        label: 'Step 3', title: 'Direction locks in',
        desc: 'Attention weights concentrate on the existing direction. Prior code becomes an anchor that blocks alternatives.',
        tokens: ['refactor', 'the function', 'by first', 'extracting', 'the class', '...then', 'define', 'an interface'],
      },
      {
        label: 'Step 4', title: 'No escape',
        desc: 'Even if a better approach exists, accumulated context reinforces the current path. Anchoring effect.',
        tokens: ['refactor', 'the function', 'by first', 'extracting', 'the class', '...then', 'define', 'an interface', '...then', 'add a', 'factory pattern'],
      },
    ],
    biasLabel: 'Bias strength',
    hint: 'Click to step through',
  },
};

const biases = [0.1, 0.4, 0.75, 0.95];
const colors = ['#22c55e', '#f59e0b', '#ef4444', '#dc2626'];

export default function AttentionFlow() {
  const [step, setStep] = useState(0);
  const lang = useLang();
  const s = t[lang].steps[step];
  const color = colors[step];
  const bias = biases[step];

  return (
    <div style={{ maxWidth: 520, margin: '32px auto', fontFamily: "'Inter', sans-serif" }}>
      <div style={{
        background: '#fff', borderRadius: 12, border: '1px solid rgba(0,0,0,0.09)',
        padding: '24px 28px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {s.label}: {s.title}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[0, 1, 2, 3].map(i => (
              <button key={i} onClick={() => setStep(i)} style={{
                width: 28, height: 28, borderRadius: '50%', border: 'none', cursor: 'pointer',
                fontSize: 11, fontWeight: 600, transition: 'all 0.2s',
                background: i === step ? color : '#f1efea',
                color: i === step ? '#fff' : '#6b6b66',
              }}>{i + 1}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 18, display: 'flex', flexWrap: 'wrap', gap: 6, minHeight: 64 }}>
          {s.tokens.map((tok, i) => (
            <span key={i} style={{
              padding: '4px 10px', borderRadius: 6, fontSize: 13,
              fontFamily: "'JetBrains Mono', monospace",
              background: i < 2 ? `${color}18` : '#f7f5f0',
              color: i < 2 ? color : '#1a1a1a',
              border: `1px solid ${i < 2 ? color + '30' : 'rgba(0,0,0,0.06)'}`,
            }}>{tok}</span>
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#6b6b66', marginBottom: 4 }}>
            <span>{t[lang].biasLabel}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color }}>{Math.round(bias * 100)}%</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: '#f1efea', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 4, background: color,
              width: `${bias * 100}%`, transition: 'all 0.4s ease',
            }} />
          </div>
        </div>

        <p style={{ fontSize: 13, lineHeight: 1.6, color: '#6b6b66', margin: 0 }}>{s.desc}</p>
      </div>
      <div style={{ textAlign: 'center', marginTop: 10, fontSize: 10, color: '#a8a8a3' }}>{t[lang].hint}</div>
    </div>
  );
}
