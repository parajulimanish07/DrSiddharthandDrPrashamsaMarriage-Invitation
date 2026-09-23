# Dr. Siddhartha Regmi & Dr. Prashamsa Parajuli — Wedding Invitation

A single-page wedding invitation website. It uses plain HTML, CSS and JavaScript with no build step.

**Reception:** Saturday, 5 December 2026 · 10:00 AM · Golden Palace, Pepsicola

## Editing details

All text, dates, venue and family names live in **`config.js`**. Edit that file and the page updates.

## Adding photos

Put the photos in `images/` with these names (JPG recommended, ideally under 500 KB each):

| File | Where it shows |
|---|---|
| `images/couple.jpg` | Background of the opening section |
| `images/groom.jpg` | Groom portrait (portrait orientation) |
| `images/bride.jpg` | Bride portrait (portrait orientation) |
| `images/gallery/1.jpg` … `6.jpg` | "Moments" gallery (add or remove names in `config.js`) |

Missing photos are skipped automatically. The gallery stays hidden until at least one photo exists.

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
