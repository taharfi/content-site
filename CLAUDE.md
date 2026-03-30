# Project Rules — Content Site

## Stack
- Next.js 14, App Router, static export
- Tailwind CSS only (no component libraries)
- MDX for all article content
- No database, no CMS, no heavy deps

## Token Rules
- Plan in 3-5 bullets before any task
- Surgical edits only — never regenerate full files unless broken
- Reuse components/utils before creating new ones
- Keep explanations to 1-3 sentences

## Code Rules
- No inline styles — Tailwind classes only
- No `any` in TypeScript
- Keep components under 100 lines
- No client components unless required (interactivity only)
- All images: next/image with alt text

## SEO / AdSense Rules
- Every page needs: title, description, canonical URL
- Articles: min 600 words, original content, one topic per article
- No fake reviews, fake team bios, or placeholder content
- Internal links: every article links to 2+ related pages
- sitemap.ts auto-generates from content/ folder

## Content Standard
- Template: copy `content/_template.mdx` for every new article
- Title: specific searchable question, under 65 chars
- Description: 1-2 sentences, under 160 chars
- Minimum 600 words; depth beats length — no filler
- Answer the question in the first 100 words
- At least 3 H2 sections; subheadings describe, not tease
- At least 2 internal links per article
- No keyword stuffing, no copied content, no fake quotes/stats
- Caveats and edge cases build trust — include them
- Conclude with a takeaway + internal link, never "we hope this helped"
- Frontmatter required: title, description, date (YYYY-MM-DD), author

## Design Rules
- Mobile-first, clean, no animations beyond transitions
- Max content width: 768px for articles, 1200px for layouts
- Accessible: semantic HTML, ARIA where needed, 4.5:1 contrast ratio

## File Naming
- Pages: lowercase, kebab-case folders
- Components: PascalCase.tsx
- Articles: kebab-case.mdx

## Before Finishing Any Task
- [ ] Useful for real visitors?
- [ ] Original / policy-safe?
- [ ] Lightweight?
- [ ] Improves AdSense approval potential?
