const footerNav = document.querySelector(".footer-nav");
const clonedNav = footerNav.cloneNode(true);

clonedNav.classList.add("cloned-nav");
document.body.appendChild(clonedNav);

const burgerIcon = document.querySelector(".burger-icon");
const clonedNavHeight = clonedNav.getBoundingClientRect().height;
const clonedNavWidth = clonedNav.getBoundingClientRect().width;

burgerIcon.addEventListener("click", function () {
  const burgerIconRect = burgerIcon.getBoundingClientRect();
  const burgerIconTop = burgerIconRect.top + burgerIconRect.height;
  const burgerIconRight = burgerIconRect.right;
  const clonedNavTop = Math.min(burgerIconTop, window.innerHeight - clonedNavHeight);
  const clonedNavRight = Math.min(burgerIconRight + clonedNavWidth, window.innerWidth);

  clonedNav.style.top = clonedNavTop + "px";
  clonedNav.style.right = window.innerWidth - clonedNavRight + "px";
  clonedNav.classList.toggle("is-open");
});
