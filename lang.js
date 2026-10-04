/*
 * English / Nepali toggle, shared by index.html and photos.html.
 * Fixed interface text lives in UI below. Names, dates, venue and blessings
 * live in config.js (see the `ne` block there).
 *
 * In the HTML: data-i18n="key" sets the text, data-i18n-ph the placeholder,
 * data-i18n-aria the aria-label.
 */
(function () {
  const UI = {
    en: {
      coverSub: "The wedding of",
      openBtn: "Open Invitation",
      together: "Together with their families",
      inviteLine: "invite you to celebrate their wedding",
      ourFamilies: "Our Families",
      withBlessings: "With the blessings of",
      groom: "Groom",
      bride: "Bride",
      ceremonyTitle: "Wedding Ceremony",
      countdown: "Countdown",
      days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds",
      countdownDone: "The celebration has begun!",
      gcal: "Add to Google Calendar",
      ics: "Download .ics",
      venueTitle: "Ceremony Venue",
      directions: "Get Directions",
      rsvpTitle: "Confirm Attendance",
      yourName: "Your name*",
      phone: "Phone number",
      attendYes: "Joyfully attending",
      attendNo: "Regretfully can't attend",
      guests1: "1 guest", guests2: "2 guests", guests3: "3 guests", guests4: "4 guests", guests5: "5+ guests",
      confirm: "Confirm",
      guestbookTitle: "Guestbook",
      enterName: "Enter your name*",
      nameHidden: "Name hidden",
      anonymous: "Send this blessing anonymously",
      enterWishes: "Enter your wishes*",
      sendWishes: "Send Wishes",
      sending: "Sending…",
      failed: "Sorry, that didn't go through. Please try again.",
      thanksYes: "Thank you, {name}! We can't wait to celebrate with you.",
      thanksNo: "Thank you, {name}. You'll be missed!",
      thanksWish: "Thank you for your lovely wishes!",
      noWishes: "No wishes yet. Be the first!",
      wellWisher: "A well-wisher",
      shareTitle: "Share Your Moments",
      shareText: "Scan the code to add the photos you take during the celebration to our shared album.",
      scanLabel: "Scan to share photos",
      sharePhoto: "Share a Photo",
      qrAlt: "QR code linking to the guest photo page",
      playMusic: "Play music",
      pauseMusic: "Pause music",
      music: "Music",
      language: "Language",
      photosIntro: "Take a photo or pick some from your gallery. Everything lands in one shared album for the couple.",
      yourNameOpt: "Your name (optional)",
      takePhoto: "Take a Photo",
      chooseGallery: "Choose from Gallery",
      album: "The Album",
      back: "← Back to the invitation",
      uploading: "Uploading {n} of {total}…",
      thanksOnePhoto: "Thank you! Your photo was added.",
      thanksPhotos: "Thank you! {n} photos were added.",
      photoFailed: "Sorry, a photo didn't go through. Please try again.",
      noPhotos: "No photos yet. Be the first to share one!",
      photosOff: "Photo sharing isn't available right now.",
      guestPhotoAlt: "Photo shared by a guest",
    },
    ne: {
      coverSub: "विवाह समारोह",
      openBtn: "निमन्त्रणा खोल्नुहोस्",
      together: "आफ्ना परिवारसहित",
      inviteLine: "तपाईंलाई आफ्नो विवाहोत्सवमा हार्दिक निमन्त्रणा गर्दछन्",
      ourFamilies: "हाम्रा परिवार",
      withBlessings: "आशीर्वादसहित",
      groom: "वर",
      bride: "वधू",
      ceremonyTitle: "शुभ विवाह",
      countdown: "उल्टो गणना",
      days: "दिन", hours: "घण्टा", minutes: "मिनेट", seconds: "सेकेन्ड",
      countdownDone: "उत्सव सुरु भइसक्यो!",
      gcal: "गुगल क्यालेन्डरमा थप्नुहोस्",
      ics: ".ics डाउनलोड गर्नुहोस्",
      venueTitle: "समारोह स्थल",
      directions: "बाटो हेर्नुहोस्",
      rsvpTitle: "उपस्थिति पक्का गर्नुहोस्",
      yourName: "तपाईंको नाम*",
      phone: "फोन नम्बर",
      attendYes: "खुसीसाथ उपस्थित हुनेछु",
      attendNo: "दुःखका साथ उपस्थित हुन सक्दिनँ",
      guests1: "१ जना", guests2: "२ जना", guests3: "३ जना", guests4: "४ जना", guests5: "५+ जना",
      confirm: "पक्का गर्नुहोस्",
      guestbookTitle: "शुभकामना",
      enterName: "तपाईंको नाम*",
      nameHidden: "नाम गोप्य",
      anonymous: "यो शुभकामना गोप्य रूपमा पठाउनुहोस्",
      enterWishes: "तपाईंको शुभकामना लेख्नुहोस्*",
      sendWishes: "शुभकामना पठाउनुहोस्",
      sending: "पठाउँदै…",
      failed: "माफ गर्नुहोस्, पठाउन सकिएन। कृपया फेरि प्रयास गर्नुहोस्।",
      thanksYes: "धन्यवाद, {name}! तपाईंसँग खुसी साट्न हामी उत्साहित छौँ।",
      thanksNo: "धन्यवाद, {name}। हामीले तपाईंलाई सम्झनेछौँ!",
      thanksWish: "तपाईंको शुभकामनाको लागि धन्यवाद!",
      noWishes: "अहिलेसम्म कुनै शुभकामना छैन। पहिलो तपाईं हुनुहोस्!",
      wellWisher: "एक शुभचिन्तक",
      shareTitle: "तपाईंका क्षणहरू साझा गर्नुहोस्",
      shareText: "उत्सवमा खिचेका तस्बिरहरू हाम्रो साझा एल्बममा थप्न कोड स्क्यान गर्नुहोस्।",
      scanLabel: "तस्बिर साझा गर्न स्क्यान गर्नुहोस्",
      sharePhoto: "तस्बिर पठाउनुहोस्",
      qrAlt: "अतिथि तस्बिर पृष्ठको क्यूआर कोड",
      playMusic: "सङ्गीत बजाउनुहोस्",
      pauseMusic: "सङ्गीत रोक्नुहोस्",
      music: "सङ्गीत",
      language: "भाषा",
      photosIntro: "तस्बिर खिच्नुहोस् वा ग्यालरीबाट छान्नुहोस्। सबै तस्बिर दुलाहा–दुलहीको साझा एल्बममा जम्मा हुन्छन्।",
      yourNameOpt: "तपाईंको नाम (ऐच्छिक)",
      takePhoto: "फोटो खिच्नुहोस्",
      chooseGallery: "ग्यालरीबाट छान्नुहोस्",
      album: "एल्बम",
      back: "← निमन्त्रणामा फर्कनुहोस्",
      uploading: "{total} मध्ये {n} अपलोड हुँदैछ…",
      thanksOnePhoto: "धन्यवाद! तपाईंको तस्बिर थपियो।",
      thanksPhotos: "धन्यवाद! {n} तस्बिर थपिए।",
      photoFailed: "माफ गर्नुहोस्, एउटा तस्बिर पठाउन सकिएन। कृपया फेरि प्रयास गर्नुहोस्।",
      noPhotos: "अहिलेसम्म कुनै तस्बिर छैन। पहिलो तपाईं पठाउनुहोस्!",
      photosOff: "तस्बिर साझा गर्ने सुविधा अहिले उपलब्ध छैन।",
      guestPhotoAlt: "अतिथिले पठाएको तस्बिर",
    },
  };

  const KEY = "wedding-lang";
  const valid = (l) => l === "en" || l === "ne";
  let lang = "en";
  try {
    const saved = localStorage.getItem(KEY);
    lang = valid(saved) ? saved : (navigator.language || "").toLowerCase().startsWith("ne") ? "ne" : "en";
  } catch (e) {
    /* storage blocked: stay on the default */
  }

  const DEVANAGARI = "०१२३४५६७८९";
  const api = {
    get: () => lang,
    // Text for a key, with {placeholders} filled in.
    t: (key, vars = {}) =>
      String((UI[lang] && UI[lang][key]) ?? UI.en[key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? ""),
    // Digits in the current script (٣ → ३ in Nepali).
    num: (value) => (lang === "ne" ? String(value).replace(/\d/g, (d) => DEVANAGARI[d]) : String(value)),
    set(next) {
      if (!valid(next) || next === lang) return;
      lang = next;
      try { localStorage.setItem(KEY, lang); } catch (e) { /* ignore */ }
      apply();
      document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
    },
  };
  window.LANG = api;

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((n) => { n.textContent = api.t(n.dataset.i18n); });
    document.querySelectorAll("[data-i18n-ph]").forEach((n) => { n.placeholder = api.t(n.dataset.i18nPh); });
    document.querySelectorAll("[data-i18n-aria]").forEach((n) => { n.setAttribute("aria-label", api.t(n.dataset.i18nAria)); });
    document.querySelectorAll("[data-i18n-alt]").forEach((n) => { n.alt = api.t(n.dataset.i18nAlt); });
    document.querySelectorAll(".lang-toggle button").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
  }

  // Toggle button, added to every page.
  const toggle = document.createElement("div");
  toggle.className = "lang-toggle";
  toggle.setAttribute("role", "group");
  toggle.setAttribute("aria-label", "Language / भाषा");
  [["en", "EN"], ["ne", "नेपाली"]].forEach(([code, label]) => {
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.lang = code;
    b.textContent = label;
    b.addEventListener("click", () => api.set(code));
    toggle.append(b);
  });
  document.body.append(toggle);
  apply();
})();
