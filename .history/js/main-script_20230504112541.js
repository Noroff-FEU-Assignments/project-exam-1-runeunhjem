const burgerIcon = document.getElementById("burger-icon");
const navMenu = document.querySelector(".main-navigation");
const burgerNavMenu = document.querySelector(".burger-navigation");

burgerIcon.addEventListener("click", () => {
  navMenu.classList.toggle("hide");
  burgerNavMenu.classList.toggle("show");
});
