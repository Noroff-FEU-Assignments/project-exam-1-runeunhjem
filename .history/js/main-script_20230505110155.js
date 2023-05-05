const footerNav = document.querySelector(".footer-nav");
const clonedNav = footerNav.cloneNode(true);

clonedNav.classList.add("cloned-nav");
document.body.appendChild(clonedNav);

const burgerIcon = document.querySelector(".menu-icon");
const clonedNavHeight = clonedNav.getBoundingClientRect().height;

burgerIcon.addEventListener("click", function () {
  const burgerIconRect = burgerIcon.getBoundingClientRect();
  const burgerIconTop = burgerIconRect.top + burgerIconRect.height;
  const clonedNavTop = Math.min(burgerIconTop, window.innerHeight - clonedNavHeight);

  clonedNav.style.top = clonedNavTop + "px";
  clonedNav.classList.toggle("is-open");
});
