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

const tagsTitle = document.createElement("h3");
tagsTitle.classList.add("detail-tags-title");
tagsTitle.textContent = "Tags: ";
categoryContainer.appendChild(tagsTitle);

const excludedTags = ["food", "ep1"];
const filteredTags = post.tags.filter((tags) => !excludedTags.includes(tags.toLowerCase()));
const filteredTagsString = filteredTags.join(", ");
const tags = document.createElement("div");
tags.classList.add("detail-tags");
tags.textContent = filteredTagsString;
categoryContainer.appendChild(tags);

if(post.description) {
  const descriptionTitle = document.createElement("h3");
  descriptionTitle.classList.add("detail-description-title");
  descriptionTitle.textContent = "Description: ";
  categoryContainer.appendChild(descriptionTitle);

  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("detail-description");
  categoryContainer.appendChild(descriptionContainer);
};

const addedContainer = document.createElement("div");
addedContainer.classList.add("detail-added");
const addedDate = new Date(post.date);
const options = {
  timeZone: "Europe/Oslo",
  weekday: "long",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};
const addedDateString = addedDate.toLocaleString("en-US", options);
addedContainer.textContent = `Added: ${addedDateString}`;
categoryContainer.appendChild(addedContainer);

const recipeContainer = document.createElement("div");
recipeContainer.classList.add("detail-recipe-container");
mainContainer.appendChild(recipeContainer);

const ingredientsContainer = document.createElement("div");
ingredientsContainer.classList.add("detail-ingredients-container");
recipeContainer.appendChild(ingredientsContainer);

const recipeTitle = document.createElement("h3");
recipeTitle.classList.add("detail-recipe-title");
recipeTitle.textContent = "Recipe: ";
ingredientsContainer.appendChild(recipeTitle);

const recipeList = document.createElement("ul");
recipeList
const recipeItems = post.recipe.split("\n");
for (let i = 0; i < recipeItems.length; i++) {
  const recipeItem = recipeItems[i].trim();
  if (recipeItem !== "") {
    const recipeListItem = document.createElement("li");
    recipeListItem.textContent = recipeItem;
    recipeList.appendChild(recipeListItem);
  };
};
ingredientsContainer.appendChild(recipeList);

const instructionsContainer = document.createElement("div");
instructionsContainer.classList.add("detail-instructions-container");
recipeContainer.appendChild(instructionsContainer);

const instructionsTitle = document.createElement("h3");
instructionsTitle.classList.add("detail-instructions-title");
instructionsTitle.textContent = "Instructions: ";
instructionsContainer.appendChild(instructionsTitle);

const instructionsList = document.createElement("ul");
const instructionsItems = post.instructions.split("\n");
for (let i = 0; i < instructionsItems.length; i++) {
  const instructionsItem = instructionsItems[i].trim();
  if (instructionsItem !== "") {
    const instructionsListItem = document.createElement("li");
    instructionsListItem.textContent = instructionsItem;
    instructionsList.appendChild(instructionsListItem);
  };
};
instructionsContainer.appendChild(instructionsList);

