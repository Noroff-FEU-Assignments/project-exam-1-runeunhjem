import { getPosts, posts } from "./get-posts.js";

const main = document.querySelector("main");
const resultsWrapper = document.querySelector(".results-wrapper");
resultsWrapper.classList.add("hide");
const loader = document.getElementById("loader");

async function init() {
  const searchResults = document.querySelector(".search-results");
  searchResults.classList.add("hide");
  loader.classList.add("active");
  main.style
  await getPosts();
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const searchQuery = params.get("query");

  displaySearchResults(searchQuery, searchResults);

  function searchPosts(searchTerm) {
    const matchingPosts = posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
      const tagMatch = post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const titleMatchUpperCase = post.title.toUpperCase().includes(searchTerm.toUpperCase());
      const tagMatchUpperCase = post.tags.some((tag) => tag.toUpperCase().includes(searchTerm.toUpperCase()));
      return titleMatch || tagMatch || titleMatchUpperCase || tagMatchUpperCase;
    });
    return matchingPosts;
  }

  function displaySearchResults(searchTerm, searchResults) {
    searchResults.innerHTML = "";
    const matchingPosts = searchPosts(searchTerm);

    matchingPosts.forEach((post) => {
      const postContainer = document.createElement("a");
      postContainer.href = `post-details.html?id=${post.postId}`;
      postContainer.classList.add("search-post-container");

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

      searchResults.appendChild(postContainer);
    });

    const resultCount = document.createElement("div");
    resultCount.classList.add("search-result-count");
    if (matchingPosts.length === 1) {
      resultCount.textContent = `Found ${matchingPosts.length} recipe:`;
    } else {
      resultCount.textContent = `Found ${matchingPosts.length} recipes:`;
    }
    searchResults.prepend(resultCount);
  };
  loader.classList.remove("active");
  resultsWrapper.classList.remove("hide");
  searchResults.classList.remove("hide");
};
init();