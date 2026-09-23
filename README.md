# Dr. Siddhartha Regmi & Dr. Prashamsa Parajuli — Wedding Invitation

A single-page wedding invitation website. It uses plain HTML, CSS and JavaScript with no build step.

**Reception:** Saturday, 5 December 2026 · 10:00 AM · Golden Palace, Pepsicola

## Editing details

All text, dates, venue and family names live in **`config.js`**. Edit that file and the page updates.

## Photos

- `images/couple.webp` is the illustration at the top. The couple's short names are written inside its arch.
- The groom and bride portraits are crops of the same illustration. To use real photos, add them to
  `images/` and set `photo: { src: "images/groom.jpg" }` in `config.js`. Leaving out `zoom`, `x` and `y`
  shows the whole photo.
- The "Moments" gallery shows `images/gallery/1.jpg` … `6.jpg`. Missing files are skipped, and the
  section stays hidden until at least one photo exists.

Fonts are self-hosted in `assets/fonts/`, so the page doesn't depend on Google Fonts at runtime.

## RSVP & Guestbook

See [`docs/GUESTBOOK_SETUP.md`](docs/GUESTBOOK_SETUP.md). It stores responses in a free Google Sheet.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish for free with GitHub Pages

Repository **Settings → Pages →** Source: *Deploy from a branch*. Pick the branch and the `/ (root)` folder, then save.
The site will be live at `https://<username>.github.io/<repo-name>/`.
