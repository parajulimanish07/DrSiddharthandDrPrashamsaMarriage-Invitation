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
    invite: "Cordially request the honour of your presence to celebrate the auspicious union of their beloved son.",
    home: "Imadol, Lalitpur",
  },

  bride: {
    name: "Dr. Prashamsa Parajuli",
    shortName: "Prashamsa",
    photo: { src: "images/couple.webp", zoom: "380%", x: "33%", y: "43%" },
    parents: ["Mr. Phanindra Prasad Parajuli", "Mrs. Yasoda Parajuli"],
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
  backendUrl: "https://script.google.com/macros/s/AKfycbybzmOqtuV5Hl8My1U6tEE8TmiLtWChH9D-Dhb9iI56PYrZLwJuCQaGXLlDO7Yol3Qb/exec",

  // Page guests open by scanning the QR code, to share photos from the event.
  // Needs backendUrl to be set (see docs/GUESTBOOK_SETUP.md). Leave "" to hide the section.
  photosPage: "photos.html",

  closingLine: "Your presence would be the greatest gift we could receive!",
  hashtag: "#SiddharthaWedsPrashamsa",

  // Optional background music, e.g. "assets/wedding-song.mp3". Leave "" to hide the button.
  music: "assets/wedding-song.mp3",
  // Optional credit shown in the footer (needed for CC-licensed tracks). Leave "" to hide.
  musicCredit: "",

  /*
   * Nepali version, shown when a guest taps "नेपाली". Anything left out here falls back to the English
   * value above. Dates, times and numbers are converted to Devanagari digits automatically.
   */
  ne: {
    groom: {
      name: "डा. सिद्धार्थ रेग्मी",
      shortName: "सिद्धार्थ",
      parents: ["श्री गिरिराज रेग्मी", "श्रीमती सरिता रेग्मी"],
      home: "इमाडोल, ललितपुर",
      invite: "आफ्ना प्रिय सुपुत्रको शुभविवाह समारोहमा सहभागी भई शोभा बढाइदिनुहुन हार्दिक अनुरोध गर्दछन्।",
    },
    bride: {
      name: "डा. प्रशंसा पराजुली",
      shortName: "प्रशंसा",
      parents: ["श्री फणीन्द्र प्रसाद पराजुली", "श्रीमती यशोदा पराजुली"],
      home: "नयाँ ठिमी, भक्तपुर",
      invite: "आफ्नी प्रिय सुपुत्रीको पवित्र जीवनयात्राको शुभारम्भमा उपस्थित भई आशीर्वाद दिनुहुन हार्दिक अनुरोध गर्दछन्।",
    },
    blessing: {
      english: "भगवान गणेशको आशीर्वादले",
      message: "हामी हाम्रा सन्तानहरूको विवाहको हार्दिक सूचना दिन्छौँ",
      closing: "हाम्रा आदरणीय परिवारका आशीर्वाद र अपार खुसीका साथ, डा. सिद्धार्थ रेग्मी र डा. प्रशंसा पराजुलीको विवाहोत्सवमा सहभागी भई शोभा बढाइदिनुहुन हार्दिक निमन्त्रणा गर्दछौँ।",
      signoff: "रेग्मी र पराजुली परिवार",
    },
    ceremony: {
      title: "शुभ विवाह",
      description: "दुई आत्मा र दुई परिवारलाई अनन्त प्रेम र प्रतिबद्धतामा बाँध्ने पवित्र वैदिक विवाह संस्कार।",
      weekday: "शनिबार",
      month: "डिसेम्बर",
      time: "बिहान १०:०० बजे",
      timeLabel: "शुभ लग्न",
      venue: "गोल्डेन प्यालेस",
      address: "गंखु, भक्तपुर",
    },
    closingLine: "तपाईंको उपस्थिति नै हाम्रो लागि सबैभन्दा ठूलो उपहार हुनेछ!",
    // Calendar weekday headings, Monday first.
    weekdaysShort: ["सो", "मं", "बु", "बि", "शु", "श", "आ"],
  },
};
