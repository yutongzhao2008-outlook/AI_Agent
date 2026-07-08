---
name: skill1
description: Demonstrate a minimal installable Agent Skill. Use when the user asks for a simple skill example, wants to verify npx skills add installation, or needs a compact template for creating a new SKILL.md-based skill.
---

# Skill1

Use this skill as a minimal, installable Agent Skill example.

## Workflow

1. Confirm the user wants a compact skill template or installation smoke test.
2. Explain that a valid skill is a folder containing `SKILL.md` with YAML frontmatter.
3. Show the required fields:
   - `name`
   - `description`
4. Recommend adding `scripts/`, `references/`, or `assets/` only when the skill needs reusable resources.

## Example Response

For a minimal skill, create this structure:

```text
skill-name/
└── SKILL.md
```

Keep the description specific because agents use it to decide when the skill applies.
