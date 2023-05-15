import { getPosts, posts } from "./get-posts.js";
import { displayPosts } from "./latest-posts.js";
let filteredAndSortedPosts = [];

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
  renderPosts();
}

async function renderPosts() {
  // Clear the existing posts
  const latestPostsContainer = document.getElementById("latest-posts-container");
  latestPostsContainer.innerHTML = "";

  // Render the updated posts
  const postsToShow = posts.slice(numToShow - 10, numToShow); // Get the remaining posts to show
  // const latestPostsContainer = document.getElementById("latest-posts-container");

  postsToShow.forEach((post) => {
    const postContainer = document.createElement("a");
    postContainer.href = `post-details.html?id=${post.postId}`; // URL for post's individual page
    postContainer.classList.add("search-post-container");
    postContainer.classList.add("latest-post-container");
    postContainer.style.opacity = "0";
    latestPostsContainer.appendChild(postContainer);

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("search-post-image-container");
    postContainer.appendChild(imageContainer);

    const image = new Image();
    image.onload = function () {
      imageContainer.style.backgroundImage = `url(${image.src})`;
    };
    image.src = post.image;

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("search-post-details-container");
    postContainer.appendChild(detailsContainer);

    const title = document.createElement("h2");
    title.classList.add("post-title");
    title.textContent = post.title;
    detailsContainer.appendChild(title);

    const tagLine = document.createElement("p");
    tagLine.classList.add("post-tagline");
    tagLine.textContent = post.shortDescription;
    detailsContainer.appendChild(tagLine);

    const tags = document.createElement("p");
    tags.classList.add("post-tags");
    tags.textContent = `Tags: ${post.tags.join(", ")}`;
    detailsContainer.appendChild(tags);

    latestPostsContainer.appendChild(postContainer);
    setTimeout(() => {
      postContainer.style.opacity = "1"; // Transition to full opacity
    }, 10); // Adjust the delay as needed for the desired transition effect
  });

  if (numToShow >= posts.length) {
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
      latestPostsContainer.appendChild(showMoreButton);
      showMoreButton.addEventListener("click", () => {
        numToShow += 10;
        displayPosts(numToShow);
      });
    }
  }
}

// Call the getPosts() function to retrieve and initialize the posts array
await getPosts();
