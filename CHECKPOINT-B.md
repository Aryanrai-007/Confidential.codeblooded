# Codeblooded — Checkpoint B Hero Spike

Status: implementation draft on `checkpoint-b/hero-spike`. This is a limited hero spike, not a production release.

## Included
- Intro threshold with explicit Enter action and session-level repeat skip.
- Responsive hero copy using the selected A line and manifesto.
- R3F/WebGL extruded heart-form study with procedural relief texture, selective bloom, and approximate double-beat animation.
- Reduced-motion preference detection plus a manual reduce-effects toggle.
- Keyboard skip link, visible focus styles, semantic page landmarks, no autoplay audio.
- Hero plus one follow-on “signal” section to evaluate the visual language.

## Explicitly provisional
- Heart geometry is a generic heart-form study, **not the Codeblooded logo**, because the supplied JPG is not a transparent/vector production asset and must not be auto-traced.
- Font files are not yet self-hosted. This spike uses system serif/sans fallbacks to establish hierarchy; the exact Basteleur + Satoshi specimen remains an approval gate.
- Sound toggle is visual-only; no audio is played or bundled.
- Loader does not yet report asset-by-asset progress. The scene uses procedural geometry and no external 3D assets; loader progress instrumentation is a follow-up before production intro.
- No registration backend, auth, founder content, video embeds, WhatsApp invite, or domain configuration in this spike.
- No claims of measured FPS, LCP, device performance, contrast pass, or accessibility certification.

## Package versions researched 2026-10-09
- Next.js 16.4.0 — official Next.js App Router installation guide says Node.js >=20.9.
- React / React DOM 19.3.0.
- `three` 0.186.1; `@react-three/fiber` 9.8.1 (Fiber v9 pairs with React 19).
- `@react-three/drei` 10.7.9; `@react-three/postprocessing` 3.1.3.
- GSAP 3.15.0; `@gsap/react` 2.1.2.
- Lenis 1.3.26; Zustand 5.0.15.
- Tailwind CSS 4.x via `@tailwindcss/postcss`.

Sources:
- https://nextjs.org/docs/app/getting-started/installation
- https://r3f.docs.pmnd.rs/getting-started/installation
- https://tailwindcss.com/docs/installation/framework-guides/nextjs
- https://gsap.com/docs/v3/Installation/
- https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md
- https://www.npmjs.com/package/three
- https://www.npmjs.com/package/@react-three/fiber
- https://www.npmjs.com/package/@react-three/drei
- https://www.npmjs.com/package/@react-three/postprocessing
- https://www.npmjs.com/package/gsap
- https://www.npmjs.com/package/%40gsap/react
- https://www.npmjs.com/package/lenis
- https://www.npmjs.com/package/zustand

## Before approval to continue
- Confirm actual font files/licenses and replace fallbacks with self-hosted files.
- Obtain a clean vector silhouette/detail texture and production logo asset.
- Implement truthful load progress, intro sequencing, and audio only if approved.
- Run build, browser console, responsive, keyboard, reduced-motion, and real device checks; report actual measurements.
- Add a repeatable screenshot/recording procedure and attach desktop/mobile evidence after a browser environment is available.
