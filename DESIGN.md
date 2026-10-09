# Codeblooded — Design System (Checkpoint A)

Status: **Checkpoint A decisions recorded — awaiting explicit approval before Checkpoint B.** This is the source of truth for the visual system. Implementations should reference these tokens rather than inventing local styles. No hero spike or application implementation is authorized yet.

## 1. Design thesis

**Enter the world, through the heart.** Codeblooded should feel like a dark, living artifact: the logo is the relic; the interface is the chamber around it; the heartbeat is the only recurring motion language. The site should communicate people who build, ship, and compete—not generic startup promises.

Art direction: gothic engraving meets contemporary editorial typography and restrained real-time 3D. Black space is an active material, not empty filler. Red is light, ink, and signal—not a blanket gradient.

## 2. Color tokens

Initial values supplied in the brief; validate contrast with a real contrast tool before declaring accessibility pass.

| Token | Value | Use |
|---|---|---|
| `--abyss` | `#0A0A0A` | Main background |
| `--crimson` | `#C41E3A` | Display type, large marks, scene lighting, decoration |
| `--ember` | `#E5395A` | Small emphasis, actions, focus indicators |
| `--mist` | `#F2F2F2` | Main text |
| `--slate` | `#3A3A3A` | Rules, dividers, secondary surfaces |
| `--bone` | `#D6C4B9` | Proposed single warm accent for engraved detail / quiet metadata; confirm in rendered direction |

Rules:
- No purple/blue gradients, aurora, glowing blobs, or generic neon.
- Crimson is not used for small body copy unless measured contrast passes.
- Use light as a motivated source (rim, core, ember); no arbitrary glow.
- Texture is subtle and purposeful: grain, etched linework, particulate depth.

## 3. Typography direction (owner preference: pairing 01)

Maximum two families, self-hosted with `font-display: swap` or `optional`; preload the chosen display face. No Inter, Roboto, Arial, system fonts, Geist, Space Grotesk, Cinzel, Bebas Neue, or Instrument Serif.

Three pairings to render next to the supplied logo before selection:
1. **Basteleur + Satoshi** — ornate, carved display with a clear contemporary grotesque.
2. **Gambetta + JetBrains Mono** — high-contrast editorial display with a precise technical interface voice.
3. **Clash Display + Departure Mono** — harder, sharper display with a deliberately coded mono counterpoint.

**Owner preference: pairing 01 — Basteleur + Satoshi.** Treat this as the selected direction for the next review, not permission to implement yet. Before production use, verify current font files, license notices, Latin glyph coverage for the actual site copy, weight availability, and self-hosting terms. Basteleur is published under SIL OFL 1.1 by its source project; Satoshi's exact distribution/license package still needs verification. Do not imitate or redraw the supplied logo lettering. The typography board generated during Checkpoint A is a mood/concept board, not a pixel-accurate font specimen: generated imagery can distort text and does not certify that the exact font files were rendered. The final comparison should be rendered from the real font files beside the supplied JPG before implementation.

Fluid type uses `clamp()`. Start with a modular scale:
- Display: `clamp(3.25rem, 10vw, 9rem)`
- Section heading: `clamp(2.25rem, 5vw, 5rem)`
- Lead: `clamp(1.125rem, 1.8vw, 1.5rem)`
- Body: `1rem` to `1.125rem`
- UI/eyebrow: `0.6875rem` to `0.8125rem`, tracked and used sparingly

## 4. Layout and spacing

- Editorial, asymmetrical, with a visible grid that is deliberately broken at key moments.
- Large negative space around the logo/heart; tight information clusters for metadata.
- Avoid equal-width card rows and rounded-card-everything. Prefer open layouts, hairline rules, overlap, cropping, and typographic scale.
- Spacing base: 4px. Core steps: 4, 8, 12, 16, 24, 32, 48, 72, 96, 128px.
- Content width should vary by section; no single centered container for the entire experience.
- Responsive layouts must preserve hierarchy and content access without the 3D layer.

## 5. Heartbeat and motion language

One shared heartbeat clock, approximately 66 BPM, with a double-beat envelope followed by a rest. Treat this as a semantic signal, not a global animation preset.

- The shared beat value drives the heart's core intensity, particle drift, `--beat`, cursor response, button response, and optional audio.
- Only the heart and Enter control pulse continuously. Hover/click responses are one deliberate beat, never a generic scale-and-shadow effect.
- Motion must explain the body's pulse, blood flow, entry, or camera movement.
- Respect `prefers-reduced-motion`: disable camera flight and nonessential motion; provide a static, readable experience.
- Scroll movement uses a single master progress source and eased scrub. Mobile keeps native touch scrolling.
- Audio is opt-in, off by default, and only unlocked by a user gesture.
- Stop rendering the scene when not visible or when the document is hidden.

## 6. Cursor, focus, and interaction

