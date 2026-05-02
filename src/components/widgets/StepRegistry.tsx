import { useState } from 'react';
import { useLang } from '../LanguageToggle';

const groups = [
  {
    range: '00x',
    labelKo: 'Setup',
    labelEn: 'Setup',
    steps: [{ key: 'SETUP', file: '001-setup.md' }],
  },
  {
    range: '01x',
    labelKo: 'Ticket & Branch',
    labelEn: 'Ticket & Branch',
    steps: [
      { key: 'LINEAR_TICKET', file: '010-linear-ticket.md' },
      { key: 'RENAME_BRANCH', file: '011-rename-branch.md' },
    ],
  },
  {
    range: '02x',
    labelKo: 'Setup Plan',
    labelEn: 'Setup Plan',
    steps: [
      { key: 'SPECIFY', file: '020-specify.md' },
      { key: 'PLAN', file: '021-plan.md' },
      { key: 'DEBATE_FOR_PLAN', file: '022-debate-for-plan.md' },
      { key: 'EXPLAIN_PLAN', file: '023-explain-plan.md' },
    ],
  },
  {
    range: '03x',
    labelKo: 'Setup Test',
    labelEn: 'Setup Test',
    steps: [
      { key: 'MAKE_UNIT_TEST', file: '030-make-unit-test.md' },
      { key: 'MAKE_INTEGRATION_TEST', file: '031-make-integration-test.md' },
      { key: 'SETUP_E2E_ENV', file: '032-setup-e2e-env.md' },
      { key: 'MAKE_E2E_TEST', file: '033-make-e2e-test.md' },
      { key: 'DEBATE_TEST', file: '034-debate-test.md' },
      { key: 'EXPLAIN_TEST', file: '035-explain-test.md' },
      { key: 'DO_RED_TEST', file: '036-do-red-test.md' },
    ],
  },
  {
    range: '04x',
    labelKo: 'Implement & Test',
    labelEn: 'Implement & Test',
    steps: [
      { key: 'IMPLEMENT', file: '040-implement.md' },
      { key: 'DO_GREEN_TEST', file: '041-do-green-test.md' },
    ],
  },
  {
    range: '05x',
    labelKo: 'Commit & PR',
    labelEn: 'Commit & PR',
    steps: [
      { key: 'COMMIT', file: '050-commit.md' },
      { key: 'PR', file: '051-pr.md' },
    ],
  },
  {
    range: '06x',
    labelKo: 'CI',
    labelEn: 'CI',
    steps: [
      { key: 'CI_SETUP', file: '060-ci-setup.md' },
      { key: 'CI_WAIT_REBASE', file: '061-ci-wait-rebase.md' },
      { key: 'CI_WAIT_POLL', file: '062-ci-wait-poll.md' },
      { key: 'CI_WAIT_EVALUATE', file: '063-ci-wait-evaluate.md' },
    ],
  },
  {
    range: '07x',
    labelKo: 'Code Review',
    labelEn: 'Code Review',
    steps: [
      { key: 'REVIEW_CHECK_VERDICT', file: '070-review-check-verdict.md' },
      { key: 'REVIEW_FETCH_COMMENTS', file: '071-review-fetch-comments.md' },
      { key: 'REVIEW_REPLY', file: '072-review-reply.md' },
      { key: 'REVIEW_APPLY_FIXES', file: '073-review-apply-fixes.md' },
      { key: 'REVIEW_EXIT_APPROVED', file: '074-review-exit-approved.md' },
    ],
  },
  {
    range: '08x',
    labelKo: 'Complete',
    labelEn: 'Complete',
    steps: [
      { key: 'COMPOUND_ANALYZE', file: '080-compound-analyze.md' },
      { key: 'COMPOUND_STORE', file: '081-compound-store.md' },
      { key: 'COMPLETE_MERGE', file: '082-complete-merge.md' },
      { key: 'COMPLETE_REPORT', file: '083-complete-report.md' },
    ],
  },
];

const t = {
  ko: {
    hint: '그룹을 클릭하면 해당 그룹의 스텝 파일을 볼 수 있다',
    total: '스텝',
    groupLabel: '그룹',
  },
  en: {
    hint: 'Click a group to see its step files',
    total: 'steps',
    groupLabel: 'group',
  },
};

const totalSteps = groups.reduce((sum, g) => sum + g.steps.length, 0);

export default function StepRegistry() {
  const [selected, setSelected] = useState<number | null>(null);
  const lang = useLang();

  return (
    <div style={{ maxWidth: 520, margin: '32px auto', fontFamily: "'Inter', sans-serif" }}>
      <div style={{
        textAlign: 'center', marginBottom: 16,
        fontSize: 11, color: '#6b6b66',
      }}>
        {groups.length} {t[lang].groupLabel} · {totalSteps} {t[lang].total}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {groups.map((group, i) => {
          const isSelected = selected === i;
          return (
            <div key={i}>
              <button
                onClick={() => setSelected(isSelected ? null : i)}
                style={{
                  width: '100%', textAlign: 'left', cursor: 'pointer',
                  padding: '8px 12px', borderRadius: 6,
                  background: isSelected ? '#1e1e1e' : '#ffffff',
                  border: `1px solid ${isSelected ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.09)'}`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 600,
                    color: isSelected ? '#a8a8a3' : '#a8a8a3',
                    fontFamily: "'JetBrains Mono', monospace",
                    minWidth: 28,
                  }}>
                    {group.range}
                  </span>
                  <span style={{
                    fontSize: 12, fontWeight: 500,
                    color: isSelected ? '#e5e5e3' : '#1a1a1a',
                  }}>
                    {lang === 'ko' ? group.labelKo : group.labelEn}
                  </span>
                </div>
                <span style={{
                  fontSize: 10,
                  color: isSelected ? '#6b6b66' : '#a8a8a3',
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {group.steps.length}
                </span>
              </button>

              {isSelected && (
                <div style={{
                  margin: '2px 0 4px 0', padding: '8px 12px 8px 40px',
                  background: '#1e1e1e', borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  {group.steps.map((step, j) => (
                    <div key={j} style={{
                      fontSize: 11, lineHeight: 2,
                      color: '#e5e5e3',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      <span style={{ color: '#a8a8a3' }}>{step.file}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: 12, fontSize: 10, color: '#a8a8a3' }}>
        {t[lang].hint}
      </div>
    </div>
  );
}
