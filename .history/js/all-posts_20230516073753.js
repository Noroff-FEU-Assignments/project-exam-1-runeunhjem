import { getPosts, posts } from "./get-posts.js";
let filteredAndSortedPosts = [];
let numToShow = 10;
let postsToShow;
await getPosts();

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
    console.log("filteredAndSortedPosts: ", filteredAndSortedPosts);
    console.log("posts: ", posts);
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

// function renderPosts() {
//   const latestPostsContainer = document.getElementById("latest-posts-container");
//   latestPostsContainer.innerHTML = "";

//   // postsToShow = filteredAndSortedPosts.slice(0, numToShow);
//   // displayPosts(postsToShow);
//   // latestPostsContainer.innerHTML = "";
//   displayPosts(filteredAndSortedPosts);
// }

function renderPosts() {
  const latestPostsContainer = document.getElementById("latest-posts-container");
  latestPostsContainer.innerHTML = "";

  if (selectedCategory || selectedTag) {
    // Use filteredAndSortedPosts when a filter is applied
    postsToShow = filteredAndSortedPosts.slice(0, numToShow);
  } else {
    // Use the original posts when no filter is applied
    postsToShow = posts.slice(0, numToShow);
  }

  displayPosts(postsToShow);
}

async function displayPosts(postsToShow) {
  const latestPostsContainer = document.getElementById("latest-posts-container");
  latestPostsContainer.innerHTML = "";

  for (let i = 0; i < postsToShow.length; i++) {
    const post = postsToShow[i];

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
  }

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
      latestPostsContainer.appendChild(showMoreButton);
      showMoreButton.addEventListener("click", () => {
        numToShow += 10;
        displayPosts(postsToShow.slice(0, numToShow));
        // displayPosts(filteredAndSortedPosts.slice(0, numToShow));
      });
    }
  }
}


////////////////////////// INITIAL LOAD DOES NOT WORK, BUT SORT IS FINE //////////////////////////
// async function displayPosts(postsToShow) {
//   const latestPostsContainer = document.getElementById("latest-posts-container");
//   latestPostsContainer.innerHTML = "";

//   for (let i = 0; i < postsToShow.length; i++) {
//     const post = postsToShow[i];

//     const postContainer = document.createElement("a");
//     postContainer.href = `post-details.html?id=${post.postId}`; // URL for post's individual page
//     postContainer.classList.add("search-post-container");
//     postContainer.classList.add("latest-post-container");
//     postContainer.style.opacity = "0";
//     latestPostsContainer.appendChild(postContainer);

//     const imageContainer = document.createElement("div");
//     imageContainer.classList.add("search-post-image-container");
//     postContainer.appendChild(imageContainer);

//     const image = new Image();
//     image.onload = function () {
//       imageContainer.style.backgroundImage = `url(${image.src})`;
//     };
//     image.src = post.image;

//     const detailsContainer = document.createElement("div");
//     detailsContainer.classList.add("search-post-details-container");
//     postContainer.appendChild(detailsContainer);

//     const title = document.createElement("h2");
//     title.classList.add("post-title");
//     title.textContent = post.title;
//     detailsContainer.appendChild(title);

//     const tagLine = document.createElement("p");
//     tagLine.classList.add("post-tagline");
//     tagLine.textContent = post.shortDescription;
//     detailsContainer.appendChild(tagLine);

//     const tags = document.createElement("p");
//     tags.classList.add("post-tags");
//     tags.textContent = `Tags: ${post.tags.join(", ")}`;
//     detailsContainer.appendChild(tags);

//     latestPostsContainer.appendChild(postContainer);
//     setTimeout(() => {
//       postContainer.style.opacity = "1"; // Transition to full opacity
//     }, 10); // Adjust the delay as needed for the desired transition effect
//   }

//   if (numToShow >= filteredAndSortedPosts.length) {
//     // Check if there are no more posts to show
//     const showMoreButton = document.querySelector(".show-more-button");
//     if (showMoreButton) {
//       showMoreButton.remove(); // Hide or remove the button
//     }
//   } else {
//     const showMoreButton = document.querySelector(".show-more-button");
//     if (!showMoreButton) {
//       const showMoreButton = document.createElement("button");
//       showMoreButton.classList.add("show-more-button");
//       showMoreButton.textContent = "Show More";
//       latestPostsContainer.appendChild(showMoreButton);
//       showMoreButton.addEventListener("click", () => {
//         numToShow += 10;
//         displayPosts(filteredAndSortedPosts.slice(0, numToShow));
//       });
//     }
//   }
// }

////////////////////////// INITIAL LOAD WORKS FINE WITH SHOW MORE BUTTON //////////////////////////
// async function displayPosts(postsToShow) {
//   var postsToShow = posts.slice(numToShow - 10, numToShow); // Get the remaining posts to show
//   const latestPostsContainer = document.getElementById("latest-posts-container");

//   postsToShow.forEach((post) => {
//     const postContainer = document.createElement("a");
//     postContainer.href = `post-details.html?id=${post.postId}`; // URL for post's individual page
//     postContainer.classList.add("search-post-container");
//     postContainer.classList.add("latest-post-container");
//     postContainer.style.opacity = "0";
//     latestPostsContainer.appendChild(postContainer);

//     const imageContainer = document.createElement("div");
//     imageContainer.classList.add("search-post-image-container");
//     postContainer.appendChild(imageContainer);

//     const image = new Image();
//     image.onload = function () {
//       imageContainer.style.backgroundImage = `url(${image.src})`;
//     };
//     image.src = post.image;

//     const detailsContainer = document.createElement("div");
//     detailsContainer.classList.add("search-post-details-container");
//     postContainer.appendChild(detailsContainer);

//     const title = document.createElement("h2");
//     title.classList.add("post-title");
//     title.textContent = post.title;
//     detailsContainer.appendChild(title);

//     const tagLine = document.createElement("p");
//     tagLine.classList.add("post-tagline");
//     tagLine.textContent = post.shortDescription;
//     detailsContainer.appendChild(tagLine);

//     const tags = document.createElement("p");
//     tags.classList.add("post-tags");
//     tags.textContent = `Tags: ${post.tags.join(", ")}`;
//     detailsContainer.appendChild(tags);

//     latestPostsContainer.appendChild(postContainer);
//     setTimeout(() => {
//       postContainer.style.opacity = "1"; // Transition to full opacity
//     }, 10); // Adjust the delay as needed for the desired transition effect
//   });

//   if (numToShow >= posts.length) {
//     // Check if there are no more posts to show
//     const showMoreButton = document.querySelector(".show-more-button");
//     if (showMoreButton) {
//       showMoreButton.remove(); // Hide or remove the button
//     }
//   } else {
//     const showMoreButton = document.querySelector(".show-more-button");
//     if (!showMoreButton) {
//       const showMoreButton = document.createElement("button");
//       showMoreButton.classList.add("show-more-button");
//       showMoreButton.textContent = "Show More";
//       latestPostsContainer.appendChild(showMoreButton);
//       showMoreButton.addEventListener("click", () => {
//         numToShow += 10;
//         displayPosts(filteredAndSortedPosts.slice(0, numToShow)); // Use filteredAndSortedPosts instead of numToShow);
//       });
//     }
//   }
// }

displayPosts(numToShow); // Display the first 10 posts initially

