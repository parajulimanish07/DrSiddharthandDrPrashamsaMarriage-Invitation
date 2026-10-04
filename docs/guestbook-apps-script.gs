/**
 * Google Apps Script backend for the RSVP + Guestbook forms.
 * Setup steps: see docs/GUESTBOOK_SETUP.md
 */
const MAX_WISHES = 100;
const MAX_PHOTOS = 300;
const MAX_PHOTO_BASE64 = 8 * 1024 * 1024; // ~6 MB image; the site sends ~0.5 MB
const PHOTO_FOLDER = "Wedding Guest Photos";

function sheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Trims, caps length, and defuses spreadsheet formulas (=, +, -, @ at the start).
function clean_(value, max) {
  const text = String(value || "").trim().slice(0, max);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

// The Drive folder guests' photos go into. Created on first use; anyone with the link can view it.
function photoFolder_() {
  const found = DriveApp.getFoldersByName(PHOTO_FOLDER);
  if (found.hasNext()) return found.next();
  const folder = DriveApp.createFolder(PHOTO_FOLDER);
  folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return folder;
}

// GET ?type=photos → ids of the latest guest photos, newest first
function listPhotos_() {
  const files = photoFolder_().getFiles();
  const photos = [];
  while (files.hasNext()) {
    const f = files.next();
    photos.push({ id: f.getId(), t: f.getDateCreated().getTime() });
  }
  photos.sort((a, b) => b.t - a.t);
  return json_({ ok: true, photos: photos.slice(0, MAX_PHOTOS).map((p) => p.id) });
}

// GET ?type=wishes → latest wishes, newest first
function doGet(e) {
  if (e.parameter.type === "photos") return listPhotos_();
  if (e.parameter.type !== "wishes") return json_({ ok: false, error: "Unknown request" });
  const rows = sheet_("Wishes", ["Timestamp", "Name", "Message", "Anonymous"]).getDataRange().getValues().slice(1);
  const wishes = rows
    .reverse()
    .slice(0, MAX_WISHES)
    .map((r) => ({ name: String(r[3]).toLowerCase() === "yes" ? "A well-wisher" : r[1], message: r[2] }));
  return json_({ ok: true, wishes });
}

// POST {type: "rsvp" | "wish", ...}
function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: "Bad request" });
  }
  // Hidden "website" field: humans leave it empty, bots fill it. Pretend success.
  if (data.website) return json_({ ok: true });
  const name = clean_(data.name, 80);

  if (data.type === "rsvp") {
    if (!name) return json_({ ok: false, error: "Name is required" });
    sheet_("RSVP", ["Timestamp", "Name", "Phone", "Attending", "Guests"]).appendRow([
      new Date(), name, clean_(data.phone, 30), clean_(data.attending, 5), clean_(data.guests, 3),
    ]);
    return json_({ ok: true });
  }

  if (data.type === "photo") {
    const image = String(data.image || "");
    if (!image || image.length > MAX_PHOTO_BASE64) return json_({ ok: false, error: "Photo missing or too large" });
    const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd_HH-mm-ss");
    const who = name ? name.replace(/[^\w\- ]+/g, "").trim() : "guest";
    const blob = Utilities.newBlob(Utilities.base64Decode(image), "image/jpeg", `${stamp}_${who}.jpg`);
    const file = photoFolder_().createFile(blob);
    return json_({ ok: true, id: file.getId() });
  }

  if (data.type === "wish") {
    const message = clean_(data.message, 600);
    if (!message) return json_({ ok: false, error: "Message is required" });
    const isAnonymous = !!data.anonymous;
    sheet_("Wishes", ["Timestamp", "Name", "Message", "Anonymous"]).appendRow([
      new Date(), name || "Anonymous", message, isAnonymous ? "Yes" : "No",
    ]);
    return json_({ ok: true });
  }

  return json_({ ok: false, error: "Unknown request" });
}
