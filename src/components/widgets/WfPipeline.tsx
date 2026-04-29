import { useLang } from '../LanguageToggle';

const t = {
  ko: {
    title: 'SKILL.md',
    lines: [
      '# WF — 개발 워크플로우',
      '',
      '## 1. 티켓',
      'Linear에 티켓을 생성한다. 제목, 설명,',
      '라벨, 마일스톤을 채우고 담당자를 할당한다.',
      '',
      '## 2. 계획',
      '요구사항을 분석하여 spec을 작성한다.',
      'spec을 기반으로 구현 계획을 수립하고 검증한다.',
      '',
      '## 3. 테스트',
      '구현 전에 테스트를 먼저 작성한다.',
      '유닛, 통합, E2E 테스트를 계층별로 나눈다.',
      '',
      '## 4. 구현',
      '계획의 각 단계를 순서대로 구현한다.',
      '모든 테스트가 통과하는지 확인한다.',
      '셀프 리뷰 후 커밋한다.',
      '',
      '## 5. 리뷰',
      'PR을 생성하고 CI를 통과시킨다.',
      'CI 실패 시 로그를 분석하고 수정한다.',
      '코드 리뷰 코멘트를 읽고 대응한다.',
      '',
      '## 6. 머지',
      '리뷰 승인 후 머지하고 결과를 보고한다.',
    ],
  },
  en: {
    title: 'SKILL.md',
    lines: [
      '# WF — Dev Workflow',
      '',
      '## 1. Ticket',
      'Create a Linear ticket. Fill in title,',
      'description, labels, milestone, assignee.',
      '',
      '## 2. Plan',
      'Analyze requirements and write a spec.',
      'Build implementation plan and validate.',
      '',
      '## 3. Test',
      'Write tests before implementation.',
      'Unit, integration, E2E by tier.',
      '',
      '## 4. Implement',
      'Implement each plan step in order.',
      'Verify all tests pass.',
      'Self-review, then commit.',
      '',
      '## 5. Review',
      'Create PR and pass CI.',
      'On CI failure, analyze logs and fix.',
      'Read review comments and respond.',
      '',
      '## 6. Merge',
      'Merge after approval and report results.',
    ],
  },
};

export default function WfPipeline() {
  const lang = useLang();
  const l = t[lang];

  return (
    <div style={{ maxWidth: 520, margin: '32px auto', fontFamily: "'Inter', sans-serif" }}>
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
            {l.title}
          </span>
        </div>
        <div style={{ padding: '12px 14px' }}>
          {l.lines.map((line, i) => (
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
    </div>
  );
}
