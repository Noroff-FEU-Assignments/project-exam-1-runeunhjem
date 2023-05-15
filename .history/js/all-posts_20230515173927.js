import { getPosts, posts } from "./get-posts.js";
import { displayPosts, numToShow } from "./latest-posts.js";
const latestPostsContainer = document.getElementById("latest-posts-container");
let filteredAndSortedPosts = [];

// Add event listeners to the filter elements
const categoryFilter = document.getElementById("category-filter");
categoryFilter.addEventListener("change", handleCategoryFilter);

const tagsFilter = document.getElementById("tags-filter");
tagsFilter.addEventListener("change", handleTagsFilter);

const sortFilter = document.getElementById("sort");
sortFilter.addEventListener("change", handleSortFilter);

function handleCategoryFilter() {
  const selectedCategory = categoryFilter.value;
  // Filter the posts based on the selected category
  filteredAndSortedPosts = posts.filter((post) => {
    return post.categories.includes(selectedCategory);
  });
  // Sort the filtered posts
  applySort();
}

function handleTagsFilter() {
  const selectedTag = tagsFilter.value;
  // Filter the posts based on the selected tag
  filteredAndSortedPosts = posts.filter((post) => {
    return post.tags.includes(selectedTag);
  });
  // Sort the filtered posts
  applySort();
}

function handleSortFilter() {
  // Sort the filtered posts
  applySort();
}

function applySort() {
  const selectedSort = sortFilter.value;
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
  // Re-render the posts with the sorted data
  renderPosts();
}

// Function to render the posts
function renderPosts() {
  // Clear the existing posts
  latestPostsContainer.innerHTML = "";

  // Render the updated posts
  displayPosts(filteredAndSortedPosts);
}

// Call the getPosts() function to retrieve and initialize the posts array
getPosts();
