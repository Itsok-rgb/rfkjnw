(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* --- Modal letter --- */
  const letterModal = $("#letterModal");
  const openLetterBtn = $("#openLetterBtn");

  function openModal() {
    letterModal.hidden = false;
    document.body.style.overflow = "hidden";
    $("#vaultInput", letterModal)?.blur();
  }

  function closeModal() {
    letterModal.hidden = true;
    document.body.style.overflow = "";
  }

  openLetterBtn?.addEventListener("click", openModal);
  letterModal?.addEventListener("click", (e) => {
    if (e.target.matches("[data-close-modal]")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && letterModal && !letterModal.hidden) closeModal();
  });

  /* --- Tap hero name 3x --- */
  const heroTitle = $(".hero__title");
  const secretToast = $("#secretToast");
  let nameTaps = 0;
  let nameTapTimer = null;

  function showToast() {
    if (!secretToast) return;
    secretToast.hidden = false;
    secretToast.classList.add("is-on");
    window.setTimeout(() => {
      secretToast.classList.remove("is-on");
      window.setTimeout(() => {
        secretToast.hidden = true;
      }, 500);
    }, 3800);
  }

  heroTitle?.addEventListener("click", () => {
    nameTaps += 1;
    window.clearTimeout(nameTapTimer);
    nameTapTimer = window.setTimeout(() => {
      nameTaps = 0;
    }, 900);
    if (nameTaps >= 3) {
      nameTaps = 0;
      burstConfetti(40);
      showToast();
    }
  });

  /* --- Timeline accordion + scroll reveal --- */
  const timelineItems = $$(".timeline__item[data-reveal]");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) en.target.classList.add("is-visible");
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  timelineItems.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 0.06, 0.4)}s`;
    io.observe(el);
  });

  $$(".timeline__star").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const panelId = btn.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      if (!panel) return;
      btn.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
      if (!expanded) {
        burstConfetti(12);
        panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  });

  /* --- Vault password --- */
  const vaultForm = $("#vaultForm");
  const vaultInput = $("#vaultInput");
  const vaultSecret = $("#vaultSecret");

  vaultForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = (vaultInput?.value || "").trim().toLowerCase();
    const ok = val === "jaan" || val === "my jaan" || val === "myjaan";
    if (ok && vaultSecret) {
      vaultSecret.hidden = false;
      burstConfetti(55);
      vaultInput.value = "";
    } else {
      vaultInput?.animate(
        [{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(0)" }],
        { duration: 280 }
      );
    }
  });

  /* --- Mini envelopes: toggle one-liners --- */
  const envBtns = $$("[data-env]");

  function closeOtherEnvelopes(exceptBtn) {
    envBtns.forEach((b) => {
      if (b === exceptBtn) return;
      const id = b.getAttribute("aria-controls");
      const note = id ? document.getElementById(id) : null;
      b.setAttribute("aria-expanded", "false");
      if (note) note.hidden = true;
    });
  }

  envBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const panelId = btn.getAttribute("aria-controls");
      const note = panelId ? document.getElementById(panelId) : null;
      if (!note) return;

      if (expanded) {
        btn.setAttribute("aria-expanded", "false");
        note.hidden = true;
      } else {
        closeOtherEnvelopes(btn);
        btn.setAttribute("aria-expanded", "true");
        note.hidden = false;
        burstConfetti(18);
        note.animate(
          [{ transform: "scale(0.94)", opacity: 0.6 }, { transform: "scale(1)", opacity: 1 }],
          { duration: 320, easing: "cubic-bezier(0.34, 1.35, 0.64, 1)" }
        );
      }
    });
  });

  /* --- Ambient rising floaties --- */
  const floatyRoot = $("#floaties");
  const FLOATY_CHARS = ["✨", "♥", "·", "✦", "～", "💗", "🌸", "⭐", "☾"];

  function spawnFloaty() {
    if (!floatyRoot || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = document.createElement("span");
    el.className = "floaty";
    el.textContent = FLOATY_CHARS[Math.floor(Math.random() * FLOATY_CHARS.length)];
    el.style.left = `${8 + Math.random() * 84}%`;
    const dur = 12 + Math.random() * 10;
    el.style.animationDuration = `${dur}s`;
    el.style.animationDelay = `${Math.random() * 2}s`;
    floatyRoot.appendChild(el);
    window.setTimeout(() => el.remove(), (dur + 2) * 1000);
  }

  window.setInterval(spawnFloaty, 2400);
  for (let i = 0; i < 4; i++) window.setTimeout(spawnFloaty, i * 400);

  /* --- Heart hold 2s --- */
  const heartLock = $("#heartLock");
  const heartFill = $("#heartFill");
  const heartMessage = $("#heartMessage");
  let holdStart = 0;
  let raf = 0;

  function cancelHold() {
    window.cancelAnimationFrame(raf);
    holdStart = 0;
    if (heartFill) heartFill.style.setProperty("--hold", "0%");
    heartLock?.classList.remove("is-holding");
  }

  function tick() {
    if (!holdStart || !heartFill) return;
    const elapsed = performance.now() - holdStart;
    const p = Math.min(100, (elapsed / 2000) * 100);
    heartFill.style.setProperty("--hold", `${p}%`);
    if (p >= 100) {
      cancelHold();
      if (heartMessage) {
        heartMessage.hidden = false;
        burstConfetti(70);
      }
      return;
    }
    raf = window.requestAnimationFrame(tick);
  }

  heartLock?.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    heartLock.classList.add("is-holding");
    holdStart = performance.now();
    raf = window.requestAnimationFrame(tick);
  });
  ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => heartLock?.addEventListener(ev, cancelHold));

  /* --- Footer moon 5 taps --- */
  const footer = $(".footer");
  let moonTaps = 0;
  const footerName = $("#footerName");
  if (footerName && !$("#footerMoon")) {
    const moonSpan = document.createElement("span");
    moonSpan.className = "moon";
    moonSpan.id = "footerMoon";
    moonSpan.setAttribute("role", "img");
    moonSpan.setAttribute("aria-label", "moon");
    moonSpan.textContent = " 🌙";
    footerName.insertAdjacentElement("afterend", moonSpan);
  }
  const moon = $("#footerMoon");
  moon?.addEventListener("click", () => {
    moon.classList.remove("is-spin");
    void moon.offsetWidth;
    moon.classList.add("is-spin");
    moonTaps += 1;
    if (moonTaps >= 5) {
      moonTaps = 0;
      burstConfetti(100);
      const msg = document.createElement("p");
      msg.className = "footer__egg";
      msg.style.color = "var(--gold)";
      msg.style.opacity = "0.9";
      msg.textContent = "You lit up the whole sky, Jaan. I love you to the moon and past it. 🌙✨";
      footer?.appendChild(msg);
    }
  });

  /* --- Confetti canvas --- */
  const canvas = $("#fxCanvas");
  const ctx = canvas?.getContext("2d");
  let parts = [];
  let animating = false;

  function resizeCanvas() {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function burstConfetti(n) {
    if (!ctx || !canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cx = w * 0.5;
    const cy = h * 0.35;
    for (let i = 0; i < n; i++) {
      const ang = Math.random() * Math.PI * 2;
      const sp = 3 + Math.random() * 6;
      parts.push({
        x: cx,
        y: cy,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp - 2,
        g: 0.12 + Math.random() * 0.08,
        life: 80 + Math.random() * 50,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.25,
        col: ["#e8a0bf", "#f3d2a1", "#fff5f8", "#c76b8f", "#ffd6e8"][Math.floor(Math.random() * 5)],
        sz: 4 + Math.random() * 5,
      });
    }
    if (!animating) {
      animating = true;
      loop();
    }
  }

  function loop() {
    if (!ctx || !canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);
    parts = parts.filter((p) => {
      p.life -= 1;
      if (p.life <= 0) return false;
      p.vy += p.g;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.col;
      ctx.globalAlpha = Math.min(1, p.life / 40);
      ctx.fillRect(-p.sz / 2, -p.sz / 2, p.sz, p.sz * 0.6);
      ctx.restore();
      return true;
    });
    if (parts.length) {
      window.requestAnimationFrame(loop);
    } else {
      animating = false;
      ctx.clearRect(0, 0, w, h);
    }
  }

  $("#confettiFab")?.addEventListener("click", () => burstConfetti(45));

  /* --- Tap hearts (skip interactive controls + envelopes) --- */
  document.body.addEventListener(
    "click",
    (e) => {
      if (e.target.closest("button,a,input,textarea,.modal__panel,.timeline__star,[data-env]")) return;
      spawnHeart(e.clientX, e.clientY);
    },
    { capture: true }
  );

  function spawnHeart(x, y) {
    const el = document.createElement("span");
    el.textContent = ["♥", "💗", "✨"][Math.floor(Math.random() * 3)];
    el.setAttribute("aria-hidden", "true");
    el.style.position = "fixed";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.pointerEvents = "none";
    el.style.zIndex = "30";
    el.style.fontSize = `${14 + Math.random() * 16}px`;
    el.style.transform = "translate(-50%, -50%) scale(0.6)";
    el.style.opacity = "0.95";
    el.style.transition = "transform 0.9s ease, opacity 0.9s ease, top 0.9s ease";
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transform = `translate(-50%, -50%) scale(1.2) translate(${(Math.random() - 0.5) * 40}px, -80px)`;
      el.style.opacity = "0";
    });
    window.setTimeout(() => el.remove(), 950);
  }
})();
