import { getPosts, posts } from "./get-posts.js";
import { displayPosts } from "./latest-posts.js";
let filteredAndSortedPosts = [];
let numToShow = 10;
let sortFilter;
// await getPosts();
async function initialize() {
  await getPosts();

  // Add event listeners to the filter elements
  const categoryFilter = document.getElementById("category-filter");
  categoryFilter.addEventListener("change", handleCategoryFilter);

  const tagsFilter = document.getElementById("tags-filter");
  tagsFilter.addEventListener("change", handleTagsFilter);

  sortFilter = document.getElementById("sort");
  sortFilter.addEventListener("change", handleSortFilter);
}

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

  // async function applySort() {
  //   const selectedSort = sortFilter.value;
  //   console.log("sortFilter.value: ", sortFilter.value);
  //   console.log("filteredAndSortedPosts: ", filteredAndSortedPosts);
  //   // Sort the filtered posts based on the selected sort option
  //   if (selectedSort === "Published Date (Newest First)") {
  //     filteredAndSortedPosts.sort((a, b) => b.date - a.date);
  //   } else if (selectedSort === "Published Date (Oldest First)") {
  //     filteredAndSortedPosts.sort((a, b) => a.date - b.date);
  //   } else if (selectedSort === "Name (A to Z)") {
  //     filteredAndSortedPosts.sort((a, b) => a.title.localeCompare(b.title));
  //   } else if (selectedSort === "Name (Z to A)") {
  //     filteredAndSortedPosts.sort((a, b) => b.title.localeCompare(a.title));
  //   }
  //   filteredAndSortedPosts = filteredAndSortedPosts.slice(); // Make a shallow copy to trigger reactivity
  //   renderPosts(); // Call the renderPosts function
  // }

    function renderPosts() {
      // Clear the existing posts
      const latestPostsContainer = document.getElementById("latest-posts-container");
      latestPostsContainer.innerHTML = "";

      // Render the updated posts
      const postsToShow = filteredAndSortedPosts.slice(0, numToShow);
      displayPosts(postsToShow);
    }

initialize();