# AGENTS.md

Next.js 16 App Router client for the Wanderlast travel site. Single app, no tests, no CI.

## Commands

```bash
npm run dev        # next dev
npm run build      # next build
npm run lint       # eslint (Eslint 9 flat config; do not run `next lint` directly)
npm run typecheck  # tsc --noEmit
npm run format     # prettier --write "**/*.{ts,tsx}"
```

- No test runner exists; verify changes with `lint` + `typecheck`, and `build` before finishing a task.

## shadcn/ui: Base UI, not Radix

- Style is `base-nova` (see `components.json`): primitives come from `@base-ui/react`, **not** `@radix-ui/*`. Do not copy Radix-based snippets from older shadcn docs; check an existing `components/ui/*` file for the real API shape.
- Add components with `npx shadcn@latest add <name>`; they land in `components/ui/`. Import as `@/components/ui/button`.
- `cn` is imported from `@/lib/utils` (also `cn` package internally); class sorting runs through `prettier-plugin-tailwindcss` (`tailwindFunctions: ["cn", "cva"]`).
- `shadcn` is a runtime dependency on purpose: `app/globals.css` does `@import "shadcn/tailwind.css"`. Don't move it to devDependencies or drop that import.

## Styling

- Tailwind v4, CSS-first: there is no `tailwind.config`. Theme tokens/variables are defined in `app/globals.css` via `@theme inline` (with shadcn CSS variables and oklch colors) — edit them there.
- Font: Josefin Sans, loaded in `app/layout.tsx` as the `--font-sans` variable; don't add competing font imports.
- Code style: Prettier with `semi: false`, double quotes, LF endings.

## Images

- Site images live in `app/images/` (e.g. `Banner.png`); `public/` is deliberately empty (only `.gitkeep`). Import them as modules for `next/image` optimization instead of adding files to `public/`. From `app/` use a relative path (`./images/Banner.png`); from `components/` use the alias: `import Banner from "@/app/images/Banner.png"`.

## Framework note

Next.js 16 has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Component boundaries

- `@base-ui/react` provides the `Button` primitive (`components/ui/button.tsx`). Do not replace it with Radix primitives.
- `cn` utility from `@/lib/utils` merges Tailwind classes; class sorting is handled by `prettier-plugin-tailwindcss`.
- Image optimization uses `next/image` with `fill` priority; images are stored under `app/images/` and imported as modules.