import { useState, useEffect } from 'react';
import { useLang } from '../LanguageToggle';

const t = {
  ko: {
    userSays: '이 기능 만들어줘',
    steps: [
      { label: 'SETUP', status: 'done' },
      { label: 'LINEAR_TICKET', status: 'done' },
      { label: 'SPECIFY', status: 'done' },
      { label: 'PLAN', status: 'stuck' },
    ],
    agentMsg: '이건 어떻게 할까요?',
    userThought: '30분 뒤에 확인',
    result: '에이전트는 멈춰 있었다',
    hint: '파이프라인은 만들었지만, 자동화는 아직이다',
  },
  en: {
    userSays: 'Build this feature',
    steps: [
      { label: 'SETUP', status: 'done' },
      { label: 'LINEAR_TICKET', status: 'done' },
      { label: 'SPECIFY', status: 'done' },
      { label: 'PLAN', status: 'stuck' },
    ],
    agentMsg: 'How should I handle this?',
    userThought: 'Checked 30 min later',
    result: 'Agent was frozen',
    hint: 'Pipeline built, but not yet automated',
  },
};

export default function AutomationGap() {
  const lang = useLang();
  const l = t[lang];
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (phase < 5) {
      const delays = [800, 600, 600, 1000, 1200];
      const timer = setTimeout(() => setPhase(phase + 1), delays[phase]);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <div style={{ maxWidth: 520, margin: '32px auto', fontFamily: "'Inter', sans-serif" }}>
      <div style={{
        background: '#ffffff', borderRadius: 12, overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.09)',
      }}>
        <div style={{ padding: '16px 20px' }}>
          <div style={{
            display: 'inline-block', padding: '6px 12px', borderRadius: 6,
            background: '#eef2ff', marginBottom: 14,
          }}>
            <span style={{ fontSize: 12, color: '#4f46e5', fontWeight: 500 }}>
              {l.userSays}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 14 }}>
            {l.steps.map((step, i) => {
              const visible = phase > i;
              const isStuck = step.status === 'stuck' && phase >= 4;
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  opacity: visible ? 1 : 0.2,
                  transition: 'opacity 0.4s',
                }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: isStuck ? '#d97706' : (visible && step.status === 'done' ? '#16a34a' : '#e5e5e3'),
                    transition: 'background 0.3s',
                  }} />
                  <span style={{
                    fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
                    color: isStuck ? '#d97706' : (visible ? '#1a1a1a' : '#a8a8a3'),
                    fontWeight: isStuck ? 600 : 400,
                  }}>
                    {step.label}
                  </span>
                  {isStuck && (
                    <span style={{ fontSize: 10, color: '#d97706' }}>
                      ···
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {phase >= 4 && (
            <div style={{
              padding: '10px 14px', borderRadius: 8,
              background: '#fef2f2', border: '1px solid rgba(220,38,38,0.15)',
              marginBottom: 10,
              animation: 'fadeIn 0.4s ease-in',
            }}>
              <div style={{ fontSize: 12, color: '#dc2626', fontWeight: 500 }}>
                🤖 {l.agentMsg}
              </div>
            </div>
          )}

          {phase >= 5 && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 14px', borderRadius: 8,
              background: '#f7f5f0', border: '1px solid rgba(0,0,0,0.06)',
              animation: 'fadeIn 0.4s ease-in',
            }}>
              <span style={{ fontSize: 11, color: '#6b6b66' }}>
                🕐 {l.userThought}
              </span>
              <span style={{ fontSize: 11, color: '#dc2626', fontWeight: 500 }}>
                {l.result}
              </span>
            </div>
          )}
        </div>
      </div>

      <div style={{
        textAlign: 'center', marginTop: 10, fontSize: 10, color: '#a8a8a3',
        cursor: 'pointer',
      }}
        onClick={() => setPhase(0)}
      >
        {l.hint}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
