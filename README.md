# Nirmal Bharatwaj – Portfolio site

Open `index.html` in a browser to preview. No build step. To publish, upload the whole folder
to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).

## 1. Replace low-res images with high-res
Every image lives in `images/`. The page refers to them by file name, so:

1. Export the high-res version of the image.
2. Give it **exactly the same file name** as the one it replaces (e.g. `wideline-hero.jpg`) and drop it into `images/`, overwriting the old file.
3. Refresh the browser. Nothing else changes.

Tips
- Keep the same file type (`.jpg` stays `.jpg`; `.png` stays `.png`). If you must change type, also edit the `src` in `index.html`.
- Keep roughly the same aspect ratio. The layout crops with `object-fit`, so a very different ratio will crop differently.
- Suggested sizes: hero/wide images 2400 px wide, others 1600 px. Save JPGs at about 80-85% quality (aim for under 400 KB each) to keep the site fast.
- Transparent cut-outs must stay PNG: `nykaa-render-cutout.png`, `handle-zebra.png`, `nb-logo.png`.
- Clicking an image opens a larger view, so high-res files will show their detail there.

Image names
| Project | Files |
|---|---|
| Wideline | wideline-hero, wideline-spec, wideline-finishes |
| Hair dryer | nykaa-render-wood, nykaa-render-cutout, nykaa-lifestyle, nykaa-sketch-1/2/3, nykaa-assembly, nykaa-cost-analysis (also nykaa-values, nykaa-logo, nykaa-bottle-reference, currently unused) |
| Bearing | bearing-solar, bearing-drawing-a, bearing-drawing-b, bearing-patent-certificate, bearing-award |
| Handle | handle-render, handle-zebra, handle-design-certificate |
| Patch fitting | patch-render-1, patch-render-2, patch-shopfront, patch-certificate |
| Framework | framework-mindmap |
| Academic | academic-flush-plate, academic-lifi, academic-thermocol |
| Other | profile (about photo), nb-logo |

Note: `bearing-solar.jpg` is labelled "AI-generated illustration" on the page, as in your PDF. Replace it with a real photo and remove that caption in `index.html` if you have one.

## 2. Add your links
Open `js/config.js` and paste each URL between the quotes (Full document, patent, academic portfolio, LinkedIn).
Buttons with an empty link show as faded "coming soon" buttons.

## 3. Edit text
All text is in `index.html`. Accent colours per project are in each section's `style="--accent:#..."`.