- Custom cursor is progressive enhancement only; native cursor and keyboard navigation remain functional.
- Focus uses a clear ember outline and must remain visible against every surface.
- Controls should feel tactile, like a pulse registering—not float, glow, or scale by default.
- Sound toggle and reduce-effects control remain easy to find and keyboard accessible.
- No sound autoplay. No hover-only information.

## 7. 3D direction — owner selected A

Use WebGL for v1 for broad compatibility and the current postprocessing path. Keep the scene as progressive enhancement, dynamically loaded after useful content and typography.

**Owner selected A: a custom heart silhouette with the ornate detail carried as a texture/material.** This offers art direction control and a lighter asset pipeline, but it needs a clean vector silhouette plus a separately prepared detail texture. The current supplied logo is a JPG with a black background; it is a visual reference only. Do not auto-trace the raster logo. A clean vector silhouette and source/detail artwork remain required before the 3D build.

- **A — Extruded silhouette + detail texture:** best for a deliberate 2.5D relief and reliable lighting; requires vector silhouette and detail texture; not full organic anatomy.
- **B — Shader/SDF heart:** custom and potentially elegant; more shader work, less faithful to fine logo engraving, and harder to art-direct for exact detail.
- **C — Artist-made GLB:** strongest potential sculptural realism; highest dependency on a well-made model, UVs/materials, optimization, and supplied source asset.

A curved tunnel should only appear after entry, as a spatial continuation of the heart. Particles are restrained and GPU-driven; no per-particle React component loops. Bloom is selective and low intensity, with tone mapping after bloom in the post chain.

## 8. Performance and accessibility principles

- Keep text/layout usable before the 3D chunk loads; loader progress must reflect actual asset loading.
- WebGLRenderer for v1; no WebGPU dependency for the initial release.
- Quality tiers should derive from GPU capability detection, with a visible reduce-effects control and static fallback.
- Cap device pixel ratio appropriately; pause off-screen rendering.
- Full keyboard operation, skip link, semantic landmarks, meaningful alt text, server-side validation, rate limiting/spam protection, and RLS for all user data.
- Never claim a performance, contrast, accessibility, or device test unless it was actually run. Report measured vs estimated values explicitly.

## 9. Copy direction — owner selected option A

### Hero line
**Selected: A — Built in blood. Proven in code.**

Other options retained for reference:
2. **Think sharp. Build ruthless. Ship real.**
3. **We don't just write code. We put it to the test.**


2. **Think sharp. Build ruthless. Ship real.**
3. **We don't just write code. We put it to the test.**

### Manifesto
**Selected: A — We build after the idea gets uncomfortable. We test what breaks. We ship what holds. Codeblooded is for people who want their work to stand up under pressure.**

Other options retained for reference:

2. **Less talk in the channel. More proof in the repo. We make things, break things, learn fast, and come back sharper.**
3. **The work is the signal. Build it. Put it under pressure. Ship it where people can see.**

No invented member counts, testimonials, founder biographies, or activity statistics. Founder/team/video content remains clearly marked as temporary in a single data file until real details are supplied. The separate hackathon business is out of scope and must not be mentioned.

## 10. Anti-slop checklist

Before each checkpoint:
- **Squint test:** does the composition read as Codeblooded from silhouette, rhythm, and color alone?
- **Swap-the-logo test:** would another brand's logo fit? If yes, make the composition more specific to this heart and its engraving.
- **Copy test:** remove any sentence that could be pasted onto a generic startup site.
- **Code scan:** no blocklisted gradients, fake metrics, stock photos, emoji decoration, repetitive feature cards, gratuitous effects, or unmodified component-library demos.
- **Truth test:** mark estimates and measurements; do not claim tests that were not run.

## 11. Checkpoint A decisions and remaining gates

Confirmed by owner:
- **Heart geometry:** A — extruded silhouette with detail texture/material.
- **Typography preference:** 01 — Basteleur + Satoshi, pending exact-font specimen and license/glyph checks.
- **Hero and manifesto copy:** A — “Built in blood. Proven in code.” and the selected manifesto above.
- **Regular member access:** registration form only; do not create regular-member login accounts. Core/admin access remains a separate implementation detail to define securely.
- **Logo source:** use the supplied JPG as a temporary visual reference only.
- **Santioni Spirits:** undecided; do not borrow or infer any direction until the owner clarifies.

Still needed before the related implementation can be considered production-ready:
- Transparent PNG/SVG logo and a clean vector silhouette/detail source for the selected heart treatment. Do not auto-trace the JPG.
- Exact-font comparison rendered from the real font files; the generated mood board is not a font-accurate specimen.
- Five founders' names/photos/bios, real YouTube links, WhatsApp invite URL, and domain when available.
- Clarification on Santioni Spirits, if it is to be used at all.

Checkpoint A is documented; **Checkpoint B is not authorized until the owner explicitly approves proceeding.**
