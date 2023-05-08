const backToTopButton = document.querySelector(".back-to-top-button");
console.log(backToTopButton);
function toTopButton() {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      backToTopButton.classList.add("back-to-top-button-show");
    } else {
      backToTopButton.classList.remove("back-to-top-button-show");
    }
  });
}

export { toTopButton };
