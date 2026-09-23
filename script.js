(function () {
  const W = window.WEDDING;
  const R = W.reception;
  const $ = (sel) => document.querySelector(sel);

  const el = (tag, attrs = {}, text) => {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    if (text !== undefined) node.textContent = text;
    return node;
  };

  // ── Text bindings ───────────────────────────────
  const bindings = {
    groomName: W.groom.name,
    brideName: W.bride.name,
    groomShort: W.groom.shortName,
    brideShort: W.bride.shortName,
    groomInitial: W.groom.shortName.charAt(0),
    brideInitial: W.bride.shortName.charAt(0),
    coupleShort: `${W.groom.shortName} & ${W.bride.shortName}`,
    blessingNepali: W.blessing.nepali,
    blessingMessage: W.blessing.message,
    dateLine: `${R.weekday} · ${Number(R.day)} ${R.month} ${R.year}`,
    time: R.time,
    weekday: R.weekday,
    day: R.day,
    monthYear: `${R.month} ${R.year}`,
    venue: R.venue,
    address: R.address,
    venueFull: `${R.venue}, ${R.address}`,
    closingLine: W.closingLine,
    hashtag: W.hashtag,
  };
  document.querySelectorAll("[data-bind]").forEach((node) => {
    node.textContent = bindings[node.dataset.bind] || "";
  });

  // ── Families ────────────────────────────────────
  const renderFamily = (box, person) => {
    box.append(el("p", { class: "eyebrow" }, "Mr. & Mrs."));
    person.parents.forEach((p) => box.append(el("p", { class: "parent-name" }, p.replace(/^(Mr|Mrs)\.\s*/, ""))));
    box.append(el("p", { class: "home" }, person.home));
  };
  renderFamily($("#groomFamily"), W.groom);
  renderFamily($("#brideFamily"), W.bride);

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

  // ── Calendar ────────────────────────────────────
  const eventDate = new Date(R.start);
  const year = Number(R.year);
  const monthIdx = new Date(`${R.month} 1, ${year}`).getMonth();
  const dayNum = Number(R.day);
  $("#calTitle").textContent = `${R.month} ${year}`;
  const calGrid = $("#calGrid");
  ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].forEach((d) => calGrid.append(el("span", { class: "dow" }, d)));
  const firstDow = (new Date(year, monthIdx, 1).getDay() + 6) % 7; // Monday first
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  for (let i = 0; i < firstDow; i++) calGrid.append(el("span"));
  for (let d = 1; d <= daysInMonth; d++) {
    calGrid.append(el("span", d === dayNum ? { class: "day wedding-day", title: "Wedding Reception" } : { class: "day" }, String(d)));
  }

  // Add to calendar
  const toUtcStamp = (iso) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const calTitle = `${W.groom.shortName} & ${W.bride.shortName} — ${R.title}`;
  const location = `${R.venue}, ${R.address}`;
  const details = `The wedding of ${W.groom.name} & ${W.bride.name}. ${location}.`;
  $("#gcalBtn").href =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(calTitle)}` +
    `&dates=${toUtcStamp(R.start)}/${toUtcStamp(R.end)}` +
    `&details=${encodeURIComponent(details)}` +
    `&location=${encodeURIComponent(location)}`;
  $("#icsBtn").addEventListener("click", () => {
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Wedding Invitation//EN",
      "BEGIN:VEVENT",
      `UID:${toUtcStamp(R.start)}-siddhartha-prashamsa@invitation`,
      `DTSTAMP:${toUtcStamp(new Date().toISOString())}`,
      `DTSTART:${toUtcStamp(R.start)}`,
      `DTEND:${toUtcStamp(R.end)}`,
      `SUMMARY:${calTitle}`,
      `DESCRIPTION:${details}`,
      `LOCATION:${location.replace(/,/g, "\\,")}`,
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const a = el("a", { href: url, download: "siddhartha-prashamsa-wedding.ics" });
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  // ── Venue ───────────────────────────────────────
  $("#directionsBtn").href = R.mapUrl;
  if (R.mapEmbedUrl) {
    $("#mapFrame").src = R.mapEmbedUrl;
    $("#mapWrap").hidden = false;
  }

  // ── Gallery + lightbox ──────────────────────────
  const grid = $("#galleryGrid");
  const gallerySection = $("#gallery");
  const lightbox = $("#lightbox");
  gallerySection.hidden = true; // shown once at least one photo loads
  W.gallery.forEach((src) => {
    const img = el("img", { src, alt: "Photo of the couple", loading: "lazy" });
    img.addEventListener("load", () => { gallerySection.hidden = false; });
    img.addEventListener("error", () => img.remove());
    img.addEventListener("click", () => {
      lightbox.querySelector("img").src = src;
      lightbox.hidden = false;
    });
    grid.append(img);
  });
  lightbox.addEventListener("click", (e) => {
    if (e.target.tagName !== "IMG") lightbox.hidden = true;
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") lightbox.hidden = true; });

  // ── Countdown ───────────────────────────────────
  const target = eventDate.getTime();
  const pad = (n) => String(n).padStart(2, "0");
  const tick = () => {
    const diff = target - Date.now();
    if (isNaN(diff) || diff <= 0) {
      $("#countdown").hidden = true;
      $("#countdownDone").hidden = false;
      return false;
    }
    $("#cd-days").textContent = Math.floor(diff / 86400000);
    $("#cd-hours").textContent = pad(Math.floor((diff / 3600000) % 24));
    $("#cd-mins").textContent = pad(Math.floor((diff / 60000) % 60));
    $("#cd-secs").textContent = pad(Math.floor((diff / 1000) % 60));
    return true;
  };
  if (tick()) {
    const timer = setInterval(() => { if (!tick()) clearInterval(timer); }, 1000);
  }

  // ── RSVP + Guestbook (Google Sheets backend) ────
  if (W.backendUrl) {
    $("#rsvp").hidden = false;
    $("#guestbook").hidden = false;

    const send = async (form, type, onDone) => {
      const status = form.querySelector(".form-status");
      const button = form.querySelector("button");
      const data = Object.fromEntries(new FormData(form));
      button.disabled = true;
      status.textContent = "Sending…";
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
        onDone(status, data);
      } catch (err) {
        status.textContent = "Sorry, that didn't go through. Please try again.";
      } finally {
        button.disabled = false;
      }
    };

    $("#rsvpForm").addEventListener("submit", (e) => {
      e.preventDefault();
      send(e.target, "rsvp", (status, data) => {
        status.textContent = data.attending === "yes"
          ? `Thank you, ${data.name}! We can't wait to celebrate with you.`
          : `Thank you, ${data.name}. You'll be missed!`;
      });
    });

    const wishList = $("#wishList");
    const renderWishes = (wishes) => {
      wishList.replaceChildren();
      if (!wishes.length) {
        wishList.append(el("p", { class: "no-wishes" }, "No wishes yet. Be the first!"));
        return;
      }
      wishes.forEach((w) => {
        const card = el("blockquote", { class: "wish" });
        card.append(el("p", {}, w.message), el("cite", {}, `— ${w.name}`));
        wishList.append(card);
      });
    };
    const loadWishes = () =>
      fetch(`${W.backendUrl}?type=wishes`)
        .then((r) => r.json())
        .then((json) => renderWishes(json.wishes || []))
        .catch(() => renderWishes([]));
    loadWishes();

    $("#wishForm").addEventListener("submit", (e) => {
      e.preventDefault();
      send(e.target, "wish", (status) => {
        status.textContent = "Thank you for your lovely wishes!";
        loadWishes();
      });
    });
  }

  // ── Music ───────────────────────────────────────
  const audio = $("#bgMusic");
  const musicBtn = $("#musicBtn");
  if (W.music) {
    audio.src = W.music;
    musicBtn.addEventListener("click", () => {
      if (audio.paused) audio.play().catch(() => {});
      else audio.pause();
    });
    audio.addEventListener("play", () => musicBtn.classList.add("playing"));
    audio.addEventListener("pause", () => musicBtn.classList.remove("playing"));
  }

  // ── Cover / open invitation ─────────────────────
  $("#openBtn").addEventListener("click", () => {
    $("#cover").classList.add("opened");
    document.body.classList.remove("locked");
    setTimeout(() => $("#cover").remove(), 1100);
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
})();
