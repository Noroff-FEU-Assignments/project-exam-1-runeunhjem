import { getPosts, posts } from "./get-posts.js";

async function init() {
  await getPosts(); // Wait for data to be fetched before proceeding
  // console.log("posts is: ", posts);
  // console.log("posts is: ", posts);
  const searchResults = document.querySelector(".search-results");
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const searchQuery = params.get("query");

  // console.log("searchQuery is: ",searchQuery);

  // Display search results for search query
  displaySearchResults(searchQuery, searchResults);

  function searchPosts(searchTerm) {
    // Filter posts by search term
    // console.log("Posts: ", posts);
    const matchingPosts = posts.filter((post) => {
      // console.log("Post: ", post);
      const titleMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
      // console.log("Title match: ", titleMatch);
      const tagMatch = post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      // console.log("Tag match: ", tagMatch);
      const titleMatchUpperCase = post.title.toUpperCase().includes(searchTerm.toUpperCase());
      const tagMatchUpperCase = post.tags.some((tag) => tag.toUpperCase().includes(searchTerm.toUpperCase()));
      return titleMatch || tagMatch || titleMatchUpperCase || tagMatchUpperCase;
    });
    // console.log("Matching posts:", matchingPosts);
    return matchingPosts;
  }

  function displaySearchResults(searchTerm, searchResults) {
    // Clear previous search results
    searchResults.innerHTML = "";
    console.log("searchterm is: ", searchTerm);

    // Get matching posts
    const matchingPosts = searchPosts(searchTerm);

    // Create HTML elements for matching posts
    matchingPosts.forEach((post) => {
      const postContainer = document.createElement("a");
      postContainer.href = `post-details.html?id=${post.postId}`; // URL for post's individual page
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

      // const date = new Date(post.date);
      // const dateString = `${date.toLocaleString("en-us", { month: "short" })} ${date.getDate()}, ${date.getFullYear()}`;
      // const added = document.createElement("p");
      // added.classList.add("post-added");
      // added.textContent = `Modified: ${dateString}`;
      // detailsContainer.appendChild(added);

      searchResults.appendChild(postContainer);
    });
  }
  // Display number of search results
  const resultCount = document.createElement("div");
  resultCount.textContent = `Found ${matchingPosts.length} results.`;
  searchResults.prepend(resultCount);
};
init();