let intervalID = null;

function moveCarouselRight() {
  const maxPosition = Math.ceil((posts.length - postsPerSlide) / postsPerSlide);
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
}

intervalID = setInterval(moveCarouselRight, 5000);

rightButton.addEventListener("click", () => {
  clearInterval(intervalID);
  // rest of the code to move carousel to the right when clicked
});
