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

const titleContainer = document.createElement("div");
titleContainer.classList.add("detail-header");
detailContainer.appendChild(titleContainer);

const title = document.createElement("h2");
title.classList.add("detail-title");
title.textContent = post.title;
titleContainer.appendChild(title);

const shortDescription = document.createElement("div");
shortDescription.classList.add("detail-short-description");
shortDescription.textContent = post.shortDescription;
detailContainer.appendChild(shortDescription);

const mainContainer = document.createElement("div");
mainContainer.classList.add("main-container");
detailContainer.appendChild(mainContainer);

const imageContainer = document.createElement("div");
imageContainer.classList.add("detail-image");
mainContainer.appendChild(imageContainer);

const image = new Image();
image.onload = function () {
  imageContainer.style.backgroundImage = `url(${image.src})`;
};
image.src = post.image;
loader.classList.remove("active");

const categoryContainer = document.createElement("div");
categoryContainer.classList.add("detail-category-container");
mainContainer.appendChild(categoryContainer);

const categoryTitle = document.createElement("h3");
categoryTitle.classList.add("detail-category-title");
categoryTitle.textContent = "Categories: ";
categoryContainer.appendChild(categoryTitle);

const excludedCategories = ["food", "ep1"];
const filteredCategories = post.categories.filter((category) => !excludedCategories.includes(category.toLowerCase()));
const filteredCategoriesString = filteredCategories.join(", ");
const categories = document.createElement("div");
categories.classList.add("detail-categories");
categories.textContent = filteredCategoriesString;
categoryContainer.appendChild(categories);



