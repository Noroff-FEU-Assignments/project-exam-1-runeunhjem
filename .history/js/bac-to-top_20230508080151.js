const backToTopButtn = document.querySelector(".to-top-btn");

function toTopButton() {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 800) {
      toTopBtn.classList.add("active");
    } else {
      toTopBtn.classList.remove("active");
    }
  });
}

export { toTopButton };
