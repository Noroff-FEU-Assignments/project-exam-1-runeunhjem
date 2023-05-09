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

const detailImage = document.createElement("div");
detailImage.classList.add("post-image-container");
detailContainer.appendChild(detailImage);

const image = new Image();
image.onload = function () {
  detailImage.style.backgroundImage = `url(${image.src})`;
};
image.src = post.image;
loader.classList.remove("active");
