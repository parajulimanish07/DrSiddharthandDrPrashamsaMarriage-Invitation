(function () {
  const W = window.WEDDING;
  const $ = (sel) => document.querySelector(sel);
  const MAX_SIDE = 1600;

  if (!W.backendUrl) {
    $("#noBackend").hidden = false;
    return;
  }
  $("#uploadCard").hidden = false;
  $("#albumTitle").hidden = false;

  const status = $("#uploadStatus");
  const grid = $("#photoGrid");

  // ── Shrink the photo before uploading (phone photos are 3–8 MB) ──
  const toJpegBase64 = async (file) => {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const addThumb = (id, prepend) => {
    const link = document.createElement("a");
    link.href = `https://drive.google.com/file/d/${id}/view`;
    link.target = "_blank";
    link.rel = "noopener";
    const img = document.createElement("img");
    img.src = `https://drive.google.com/thumbnail?id=${id}&sz=w400`;
    img.alt = "Photo shared by a guest";
    img.loading = "lazy";
    link.append(img);
    grid.querySelector(".photos-empty")?.remove();
    prepend ? grid.prepend(link) : grid.append(link);
  };

  const upload = async (files) => {
    const list = [...files];
    let done = 0;
    for (const file of list) {
      status.textContent = `Uploading ${done + 1} of ${list.length}…`;
      try {
        const image = await toJpegBase64(file);
        const res = await fetch(W.backendUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids a CORS preflight
          body: JSON.stringify({ type: "photo", name: $("#guestName").value, image }),
        });
        const json = await res.json();
        if (!json.ok) throw new Error(json.error || "Failed");
        addThumb(json.id, true);
        done++;
      } catch (err) {
        status.textContent = "Sorry, a photo didn't go through. Please try again.";
        return;
      }
    }
    status.textContent = done === 1 ? "Thank you! Your photo was added." : `Thank you! ${done} photos were added.`;
  };

  ["#cameraInput", "#galleryInput"].forEach((sel) => {
    const input = $(sel);
    input.addEventListener("change", () => {
      if (input.files.length) upload(input.files).finally(() => { input.value = ""; });
    });
  });

  // ── Existing album ──
  fetch(`${W.backendUrl}?type=photos`)
    .then((r) => r.json())
    .then((json) => {
      (json.photos || []).forEach((id) => addThumb(id, false));
      if (!grid.children.length) throw new Error("empty");
    })
    .catch(() => {
      if (!grid.children.length) {
        const p = document.createElement("p");
        p.className = "photos-empty";
        p.textContent = "No photos yet. Be the first to share one!";
        grid.append(p);
      }
    });
})();
