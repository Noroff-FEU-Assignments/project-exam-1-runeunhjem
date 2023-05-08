const backToTopButton = document.querySelector(".back-to-top-button");

function toTopButton() {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 500) {
      backToTopButton.classList.add("show-button");
    } else {
      backToTopButton.classList.remove("show-button");
    }
  });
}
console.log(backToTopButton.classList);
export { toTopButton };
