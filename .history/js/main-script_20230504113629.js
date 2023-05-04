const burgerIcon = document.getElementById("burger-icon");

burgerIcon.addEventListener("click", () => {
  navMenu.classList.toggle("hide");
  burgerNavMenu.classList.toggle("show-nav");
});
