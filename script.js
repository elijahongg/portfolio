(() => {
  const root = document.documentElement;
  const button = document.querySelector(".theme");
  const icon = document.querySelector(".icon");
  const label = document.querySelector(".label");
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    const isDark = theme === "dark";

    root.dataset.theme = theme;
    icon.textContent = isDark ? "☀" : "☾";
    label.textContent = isDark ? "Light mode" : "Dark mode";
    button.setAttribute(
      "aria-label",
      `Switch to ${isDark ? "light" : "dark"} mode`,
    );
    themeColor.content = isDark ? "#0b1724" : "#F8FAFC";
  }

  const savedTheme = localStorage.getItem("elijah-portfolio-theme");
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
    .matches
    ? "dark"
    : "light";

  applyTheme(savedTheme || preferredTheme);

  button.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";

    localStorage.setItem("elijah-portfolio-theme", nextTheme);
    applyTheme(nextTheme);
  });

  const revealTargets = document.querySelectorAll(
    "main > section, .projects article, .item, .skillgrid > div",
  );
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

  if ("IntersectionObserver" in window && !motionPreference.matches) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    revealTargets.forEach((target) => {
      target.classList.add("reveal");
      revealObserver.observe(target);
    });
  } else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }
})();


