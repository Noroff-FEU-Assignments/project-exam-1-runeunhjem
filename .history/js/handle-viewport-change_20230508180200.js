function handleViewportChange() {
  console.log("viewportWidth is: ", viewportWidth);

  if (viewportWidth < 768) {
    postsPerSlide = 1;
  } else if (viewportWidth < 1160 && viewportWidth >= 768) {
    postsPerSlide = 2;
  } else if (viewportWidth < 1536 && viewportWidth >= 1160) {
    postsPerSlide = 3;
  } else {
    postsPerSlide = 4;
  }

  const totalSlides = Math.ceil(posts.length / postsPerSlide);
  console.log("totalSlides is: ", totalSlides);
  const totalSlidesElement = document.getElementById("total-slides");
  totalSlidesElement.textContent = totalSlides;

  const currentSlideElement = document.getElementById("current-slide");
  currentSlideElement.textContent = currentPosition + 1;
}

export { handleViewportChange };