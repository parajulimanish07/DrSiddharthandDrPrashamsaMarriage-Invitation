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
    parents: ["Mr. Giri Raj Regmi", "Mrs. Sarita Khaniya"],
    invite: "Cordially request the honour of your presence to celebrate the auspicious union of their beloved son.",
    home: "Imadol, Lalitpur",
  },

  bride: {
    name: "Dr. Prashamsa Parajuli",
    shortName: "Prashamsa",
    photo: { src: "images/couple.webp", zoom: "380%", x: "33%", y: "43%" },
    parents: ["Mr. Phanindra Prasad Parajuli", "Mrs. Yasoda Devi Nepal"],
    invite: "Seek your blessings and gracious presence as their beloved daughter embarks on this sacred lifelong journey.",
    home: "Naya Thimi, Bhaktapur",
  },

  // Main illustration of the couple, shown at the top with the names in its arch.
  couplePhoto: "images/couple.webp",

  blessing: {
    nepali: "॥ श्री गणेशाय नमः ॥",
    english: "With the blessings of Lord Ganesha",
    message: "We joyfully announce the wedding of our children",
    // Shown in the footer.
    closing: "With immense joy and the blessings of our beloved families, we invite you to join us as we celebrate the wedding of Dr. Siddhartha Regmi and Dr. Prashamsa Parajuli.",
    signoff: "Regmi & Parajuli Families",
  },

  // The wedding ceremony (the bride's side hosts only this; the reception is hosted by the groom's family).
  // Times are Nepal time (UTC+05:45).
  ceremony: {
    title: "Wedding Ceremony",
    subtitle: "शुभ विवाह संस्कार",
    description: "The sacred Vedic Vivaha ceremony joining two souls and two families in eternal love and commitment.",
    nepaliDate: "मंसिर २०, २०८३",
    start: "2026-12-05T10:00:00+05:45",
    end: "2026-12-05T14:00:00+05:45", // used for calendar invites only
    weekday: "Saturday",
    day: "05",
    month: "December",
    year: "2026",
    time: "10:00 AM",
    timeLabel: "Auspicious Lagna",
    venue: "Golden Palace",
    address: "Gankhu, Bhaktapur",
    // Link used by the "Get Directions" button — the venue's exact Google Maps pin.
    mapUrl: "https://maps.app.goo.gl/azaG9FjEzNizc6TD8",
    // Google Maps embed centered on the exact pin above. Leave "" to hide.
    mapEmbedUrl: "https://maps.google.com/maps?q=27.6845405,85.3963109&z=17&output=embed",
  },

  /*
   * RSVP + Guestbook backend.
   * A plain website can't store wishes by itself, so the forms send them to a
   * free Google Sheet. Follow the steps in docs/GUESTBOOK_SETUP.md and paste the
   * Web App URL here. Until then the RSVP and Guestbook sections stay hidden.
   */
  backendUrl: "https://script.google.com/macros/s/AKfycbx0UGmp96n7vyAlprx8XM6YkUanv3Ym09-EcnMy4_wjAqSBQ8TTX7JdeX1cz33nMOI/exec",

  // Page guests open by scanning the QR code, to share photos from the event.
  // Needs backendUrl to be set (see docs/GUESTBOOK_SETUP.md). Leave "" to hide the section.
  photosPage: "photos.html",

  closingLine: "Your presence would be the greatest gift we could receive!",
  hashtag: "#SiddharthaWedsPrashamsa",

  // Optional background music, e.g. "assets/wedding-song.mp3". Leave "" to hide the button.
  music: "assets/wedding-song.mp3",
  // Optional credit shown in the footer (needed for CC-licensed tracks). Leave "" to hide.
  musicCredit: "",
};
