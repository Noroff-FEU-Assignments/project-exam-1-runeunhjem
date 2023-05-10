function checkScrollHorizontal() {
  const carousel = document.getElementById("carousel-home");
  const indicator = document.querySelector(".carousel-indicator");
  const leftButton = document.querySelector(".carousel-left");
  const rightButton = document.querySelector(".carousel-right");

  carousel.addEventListener("scroll", () => {
    if (carousel.scrollLeft > 0) {
      indicator.classList.add("hide");
      leftButton.classList.add("hide");
      rightButton.classList.add("hide");
    } else {
      indicator.classList.remove("hide");
      leftButton.classList.remove("hide");
      rightButton.classList.remove("hide");
    };
  });
};

export { checkScrollHorizontal };
