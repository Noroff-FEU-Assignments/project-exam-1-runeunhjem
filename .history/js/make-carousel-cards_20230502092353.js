import { getPosts, posts } from "./get-posts.js";

(async function () {
  await getPosts();
  console.log("posts is: ", posts);

  const carousel = document.getElementById("carousel-home");
  const postContainers = []; // array to hold post containers

  for (const post of posts) {
    const postContainer = document.createElement("div");
    postContainer.classList.add("post-container");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("post-image-container");
    postContainer.appendChild(imageContainer);

    const image = new Image();
    image.onload = function () {
      imageContainer.style.backgroundImage = `url(${image.src})`;
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

    postContainers.push(postContainer);
    carousel.appendChild(postContainer);
  }
    let currentSlide = 0; // start with first slide

    // add click listener to carousel
    carousel.addEventListener("click", function () {
    // remove active class from current slide
    postContainers[currentSlide].classList.remove("active");

    // increment current slide index, wrapping around to 0 if necessary
    currentSlide = (currentSlide + 1) % postContainers.length;

    // add active class to new current slide
    postContainers[currentSlide].classList.add("active");

    // determine direction of slide transition
    const direction = currentSlide === 0 ? "move-right" : "move-left";

    // add direction class to carousel container to trigger slide transition
    carousel.classList.add(direction);

    // remove direction class after transition is complete
    setTimeout(function () {
      carousel.classList.remove(direction);
    }, 500); // match transition duration
  });

  // set active class on first slide
  postContainers[currentSlide].classList.add("active");
})();

