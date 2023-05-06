
const footerNav = document.querySelector(".footer-nav");
const clonedNav = footerNav.cloneNode(true);
const burgerIcon = document.querySelector(".menu-icon");

clonedNav.classList.add("cloned-nav");
document.body.appendChild(clonedNav);

let isMenuOpen = false;

function openMenu() {
  isMenuOpen = true;
  clonedNav.classList.add("is-open");
  const burgerIconRect = burgerIcon.getBoundingClientRect();
  const clonedNavRect = clonedNav.getBoundingClientRect();
  const clonedNavBottom = window.innerHeight - burgerIconRect.bottom;
  const clonedNavRight = window.innerWidth - burgerIconRect.right;

  clonedNav.style.bottom = `${clonedNavBottom}px`;
  clonedNav.style.right = `${clonedNavRight}px`;
}

function closeMenu() {
  isMenuOpen = false;
  clonedNav.classList.remove("is-open");
}

burgerIcon.addEventListener("click", function (event) {
  event.stopPropagation();
  if (!isMenuOpen) {
    openMenu();
  } else {
    closeMenu();
  }
});

document.addEventListener("click", function (event) {
  if (isMenuOpen && !clonedNav.contains(event.target)) {
    closeMenu();
  }
});
