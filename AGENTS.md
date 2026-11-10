# AGENTS.md

Next.js 16 App Router client for Wanderlast. Single app, no tests, no CI.

## Commands

```bash
npm run dev        # next dev
npm run build      # next build
npm run lint       # eslint flat config; do NOT run `next lint`
npm run typecheck  # tsc --noEmit
npm run format     # prettier --write "**/*.{ts,tsx}"
```

- No test runner exists; verify changes with `lint` + `typecheck` + `build`.

## shadcn/ui

- Style is `base-nova` (see `components.json`): primitives come from `@base-ui/react`, **not** `@radix-ui/*`.
- Add components with `npx shadcn@latest add <name>`; they land in `components/ui/`. Import as `@/components/ui/button`.
- `cn` is imported from `@/lib/utils`; class sorting runs through `prettier-plugin-tailwindcss` (`tailwindFunctions: ["cn", "cva"]`).
- `shadcn` is a runtime dependency: `app/globals.css` does `@import "shadcn/tailwind.css"`. Don't move it to devDependencies.

## Styling

- Tailwind v4, CSS-first: no `tailwind.config`. Theme tokens/variables defined in `app/globals.css` via `@theme inline` — edit them there.
- Font: Josefin Sans, loaded in `app/layout.tsx` as the `--font-sans` variable; don't add competing font imports.

## Images

- Site images live in `app/images/`; `public/` is deliberately empty. Import as modules for `next/image` optimization.
- From `app/`: use relative path (`./images/Banner.png`); from `components/`: use alias `import Banner from "@/app/images/Banner.png"`.

## Component boundaries

- `@base-ui/react` provides the `Button` primitive (`components/ui/button.tsx`). Do not replace it with Radix primitives.