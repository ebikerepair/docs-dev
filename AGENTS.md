# Agent Notes

## Deployment Checklist (Codex)

Use this checklist before any deployment to prevent cloud build failures.

### Preflight
- If dependencies changed, run `bun install`.
- Make sure the working tree is clean enough to spot new errors.

### Lint
- Run `bun lint`.
- Fix any Biome issues (imports, formatting, unused vars).

### Production Build
- Run `bun run build`.
- This runs `next build` plus type checks and static export.

### Common Failure Checks (past CI issues)
- Callout CSS variable type: `src/components/mdx/CalloutGB.tsx` must cast the style object to `CSSProperties` when using `--callout-color`.
- Image zoom typing: `src/components/mdx/ImageZoomWithCaption.tsx` must return a `ReactElement` from `ZoomContent` and include `children` in `rmiz` props.
- MDX img typing: `src/mdx-components.tsx` must import `ImageZoomProps`.
- Sidebar icon import: `src/components/docs/SingleOpenSidebarFolder.tsx` must use `fumadocs-ui/internal/icons`.
- Missing MDX components: ensure new MDX components are exported in `src/mdx-components.tsx`.
- Static params errors: `src/app/docs/[[...slug]]/page.tsx` must use `docsSource.generateParams()`.

### Done
- Only deploy once both `bun lint` and `bun run build` pass locally.
