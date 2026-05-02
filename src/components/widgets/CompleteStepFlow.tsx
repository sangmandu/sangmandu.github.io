import { useLang } from '../LanguageToggle';

const t = {
  ko: {
    beforeTitle: '기존',
    afterTitle: '개선',
    hint: '에이전트의 자율에 맡기면 실패 지점이 된다',
    before: [
      { actor: 'agent', label: '스킬을 수행한다', file: '030' },
      { actor: 'weak', label: '다음 스킬을 직접 읽는다', file: '031' },
      { actor: 'agent', label: '스킬을 수행한다', file: '031' },
      { actor: 'weak', label: '다음 스킬을 직접 읽는다', file: '032' },
      { actor: 'agent', label: '스킬을 수행한다', file: '032' },
    ],
    beforeNote: '에이전트가 다음을 스스로 읽는다\n→ 읽지 않고 예측하거나, 읽어야 되는 것을 까먹을 수 있다',
    after: [
      { actor: 'agent', label: '스킬을 수행한다', file: '030' },
      { actor: 'script', label: '완료 마킹', file: 'complete-step.sh' },
      { actor: 'auto', label: '다음 스킬 자동 주입', file: '→ 031' },
      { actor: 'agent', label: '스킬을 수행한다', file: '031' },
      { actor: 'script', label: '완료 마킹', file: 'complete-step.sh' },
      { actor: 'auto', label: '다음 스킬 자동 주입', file: '→ 032' },
      { actor: 'agent', label: '스킬을 수행한다', file: '032' },
    ],
    afterNote: '스크립트가 다음을 넘겨준다\n→ 예측하거나 건너뛸 수 없다',
  },
  en: {
    beforeTitle: 'Before',
    afterTitle: 'After',
    hint: 'Leaving it to agent autonomy becomes the failure point',
    before: [
      { actor: 'agent', label: 'Performs the skill', file: '030' },
      { actor: 'weak', label: 'Reads next skill itself', file: '031' },
      { actor: 'agent', label: 'Performs the skill', file: '031' },
      { actor: 'weak', label: 'Reads next skill itself', file: '032' },
      { actor: 'agent', label: 'Performs the skill', file: '032' },
    ],
    beforeNote: 'Agent reads the next on its own\n→ Can predict and skip, or forget to read entirely',
    after: [
      { actor: 'agent', label: 'Performs the skill', file: '030' },
      { actor: 'script', label: 'Marks complete', file: 'complete-step.sh' },
      { actor: 'auto', label: 'Next skill auto-injected', file: '→ 031' },
      { actor: 'agent', label: 'Performs the skill', file: '031' },
      { actor: 'script', label: 'Marks complete', file: 'complete-step.sh' },
      { actor: 'auto', label: 'Next skill auto-injected', file: '→ 032' },
      { actor: 'agent', label: 'Performs the skill', file: '032' },
    ],
    afterNote: 'Script delivers the next\n→ Cannot predict or skip',
  },
};

const dotColors: Record<string, string> = {
  agent: '#4f46e5',
  script: '#16a34a',
  auto: '#d97706',
  weak: '#dc2626',
};

type Step = { actor: string; label: string; file: string };

function Pipeline({ steps, note, noteColor }: { steps: Step[]; note: string; noteColor: string }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0, padding: '12px 12px' }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              minWidth: 12, paddingTop: 4,
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: dotColors[step.actor],
              }} />
              {i < steps.length - 1 && (
                <div style={{ width: 1, height: 18, background: '#e5e5e3' }} />
              )}
            </div>
            <div style={{ paddingBottom: i < steps.length - 1 ? 2 : 0 }}>
              <div style={{
                fontSize: 11, fontWeight: 500,
                color: step.actor === 'weak' ? '#dc2626' : '#1a1a1a',
                lineHeight: 1.3,
              }}>
                {step.label}
              </div>
              <div style={{
                fontSize: 9, color: '#a8a8a3',
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {step.file}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{
        padding: '8px 12px',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        background: noteColor,
      }}>
        <div style={{
          fontSize: 10, lineHeight: 1.5,
          color: noteColor === '#fef2f2' ? '#991b1b' : '#166534',
          whiteSpace: 'pre-line',
        }}>
          {note}
        </div>
      </div>
    </div>
  );
}

export default function CompleteStepFlow() {
  const lang = useLang();
  const l = t[lang];

  return (
    <div style={{ maxWidth: 560, margin: '32px auto', fontFamily: "'Inter', sans-serif" }}>
      <div style={{
        display: 'flex', gap: 0,
        background: '#ffffff', borderRadius: 12, overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.09)',
      }}>
        <div style={{ flex: 1, borderRight: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{
            padding: '8px 12px',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            background: '#f7f5f0',
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#6b6b66' }}>
              {l.beforeTitle}
            </span>
          </div>
          <Pipeline steps={l.before as Step[]} note={l.beforeNote} noteColor="#fef2f2" />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{
            padding: '8px 12px',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            background: '#f7f5f0',
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#6b6b66' }}>
              {l.afterTitle}
            </span>
          </div>
          <Pipeline steps={l.after as Step[]} note={l.afterNote} noteColor="#f0fdf4" />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 10, fontSize: 10, color: '#a8a8a3' }}>
        {l.hint}
      </div>
    </div>
  );
}
