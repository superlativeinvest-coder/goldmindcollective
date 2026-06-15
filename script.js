const header = document.querySelector("[data-header]");
const menuWrap = document.querySelector(".menu-wrap");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menuPanel = document.querySelector("[data-menu-panel]");
const nextButtons = document.querySelectorAll("[data-scroll-row]");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (menuWrap && menuToggle && menuPanel) {
  const closeMenu = () => {
    menuWrap.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuWrap.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menuPanel.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!menuWrap.classList.contains("is-open")) return;
    if (menuWrap.contains(event.target)) return;

    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const row = document.getElementById(button.dataset.scrollRow);
    if (!row) return;

    const card = row.querySelector("article");
    const distance = card ? card.getBoundingClientRect().width + 16 : 320;

    row.scrollBy({
      left: distance,
      behavior: "smooth",
    });
  });
});
