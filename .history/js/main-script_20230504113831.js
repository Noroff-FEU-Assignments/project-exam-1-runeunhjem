const header = document.querySelector("header");
const burgerIcon = document.getElementById("burger-icon");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 200) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
