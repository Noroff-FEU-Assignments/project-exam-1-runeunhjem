import { getPosts, posts } from "./get-posts.js";
let numToShow = 10;
// await getPosts();
const loader = document.getElementById("loader");
const postsNote = document.getElementById("latest-posts-note");
const filterSection = document.querySelector(".filter-section");

async function fetchAndRenderPosts() {
  loader.classList.add("active"); // Show the loader
  postsNote.classList.add("hide");
  filterSection.classList.add("hide");

  await getPosts();

  loader.classList.remove("active"); // Hide the loader
  postsNote.classList.remove("hide");
  filterSection.classList.remove("hide");

  displayPosts(numToShow); // Render the posts
}

async function displayPosts(numToShow) {
  const postsToShow = posts.slice(numToShow - 10, numToShow); // Get the remaining posts to show
  const latestPostsContainer = document.getElementById("latest-posts-container");

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
fetchAndRenderPosts();

// displayPosts(numToShow); // Display the first 10 posts initially
export { displayPosts, numToShow };
