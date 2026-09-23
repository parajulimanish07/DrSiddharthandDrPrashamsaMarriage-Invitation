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
