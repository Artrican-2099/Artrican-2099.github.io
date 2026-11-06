document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");

  /* ---------- Mobile menu ---------- */
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  window.matchMedia("(min-width: 761px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

  /* ---------- Header border on scroll ---------- */
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Active nav link ---------- */
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Project videos ----------
     Desktop (hover-capable): play on hover.
     Touch devices: autoplay while the card is on screen, tap to pause/play. */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  document.querySelectorAll(".project").forEach((card) => {
    const video = card.querySelector("video");
    if (!video) return;

    const play = () => {
      video.preload = "auto";
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
      card.classList.add("is-playing");
    };
    const pause = () => { video.pause(); card.classList.remove("is-playing"); };

    if (canHover) {
      card.addEventListener("mouseenter", play);
      card.addEventListener("mouseleave", () => { pause(); video.currentTime = 0; });
    } else {
      let userPaused = false;
      card.querySelector(".project-media").addEventListener("click", () => {
        if (video.paused) { userPaused = false; play(); } else { userPaused = true; pause(); }
      });
      if (!reduceMotion && "IntersectionObserver" in window) {
        new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting && !userPaused) play(); else pause();
        }, { threshold: 0.6 }).observe(video);
      }
    }
  });

  /* ---------- Contact form (opens the visitor's email app) ---------- */
  const form = document.getElementById("contact-form");
  const note = form.querySelector(".form-note");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll("input, textarea").forEach((field) => {
      const valid = field.checkValidity() && field.value.trim() !== "";
      field.classList.toggle("invalid", !valid);
      if (!valid) ok = false;
    });
    if (!ok) { note.textContent = "Please fill in all fields with a valid email."; return; }

    const { name, email, message } = Object.fromEntries(new FormData(form));
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:lnbmaimbo@gmail.com?subject=${subject}&body=${body}`;
    note.textContent = "Opening your email app…";
  });

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});
