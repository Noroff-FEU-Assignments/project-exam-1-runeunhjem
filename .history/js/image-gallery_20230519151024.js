import { getPosts, posts } from "./get-posts.js";
let filteredAndSortedPosts = [];
let numToShow = 10;
const loader = document.getElementById("loader");
const postsNote = document.getElementById("latest-posts-note");
const filterSection = document.querySelector(".filter-section");

async function applySort() {
  const selectedSort = sortFilter.value;

  if (selectedCategory) {
    filteredAndSortedPosts = posts.filter((post) => {
      return post.categories.includes(selectedCategory);
    });
  } else if (selectedTag) {
    filteredAndSortedPosts = posts.filter((post) => {
      return post.tags.includes(selectedTag);
    });
  } else {
    filteredAndSortedPosts = [...posts];
  }

  if (selectedSort === "Release Date (Newest First)") {
    filteredAndSortedPosts.sort((a, b) => b.date - a.date);
  } else if (selectedSort === "Release Date (Oldest First)") {
    filteredAndSortedPosts.sort((a, b) => a.date - b.date);
  } else if (selectedSort === "Name (A to Z)") {
    filteredAndSortedPosts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (selectedSort === "Name (Z to A)") {
    filteredAndSortedPosts.sort((a, b) => b.title.localeCompare(a.title));
  }

  renderPosts();
}

function renderPostsOnPageLoad() {
  filteredAndSortedPosts = [...posts];
  renderPosts();
}

function renderPosts() {
  const imagePostsContainer = document.getElementById("image-gallery-containers");
  imagePostsContainer.innerHTML = "";

  filteredAndSortedPosts.slice(0, numToShow).forEach((post) => {
    const postContainer = document.createElement("a");
    postContainer.href = `post-details.html?id=${post.postId}`;
    postContainer.classList.add("image-post-container");
    postContainer.style.opacity = "0";
    imagePostsContainer.appendChild(postContainer);

    const outOfViewMenuText = document.createElement("span");
    outOfViewMenuText.classList.add("out-of-view-menu-text");
    outOfViewMenuText.textContent = post.title;
    outOfViewMenuText.style.color = "black";
    postContainer.appendChild(outOfViewMenuText);

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-gallery-image-container");
    postContainer.appendChild(imageContainer);

    const image = new Image();
    image.onload = function () {
      imageContainer.style.backgroundImage = `url(${image.src})`;
      image.alt = post.title;
    };
    image.src = post.image;

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("title-container");
    titleContainer.classList.add("hide");
    titleContainer.textContent = post.title;
    postContainer.appendChild(titleContainer);

    postContainer.addEventListener("mouseover", () => {
      titleContainer.classList.remove("hide");
    });

    postContainer.addEventListener("mouseout", () => {
      titleContainer.classList.add("hide");
    });

    imagePostsContainer.appendChild(postContainer);

    setTimeout(() => {
      postContainer.style.opacity = "1";
    }, 10);
  });

  if (numToShow >= filteredAndSortedPosts.length) {

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
      imagePostsContainer.appendChild(showMoreButton);
      showMoreButton.addEventListener("click", () => {
        numToShow += 10;
        renderPosts();
      });
    }
  }
}

async function handleCategoryFilter() {
  selectedCategory = categoryFilter.value;
  await applySort();
}

async function handleTagsFilter() {
  selectedTag = tagsFilter.value;
  await applySort();
}

async function handleSortFilter() {
  await applySort();
}

const categoryFilter = document.getElementById("category-filter");
const tagsFilter = document.getElementById("tags-filter");
const sortFilter = document.getElementById("sort");

categoryFilter.addEventListener("change", handleCategoryFilter);
tagsFilter.addEventListener("change", handleTagsFilter);
sortFilter.addEventListener("change", handleSortFilter);

let selectedCategory = null;
let selectedTag = null;

async function fetchAndRenderPosts() {
  const imagePostsContainer = document.getElementById("image-gallery-containers");
  loader.classList.add("active");
  postsNote.classList.add("hide");
  imagePostsContainer.classList.add("hide");
  filterSection.classList.add("hide");
  await getPosts();
  populateCategorySelector();
  populateTagsSelector();
  renderPostsOnPageLoad();
  loader.classList.remove("active");
  postsNote.classList.remove("hide");
  imagePostsContainer.classList.remove("hide");
  filterSection.classList.remove("hide");
}
function populateCategorySelector() {
  const categorySelector = document.getElementById("category-filter");
  const categories = Array.from(new Set(posts.flatMap((post) => post.categories)));
  categories.sort();

  // Clear existing options
  categorySelector.innerHTML = "";

  // Create and append new options
  const allOption = document.createElement("option");
  allOption.value = "";
  allOption.textContent = "All";
  categorySelector.appendChild(allOption);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelector.appendChild(option);
  });
}

function populateTagsSelector() {
  const tagsSelector = document.getElementById("tags-filter");

  // Get all unique tags from the posts
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  // Sort the tags alphabetically
  tags.sort();

  // Clear existing options
  tagsSelector.innerHTML = "";

  // Create and append new options
  const allOption = document.createElement("option");
  allOption.value = "";
  allOption.textContent = "All";
  tagsSelector.appendChild(allOption);

  tags.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag;
    option.textContent = tag;
    tagsSelector.appendChild(option);
  });
}

fetchAndRenderPosts();
