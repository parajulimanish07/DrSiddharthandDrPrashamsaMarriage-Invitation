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
    address: "Pepsicola, Kathmandu",
    // Link used by the "Get Directions" button.
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Golden+Palace+Pepsicola+Kathmandu",
    // Google Maps embed (Share → Embed a map → copy the src="..." value). Leave "" to hide.
    mapEmbedUrl: "https://maps.google.com/maps?q=Golden%20Palace%20Pepsicola%20Kathmandu&z=15&output=embed",
  },

  // Photos placed in images/gallery/. Missing files are skipped automatically.
  gallery: [
    "images/gallery/1.jpg",
    "images/gallery/2.jpg",
    "images/gallery/3.jpg",
    "images/gallery/4.jpg",
    "images/gallery/5.jpg",
    "images/gallery/6.jpg",
  ],

  /*
   * RSVP + Guestbook backend.
   * A plain website can't store wishes by itself, so the forms send them to a
   * free Google Sheet. Follow the steps in docs/GUESTBOOK_SETUP.md and paste the
   * Web App URL here. Until then the RSVP and Guestbook sections stay hidden.
   */
  backendUrl: "",

  closingLine: "Your presence would be the greatest gift we could receive!",
  hashtag: "#SiddharthaWedsPrashamsa",

  // Optional background music, e.g. "assets/music.mp3". Leave "" to hide the button.
  music: "",
};
