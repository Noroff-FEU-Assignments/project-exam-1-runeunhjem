const backToTopButton = document.querySelector(".back-to-top-button");

function toTopButton() {
  window.addEventListener("scroll", () => {
    const desktopOffset = 500;
    const mobileOffset = 300;
    const pageYOffset = window.pageYOffset;
    const offset = window.innerWidth >= 768 ? desktopOffset : mobileOffset; // use desktop offset on screens larger than 768px, mobile offset otherwise

    if (pageYOffset > offset) {
      backToTopButton.classList.add("back-to-top-button-show");
    } else {
      backToTopButton.classList.remove("back-to-top-button-show");
    }
  });
}

export { toTopButton };
