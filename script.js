(function () {
  const W = window.WEDDING;
  const L = window.LANG;
  const $ = (sel) => document.querySelector(sel);

  const el = (tag, attrs = {}, text) => {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    if (text !== undefined) node.textContent = text;
    return node;
  };

  // Content in the current language: config.js with the `ne` block laid over it when Nepali is chosen.
  const merge = (base, over) => {
    if (Array.isArray(over) || typeof over !== "object" || over === null) return over;
    const out = { ...base };
    Object.keys(over).forEach((k) => { out[k] = merge(base ? base[k] : undefined, over[k]); });
    return out;
  };
  const content = () => (L.get() === "ne" && W.ne ? merge(W, W.ne) : W);
  const firstLetter = (text) => {
    const first = typeof Intl !== "undefined" && Intl.Segmenter
      ? [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text)][0]
      : null;
    return first ? first.segment : text.charAt(0);
  };

  // The date itself never changes, so calendar maths always uses the English config.
  const E = W.ceremony;
  const eventDate = new Date(E.start);
  const year = Number(E.year);
  const monthIdx = new Date(`${E.month} 1, ${year}`).getMonth();
  const dayNum = Number(E.day);
  const toUtcStamp = (iso) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const icsEscape = (text) => text.replace(/([,;\\])/g, "\\$1");

  let C = content();
  let calTitle = "";
  let details = "";
  let location = "";

  // ── Everything that depends on the language ─────
  const render = () => {
    C = content();
    const R = C.ceremony;

    const bindings = {
      groomName: C.groom.name,
      brideName: C.bride.name,
      groomShort: C.groom.shortName,
      brideShort: C.bride.shortName,
      groomInitial: firstLetter(C.groom.shortName),
      brideInitial: firstLetter(C.bride.shortName),
      coupleShort: `${C.groom.shortName} & ${C.bride.shortName}`,
      blessingNepali: C.blessing.nepali,
      blessingEnglish: C.blessing.english,
      blessingMessage: C.blessing.message,
      blessingClosing: C.blessing.closing,
      blessingSignoff: C.blessing.signoff,
      dateLine: `${R.weekday} · ${L.num(Number(R.day))} ${R.month} ${L.num(R.year)}`,
      time: R.time,
      timeLabel: R.timeLabel,
      ceremonySubtitle: R.subtitle,
      ceremonyDescription: R.description,
      nepaliDate: R.nepaliDate,
      weekday: R.weekday,
      day: L.num(R.day),
      monthYear: `${R.month} ${L.num(R.year)}`,
      venue: R.venue,
      address: R.address,
      venueFull: `${R.venue}, ${R.address}`,
      closingLine: C.closingLine,
      hashtag: C.hashtag,
    };
    document.querySelectorAll("[data-bind]").forEach((node) => {
      node.textContent = bindings[node.dataset.bind] || "";
    });

    // Families
    [["#groomFamily", C.groom], ["#brideFamily", C.bride]].forEach(([sel, person]) => {
      const box = $(sel);
      box.replaceChildren(el("p", { class: "eyebrow" }, L.t("withBlessings")));
      person.parents.forEach((p) => box.append(el("p", { class: "parent-name" }, p.replace(/^(Mr|Mrs)\.\s*/, ""))));
      box.append(el("p", { class: "home" }, person.home), el("p", { class: "family-invite" }, person.invite));
    });
    document.querySelectorAll("[data-portrait]").forEach((box) => {
      box.setAttribute("aria-label", C[box.dataset.portrait].name);
    });

    // Calendar
    $("#calTitle").textContent = `${R.month} ${L.num(year)}`;
    const calGrid = $("#calGrid");
    calGrid.replaceChildren();
    const dows = C.weekdaysShort || ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    dows.forEach((d) => calGrid.append(el("span", { class: "dow" }, d)));
    const firstDow = (new Date(year, monthIdx, 1).getDay() + 6) % 7; // Monday first
    const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
    for (let i = 0; i < firstDow; i++) calGrid.append(el("span"));
    for (let d = 1; d <= daysInMonth; d++) {
      calGrid.append(el("span", d === dayNum ? { class: "day wedding-day", title: R.title } : { class: "day" }, L.num(d)));
    }

    // Add to calendar
    calTitle = `${C.groom.shortName} & ${C.bride.shortName} — ${R.title}`;
    location = `${R.venue}, ${R.address}`;
    details = `${C.groom.name} & ${C.bride.name}. ${location}.`;
    $("#gcalBtn").href =
      "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      `&text=${encodeURIComponent(calTitle)}` +
      `&dates=${toUtcStamp(E.start)}/${toUtcStamp(E.end)}` +
      `&details=${encodeURIComponent(details)}` +
      `&location=${encodeURIComponent(location)}`;

    // Forms, countdown and music button
    syncAnonymous();
    renderWishes();
    tick();
    syncMusicBtn();
  };

  $("#icsBtn").addEventListener("click", () => {
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Wedding Invitation//EN",
      "BEGIN:VEVENT",
      `UID:${toUtcStamp(E.start)}-siddhartha-prashamsa@invitation`,
      `DTSTAMP:${toUtcStamp(new Date().toISOString())}`,
      `DTSTART:${toUtcStamp(E.start)}`,
      `DTEND:${toUtcStamp(E.end)}`,
      `SUMMARY:${icsEscape(calTitle)}`,
      `DESCRIPTION:${icsEscape(details)}`,
      `LOCATION:${icsEscape(location)}`,
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const a = el("a", { href: url, download: "siddhartha-prashamsa-wedding.ics" });
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  // ── Images ──────────────────────────────────────
  document.querySelectorAll("[data-portrait]").forEach((box) => {
    const photo = W[box.dataset.portrait].photo;
    const cfg = typeof photo === "string" ? { src: photo } : photo;
    box.style.backgroundImage = `url("${cfg.src}")`;
    box.style.backgroundSize = cfg.zoom || "cover";
    box.style.backgroundPosition = `${cfg.x || "center"} ${cfg.y || "center"}`;
  });
  if (W.couplePhoto) {
    const url = `url("${W.couplePhoto}")`;
    $(".hero-card").style.backgroundImage = url;
    $(".hero-bg").style.backgroundImage = url;
  }

  // ── Venue ───────────────────────────────────────
  $("#directionsBtn").href = E.mapUrl;
  if (E.mapEmbedUrl) {
    $("#mapFrame").src = E.mapEmbedUrl;
    $("#mapWrap").hidden = false;
  }

  // ── Countdown ───────────────────────────────────
  const target = eventDate.getTime();
  const pad = (n) => String(n).padStart(2, "0");
  let timer = null;
  const tick = () => {
    const diff = target - Date.now();
    if (isNaN(diff) || diff <= 0) {
      $("#countdown").hidden = true;
      $("#countdownDone").hidden = false;
      clearInterval(timer);
      return;
    }
    $("#cd-days").textContent = L.num(Math.floor(diff / 86400000));
    $("#cd-hours").textContent = L.num(pad(Math.floor((diff / 3600000) % 24)));
    $("#cd-mins").textContent = L.num(pad(Math.floor((diff / 60000) % 60)));
    $("#cd-secs").textContent = L.num(pad(Math.floor((diff / 1000) % 60)));
  };
  timer = setInterval(tick, 1000);

  // ── RSVP + Guestbook (Google Sheets backend) ────
  const wishName = $("#wishName");
  const wishAnonymous = $("#wishAnonymous");
  const wishList = $("#wishList");
  let wishes = null; // null until the first load finishes

  const syncAnonymous = () => {
    wishName.required = !wishAnonymous.checked;
    wishName.disabled = wishAnonymous.checked;
    wishName.placeholder = L.t(wishAnonymous.checked ? "nameHidden" : "enterName");
  };
  const renderWishes = () => {
    if (wishes === null) return;
    wishList.replaceChildren();
    if (!wishes.length) {
      wishList.append(el("p", { class: "no-wishes" }, L.t("noWishes")));
      return;
    }
    wishes.forEach((w) => {
      const card = el("blockquote", { class: "wish" });
      card.append(el("p", {}, w.message), el("cite", {}, `— ${w.name === "A well-wisher" ? L.t("wellWisher") : w.name}`));
      wishList.append(card);
    });
  };

  if (W.backendUrl) {
    if (W.photosPage) {
      $("#sharePhotos").hidden = false;
      $("#photosBtn").href = W.photosPage;
    }
    $("#rsvp").hidden = false;
    $("#guestbook").hidden = false;

    const send = async (form, type, onDone) => {
      const status = form.querySelector(".form-status");
      const button = form.querySelector("button");
      const data = Object.fromEntries(new FormData(form));
      button.disabled = true;
      status.textContent = L.t("sending");
      try {
        // text/plain avoids a CORS preflight, which Apps Script can't answer.
        const res = await fetch(W.backendUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ type, ...data }),
        });
        const json = await res.json();
        if (!json.ok) throw new Error(json.error || "Failed");
        form.reset();
        syncAnonymous();
        onDone(status, data);
      } catch (err) {
        status.textContent = L.t("failed");
      } finally {
        button.disabled = false;
      }
    };

    const attending = $("#rsvpAttending");
    const guests = $("#rsvpGuests");
    attending.addEventListener("change", () => {
      const coming = attending.value === "yes";
      guests.hidden = !coming;
      guests.disabled = !coming;
    });

    $("#rsvpForm").addEventListener("submit", (e) => {
      e.preventDefault();
      send(e.target, "rsvp", (status, data) => {
        status.textContent = L.t(data.attending === "yes" ? "thanksYes" : "thanksNo", { name: data.name });
      });
    });

    wishAnonymous.addEventListener("change", syncAnonymous);

    const loadWishes = () =>
      fetch(`${W.backendUrl}?type=wishes`)
        .then((r) => r.json())
        .then((json) => { wishes = json.wishes || []; })
        .catch(() => { wishes = []; })
        .then(renderWishes);
    loadWishes();

    $("#wishForm").addEventListener("submit", (e) => {
      e.preventDefault();
      send(e.target, "wish", (status) => {
        status.textContent = L.t("thanksWish");
        loadWishes();
      });
    });
  }

  // ── Music ───────────────────────────────────────
  const audio = $("#bgMusic");
  const musicBtn = $("#musicBtn");
  const syncMusicBtn = () => {
    const on = !audio.paused;
    musicBtn.classList.toggle("playing", on);
    musicBtn.classList.toggle("muted", !on);
    musicBtn.setAttribute("aria-pressed", String(on));
    musicBtn.setAttribute("aria-label", L.t(on ? "pauseMusic" : "playMusic"));
  };
  if (W.music) {
    audio.src = W.music;
    musicBtn.addEventListener("click", () => {
      if (audio.paused) audio.play().catch(() => {});
      else audio.pause();
    });
    audio.addEventListener("play", syncMusicBtn);
    audio.addEventListener("pause", syncMusicBtn);
    if (W.musicCredit) {
      const credit = $("#musicCredit");
      credit.textContent = `${L.t("music")}: ${W.musicCredit}`;
      credit.hidden = false;
    }
  }

  // ── Cover / open invitation ─────────────────────
  $("#openBtn").addEventListener("click", () => {
    $("#cover").classList.add("opened");
    document.body.classList.remove("locked");
    setTimeout(() => $("#cover").remove(), 1100);

    const petals = $("#petals");
    for (let i = 0; i < 28; i++) {
      const petal = el("span", { class: "petal" });
      const size = 8 + Math.random() * 10;
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.width = petal.style.height = `${size}px`;
      petal.style.animationDuration = `${2.5 + Math.random() * 1.8}s`;
      petal.style.animationDelay = `${Math.random() * 0.6}s`;
      petal.style.setProperty("--drift", `${(Math.random() - 0.5) * 120}px`);
      petals.append(petal);
    }
    setTimeout(() => petals.replaceChildren(), 5000);
    if (W.music) {
      musicBtn.hidden = false;
      audio.play().catch(() => {});
    }
  });

  // ── Reveal on scroll ────────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));

  render();
  document.addEventListener("langchange", render);
})();
