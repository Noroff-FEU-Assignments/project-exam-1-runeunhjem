const backToTopButton = document.querySelector(".to-top-btn");

function toTopButton() {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 800) {
      backToTopButton.classList.add("active");
    } else {
      backToTopButton.classList.remove("active");
    }
  });
}

export { toTopButton };
