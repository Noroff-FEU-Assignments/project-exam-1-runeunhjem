import { getPosts, posts } from "./get-posts.js";

function displayPosts(numToShow) {
  const postsToShow = posts.slice(0, numToShow); // Get the specified number of posts to show
  // ... code to display the posts on the page ...
}
displayPosts(10);