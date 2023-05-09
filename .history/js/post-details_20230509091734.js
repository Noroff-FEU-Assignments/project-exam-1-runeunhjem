import { getPosts, posts } from "./get-posts.js";
console.log("posts is: ", posts);

await getPosts();
const detailContainer = document.getElementById("post-details-container");
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const postId = parseInt(params.get("id"));
console.log("postId is: ", postId);
const loader = document.getElementById("loader");
loader.classList.add("active");

const post = posts.find((p) => p.postId === parseInt(postId));
console.log("post is: ", post);

document.title = `${post.title} | CHEF'S TABLE`;
console.log("post.title is: ", post.title);

const title = document.createElement("h2");
title.classList.add("detail-title");
title.textContent = post.title;
postContainer.appendChild(title);

const imageContainer = document.createElement("div");
imageContainer.classList.add("detail-image");
detailContainer.appendChild(imageContainer);

const image = new Image();
image.onload = function () {
  imageContainer.style.backgroundImage = `url(${image.src})`;
};
image.src = post.image;
loader.classList.remove("active");
