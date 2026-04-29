import { useState } from 'react';
import { useLang } from '../LanguageToggle';

const tasks = [
  {
    file: '001-make-ticket.md',
    linesKo: [
      '# Step: 티켓 생성',
      '',
      'Linear에 티켓을 생성한다.',
      '- [ ] 제목, 설명, 라벨, 마일스톤을 채운다',
      '- [ ] 담당자를 config에서 읽어 할당한다',
      '- [ ] 티켓 ID를 state에 저장한다',
    ],
    linesEn: [
      '# Step: Create Ticket',
      '',
      'Create a Linear ticket.',
      '- [ ] Fill title, description, labels, milestone',
      '- [ ] Assign owner from config',
      '- [ ] Save ticket ID to state',
    ],
  },
  {
    file: '002-plan.md',
    linesKo: [
      '# Step: 계획 수립',
      '',
      '요구사항을 분석하여 spec을 작성하고',
      '구현 계획을 수립한다.',
      '- [ ] spec 문서를 작성한다',
      '- [ ] 단계별 구현 계획을 세운다',
      '- [ ] 계획을 검증하고 확정한다',
    ],
    linesEn: [
      '# Step: Make Plan',
      '',
      'Analyze requirements, write spec,',
      'and build implementation plan.',
      '- [ ] Write spec document',
      '- [ ] Build step-by-step plan',
      '- [ ] Validate and finalize',
    ],
  },
  {
    file: '003-test.md',
    linesKo: [
      '# Step: 테스트 작성',
      '',
      '구현 전에 테스트를 먼저 작성한다.',
      '- [ ] 유닛 테스트: 단일 순수 함수',
      '- [ ] 통합 테스트: 모듈 간 연결',
      '- [ ] E2E 테스트: 실제 환경 검증',
    ],
    linesEn: [
      '# Step: Write Tests',
      '',
      'Write tests before implementation.',
      '- [ ] Unit test: single pure function',
      '- [ ] Integration test: module wiring',
      '- [ ] E2E test: real environment',
    ],
  },
  {
    file: '004-implement.md',
    linesKo: [
      '# Step: 구현',
      '',
      '테스트를 통과시키는 코드를 구현한다.',
      '- [ ] 계획의 각 단계를 순서대로 구현',
      '- [ ] 모든 테스트 통과 확인',
      '- [ ] 셀프 리뷰 후 커밋',
    ],
    linesEn: [
      '# Step: Implement',
      '',
      'Write code that passes tests.',
      '- [ ] Implement each plan step in order',
      '- [ ] Verify all tests pass',
      '- [ ] Self-review, then commit',
    ],
  },
  {
    file: '005-review.md',
    linesKo: [
      '# Step: PR + CI + 리뷰',
      '',
      'PR을 만들고 CI를 통과시키고',
      '코드 리뷰에 대응한다.',
      '- [ ] PR 생성: 제목, 본문 자동 작성',
      '- [ ] CI 실패 시 로그 분석 후 수정',
      '- [ ] 리뷰 코멘트 읽고 대응',
    ],
    linesEn: [
      '# Step: PR + CI + Review',
      '',
      'Create PR, pass CI,',
      'respond to code review.',
      '- [ ] Create PR: auto-fill title, body',
      '- [ ] On CI failure: analyze and fix',
      '- [ ] Read and respond to reviews',
    ],
  },
];

const t = {
  ko: { hint: '파일을 클릭하면 해당 태스크의 지시사항을 볼 수 있다' },
  en: { hint: 'Click a file to see that task\'s instructions' },
};

export default function WfSplitPipeline() {
  const [selected, setSelected] = useState<number | null>(null);
  const lang = useLang();

  return (
    <div style={{ maxWidth: 520, margin: '32px auto', fontFamily: "'Inter', sans-serif" }}>
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 4,
        marginBottom: selected !== null ? 10 : 0,
      }}>
        {tasks.map((task, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={() => setSelected(selected === i ? null : i)} style={{
              padding: '6px 10px', borderRadius: 4, cursor: 'pointer',
              background: selected === i ? '#1e1e1e' : '#f7f5f0',
              border: `1px solid ${selected === i ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)'}`,
              transition: 'all 0.15s',
            }}>
              <span style={{
                fontSize: 11, fontWeight: 500,
                color: selected === i ? '#e5e5e3' : '#6b6b66',
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {task.file}
              </span>
            </button>
            {i < tasks.length - 1 && (
              <span style={{ color: '#a8a8a3', fontSize: 10, margin: '0 3px' }}>→</span>
            )}
          </div>
        ))}
      </div>

      {selected !== null && (() => {
        const task = tasks[selected];
        const lines = lang === 'ko' ? task.linesKo : task.linesEn;
        return (
          <div style={{
            background: '#1e1e1e', borderRadius: 8, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{
              padding: '8px 14px',
              background: 'rgba(255,255,255,0.05)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <span style={{
                fontSize: 11, fontWeight: 600, color: '#a8a8a3',
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {task.file}
              </span>
            </div>
            <div style={{ padding: '12px 14px' }}>
              {lines.map((line, i) => (
                line === '' ? (
                  <div key={i} style={{ height: 12 }} />
                ) : (
                  <div key={i} style={{
                    fontSize: 12,
                    lineHeight: 1.7,
                    color: '#e5e5e3',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: line.startsWith('#') ? 600 : 400,
                  }}>
                    {line}
                  </div>
                )
              ))}
            </div>
          </div>
        );
      })()}

      <div style={{ textAlign: 'center', marginTop: 10, fontSize: 10, color: '#a8a8a3' }}>
        {t[lang].hint}
      </div>
    </div>
  );
}
