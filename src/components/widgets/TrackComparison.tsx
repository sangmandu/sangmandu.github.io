import { useState } from 'react';
import { useLang } from '../LanguageToggle';

const phases = [
  { key: 'setup', color: '#6b6b66' },
  { key: 'investigate', color: '#8b5cf6' },
  { key: 'plan', color: '#3b82f6' },
  { key: 'test', color: '#f59e0b' },
  { key: 'implement', color: '#22c55e' },
  { key: 'review', color: '#ef4444' },
  { key: 'complete', color: '#6b6b66' },
];

const trackData = {
  feature: {
    steps: 33,
    phases: {
      setup: ['SETUP', 'LINEAR_TICKET', 'RENAME_BRANCH'],
      investigate: [],
      plan: ['SPECIFY', 'PLAN', 'DEBATE_FOR_PLAN', 'EXPLAIN_PLAN'],
      test: ['MAKE_UNIT_TEST', 'MAKE_INTEGRATION_TEST', 'SETUP_E2E_ENV', 'MAKE_E2E_TEST', 'DEBATE_TEST', 'EXPLAIN_TEST', 'DO_RED_TEST'],
      implement: ['IMPLEMENT', 'DO_GREEN_TEST', 'SELF_REVIEW', 'SELF_REVIEW_VERDICT', 'COMMIT'],
      review: ['PR', 'CI_SETUP', 'CI_WAIT_REBASE', 'CI_WAIT_POLL', 'CI_WAIT_EVALUATE', 'REVIEW_CHECK_VERDICT', 'REVIEW_FETCH_COMMENTS', 'REVIEW_REPLY', 'REVIEW_APPLY_FIXES', 'REVIEW_EXIT_APPROVED'],
      complete: ['COMPOUND_ANALYZE', 'COMPOUND_STORE', 'COMPLETE_MERGE', 'COMPLETE_REPORT'],
    },
  },
  fix: {
    steps: 33,
    phases: {
      setup: ['SETUP'],
      investigate: ['INVESTIGATE', 'VERIFY', 'REPORT', 'LINEAR_TICKET', 'RENAME_BRANCH'],
      plan: ['PLAN', 'DEBATE_FOR_PLAN', 'EXPLAIN_PLAN'],
      test: ['MAKE_UNIT_TEST', 'MAKE_INTEGRATION_TEST', 'SETUP_E2E_ENV', 'MAKE_E2E_TEST', 'DEBATE_TEST', 'EXPLAIN_TEST', 'DO_RED_TEST'],
      implement: ['IMPLEMENT', 'DO_GREEN_TEST', 'SELF_REVIEW', 'SELF_REVIEW_VERDICT', 'COMMIT'],
      review: ['PR', 'CI_SETUP', 'CI_WAIT_REBASE', 'CI_WAIT_POLL', 'CI_WAIT_EVALUATE', 'REVIEW_CHECK_VERDICT', 'REVIEW_FETCH_COMMENTS', 'REVIEW_REPLY', 'REVIEW_APPLY_FIXES', 'REVIEW_EXIT_APPROVED'],
      complete: ['COMPOUND_ANALYZE', 'COMPOUND_STORE', 'COMPLETE_MERGE', 'COMPLETE_REPORT'],
    },
  },
  light: {
    steps: 22,
    phases: {
      setup: ['SETUP', 'LINEAR_TICKET', 'RENAME_BRANCH'],
      investigate: [],
      plan: ['PLAN', 'EXPLAIN_PLAN'],
      test: [],
      implement: ['IMPLEMENT', 'DO_GREEN_TEST', 'SELF_REVIEW', 'SELF_REVIEW_VERDICT', 'COMMIT'],
      review: ['PR', 'CI_SETUP', 'CI_WAIT_REBASE', 'CI_WAIT_POLL', 'CI_WAIT_EVALUATE', 'REVIEW_CHECK_VERDICT', 'REVIEW_FETCH_COMMENTS', 'REVIEW_REPLY', 'REVIEW_APPLY_FIXES', 'REVIEW_EXIT_APPROVED'],
      complete: ['COMPLETE_MERGE', 'COMPLETE_REPORT'],
    },
  },
  brainstorm: {
    steps: 4,
    phases: {
      setup: [],
      investigate: [],
      plan: ['BRAINSTORM_EXPLORE'],
      test: [],
      implement: [],
      review: ['BRAINSTORM_DEBATE', 'BRAINSTORM_VERDICT'],
      complete: ['BRAINSTORM_REPORT'],
    },
  },
};

