import { getPosts, posts } from "./get-posts.js";
import { displayPosts, numToShow } from "./latest-posts.js";
const latestPostsContainer = document.getElementById("latest-posts-container");
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
  const filteredPosts = posts.filter((post) => {
    return post.categories.includes(selectedCategory);
  });
  // Re-render the posts with the filtered data
  renderPosts(filteredPosts);
}

function handleTagsFilter() {
  const selectedTag = tagsFilter.value;
  // Filter the posts based on the selected tag
  const filteredPosts = posts.filter((post) => {
    return post.tags.includes(selectedTag);
  });
  // Re-render the posts with the filtered data
  renderPosts(filteredPosts);
}

function handleSortFilter() {
  const selectedSort = sortFilter.value;
  // Sort the posts based on the selected sort option
  if (selectedSort === "Release Date (Newest First)") {
    posts.sort((a, b) => b.date - a.date);
  } else if (selectedSort === "Release Date (Oldest First)") {
    posts.sort((a, b) => a.date - b.date);
  } else if (selectedSort === "Name (A to Z)") {
    posts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (selectedSort === "Name (Z to A)") {
    posts.sort((a, b) => b.title.localeCompare(a.title));
  }
  // Re-render the posts with the sorted data
  renderPosts(posts);
}

// Function to render the posts
function renderPosts(postsToRender) {
  // Clear the existing posts
  // ...
  displayPosts();

  // Render the updated posts
  // ...
}

// Call the getPosts() function to retrieve and initialize the posts array
getPosts();
