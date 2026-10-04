# RSVP & Guestbook setup (free, ~5 minutes)

The site is static, so RSVPs and wishes are stored in a Google Sheet you own.

1. Create a new Google Sheet (e.g. "Siddhartha & Prashamsa — RSVP").
2. In the sheet: **Extensions → Apps Script**.
3. Delete the sample code, paste everything from `docs/guestbook-apps-script.gs`, and click **Save**.
4. Click **Deploy → New deployment** → gear icon → **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, authorize with your Google account, and copy the **Web app URL**
   (it ends in `/exec`).
6. Paste that URL into `config.js` as `backendUrl: "https://script.google.com/macros/s/.../exec"`.

The "Confirm Attendance" and "Guestbook" sections appear automatically once `backendUrl` is set.
RSVPs land in the **RSVP** tab, and wishes in the **Wishes** tab. To remove an inappropriate
wish, delete its row in the sheet.

Guests can check "Send this blessing anonymously" — the name field is skipped entirely, the wish
is recorded in the sheet as "Anonymous" (column D marks it as such), and the site displays it as
"A well-wisher" instead of a name.

If you edit the script later, use **Deploy → Manage deployments → Edit → New version**
so the same URL keeps working.

## Guest photo sharing (QR code)

Guests scan the QR code (`images/qr-photos.svg`, shown in the "Share Your Moments" section and printable
for tables), land on `photos.html`, and take or pick photos. Each photo is shrunk on their phone and saved
to a Google Drive folder called **Wedding Guest Photos** in the Google account that owns the script.
`photos.html` also shows everything uploaded so far.

1. Re-paste `docs/guestbook-apps-script.gs` into the Apps Script project and save.
2. **Deploy → Manage deployments → Edit → New version → Deploy.** The first time, Google asks you to
   approve a new permission (Drive access). Click through *Advanced → Go to project*.
3. Open `photos.html` once and upload a test photo. That creates the Drive folder.

After the event, open **drive.google.com → Wedding Guest Photos** and download the whole folder.
Files are named `date_time_guestname.jpg`. The folder is "anyone with the link can view", which is how
the album page can show thumbnails; the link is not guessable, but don't post it publicly.

To print the QR code, use `images/qr-photos.png` (high resolution). If you ever change the site's address,
the QR code must be regenerated.
