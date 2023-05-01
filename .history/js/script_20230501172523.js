import { getPosts, posts } from "./posts.js";

(async function () {
  await getPosts();
  console.log("posts is: ", posts);
  const postsPerPage = 4;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const carousel = document.getElementById("carousel-home");

  for (const post of posts) {
    const postContainer = document.createElement("div");
    postContainer.classList.add("post-container");

    const container = document.createElement("div");
    container.classList.add("post-image-container");
    postContainer.appendChild(container);

    const image = new Image();
    image.onload = function () {
      container.style.backgroundImage = `url(${image.src})`;
    };
    image.src = post.image;

    const title = document.createElement("h2");
    title.classList.add("post-title");
    title.textContent = post.title;
    postContainer.appendChild(title);

    const tagLine = document.createElement("p");
    tagLine.classList.add("post-tagline");
    tagLine.textContent = post.shortDescription;
    postContainer.appendChild(tagLine);

    const tags = document.createElement("p");
    tags.classList.add("post-tags");
    tags.textContent = `Tags: ${post.tags.join(", ")}`;
    postContainer.appendChild(tags);

    const date = new Date(post.date);
    const dateString = `${date.toLocaleString("en-us", { month: "short" })} ${date.getDate()}, ${date.getFullYear()}`;
    const added = document.createElement("p");
    added.classList.add("post-added");
    added.textContent = `Modified: ${dateString}`;
    postContainer.appendChild(added);

    carousel.appendChild(postContainer);
  }
})();

const carouselWrapper = document.querySelector(".carousel-wrapper");

const prevArrow = document.createElement("div");
prevArrow.classList.add("carousel-arrow", "carousel-arrow-prev");
prevArrow.innerHTML = "&#10094;";
prevArrow.addEventListener("click", () => {
  page--;
  updateCarousel();
});

const nextArrow = document.createElement("div");
nextArrow.classList.add("carousel-arrow", "carousel-arrow-next");
nextArrow.innerHTML = "&#10095;";
nextArrow.addEventListener("click", () => {
  page++;
  updateCarousel();
});

const indicatorWrapper = document.createElement("div");
indicatorWrapper.classList.add("carousel-indicator");

for (let i = 0; i < totalPages; i++) {
  const indicatorDot = document.createElement("div");
  indicatorDot.classList.add("carousel-indicator-dot");
  if (i === 0) {
    indicatorDot.classList.add("active");
  }
  indicatorDot.addEventListener("click", () => {
    page = i;
    updateCarousel();
  });
  indicatorWrapper.appendChild(indicatorDot);
}

carouselWrapper.appendChild(prevArrow);
carouselWrapper.appendChild(nextArrow);
carouselWrapper.appendChild(indicatorWrapper);
