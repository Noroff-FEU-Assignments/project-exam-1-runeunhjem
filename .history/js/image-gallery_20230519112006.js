import { getPosts, posts } from "./get-posts.js";
let filteredAndSortedPosts = [];
let numToShow = 10;
const loader = document.getElementById("loader");
const postsNote = document.getElementById("latest-posts-note");
const filterSection = document.querySelector(".filter-section");

async function applySort() {
  const selectedSort = sortFilter.value;

  // Filter the posts based on the selected category or tag (if available)
  if (selectedCategory) {
    filteredAndSortedPosts = posts.filter((post) => {
      return post.categories.includes(selectedCategory);
    });
  } else if (selectedTag) {
    filteredAndSortedPosts = posts.filter((post) => {
      return post.tags.includes(selectedTag);
    });
  } else {
    filteredAndSortedPosts = [...posts]; // Copy all posts
  }

  // Sort the filtered posts based on the selected sort option
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
  filteredAndSortedPosts = [...posts]; // Copy all posts
  renderPosts();
}

function renderPosts() {
  const imagePostsContainer = document.getElementById("image-gallery-containers");
  imagePostsContainer.innerHTML = "";

  filteredAndSortedPosts.slice(0, numToShow).forEach((post) => {
    const postContainer = document.createElement("a");
    postContainer.href = `post-details.html?id=${post.postId}`;
    // postContainer.classList.add("search-post-container");
    postContainer.classList.add("image-post-container");
    postContainer.style.opacity = "0";
    imagePostsContainer.appendChild(postContainer);

    const outOfViewMenuText = document.createElement("span");
    outOfViewMenuText.classList.add("out-of-view-menu-text");
    outOfViewMenuText.textContent = post.title;
    postContainer.appendChild(outOfViewMenuText);

    // ... (Code for creating post elements)
    const imageContainer = document.createElement(

"div");
    // imageContainer.classList.add("search-post-image-container");
    imageContainer.classList.add("image-gallery-image-container");
    postContainer.appendChild(imageContainer);

    const image = new Image();
    image.onload = function () {
      imageContainer.style.backgroundImage = `url(${image.src})`;
      image.alt = post.title;
    };
    image.src = post.image;
    imagePostsContainer.appendChild(postContainer);
    setTimeout(() => {
      postContainer.style.opacity = "1"; // Transition to full opacity
    }, 10); // Adjust the delay as needed for the desired transition effect
  });

  if (numToShow >= filteredAndSortedPosts.length) {
    // Check if there are no more posts to show
    const showMoreButton = document.querySelector(".show-more-button");
    if (showMoreButton) {
      showMoreButton.remove(); // Hide or remove the button
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
        renderPosts(); // Call the renderPosts function to update the displayed posts
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

// Add event listeners to the filter elements
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

  // Get all unique categories from the posts
  const categories = Array.from(new Set(posts.flatMap((post) => post.categories)));

  // Sort the categories alphabetically
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
