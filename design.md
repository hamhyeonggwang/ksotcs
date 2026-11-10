# Design: KSOTCS 대한아동학교작업치료학회

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: editorial
- Shape of the first page: Bento Grid
- Theme: Loom, adapted to Pretendard Variable
- Axes: light/geometric-sans/cool · posture: committed

## Tokens
`app/tokens.css` is the source of truth. The roles:

```css
:root {
  --color-paper: oklch(95.5% 0.014 85);  --color-paper-2: oklch(92% 0.022 84);  --color-paper-3: oklch(85% 0.032 80);
  --color-ink: oklch(21% 0.012 60);  --color-ink-2: oklch(31% 0.012 60);  --color-muted: oklch(46% 0.014 62);  --color-rule: oklch(83% 0.022 84);
  --color-accent: oklch(34% 0.115 267);  --color-accent-ink: oklch(95.5% 0.014 85);  --color-focus: oklch(43% 0.15 267);
  --font-display: var(--font-pretendard);  --font-body: var(--font-pretendard);  --font-outlier: var(--font-pretendard);
  --radius-card: 0;  --radius-pill: 0;  --rule-hair: 1px;  --shadow-card: none;
}
```

The spacing scale, type scale, easings and durations live in `app/tokens.css`.

## Controls
- Primary: indigo fill · square radius · 48px height
- Secondary: ink outline · square radius · 48px height

## Motion
- Character: still; feedback uses short colour and 1px press transitions only. Under reduced motion everything ends at once.

## Exports
`app/tokens.css` and semantic Tailwind roles in `tailwind.config.ts`. DTCG or shadcn blocks can be added on request.
