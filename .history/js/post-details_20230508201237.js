import { getPosts, posts } from "./getposts.js";
// import { getComments, comments } from "./getcomments.js";


// async function init() {
  // await getComments();

  const loader = document.getElementById("loader");
  const postId = new URLSearchParams(window.location.search).get("postId");
  console.log("postId is: ", postId);
  // Retrieve the post object with the matching ID
  loader.classList.add("active");
  await getPosts();
  const post = posts.find((p) => p.postId === parseInt(postId));
  console.log("post is: ", post);

  // Update the page title with the post title
  document.title = `${post.title} | Your Blog Title`;
  console.log("post.title is: ", post.title);

  // Set the background image of the post-detail-image div to the post image URL
  const postDetailImage = document.getElementById("post-detail-image");
  postDetailImage.style.backgroundImage = `url(${post.image})`;
  const postContainer = document.createElement("a");
  postContainer.href = `post-details.html?id=${post.postId}`; // URL for post's individual page
  postContainer.classList.add("post-container");

  const leftButton = document.querySelector(".carousel-left");
  const rightButton = document.querySelector(".carousel-right");
  let currentPosition = 0;
  const viewportWidth = window.innerWidth;

  let cardWidthClick = 246;
  if (viewportWidth < 768) {
    cardWidthClick = 192;
  }
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("post-image-container");
  postContainer.appendChild(imageContainer);

  const image = new Image();
  image.onload = function () {
    imageContainer.style.backgroundImage = `url(${image.src})`;
  };
  image.src = post.image;

  imageContainer.onclick = function (event) {
    event.stopPropagation();
    // Open modal with image
    return false;
  };

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

  (async function () {})();
  loader.classList.remove("active");
// }

// init();