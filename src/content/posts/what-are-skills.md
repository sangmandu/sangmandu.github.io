---
title: "스킬이란 무엇일까?"
date: "2026-04-20"
tags: ["claude-code", "skills"]
excerpt: "Claude Code의 스킬 시스템을 이해하고, 나만의 스킬을 만드는 법을 알아본다."
---

스킬은 Claude Code에게 특정 상황에서 어떻게 행동해야 하는지 가르치는 재사용 가능한 명령어 세트다.

## 스킬의 구조

모든 스킬은 YAML frontmatter와 본문으로 구성된다:

```yaml
---
name: my-skill
description: 이 스킬이 하는 일
---
```

## 왜 스킬이 필요한가

같은 종류의 작업을 할 때마다 매번 같은 설명을 반복하는 것은 비효율적이다. 스킬은 이 반복을 없앤다.

## 나만의 스킬 만들기

`~/.claude/skills/` 디렉토리에 `.md` 파일을 만들면 된다. Claude Code가 자동으로 인식한다.

> 좋은 스킬은 짧고, 명확하고, 한 가지 일에 집중한다.
