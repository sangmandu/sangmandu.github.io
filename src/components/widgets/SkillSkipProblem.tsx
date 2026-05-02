import { useState } from 'react';
import { useLang } from '../LanguageToggle';

const t = {
  ko: {
    tabExpected: '의도한 동작',
    tabActual: '실제 동작',
    hint: '탭을 눌러 비교해보세요',
    expectedSteps: [
      { label: '030', name: 'make-unit-test.md', status: 'read', desc: '스킬을 읽고 체크리스트를 따른다' },
      { label: '031', name: 'make-integration-test.md', status: 'read', desc: '스킬을 읽고 체크리스트를 따른다' },
      { label: '032', name: 'setup-e2e-env.md', status: 'read', desc: '스킬을 읽고 체크리스트를 따른다' },
      { label: '033', name: 'make-e2e-test.md', status: 'read', desc: '스킬을 읽고 체크리스트를 따른다' },
    ],
    actualSteps: [
      { label: '030', name: 'make-unit-test.md', status: 'ok', desc: '스킬을 읽고 정상적으로 수행' },
      { label: '031', name: 'make-integration-test.md', status: 'ok', desc: '스킬을 읽고 정상적으로 수행' },
      { label: '032', name: 'setup-e2e-env.md', status: 'skip', desc: '스킬을 안 읽고 자기 방식으로 진행' },
      { label: '033', name: 'make-e2e-test.md', status: 'skip', desc: '스킬을 안 읽고 mock으로 테스트 작성' },
    ],
  },
  en: {
    tabExpected: 'Expected',
    tabActual: 'What actually happened',
    hint: 'Click tabs to compare',
    expectedSteps: [
      { label: '030', name: 'make-unit-test.md', status: 'read', desc: 'Reads skill, follows checklist' },
      { label: '031', name: 'make-integration-test.md', status: 'read', desc: 'Reads skill, follows checklist' },
      { label: '032', name: 'setup-e2e-env.md', status: 'read', desc: 'Reads skill, follows checklist' },
      { label: '033', name: 'make-e2e-test.md', status: 'read', desc: 'Reads skill, follows checklist' },
    ],
    actualSteps: [
      { label: '030', name: 'make-unit-test.md', status: 'ok', desc: 'Reads skill, executes normally' },
      { label: '031', name: 'make-integration-test.md', status: 'ok', desc: 'Reads skill, executes normally' },
      { label: '032', name: 'setup-e2e-env.md', status: 'skip', desc: 'Skips reading, proceeds its own way' },
      { label: '033', name: 'make-e2e-test.md', status: 'skip', desc: 'Skips reading, writes tests with mocks' },
    ],
  },
};

const statusConfig = {
  read: { bg: '#f0fdf4', border: 'rgba(22,163,74,0.15)', dot: '#16a34a' },
  ok: { bg: '#f0fdf4', border: 'rgba(22,163,74,0.15)', dot: '#16a34a' },
  skip: { bg: '#fef2f2', border: 'rgba(220,38,38,0.15)', dot: '#dc2626' },
};

export default function SkillSkipProblem() {
  const [tab, setTab] = useState<'expected' | 'actual'>('expected');
  const lang = useLang();
  const l = t[lang];
  const steps = tab === 'expected' ? l.expectedSteps : l.actualSteps;

  return (
    <div style={{ maxWidth: 520, margin: '32px auto', fontFamily: "'Inter', sans-serif" }}>
      <div style={{
        background: '#ffffff', borderRadius: 12, overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.09)',
      }}>
        <div style={{
          display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}>
          {(['expected', 'actual'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1, padding: '10px 0', cursor: 'pointer',
                background: tab === t ? '#ffffff' : '#f7f5f0',
                border: 'none',
                borderBottom: tab === t ? '2px solid #1a1a1a' : '2px solid transparent',
                fontSize: 12, fontWeight: tab === t ? 600 : 400,
                color: tab === t ? '#1a1a1a' : '#a8a8a3',
                transition: 'all 0.15s',
              }}
            >
              {t === 'expected' ? l.tabExpected : l.tabActual}
            </button>
          ))}
        </div>

        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {steps.map((step, i) => {
            const cfg = statusConfig[step.status as keyof typeof statusConfig];
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: cfg.dot, flexShrink: 0,
                }} />
                <div style={{
                  flex: 1, padding: '8px 12px', borderRadius: 6,
                  background: cfg.bg, border: `1px solid ${cfg.border}`,
                  transition: 'all 0.2s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 600, color: '#a8a8a3',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      {step.label}
                    </span>
                    <span style={{
                      fontSize: 11, fontWeight: 500, color: '#1a1a1a',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      {step.name}
                    </span>
                  </div>
                  <div style={{
                    fontSize: 11, color: '#6b6b66', marginTop: 3,
                  }}>
                    {step.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 10, fontSize: 10, color: '#a8a8a3' }}>
        {l.hint}
      </div>
    </div>
  );
}
