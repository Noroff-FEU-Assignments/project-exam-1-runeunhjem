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
  const latestPostsContainer = document.getElementById("latest-posts-container");
  latestPostsContainer.innerHTML = "";

  filteredAndSortedPosts.slice(0, numToShow).forEach((post) => {
    const postContainer = document.createElement("a");
    postContainer.href = `post-details.html?id=${post.postId}`;
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
      latestPostsContainer.appendChild(showMoreButton);
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
  loader.classList.add("active");
  postsNote.classList.add("hide");
  latestPostsContainer.classList.add("hide");
  filterSection.classList.add("hide");
  await getPosts();
  populateCategorySelector();
  populateTagsSelector();
  renderPostsOnPageLoad();
  loader.classList.remove("active");
  postsNote.classList.remove("hide");
  latestPostsContainer.classList.add("hide");
  filterSection.classList.remove("hide");
}
function populateCategorySelector() {
  const categorySelector = document.getElementById("category-filter");
  const categories = Array.from(new Set(posts.flatMap((post) => post.categories)));
  categories.sort();
  categorySelector.innerHTML = "";

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
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));
  tags.sort();
  tagsSelector.innerHTML = "";

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

