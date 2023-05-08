const backToTopButton = document.querySelector(".back-to-top-button");

function toTopButton() {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 500) {
      backToTopButton.classList.add(".show-button");
    } else {
      backToTopButton.classList.remove("back-to-top-button-show");
    }
  });
}
console.log(backToTopButton.classList);
export { toTopButton };
