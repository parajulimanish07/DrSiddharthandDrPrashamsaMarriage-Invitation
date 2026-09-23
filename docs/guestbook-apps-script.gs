/**
 * Google Apps Script backend for the RSVP + Guestbook forms.
 * Setup steps: see docs/GUESTBOOK_SETUP.md
 */
const MAX_WISHES = 100;

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

function clean_(value, max) {
  return String(value || "").trim().slice(0, max);
}

// GET ?type=wishes → latest wishes, newest first
function doGet(e) {
  if (e.parameter.type !== "wishes") return json_({ ok: false, error: "Unknown request" });
  const rows = sheet_("Wishes", ["Timestamp", "Name", "Message"]).getDataRange().getValues().slice(1);
  const wishes = rows
    .reverse()
    .slice(0, MAX_WISHES)
    .map((r) => ({ name: r[1], message: r[2] }));
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
  const name = clean_(data.name, 80);
  if (!name) return json_({ ok: false, error: "Name is required" });

  if (data.type === "rsvp") {
    sheet_("RSVP", ["Timestamp", "Name", "Phone", "Attending", "Guests"]).appendRow([
      new Date(), name, clean_(data.phone, 30), clean_(data.attending, 5), clean_(data.guests, 3),
    ]);
    return json_({ ok: true });
  }

  if (data.type === "wish") {
    const message = clean_(data.message, 600);
    if (!message) return json_({ ok: false, error: "Message is required" });
    sheet_("Wishes", ["Timestamp", "Name", "Message"]).appendRow([new Date(), name, message]);
    return json_({ ok: true });
  }

  return json_({ ok: false, error: "Unknown request" });
}
