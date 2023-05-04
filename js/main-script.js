const originalNav = document.querySelector(".main-navigation");
const clonedNav = originalNav.cloneNode(true);
const footer = document.querySelector(".footer");
footer.parentNode.insertBefore(clonedNav, footer.nextSibling);

const burgerIcon = document.getElementById("burger-icon");
const flyInMenu = document.querySelector(".fly-in-menu");

burgerIcon.addEventListener("click", () => {
  flyInMenu.classList.toggle("active");
});

