const backToTopButton = document.querySelector(".to-top-btn");

function toTopButton() {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 600) {
      backToTopButton.classList.add("back-to-top-button-show");
    } else {
      backToTopButton.classList.remove("back-to-top-button-show");
    }
  });
}

export { toTopButton };
