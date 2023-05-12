import { getPosts, posts } from "./get-posts.js";
let numToShow = 10;

async function initialize() {
  await getPosts();
  // displayPosts(numToShow);
};

function displayPosts(numToShow) {
  const postsToShow = posts.slice(numToShow - 10, numToShow);
  const latestPostsContainer = document.getElementById("latest-posts-container");

  postsToShow.forEach((post) => {
    const postContainer = document.createElement("a");
    postContainer.href = `post-details.html?id=${post.postId}`;
    postContainer.classList.add("search-post-container");
    postContainer.style.opacity = "0";
    latestPostsContainer.appendChild(postContainer);

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("search-post-image-container");
    postContainer.appendChild(imageContainer);

    const image = new Image();
    image.onload = function () {
      imageContainer.style.backgroundImage = `url(${image.src})`;
    };
    image.src = post.image;

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("search-post-details-container");
    postContainer.appendChild(detailsContainer);

    const title = document.createElement("h2");
    title.classList.add("post-title");
    title.textContent = post.title;
    detailsContainer.appendChild(title);

    const tagLine = document.createElement("p");
    tagLine.classList.add("post-tagline");
    tagLine.textContent = post.shortDescription;
    detailsContainer.appendChild(tagLine);

    const tags = document.createElement("p");
    tags.classList.add("post-tags");
    tags.textContent = `Tags: ${post.tags.join(", ")}`;
    detailsContainer.appendChild(tags);

    latestPostsContainer.appendChild(postContainer);
    setTimeout(() => {
      postContainer.style.opacity = "1";
    }, 10);
  });

  if (numToShow >= posts.length) {
    const showMoreButton = document.querySelector(".show-more-button");
    if (showMoreButton) {
      showMoreButton.remove();
    }
  } else {
    const showMoreButton = document.querySelector(".show-more-button");
    if (!showMoreButton) {
      const showMoreButton = document.createElement("button");
      showMoreButton.classList.add("show-more-button");
      showMoreButton.textContent = "Show More";
      latestPostsContainer.appendChild(showMoreButton);
      showMoreButton.addEventListener("click", () => {
        numToShow += 10;
        displayPosts(numToShow);
      });
    }
  }
}
latest-posts.js:18 Uncaught (in promise) TypeError: Cannot read properties of null (reading 'appendChild')
    at latest-posts.js:18:26
    at Array.forEach (<anonymous>)
    at displayPosts (latest-posts.js:13:15)
    at getPosts (get-posts.js:50:5)
    at async initialize (latest-posts.js:5:3)
(anonymous) @ latest-posts.js:18
displayPosts @ latest-posts.js:13
getPosts @ get-posts.js:50
await in getPosts (async)
initialize @ latest-posts.js:5
(anonymous) @ latest-posts.js:75
latest-posts.js:18 Uncaught (in promise) TypeError: Cannot read properties of null (reading 'appendChild')
    at latest-posts.js:18:26
    at Array.forEach (<anonymous>)
    at displayPosts (latest-posts.js:13:15)
    at initialize (latest-posts.js:6:3)
(anonymous) @ latest-posts.js:18
displayPosts @ latest-posts.js:13
initialize @ latest-posts.js:6
await in initialize (async)
(anonymous) @ latest-posts.js:75
latest-posts.js:18 Uncaught (in promise) TypeError: Cannot read properties of null (reading 'appendChild')
    at latest-posts.js:18:26
    at Array.forEach (<anonymous>)
    at displayPosts (latest-posts.js:13:15)
    at getPosts (get-posts.js:50:5)
    at async init (make-carousel-cards.js:7:3)
// initialize();
export { displayPosts, numToShow };
