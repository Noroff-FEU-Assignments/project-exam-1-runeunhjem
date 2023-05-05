const clonedNav = document.querySelector(".cloned-nav");
const burgerIcon = document.querySelector("#menu-icon");

burgerIcon.addEventListener("click", function () {
  const burgerIconRect = burgerIcon.getBoundingClientRect();
  const burgerIconTop = burgerIconRect.top + burgerIconRect.height;
  const clonedNavTop = burgerIconTop;

  clonedNav.style.top = clonedNavTop + "px";
  clonedNav.style.right = burgerIconRect.right + "px";
  clonedNav.classList.toggle("is-open");
});
