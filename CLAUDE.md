# Kingdom's Kids

Scroll-reactive site for a missionary organisation. Phase 1 is the landing page
only. Phase 2 (confirmed): accounts, team assignment, photo gallery with
comments and likes, a shared editable calendar, and a shared accounting sheet.

## Philosophy

1. **No speculative features.** Build nothing until it is asked for.
2. **No premature abstraction.** Write it twice before extracting it.
3. **Clarity over cleverness.** Explicit beats compact.
4. **Justify every dependency.** Each one is weight and attack surface.
5. **No phantom features.** Delete docs for things that do not exist.
6. **Replace, don't deprecate.** Remove superseded code outright.
7. **Verify at every level.** Run the check; show the output.
8. **Bias toward action.** Decide reversible things quickly, state assumptions.
9. **Finish the job.** Handle the visible edge cases.
10. **Zero warnings.** Fix every warning or suppress it with a written reason.

## Hard limits

Enforced by `eslint.config.mjs` and a blocking `PostToolUse` hook. **Do not
restate the numbers anywhere else** — the config is the single source of truth.
Run `npm run lint` to see them.

They are Uncle Bob's, not defaults: functions ≤20 lines, indent depth ≤2,
≤3 parameters, files ≤500 lines, no flag arguments.

## Stack

- **Astro 7** — no React in phase 1. Add islands only when something needs state.
- **TypeScript 5.x** — **YOU MUST NOT upgrade to 7.** `@astrojs/check` peer-requires `^5 || ^6`.
- **GSAP** — ScrollTrigger, ScrollSmoother, SplitText, DrawSVG. All free since
  Webflow.
- **Tailwind 4** via `@tailwindcss/vite`. There is no `postcss.config`.
- **Prettier** owns all formatting. Never hand-format.

`npm run build` is `astro check && astro build`. **The check step is not
optional.** `astro build` alone is transpile-only — a probe with a wrong
argument type and a nonexistent property compiled successfully, exit 0.

## Architecture

Feature-Sliced Design, honoured by hand. Imports flow one direction only:

```
src/pages/  →  widgets/  →  shared/
```

`src/pages/` is Astro's routing directory and holds nothing but composition.
Phase 2 adds `features/` and `entities/` between the two, and a `views/` layer
above `widgets/` once there is more than one page — `views` rather than FSD's
own `pages` name, which Astro has taken. Do not create them before then.

- Absolute imports only. `@/` is `src/`. No `../` traversal, including within
  a slice.
- A slice's public API is its `.astro` component. Do not add an `index.ts`
  barrel — the component cannot import from a barrel that re-exports it.
- **One-word filenames.** `Layout.astro`, not `BaseLayout.astro`. The folder
  carries the context.

## Conventions

- **Never add `prefers-reduced-motion` handling.** Not in CSS, not in
  `gsap.matchMedia`. Do not propose it.
- No comment banners, no decorative blank lines. Comments explain _why_.
- Data attributes are behaviour hooks; classes are for styling. Never query
  JavaScript by class name.
- SCREAMING_CASE for numeric tuning constants; lowercase for selectors,
  attribute names and eases.
- **Section rhythm is one symmetric value, halved between like neighbours.** A
  view's wrappers carry `py-` of a single number. When the next wrapper has the
  same background, the current one drops to `pt-` only, so the gap is one unit
  instead of two. A background change is what earns the full gap.
- Colour tokens are `text`, `background`, `primary`, `secondary`, `accent`.
  Nothing else. Defined in `src/shared/styles/config/global.css`.
- The font is a subset of SF Pro at `src/shared/styles/config/sf.woff2` — 277
  glyphs covering English, Romanian and Spanish, weight axis 1–1000, width
  pinned. Regenerating it means re-subsetting, not swapping the file.

## Traps already paid for

These cost real debugging time. They are not inferable from the code.

- **CSS transforms do nothing on `display: inline` elements.** GSAP writes the
  transform and the browser discards it silently. Any element you animate with
  `x`/`y` needs `inline-block` or better.
- **`mask: "words"` clips descenders** when `line-height` is below ~1.2.
  SplitText clones each word into an `overflow: clip` wrapper sized to the line
  box; `leading-none` cuts the tails off `g`, `y`, `p`.
- **`scrollTrigger` is a config key matched by name.** Renaming the imported
  `ScrollTrigger` does not rename it. Get it wrong and the timeline plays
  instantly on load with no error.
- **`invalidateOnRefresh` destroys `.from()` tweens.** It re-reads current
  values on refresh, and for a `.from()` at rest "current" is the destination.
- **`scrub` + `once` can freeze short of the end.** The scrub lags; `once`
  kills the trigger mid-catch-up. Force `progress(1)` in `onLeave`.
- **ScrollSmoother is a singleton** and transforms `#smooth-content`. Anything
  `position: fixed` — the nav, when it exists — must live outside that wrapper.
- **The scroll lock is opt-in via `data-lock`.** `scroll.ts` pauses only if the
  page carries that attribute, and the widget that owns it must release it.
  A page without it never locks and therefore cannot freeze.
- **`eslint-plugin-sonarjs` compares Windows drive letters as case-sensitive
  strings.** `sonarjs/no-skipped-tests` crashes on the absolute paths the lint
  hook passes, because the file path and its computed topDir disagree on the
  drive letter's case. It is disabled in `eslint.config.mjs`. Do not re-enable
  it without checking on Windows.
- **Mandatory scroll snap eats JS scroll tweens.** A tween writing `scrollLeft`
  on a `scroll-snap-type: x mandatory` container is re-snapped every frame, so
  it jumps instead of animating. Set `scroll-snap-type: none` for the tween and
  restore it on complete. `scrollTo({ behavior: "smooth" })` never showed this
  because the browser's own smooth scroll is snap-aware; a tween is not.
- **The ease family sets perceived speed, not the duration.** `power4.out`
  covers ~97% of the distance in the first half of its time, so a 1s tween reads
  as ~0.3s of motion and then invisible creep. CSS `ease-out` covers ~68% at the
  same point. The symptom presents as "the duration is wrong", which sends you
  to the wrong knob.

## Workflow

- **Read the existing implementation before writing a new one.** Anything you
  are about to build already exists somewhere: a verse block, a display line,
  a tile, a scrubbed timeline, a widget entry script. Open that file, copy its
  structure, keep its class order, its wrapper elements and its data
  attributes. Inventing a second shape for a solved problem is the error, and
  the diff will be missing the parts that made the first one work. Deviating
  is a decision to state out loud, never a default.
- **Mount a widget the way its siblings are mounted.** The view owns the
  wrapper, the background and the vertical rhythm; the widget owns its
  `<section>` and everything inside it. Before adding one to a view, open that
  view and copy the wrapper the existing widgets sit in — background class and
  padding included. Arriving without that wrapper is the error, not a
  simplification.
- Run `npm run build` after changes. Show the output, do not assert success.
- The lint hook blocks on `Edit`/`Write` to `.ts`, `.mjs`, `.astro`. Violations
  come back as errors before the user sees the code.
- One file at a time. Show it, then wait. Never scaffold in bulk and never run
  a generator.
- Commit only when asked. Never push to `main` directly.
- In prose, avoid: critical, crucial, essential, significant, comprehensive,
  robust, elegant.
