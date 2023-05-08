import { getPosts, posts } from "./getposts.js";
import { getComments, comments } from "./getcomments.js";

async function init() {
  await getPosts();
  await getComments();
  const loader = document.getElementById("loader");
  const postId = new URLSearchParams(window.location.search).get("postId");
  
  (async function () {
    loader.classList.add("active");

  })();
  loader.classList.remove("active");
}

init();