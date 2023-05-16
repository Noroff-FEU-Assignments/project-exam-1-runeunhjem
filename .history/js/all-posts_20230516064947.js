import { getPosts, posts } from "./get-posts.js";
import { displayPosts, numToShow } from "./latest-posts.js";
let filteredAndSortedPosts = [];
// let numToShow = 10;
// await getPosts();

// Add event listeners to the filter elements
const categoryFilter = document.getElementById("category-filter");
const tagsFilter = document.getElementById("tags-filter");
const sortFilter = document.getElementById("sort");

categoryFilter.addEventListener("change", handleCategoryFilter);
tagsFilter.addEventListener("change", handleTagsFilter);
sortFilter.addEventListener("change", handleSortFilter);

let selectedCategory = null;
let selectedTag = null;

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

async function applySort() {
  const selectedSort = sortFilter.value;
  console.log("sortFilter.value: ", sortFilter.value);

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
  if (selectedSort === "Published Date (Newest First)") {
    filteredAndSortedPosts.sort((a, b) => b.date - a.date);
  } else if (selectedSort === "Published Date (Oldest First)") {
    filteredAndSortedPosts.sort((a, b) => a.date - b.date);
  } else if (selectedSort === "Name (A to Z)") {
    filteredAndSortedPosts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (selectedSort === "Name (Z to A)") {
    filteredAndSortedPosts.sort((a, b) => b.title.localeCompare(a.title));
  }

  renderPosts(); // Call the renderPosts function
}

function renderPosts() {
  const latestPostsContainer = document.getElementById("latest-posts-container");
  latestPostsContainer.innerHTML = "";

  const postsToShow = filteredAndSortedPosts.slice(0, numToShow);
  displayPosts(postsToShow);
}

displayPosts(numToShow);
