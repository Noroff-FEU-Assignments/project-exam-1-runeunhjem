const burgerIcon = document.getElementById("burger-icon");
const navMenu = document.querySelector(".main-navigation");

burgerIcon.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});
