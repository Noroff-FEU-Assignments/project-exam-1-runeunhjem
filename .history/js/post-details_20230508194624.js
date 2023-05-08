import { getPosts, posts } from "./getposts.js";
import { getComments, comments } from "./getcomments.js";

async function init() {
  await getComments();

  const loader = document.getElementById("loader");
  const postId = new URLSearchParams(window.location.search).get("postId");
  // Retrieve the post object with the matching ID
  loader.classList.add("active");
  await getPosts();
  const post = posts.find((p) => p.postId === parseInt(postId));

  // Update the page title with the post title
  document.title = `${post.title} | Your Blog Title`;

  (async function () {

  })();
  loader.classList.remove("active");
}

init();