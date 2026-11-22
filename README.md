# CompressImg — Private Browser Image Compressor

**Live App:** [https://compress-img.github.io/](https://compress-img.github.io/)

CompressImg is a fast, distraction-free, 100% client-side image compressor built with **Astro 5**, **React 19**, and **TypeScript**. Shrink **JPG, PNG, WebP, GIF, and SVG** images to an exact KB target (`20KB`, `50KB`, `100KB`, `200KB`, or custom KB) or dial in custom quality—all privately inside your browser with zero server uploads, zero watermarks, and full offline PWA support.

---

## Key Features

- **100% Client-Side Privacy (Zero Server Uploads):** Powered by HTML5 Canvas / `OffscreenCanvas`, Web Workers, `upng-js`, `gifenc`/`omggif`, and pure TypeScript SVG optimization. Images never leave your device.
- **Exact Target Size (KB) Solver:** One-click presets (`20KB`, `50KB`, `100KB`, `200KB`) and custom KB limits use a fast binary-search quality + proportional scaling solver to land cleanly under strict portal/form upload limits while preserving detail.
- **Quality & Format Mode:** Fine-tune compression quality (`10%–100%`) and convert between Original, JPG, PNG, and WebP (preserving transparency on PNG & WebP).
- **Interactive Before / After Slider:** Inspect fine details, text sharpness, and exact KB / `% saved` metrics side-by-side before downloading.
- **Batch Compression & ZIP Export:** Process multiple images at once and export individually or as a single `compressimg-batch.zip` archive powered client-side by `JSZip`.
- **Offline Progressive Web App (PWA):** Click **Add to Home Screen** (with native `beforeinstallprompt` + iOS Safari guide) to install and run image compression & ZIP exports 100% offline.
- **8 Languages + Clean Light & Dark Themes:** Full localization across English, Español, Português, Deutsch, Français, 日本語, 简体中文, and Русский with WCAG AA+ contrast and zero-FOUC theme persistence.

---

## Tech Stack

- **Framework:** [Astro 5](https://astro.build/) (Static output, Islands Architecture — 0 KB JS outside the interactive compressor island)
- **Interactive UI Island:** React 19 + TypeScript (`client:load`)
- **Styling:** Tailwind CSS with Clean Light (`#F6F6F6` / `#FFC7C7` / `#FFE2E2` / `#8785A2`) & Dark theme tokens
- **Browser Encoders:** `OffscreenCanvas` (WebP/JPEG), `upng-js` (PNG quantization), `omggif` + `gifenc` (animated & static GIF), pure TS SVG optimizer, `JSZip`

---

## Local Development

```bash
# Install dependencies
npm install

# Start local Astro dev server
npm run dev

# Type-check and build static production site to ./dist
npm run check
npm run build

# Preview built site locally
npm run preview
```

---

## GitHub Pages Deployment

Deployment is automated via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) using `actions/configure-pages`, `withastro/action`, and `actions/deploy-pages`.

Every push to `main` builds the static Astro site into `dist/` and deploys directly to `https://compress-img.github.io/`.

---

## Support & Freelance Inquiries

- **Buy me a coffee:** [https://kisharadilshan.gumroad.com/coffee](https://kisharadilshan.gumroad.com/coffee)
- **Hire Kishara Dilshan:** Need an ultra-fast Astro, React, or Next.js web app or client-side WebAssembly tool? Reach out via [Hire Me](https://compress-img.github.io/hire-me/) or email `kisharadilshan007@gmail.com`.

---

## License

Licensed under the [MIT License](LICENSE) — Copyright © 2026 Kishara Dilshan.
