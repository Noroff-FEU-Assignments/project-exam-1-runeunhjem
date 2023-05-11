import { getPosts, posts } from "./get-posts.js";
let numToShow = 10;
await getPosts();
function displayPosts(numToShow) {
  const postsToShow = posts.slice(0, numToShow); // Get the specified number of posts to show
  numToShow += 10; // Increase the number of posts to show by 10
  const latestPostsContainer = document.getElementById("latest-posts-container");
  // ... code to display the posts on the page ...
  posts.forEach((post) => {
    const postContainer = document.createElement("a");
    postContainer.href = `post-details.html?id=${post.postId}`; // URL for post's individual page
    postContainer.classList.add("search-post-container");
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

    // searchResults.appendChild(postContainer);
  });
}
displayPosts(10); // Display the first 10 posts initially