import { getPosts, posts } from "./get-posts.js";
import { displayPosts } from "./latest-posts.js";
let filteredAndSortedPosts = [];
let numToShow = 3;
// await getPosts();

// Add event listeners to the filter elements
const categoryFilter = document.getElementById("category-filter");
categoryFilter.addEventListener("change", handleCategoryFilter);

const tagsFilter = document.getElementById("tags-filter");
tagsFilter.addEventListener("change", handleTagsFilter);

const sortFilter = document.getElementById("sort");
sortFilter.addEventListener("change", handleSortFilter);

async function handleCategoryFilter() {
  const selectedCategory = categoryFilter.value;
  // Filter the posts based on the selected category
  filteredAndSortedPosts = posts.filter((post) => {
    return post.categories.includes(selectedCategory);
  });
  // Sort the filtered posts
  await applySort();
}

async function handleTagsFilter() {
  const selectedTag = tagsFilter.value;
  // Filter the posts based on the selected tag
  filteredAndSortedPosts = posts.filter((post) => {
    return post.tags.includes(selectedTag);
  });
  // Sort the filtered posts
  await applySort();
}

async function handleSortFilter() {
  // Sort the filtered posts
  await applySort();
}

async function applySort() {
  const selectedSort = sortFilter.value;
  console.log("sortFilter.value: ", sortFilter.value);
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
  // Re-render the posts with the sorted data
  const latestPostsContainer = document.getElementById("latest-posts-container");
  latestPostsContainer.innerHTML = "";
  // Get the range of posts to show based on the numToShow value
  const startIndex = numToShow - 10;
  const endIndex = numToShow;

  // Render the updated posts
  numToShow = filteredAndSortedPosts.slice(startIndex, endIndex);
  console.log("numToShow: ", numToShow);
  displayPosts(numToShow); // Pass numToShow as an argument
}