const t = {
  ko: {
    tracks: [
      { key: 'feature', label: 'Feature', desc: '새 기능 개발', icon: '🚀', color: '#3b82f6' },
      { key: 'fix', label: 'Fix', desc: '버그 수정', icon: '🔧', color: '#ef4444' },
      { key: 'light', label: 'Light', desc: '설정, 문서, 타이포', icon: '💡', color: '#f59e0b' },
      { key: 'brainstorm', label: 'Brainstorm', desc: '아이디어 탐색', icon: '🧠', color: '#8b5cf6' },
    ],
    phaseNames: {
      setup: '셋업', investigate: '조사', plan: '계획',
      test: '테스트', implement: '구현', review: '리뷰', complete: '완료',
    },
    stepsLabel: '단계',
    hint: '트랙을 선택하면 어떤 구간을 타는지 볼 수 있습니다',
    activePhase: '활성 구간',
    skippedPhase: '스킵',
  },
  en: {
    tracks: [
      { key: 'feature', label: 'Feature', desc: 'New feature dev', icon: '🚀', color: '#3b82f6' },
      { key: 'fix', label: 'Fix', desc: 'Bug fix', icon: '🔧', color: '#ef4444' },
      { key: 'light', label: 'Light', desc: 'Config, docs, typos', icon: '💡', color: '#f59e0b' },
      { key: 'brainstorm', label: 'Brainstorm', desc: 'Idea exploration', icon: '🧠', color: '#8b5cf6' },
    ],
    phaseNames: {
      setup: 'Setup', investigate: 'Investigate', plan: 'Plan',
      test: 'Test', implement: 'Implement', review: 'Review', complete: 'Complete',
    },
    stepsLabel: 'steps',
    hint: 'Select a track to see which phases it uses',
    activePhase: 'Active',
    skippedPhase: 'Skipped',
  },
};

type TrackKey = keyof typeof trackData;

export default function TrackComparison() {
  const [active, setActive] = useState<TrackKey>('feature');
  const lang = useLang();
  const l = t[lang];
  const track = trackData[active];
  const trackInfo = l.tracks.find(tr => tr.key === active)!;

  return (
    <div style={{ maxWidth: 520, margin: '32px auto', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {l.tracks.map((tr) => (
          <button key={tr.key} onClick={() => setActive(tr.key as TrackKey)} style={{
            flex: 1, padding: '12px 6px', borderRadius: 10, cursor: 'pointer',
            border: `2px solid ${active === tr.key ? tr.color : tr.color + '20'}`,
            background: active === tr.key ? tr.color + '08' : '#fff',
            transition: 'all 0.2s',
          }}>
            <div style={{ fontSize: 20, marginBottom: 2 }}>{tr.icon}</div>
            <div style={{
              fontSize: 12, fontWeight: 700,
              color: active === tr.key ? tr.color : '#6b6b66',
            }}>{tr.label}</div>
            <div style={{ fontSize: 10, color: '#a8a8a3', marginTop: 1 }}>{tr.desc}</div>
          </button>
        ))}
      </div>

      <div style={{
        background: '#fff', borderRadius: 12, border: '1px solid rgba(0,0,0,0.09)',
        padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: trackInfo.color }}>
            {trackInfo.icon} {trackInfo.label}
          </div>
          <div style={{
            fontSize: 12, color: '#6b6b66',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {track.steps} {l.stepsLabel}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {phases.map((phase) => {
            const steps = track.phases[phase.key as keyof typeof track.phases];
            const isActive = steps.length > 0;
            return (
              <div key={phase.key} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 12px', borderRadius: 8,
                background: isActive ? phase.color + '08' : '#fafaf8',
                border: `1px solid ${isActive ? phase.color + '20' : 'rgba(0,0,0,0.04)'}`,
                opacity: isActive ? 1 : 0.45,
                transition: 'all 0.2s',
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: isActive ? phase.color : '#d4d4d0',
                  flexShrink: 0,
                }} />
                <div style={{
                  fontSize: 12, fontWeight: 600,
                  color: isActive ? phase.color : '#a8a8a3',
                  minWidth: 60,
                }}>
                  {l.phaseNames[phase.key as keyof typeof l.phaseNames]}
                </div>
                <div style={{
                  fontSize: 11, color: '#6b6b66', flex: 1,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {isActive ? `${steps.length}` : '—'}
                </div>
                <div style={{
                  fontSize: 10, color: isActive ? phase.color : '#a8a8a3',
                  fontWeight: 500,
                }}>
                  {isActive ? l.activePhase : l.skippedPhase}
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
