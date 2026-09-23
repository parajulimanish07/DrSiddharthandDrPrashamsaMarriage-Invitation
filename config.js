/*
 * ─────────────────────────────────────────────────────────────
 *  WEDDING DETAILS — edit this file only.
 *  Everything on the page is generated from the values below.
 * ─────────────────────────────────────────────────────────────
 */
window.WEDDING = {
  groom: {
    name: "Dr. Siddhartha Regmi",
    shortName: "Siddhartha",
    // Portrait: any photo. zoom/x/y crop into it ("cover"/"center" shows a normal photo).
    photo: { src: "images/couple.webp", zoom: "360%", x: "65%", y: "40%" },
    parents: ["Mr. Giri Raj Regmi", "Mrs. Sarita Regmi"],
    home: "Imadol, Lalitpur",
  },

  bride: {
    name: "Dr. Prashamsa Parajuli",
    shortName: "Prashamsa",
    photo: { src: "images/couple.webp", zoom: "360%", x: "39%", y: "43%" },
    parents: ["Mr. Phanindra Prasad Parajuli", "Mrs. Yasoda Parajuli"],
    home: "Naya Thimi, Bhaktapur",
  },

  // Main illustration of the couple, shown at the top with the names in its arch.
  couplePhoto: "images/couple.webp",

  blessing: {
    nepali: "॥ श्री गणेशाय नमः ॥",
    message: "We joyfully announce the wedding of our children",
  },

  // The reception. Times are Nepal time (UTC+05:45).
  reception: {
    title: "Wedding Reception",
    start: "2026-12-05T10:00:00+05:45",
    end: "2026-12-05T14:00:00+05:45", // used for calendar invites only
    weekday: "Saturday",
    day: "05",
    month: "December",
    year: "2026",
    time: "10:00 AM",
    venue: "Golden Palace",
    address: "Gankhu, Bhaktapur",
    // Link used by the "Get Directions" button — the venue's exact Google Maps pin.
    mapUrl: "https://maps.app.goo.gl/azaG9FjEzNizc6TD8",
    // Google Maps embed centered on the exact pin above. Leave "" to hide.
    mapEmbedUrl: "https://maps.google.com/maps?q=27.6845405,85.3963109&z=17&output=embed",
  },

  // Photos placed in images/gallery/. Missing files are skipped automatically.
  // TEMP: reusing the couple illustration as a placeholder until real photos are added.
  gallery: [
    "images/couple.webp",
  ],

  /*
   * RSVP + Guestbook backend.
   * A plain website can't store wishes by itself, so the forms send them to a
   * free Google Sheet. Follow the steps in docs/GUESTBOOK_SETUP.md and paste the
   * Web App URL here. Until then the RSVP and Guestbook sections stay hidden.
   */
  backendUrl: "https://script.google.com/macros/s/AKfycbx0UGmp96n7vyAlprx8XM6YkUanv3Ym09-EcnMy4_wjAqSBQ8TTX7JdeX1cz33nMOI/exec",

  closingLine: "Your presence would be the greatest gift we could receive!",
  hashtag: "#SiddharthaWedsPrashamsa",

  // Optional background music, e.g. "assets/music.mp3". Leave "" to hide the button.
  music: "",
};
