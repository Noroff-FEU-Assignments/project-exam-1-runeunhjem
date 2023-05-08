function startCarousel() {
  const rightButton = document.querySelector(".carousel-right");
  const maxPosition = Math.ceil((posts.length - postsPerSlide) / postsPerSlide);

  setInterval(() => {
    if (currentPosition < maxPosition) {
      currentPosition++;
      postContainer.style.transform = `translateX(-${currentPosition * cardWidthClick * postsPerSlide}px)`;
      const currentSlideElement = document.getElementById("current-slide");
      currentSlideElement.textContent = currentPosition + 1;
    } else {
      currentPosition = 0;
      postContainer.style.transform = `translateX(0)`;
      const currentSlideElement = document.getElementById("current-slide");
      currentSlideElement.textContent = 1;
    }
  }, 5000);

  rightButton.addEventListener("click", () => {
    if (currentPosition < maxPosition) {
      currentPosition++;
      postContainer.style.transform = `translateX(-${currentPosition * cardWidthClick * postsPerSlide}px)`;

      const currentSlideElement = document.getElementById("current-slide");
      currentSlideElement.textContent = currentPosition + 1;
    } else {
      currentPosition = 0;
      postContainer.style.transform = `translateX(0)`;

      const currentSlideElement = document.getElementById("current-slide");
      currentSlideElement.textContent = 1;
    }
  });
}

export { startCarousel };
