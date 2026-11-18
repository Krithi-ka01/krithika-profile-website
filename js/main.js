/* Main interactions: responsive menu, persisted theme, hover/tap family cards and non-looping gallery. */
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const themeToggle = document.getElementById("theme-toggle");
  const currentYear = document.getElementById("current-year");

  if (currentYear) currentYear.textContent = new Date().getFullYear();

  // Restore the visitor's last selected theme.
  let savedTheme = "light";
  try { savedTheme = localStorage.getItem("krithika-portfolio-theme") || "light"; } catch (error) {}
  root.dataset.theme = savedTheme === "dark" ? "dark" : "light";

  function updateThemeButton() {
    const isDark = root.dataset.theme === "dark";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.setAttribute("aria-pressed", String(isDark));
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#242522" : "#fff8dc");
  }
  updateThemeButton();

  themeToggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("krithika-portfolio-theme", root.dataset.theme); } catch (error) {}
    updateThemeButton();
  });

  // Mobile navigation.
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Reveal content as it enters the viewport.
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }

  // Desktop cards flip with hover/focus. On touch devices, tap toggles the card.
  const touchMode = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  document.querySelectorAll(".family-card").forEach((card) => {
    if (touchMode) {
      card.addEventListener("click", () => {
        const flipped = card.classList.toggle("is-flipped");
        card.setAttribute("aria-pressed", String(flipped));
      });
    } else {
      card.addEventListener("mouseenter", () => card.setAttribute("aria-pressed", "true"));
      card.addEventListener("mouseleave", () => card.setAttribute("aria-pressed", "false"));
      card.addEventListener("focus", () => card.setAttribute("aria-pressed", "true"));
      card.addEventListener("blur", () => card.setAttribute("aria-pressed", "false"));
    }
  });

  // Gallery uses the five supplied sketches in their original order.
  const sketches = [
    { src: "images/hobbies/sketch-01.jpg", name: "Anime", alt: "Anime pencil drawing by Krithika" },
    { src: "images/hobbies/sketch-02.jpg", name: "Fox pencil portrait", alt: "Fox pencil portrait drawn by Krithika" },
    { src: "images/hobbies/sketch-03.jpg", name: "Butterfly", alt: "Butterfly pencil drawing by Krithika" },
    { src: "images/hobbies/sketch-04.jpg", name: "Chibi", alt: "Chibi character pencil drawing by Krithika" },
    { src: "images/hobbies/sketch-05.jpg", name: "Big Tusker", alt: "Big Tusker elephant pencil drawing by Krithika" }
  ];
  const sketchImage = document.getElementById("sketch-image");
  const sketchCaption = document.getElementById("sketch-caption");
  const galleryPosition = document.getElementById("gallery-position");
  const dots = Array.from(document.querySelectorAll(".gallery-dot"));
  const previous = document.getElementById("gallery-prev");
  const next = document.getElementById("gallery-next");
  let current = 0;

  function showSketch(index) {
    current = Math.max(0, Math.min(index, sketches.length - 1));
    const sketch = sketches[current];
    sketchImage.src = sketch.src;
    sketchImage.alt = sketch.alt;
    sketchCaption.textContent = sketch.name;
    galleryPosition.textContent = `${current + 1} of ${sketches.length}`;
    previous.disabled = current === 0;
    next.disabled = current === sketches.length - 1;
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === current;
      dot.classList.toggle("active", active);
      if (active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  previous.addEventListener("click", () => showSketch(current - 1));
  next.addEventListener("click", () => showSketch(current + 1));
  dots.forEach((dot) => dot.addEventListener("click", () => showSketch(Number(dot.dataset.index))));
  document.addEventListener("keydown", (event) => {
    const gallery = document.getElementById("sketch-gallery");
    const rect = gallery.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;
    if (event.key === "ArrowLeft") showSketch(current - 1);
    if (event.key === "ArrowRight") showSketch(current + 1);
  });
  showSketch(0);
});
